import { useEffect, useRef, useState, useCallback } from 'react';
import { Send, Loader2, Users, Circle } from 'lucide-react';
import { supabase, type ChatMessage } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';

const NICK_KEY = 'gamehub_nick';
const MAX_MESSAGES = 100;

export default function Chat() {
  const { t } = useI18n();
  const [nick, setNick] = useState('');
  const [nickSet, setNickSet] = useState(false);
  const [nickInput, setNickInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [onlineCount, setOnlineCount] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(NICK_KEY);
    if (saved) {
      setNick(saved);
      setNickInput(saved);
      setNickSet(true);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(MAX_MESSAGES);
    setMessages(data ?? []);
  }, []);

  useEffect(() => {
    if (!nickSet) return;
    loadHistory();

    const channel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => {
          const msg = payload.new as ChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            const next = [...prev, msg];
            return next.slice(-MAX_MESSAGES);
          });
        },
      )
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setOnlineCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ nick, online_at: new Date().toISOString() });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [nickSet, nick, loadHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const confirmNick = () => {
    const name = nickInput.trim();
    if (!name) return;
    setNick(name);
    localStorage.setItem(NICK_KEY, name);
    setNickSet(true);
  };

  const send = async () => {
    if (!input.trim()) return;
    setSending(true);
    setInput('');
    await supabase.from('chat_messages').insert({ author_name: nick, body: input.trim() });
    setSending(false);
  };

  if (!nickSet) {
    return (
      <div className="animate-float-in flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-ink-700 bg-ink-800 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/25">
            <Users className="h-7 w-7 text-ink-900" />
          </div>
          <h1 className="font-display text-xl font-bold text-white">{t('chat.join')}</h1>
          <p className="mt-2 text-sm text-slate-400">{t('chat.joinDesc')}</p>
          <input
            value={nickInput}
            onChange={(e) => setNickInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmNick()}
            placeholder={t('chat.nickname')}
            maxLength={24}
            className="mt-5 w-full rounded-xl border border-ink-600 bg-ink-700 px-4 py-3 text-center text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={confirmNick}
            disabled={!nickInput.trim()}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-sm font-semibold text-ink-900 transition-all hover:brightness-110 disabled:opacity-40"
          >
            {t('chat.enter')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-float-in flex h-[calc(100vh-12rem)] flex-col">
      <div className="mb-3 flex items-center justify-between rounded-xl border border-ink-700 bg-ink-800 px-4 py-3">
        <h1 className="font-display text-lg font-bold text-white">{t('chat.title')}</h1>
        <div className="flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
          <Circle className="h-2 w-2 fill-current animate-pulse-glow" />
          {onlineCount} {t('chat.online')}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-ink-700 bg-ink-800 p-4"
      >
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <p className="text-sm text-slate-500">{t('chat.noMessages')}</p>
          </div>
        )}
        {messages.map((m) => {
          const isMe = m.author_name === nick;
          const timeStr = new Date(m.created_at).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <div
              key={m.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-slide-in`}
            >
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                {!isMe && (
                  <span className="mb-1 block text-xs font-medium text-primary-400">
                    {m.author_name}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm ${
                    isMe
                      ? 'rounded-br-md bg-gradient-to-br from-primary-500 to-primary-600 text-ink-900'
                      : 'rounded-bl-md bg-ink-700 text-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{m.body}</p>
                </div>
                <span
                  className={`mt-1 block text-[10px] text-slate-500 ${
                    isMe ? 'text-right' : 'text-left'
                  }`}
                >
                  {timeStr}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !sending && send()}
          placeholder={t('chat.placeholder')}
          maxLength={500}
          className="flex-1 rounded-xl border border-ink-600 bg-ink-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
        />
        <button
          onClick={send}
          disabled={sending || !input.trim()}
          className="flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-3 text-ink-900 transition-all hover:brightness-110 disabled:opacity-40"
        >
          {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
