import { useState } from 'react';
import {
  Heart,
  Copy,
  Check,
  Gamepad2,
  Coffee,
  Sparkles,
  Crown,
  Lock,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const BANK_INFO = {
  bank: 'Vietcombank',
  accountName: 'ANGAMES STUDIO',
  accountNumber: '0123456789',
  content: 'Ung ho Angames',
};

const buildQR = (amount: number) =>
  `https://img.vietqr.io/image/vietcombank-${BANK_INFO.accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    BANK_INFO.content,
  )}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

export default function Donate() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const copyAccount = () => {
    navigator.clipboard.writeText(BANK_INFO.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tiers = [
    {
      icon: Coffee,
      name: t('donate.tier.coffee'),
      amount: '25.000đ',
      amountNum: 25000,
      desc: t('donate.tier.coffee.desc'),
      tint: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/20',
    },
    {
      icon: Heart,
      name: t('donate.tier.supporter'),
      amount: '100.000đ',
      amountNum: 100000,
      desc: t('donate.tier.supporter.desc'),
      tint: 'from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/20',
      popular: true,
    },
    {
      icon: Sparkles,
      name: t('donate.tier.sponsor'),
      amount: '500.000đ',
      amountNum: 500000,
      desc: t('donate.tier.sponsor.desc'),
      tint: 'from-primary-500/20 to-primary-600/10 text-primary-400 border-primary-500/20',
    },
  ];

  const earlyAccessPerks = [
    t('donate.earlyAccess.perk1'),
    t('donate.earlyAccess.perk2'),
    t('donate.earlyAccess.perk3'),
    t('donate.earlyAccess.perk4'),
  ];

  return (
    <div className="animate-float-in space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-ink-800 to-ink-700 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="relative">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg shadow-rose-500/25">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t('donate.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">{t('donate.subtitle')}</p>
        </div>
      </section>

      {/* Early Access banner */}
      <section className="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 via-ink-800 to-accent-500/10 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-500/15 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30">
            <Crown className="h-7 w-7 text-ink-900" />
          </div>
          <div className="flex-1">
            <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-bold text-primary-400">
              <Lock className="h-3 w-3" />
              {t('donate.earlyAccess.subtitle')}
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              {t('donate.earlyAccess.heading')}
            </h2>
            <p className="mt-2 text-sm text-slate-300">{t('donate.earlyAccess.desc')}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {earlyAccessPerks.map((perk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  {perk}
                </li>
              ))}
            </ul>
            <a
              href={buildQR(100000)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-all hover:brightness-110"
            >
              <Crown className="h-4 w-4" />
              {t('donate.earlyAccess.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Donation tiers */}
      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-white">{t('donate.tiers')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl border bg-gradient-to-br p-6 ${tier.tint} ${
                  tier.popular ? 'ring-2 ring-rose-500/40' : ''
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-3 py-1 text-[11px] font-bold text-white">
                    {t('donate.popular')}
                  </span>
                )}
                <Icon className="mb-3 h-7 w-7" />
                <h3 className="font-display text-lg font-bold text-white">{tier.name}</h3>
                <div className="mt-1 font-display text-2xl font-bold text-white">{tier.amount}</div>
                <p className="mt-2 text-sm text-slate-400">{tier.desc}</p>
                <a
                  href={buildQR(tier.amountNum)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-lg border border-current/20 bg-white/5 py-2 text-center text-sm font-medium transition-colors hover:bg-white/10"
                >
                  {tier.amount}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* QR + bank info */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-white">{t('donate.bankInfo')}</h2>
          <dl className="space-y-3 text-sm">
            <Row label={t('donate.bank')} value={BANK_INFO.bank} />
            <Row label={t('donate.accountName')} value={BANK_INFO.accountName} />
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">{t('donate.accountNumber')}</dt>
              <dd className="flex items-center gap-2">
                <span className="font-mono font-semibold text-white">
                  {BANK_INFO.accountNumber}
                </span>
                <button
                  onClick={copyAccount}
                  className="rounded-lg bg-ink-700 p-1.5 text-slate-400 transition-colors hover:bg-primary-500/20 hover:text-primary-400"
                  title={t('donate.copy')}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-primary-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </dd>
            </div>
            <Row label={t('donate.content')} value={BANK_INFO.content} />
          </dl>

          <div className="mt-5">
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              {t('donate.customAmount')}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="VD: 200000"
                className="flex-1 rounded-lg border border-ink-600 bg-ink-700 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none"
              />
              <a
                href={customAmount ? buildQR(parseInt(customAmount) || 0) : '#'}
                target={customAmount ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  customAmount
                    ? 'bg-primary-500 text-ink-900 hover:bg-primary-400'
                    : 'cursor-not-allowed bg-ink-700 text-slate-600'
                }`}
              >
                {t('donate.generateQR')}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-700 bg-ink-800 p-6">
          <h2 className="mb-3 font-display text-lg font-bold text-white">{t('donate.qr')}</h2>
          <div className="rounded-xl bg-white p-3">
            <img src={buildQR(50000)} alt="QR" className="h-52 w-52 object-contain" />
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">{t('donate.qrDesc')}</p>
        </div>
      </section>

      {/* Why donate */}
      <section className="rounded-2xl border border-ink-700 bg-ink-800/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white">
              {t('donate.why.heading')}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                  {t(`donate.why.${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}
