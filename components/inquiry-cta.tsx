'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar, MessageSquare, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { cn } from '@/lib/utils';

export interface InquiryCtaProps {
  serviceSlug?: string;
  serviceTitle?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  variant?: 'card' | 'banner' | 'compact';
  className?: string;
}

export function InquiryCta({
  serviceSlug,
  serviceTitle,
  title,
  subtitle,
  badge = 'Direct Senior Developer Access',
  variant = 'card',
  className,
}: InquiryCtaProps) {
  const t = useTranslations('cta');

  // Build target contact URL with query parameter pre-selection
  const targetContactUrl = serviceSlug
    ? `/contact?service=${encodeURIComponent(serviceSlug)}`
    : serviceTitle
    ? `/contact?service=${encodeURIComponent(serviceTitle)}`
    : '/contact';

  const defaultTitle = serviceTitle
    ? `Looking to build with ${serviceTitle}?`
    : 'Have a project in mind? Let’s engineer it together.';

  const defaultSubtitle =
    'Direct architectural consultation, production-grade TypeScript code, and reliable timeline commitments. Let’s discuss your technical specifications.';

  const headingText = title || defaultTitle;
  const descriptionText = subtitle || defaultSubtitle;

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4',
          className
        )}
      >
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
            {headingText}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {descriptionText}
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <Button
            href={targetContactUrl}
            variant="primary"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="w-full sm:w-auto"
          >
            {t('discussBtn')}
          </Button>
          <Button
            href={siteConfig.social.calendarBooking}
            external
            variant="outline"
            size="sm"
            leftIcon={<Calendar className="w-3.5 h-3.5 text-sky-500" />}
            className="w-full sm:w-auto"
          >
            15-Min Call
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md shadow-xl p-8 sm:p-12 text-center',
        className
      )}
    >
      {/* Subtle ambient light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-gradient-to-b from-sky-500/15 via-sky-500/5 to-transparent blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="relative space-y-4">
        {badge && (
          <div className="flex justify-center">
            <Badge variant="accent" size="md" pulse>
              <Sparkles className="w-3 h-3 mr-1" />
              <span>{badge}</span>
            </Badge>
          </div>
        )}

        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight max-w-2xl mx-auto leading-tight">
          {headingText}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {descriptionText}
        </p>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href={targetContactUrl}
            variant="primary"
            size="md"
            leftIcon={<MessageSquare className="w-4 h-4" />}
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            {t('discussBtn')}
          </Button>

          <Button
            href={siteConfig.social.calendarBooking}
            external
            variant="outline"
            size="md"
            leftIcon={<Calendar className="w-4 h-4 text-sky-500" />}
            className="w-full sm:w-auto"
          >
            {t('scheduleBtn')}
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Guaranteed &lt; 24h Response</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% IP &amp; Code Ownership</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Mutual Non-Disclosure Agreement (NDA)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
