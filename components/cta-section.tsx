'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
}

export function CtaSection({ title, subtitle }: CtaSectionProps) {
  const t = useTranslations('home');
  const tCta = useTranslations('cta');

  const heading = title || t('ctaBannerTitle');
  const description = subtitle || t('ctaBannerSubtitle');

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-neutral-100/50 dark:via-neutral-900/30 to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md shadow-2xl p-8 sm:p-14 text-center">
          {/* Subtle ambient spotlight */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-gradient-to-b from-sky-500/15 via-sky-500/5 to-transparent blur-3xl pointer-events-none rounded-full"
            aria-hidden="true"
          />

          {/* Tag */}
          <div className="mb-6 flex justify-center">
            <Badge variant="accent" size="md" pulse>
              {tCta('badge')}
            </Badge>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight max-w-2xl mx-auto leading-tight">
            {heading}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {tCta('discussBtn')}
            </Button>

            <Button
              href={siteConfig.social.calendarBooking}
              external
              variant="outline"
              size="lg"
              leftIcon={<Calendar className="w-4 h-4 text-sky-500" />}
              className="w-full sm:w-auto"
            >
              {tCta('scheduleBtn')}
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{tCta('guarantee')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct Senior Developer Access</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full IP &amp; Code Ownership Handover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
