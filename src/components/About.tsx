import { Users, Gamepad2, Code2, MapPin, GraduationCap, Heart } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="animate-float-in space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-ink-800 via-ink-800 to-ink-700 px-6 py-12 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
            <Gamepad2 className="h-3.5 w-3.5" />
            Angames
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-lg text-slate-400">{t('about.intro')}</p>
        </div>
      </section>

      {/* About Us */}
      <section className="rounded-2xl border border-ink-700 bg-ink-800 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              {t('about.aboutUs.heading')}
            </h2>
            <p className="mt-3 leading-relaxed text-slate-300">{t('about.aboutUs.body')}</p>
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className="rounded-2xl border border-ink-700 bg-ink-800 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
            <Code2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-white">
              {t('about.devs.heading')}
            </h2>
            <p className="mt-3 leading-relaxed text-slate-300">{t('about.devs.body')}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DevCard name="Lê Thái Ân" role="Developer" />
              <DevCard name="Lý Thiên Ân" role="Developer" />
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Vietnam
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" /> Bình Thắng Secondary School
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> 13 years old
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About our games */}
      <section className="rounded-2xl border border-ink-700 bg-ink-800 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              {t('about.games.heading')}
            </h2>
            <p className="mt-3 leading-relaxed text-slate-300">{t('about.games.body')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DevCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-700/40 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-ink-900">
        {name.charAt(0)}
      </div>
      <div>
        <div className="font-medium text-white">{name}</div>
        <div className="text-xs text-slate-500">{role}</div>
      </div>
    </div>
  );
}
