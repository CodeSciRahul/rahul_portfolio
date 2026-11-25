'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ChevronDown, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FaqSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: t('q1'),
      answer: t('a1'),
    },
    {
      question: t('q2'),
      answer: t('a2'),
    },
    {
      question: t('q3'),
      answer: t('a3'),
    },
    {
      question: t('q4'),
      answer: t('a4'),
    },
    {
      question: t('q5'),
      answer: t('a5'),
    },
    {
      question: t('q6'),
      answer: t('a6'),
    },
  ];

  return (
    <Section pattern="dot" border="bottom" className="bg-neutral-50/40 dark:bg-neutral-950/40">
      <SectionHeading
        badge={t('badge')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="left"
        action={
          <Button
            href="/contact"
            variant="outline"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            {t('askBtn')}
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0',
                    isOpen && 'rotate-180 text-sky-500'
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal border-t border-neutral-100 dark:border-neutral-800/80 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
