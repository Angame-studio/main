import { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Heart,
  MessageCircle,
  Send,
  Trash2,
  X,
  Loader2,
  ImageIcon,
} from 'lucide-react';
import { supabase, type Post, type Comment } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';

const NICK_KEY = 'gamehub_nick';

function useNick() {
  const [nick, setNick] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem(NICK_KEY);
    if (saved) setNick(saved);
  }, []);
  const update = (v: string) => {
    setNick(v);
    localStorage.setItem(NICK_KEY, v);
  };
  return { nick, update };
}

export default function Posts() {
  const { t } = useI18n();
  const { nick, update } = useNick();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="animate-float-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{t('posts.title')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('posts.subtitle')}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2.5 text-sm font-semibold text-ink-900 shadow-lg shadow-primary-500/20 transition-all hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          {t('posts.new')}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-600 bg-ink-800/40 px-6 py-16 text-center">
          <MessageCircle className="mx-auto mb-3 h-8 w-8 text-slate-600" />
          <p className="text-slate-400">{t('posts.empty')}</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-sm font-medium text-primary-400 hover:text-primary-300"
          >
            {t('posts.firstPost')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} nick={nick} onNickChange={update} onDeleted={load} />
          ))}
        </div>
      )}

      {showForm && (
        <CreatePostModal
          nick={nick}
          onNickChange={update}
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            load();
          }}
        />
      )}
    </div>
  );
}

function PostCard({
  post,
  nick,
  onNickChange,
  onDeleted,
}: {
  post: Post;
  nick: string;
  onNickChange: (v: string) => void;
  onDeleted: () => void;
}) {
  const { t } = useI18n();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBody, setCommentBody] = useState('');
  const [commentNick, setCommentNick] = useState(nick);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setCommentNick(nick);
  }, [nick]);

  const loadLikes = useCallback(async () => {
    const { count } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', post.id);
    setLikes(count ?? 0);
    if (nick) {
      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', post.id)
        .eq('author_name', nick)
        .maybeSingle();
      setLiked(!!data);
    }
  }, [post.id, nick]);

  useEffect(() => {
    loadLikes();
  }, [loadLikes]);

  const loadComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    setComments(data ?? []);
  };

  const toggleLike = async () => {
    const name = nick || 'Guest';
    if (name !== nick) onNickChange(name);
    if (liked) {
      await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', post.id)
        .eq('author_name', name);
      setLiked(false);
      setLikes((l) => Math.max(0, l - 1));
    } else {
      await supabase
        .from('post_likes')
        .insert({ post_id: post.id, author_name: name });
      setLiked(true);
      setLikes((l) => l + 1);
    }
  };

  const sendComment = async () => {
    if (!commentBody.trim()) return;
    const name = commentNick.trim() || 'Guest';
    if (name !== nick) onNickChange(name);
    setSending(true);
    const { data } = await supabase
      .from('comments')
      .insert({ post_id: post.id, author_name: name, body: commentBody.trim() })
      .select('*')
      .single();
    if (data) setComments((c) => [...c, data]);
    setCommentBody('');
    setSending(false);
  };

  const deletePost = async () => {
    await supabase.from('posts').delete().eq('id', post.id);
    onDeleted();
  };

  const timeStr = new Date(post.created_at).toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 transition-colors hover:border-ink-600">
      {post.image_url && (
        <div className="h-52 overflow-hidden sm:h-64">
          <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-primary-400">{post.author_name}</span>
              <span>·</span>
              <span>{timeStr}</span>
            </div>
            <h2 className="mt-1.5 font-display text-lg font-bold text-white">{post.title}</h2>
          </div>
          <button
            onClick={deletePost}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-error-500/10 hover:text-error-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
          {post.body}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              liked
                ? 'bg-rose-500/15 text-rose-400'
                : 'bg-ink-700 text-slate-400 hover:text-rose-400'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            {likes}
          </button>
          <button
            onClick={() => {
              setShowComments((s) => !s);
              if (!showComments) loadComments();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-ink-700 px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-primary-400"
          >
            <MessageCircle className="h-4 w-4" />
            {comments.length > 0 ? comments.length : t('posts.comments')}
          </button>
        </div>

        {showComments && (
          <div className="mt-4 border-t border-ink-700 pt-4">
            <div className="mb-3 max-h-48 space-y-2 overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <p className="text-xs text-slate-500">{t('posts.noComments')}</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="animate-slide-in rounded-lg bg-ink-700/50 px-3 py-2">
                    <span className="text-xs font-medium text-primary-400">{c.author_name}</span>
                    <p className="mt-0.5 text-sm text-slate-300">{c.body}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                value={commentNick}
                onChange={(e) => setCommentNick(e.target.value)}
                placeholder={t('posts.nickname')}
                className="w-28 rounded-lg border border-ink-600 bg-ink-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
              />
              <input
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendComment()}
                placeholder={t('posts.writeComment')}
                className="flex-1 rounded-lg border border-ink-600 bg-ink-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
              />
              <button
                onClick={sendComment}
                disabled={sending || !commentBody.trim()}
                className="flex items-center justify-center rounded-lg bg-primary-500 px-3 py-2 text-ink-900 transition-all hover:bg-primary-400 disabled:opacity-40"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function CreatePostModal({
  nick,
  onNickChange,
  onClose,
  onCreated,
}: {
  nick: string;
  onNickChange: (v: string) => void;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { t } = useI18n();
  const [author, setAuthor] = useState(nick);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!title.trim() || !body.trim()) {
      setError(t('posts.error'));
      return;
    }
    const name = author.trim() || 'Guest';
    if (name !== nick) onNickChange(name);
    setSubmitting(true);
    setError('');
    const { error: insErr } = await supabase.from('posts').insert({
      author_name: name,
      title: title.trim(),
      body: body.trim(),
      image_url: imageUrl.trim() || null,
    });
    setSubmitting(false);
    if (insErr) {
      setError(t('posts.errorSubmit'));
      return;
    }
    onCreated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-ink-600 bg-ink-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
          <h2 className="font-display text-lg font-bold text-white">{t('posts.newPost')}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-ink-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <Field label={t('posts.nickname')}>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="modal-input"
            />
          </Field>
          <Field label={t('posts.titleField')}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
            />
          </Field>
          <Field label={t('posts.bodyField')}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="modal-input resize-none"
            />
          </Field>
          <Field label={t('posts.imageField')}>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="modal-input pl-9"
              />
            </div>
          </Field>
          {error && <p className="text-sm text-error-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 border-t border-ink-700 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 hover:bg-ink-700"
          >
            {t('posts.cancel')}
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-ink-900 transition-all hover:bg-primary-400 disabled:opacity-50"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {t('posts.submit')}
          </button>
        </div>
      </div>
      <style>{`.modal-input{width:100%;border-radius:0.5rem;border:1px solid var(--color-ink-600);background:var(--color-ink-700);padding:0.5rem 0.75rem;font-size:0.875rem;color:white;outline:none}.modal-input:focus{border-color:var(--color-primary-500)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>
      {children}
    </label>
  );
}
