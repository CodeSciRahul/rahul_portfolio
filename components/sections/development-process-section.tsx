import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  Search,
  MapPin,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  Headphones,
} from 'lucide-react';

export function DevelopmentProcessSection() {
  const t = useTranslations('process');

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      summary: t('step1Desc'),
      deliverable: t('step1Deliverable'),
      icon: Search,
    },
    {
      number: '02',
      title: t('step2Title'),
      summary: t('step2Desc'),
      deliverable: t('step2Deliverable'),
      icon: MapPin,
    },
    {
      number: '03',
      title: t('step3Title'),
      summary: t('step3Desc'),
      deliverable: t('step3Deliverable'),
      icon: Palette,
    },
    {
      number: '04',
      title: t('step4Title'),
      summary: t('step4Desc'),
      deliverable: t('step4Deliverable'),
      icon: Code2,
    },
    {
      number: '05',
      title: t('step5Title'),
      summary: t('step5Desc'),
      deliverable: t('step5Deliverable'),
      icon: CheckCircle2,
    },
    {
      number: '06',
      title: t('step6Title'),
      summary: t('step6Desc'),
      deliverable: t('step6Deliverable'),
      icon: Rocket,
    },
    {
      number: '07',
      title: t('step7Title'),
      summary: t('step7Desc'),
      deliverable: t('step7Deliverable'),
      icon: Headphones,
    },
  ];

  return (
    <Section pattern="grid" border="bottom">
      <SectionHeading
        badge={t('badge')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold text-neutral-300 dark:text-neutral-700 font-mono">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {step.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
                  Milestone Deliverable:
                </div>
                <div className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">
                  {step.deliverable}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
