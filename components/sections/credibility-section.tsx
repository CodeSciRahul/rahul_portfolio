import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  ShieldCheck,
  CheckCircle2,
  Server,
  Smartphone,
  Cpu,
  CreditCard,
  Briefcase,
  GraduationCap,
  Clock,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function CredibilitySection() {
  const t = useTranslations('credibility');

  const credentials = [
    {
      icon: Server,
      stat: t('apiStat'),
      title: t('apiTitle'),
      subtitle: t('apiSub'),
      description: t('apiDesc'),
      clientBenefit: t('apiBenefit'),
    },
    {
      icon: Smartphone,
      stat: t('mobileStat'),
      title: t('mobileTitle'),
      subtitle: t('mobileSub'),
      description: t('mobileDesc'),
      clientBenefit: t('mobileBenefit'),
    },
    {
      icon: CreditCard,
      stat: t('paymentStat'),
      title: t('paymentTitle'),
      subtitle: t('paymentSub'),
      description: t('paymentDesc'),
      clientBenefit: t('paymentBenefit'),
    },
    {
      icon: GraduationCap,
      stat: t('degreeStat'),
      title: t('degreeTitle'),
      subtitle: t('degreeSub'),
      description: t('degreeDesc'),
      clientBenefit: t('degreeBenefit'),
    },
  ];

  return (
    <Section pattern="dot" border="bottom" className="bg-neutral-50/40 dark:bg-neutral-950/40">
      <SectionHeading
        badge={t('badge')}
        badgePulse
        title={t('title')}
        subtitle={t('subtitle')}
        align="left"
      />

      {/* Grid of verified credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {credentials.map((cred, idx) => {
          const Icon = cred.icon;
          return (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Verified
                  </span>
                </div>

                <div className="text-xl font-extrabold text-neutral-900 dark:text-white font-mono">
                  {cred.stat}
                </div>

                <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-1">
                  {cred.title}
                </div>

                <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  {cred.subtitle}
                </div>

                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {cred.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  What Your Business Gains:
                </div>
                <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{cred.clientBenefit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Core Working Commitments Bar */}
      <div className="mt-8 p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Zero Subcontracting</div>
            <div className="text-[11px] text-neutral-500">I write, review, and test your code directly.</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">&lt; 24h Guaranteed Response</div>
            <div className="text-[11px] text-neutral-500">Proactive communication on your timeline.</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">100% IP &amp; Code Ownership</div>
            <div className="text-[11px] text-neutral-500">Full repository handover upon completion.</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
