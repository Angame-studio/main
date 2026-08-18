import { useEffect, useState } from 'react';
import { MessageSquare, Heart, Users, Sparkles, ArrowRight, Gamepad2 } from 'lucide-react';
import { supabase, type Post } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';

type Section = 'home' | 'games' | 'about' | 'posts' | 'chat' | 'donate';

export default function Home({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const { t } = useI18n();
  const [stats, setStats] = useState({ posts: 0, messages: 0 });
  const [recent, setRecent] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [{ count: postCount }, { count: msgCount }, { data: recentPosts }] =
        await Promise.all([
          supabase.from('posts').select('*', { count: 'exact', head: true }),
          supabase.from('chat_messages').select('*', { count: 'exact', head: true }),
          supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3),
        ]);
      setStats({ posts: postCount ?? 0, messages: msgCount ?? 0 });
      setRecent(recentPosts ?? []);
    })();
  }, []);

  return (
    <div className="animate-float-in space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-ink-800 via-ink-800 to-ink-700 px-6 py-16 sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
            <Sparkles className="h-3.5 w-3.5" />
            {t('home.badge')}
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {t('home.title')}
          </h1>
          <p className="mt-5 text-lg text-slate-400">{t('home.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('posts')}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold text-ink-900 shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 hover:brightness-110"
            >
              {t('home.explore')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-700/50 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-primary-500/50 hover:text-primary-400"
            >
              <MessageSquare className="h-4 w-4" />
              {t('home.joinChat')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<MessageSquare className="h-5 w-5" />}
          label={t('home.stats.posts')}
          value={stats.posts}
          tint="primary"
          onClick={() => onNavigate('posts')}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label={t('home.stats.messages')}
          value={stats.messages}
          tint="accent"
          onClick={() => onNavigate('chat')}
        />
        <StatCard
          icon={<Heart className="h-5 w-5" />}
          label={t('home.stats.donate')}
          value="—"
          tint="rose"
          onClick={() => onNavigate('donate')}
        />
      </section>

      {/* Recent posts preview */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">{t('home.recent')}</h2>
          <button
            onClick={() => onNavigate('posts')}
            className="flex items-center gap-1 text-sm font-medium text-primary-400 hover:text-primary-300"
          >
            {t('home.viewAll')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-600 bg-ink-800/40 px-6 py-12 text-center">
            <Gamepad2 className="mx-auto mb-3 h-8 w-8 text-slate-600" />
            <p className="text-slate-500">{t('home.noPosts')}</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {recent.map((p) => (
              <article
                key={p.id}
                onClick={() => onNavigate('posts')}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 transition-all hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-500/5"
              >
                {p.image_url && (
                  <div className="h-36 overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="text-xs font-medium text-primary-400">
                    {p.author_name}
                  </span>
                  <h3 className="mt-1 font-display font-bold text-white group-hover:text-primary-300">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tint,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tint: 'primary' | 'accent' | 'rose';
  onClick: () => void;
}) {
  const tints = {
    primary: 'text-primary-400 bg-primary-500/10',
    accent: 'text-accent-400 bg-accent-500/10',
    rose: 'text-rose-400 bg-rose-500/10',
  };
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-800 p-5 text-left transition-all hover:border-ink-500 hover:bg-ink-700/60"
    >
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tints[tint]}`}>
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </button>
  );
}
