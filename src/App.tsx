import { useEffect, useState, useRef } from 'react';
import { Gamepad2, MessageSquare, Heart, Menu, X, Library, Info, Globe, Check } from 'lucide-react';
import Home from '@/components/Home';
import Games from '@/components/Games';
import About from '@/components/About';
import Posts from '@/components/Posts';
import Chat from '@/components/Chat';
import Donate from '@/components/Donate';
import { useI18n, languages, type Lang } from '@/lib/i18n';

type Section = 'home' | 'games' | 'about' | 'posts' | 'chat' | 'donate';

export default function App() {
  const { t, lang, setLang } = useI18n();
  const [section, setSection] = useState<Section>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
  };

  const navItems: { id: Section; label: string; icon: typeof Gamepad2 }[] = [
    { id: 'home', label: t('nav.home'), icon: Gamepad2 },
    { id: 'games', label: t('nav.games'), icon: Library },
    { id: 'about', label: t('nav.about'), icon: Info },
    { id: 'posts', label: t('nav.posts'), icon: MessageSquare },
    { id: 'chat', label: t('nav.chat'), icon: MessageSquare },
    { id: 'donate', label: t('nav.donate'), icon: Heart },
  ];

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <div className="min-h-screen bg-ink-900 text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30">
              <Gamepad2 className="h-5 w-5 text-ink-900" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <span className="block font-display text-base font-bold leading-none text-white">
                Angames
              </span>
              <span className="block text-[11px] leading-none text-primary-400">
                Indie Game Studio
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'bg-primary-500/15 text-primary-400'
                      : 'text-slate-400 hover:bg-ink-700 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}

            {/* Language switcher */}
            <div ref={langRef} className="relative ml-2">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-2.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:border-primary-500/50 hover:text-primary-400"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-bold">{currentLang?.flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 overflow-hidden rounded-xl border border-ink-600 bg-ink-800 shadow-xl">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Lang);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-ink-700 ${
                        l.code === lang ? 'text-primary-400' : 'text-slate-300'
                      }`}
                    >
                      {l.label}
                      {l.code === lang && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 text-slate-400"
              >
                <Globe className="h-4 w-4" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 overflow-hidden rounded-xl border border-ink-600 bg-ink-800 shadow-xl">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Lang);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-ink-700 ${
                        l.code === lang ? 'text-primary-400' : 'text-slate-300'
                      }`}
                    >
                      {l.label}
                      {l.code === lang && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-ink-700"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="border-t border-ink-700 px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-500/15 text-primary-400'
                      : 'text-slate-400 hover:bg-ink-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {section === 'home' && <Home onNavigate={go} />}
        {section === 'games' && <Games />}
        {section === 'about' && <About />}
        {section === 'posts' && <Posts />}
        {section === 'chat' && <Chat />}
        {section === 'donate' && <Donate />}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-700 bg-ink-800/50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center">
          <p className="text-sm text-slate-500">{t('home.footer')}</p>
          <p className="mt-2 text-xs text-slate-600">
            Angames — Lê Thái Ân & Lý Thiên Ân — Vietnam
          </p>
        </div>
      </footer>
    </div>
  );
}
