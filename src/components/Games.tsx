import { useState } from 'react';
import { Gamepad2, Play, Download, X, Sparkles, Wrench, Rocket } from 'lucide-react';
import { games, type Game, type GameStatus } from '@/data/games';
import { useI18n, type Lang } from '@/lib/i18n';

const statusConfig: Record<GameStatus, { labelKey: string; icon: typeof Play; tint: string }> = {
  released: { labelKey: 'games.released', icon: Play, tint: 'bg-primary-500/15 text-primary-400 border-primary-500/30' },
  'in-development': { labelKey: 'games.inDev', icon: Wrench, tint: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  'coming-soon': { labelKey: 'games.comingSoon', icon: Rocket, tint: 'bg-accent-500/15 text-accent-400 border-accent-500/30' },
};

export default function Games() {
  const { t } = useI18n();

  return (
    <div className="animate-float-in space-y-6">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
          <Sparkles className="h-3.5 w-3.5" />
          {t('games.badge')}
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{t('games.title')}</h1>
        <p className="mt-1 text-sm text-slate-400">{t('games.subtitle')}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  const { t, lang } = useI18n();
  const [selected, setSelected] = useState(false);
  const cfg = statusConfig[game.status];
  const StatusIcon = cfg.icon;
  const l = lang as Lang;

  return (
    <>
      <button
        onClick={() => setSelected(true)}
        className="group overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 text-left transition-all hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10"
      >
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-ink-700 to-ink-600">
          {game.coverImage ? (
            <img
              src={game.coverImage}
              alt={game.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Gamepad2 className="h-12 w-12 text-ink-500 transition-colors group-hover:text-primary-500/50" />
            </div>
          )}
          <div className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm ${cfg.tint}`}>
            <StatusIcon className="h-3 w-3" />
            {t(cfg.labelKey)}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-300">
              {game.title}
            </h3>
            <span className="shrink-0 rounded-md bg-ink-700 px-2 py-0.5 text-[11px] font-medium text-slate-400">
              {game.genre[l]}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-400">{game.tagline[l]}</p>
        </div>
      </button>

      {selected && <GameModal game={game} onClose={() => setSelected(false)} />}
    </>
  );
}

function GameModal({ game, onClose }: { game: Game; onClose: () => void }) {
  const { t, lang } = useI18n();
  const cfg = statusConfig[game.status];
  const StatusIcon = cfg.icon;
  const l = lang as Lang;
  const [activeShot, setActiveShot] = useState(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-ink-600 bg-ink-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-ink-700 to-ink-600 sm:h-64">
          {game.coverImage ? (
            <img src={game.coverImage} alt={game.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Gamepad2 className="h-16 w-16 text-ink-500" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm ${cfg.tint}`}>
              <StatusIcon className="h-3 w-3" />
              {t(cfg.labelKey)}
            </div>
            <h2 className="font-display text-2xl font-bold text-white drop-shadow-lg">{game.title}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-lg bg-ink-700 px-3 py-1 text-xs font-medium text-slate-300">
              {game.genre[l]}
            </span>
            {game.playUrl && (
              <a
                href={game.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-semibold text-ink-900 transition-all hover:brightness-110"
              >
                <Play className="h-4 w-4" />
                {t('games.play')}
              </a>
            )}
            {game.downloadUrl && (
              <a
                href={game.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-ink-600 bg-ink-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-primary-500/50 hover:text-primary-400"
              >
                <Download className="h-4 w-4" />
                {t('games.download')}
              </a>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-300">{game.description[l]}</p>

          {game.screenshots.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-3 font-display text-sm font-bold text-white">{t('games.screenshots')}</h3>
              <div className="overflow-hidden rounded-xl border border-ink-700">
                <img
                  src={game.screenshots[activeShot]}
                  alt={`${game.title} screenshot ${activeShot + 1}`}
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>
              {game.screenshots.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {game.screenshots.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveShot(i)}
                      className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        i === activeShot ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
