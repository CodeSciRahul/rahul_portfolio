import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  MessageSquare,
  Code2,
  Clock,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export function WhyWorkWithMeSection() {
  const t = useTranslations('whyWork');

  const pillars = [
    {
      icon: MessageSquare,
      title: t('directCommTitle'),
      subtitle: t('directCommSub'),
      description: t('directCommDesc'),
      clientGain: t('directCommGain'),
    },
    {
      icon: Code2,
      title: t('codeTitle'),
      subtitle: t('codeSub'),
      description: t('codeDesc'),
      clientGain: t('codeGain'),
    },
    {
      icon: Clock,
      title: t('collabTitle'),
      subtitle: t('collabSub'),
      description: t('collabDesc'),
      clientGain: t('collabGain'),
    },
    {
      icon: Layers,
      title: t('endToEndTitle'),
      subtitle: t('endToEndSub'),
      description: t('endToEndDesc'),
      clientGain: t('endToEndGain'),
    },
  ];

  return (
    <Section pattern="dot" border="bottom" className="bg-neutral-50/50 dark:bg-neutral-950/50">
      <SectionHeading
        badge={t('badge')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {pillar.title}
                </h3>

                <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                  {pillar.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                  Business Value:
                </div>
                <div className="flex items-start gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pillar.clientGain}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
