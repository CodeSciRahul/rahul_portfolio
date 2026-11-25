'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { services } from '@/data/services';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const currentYear = new Date().getFullYear();

  // Dynamic real-time clock for Noida, India (UTC+5:30)
  const [currentTime, setCurrentTime] = React.useState<string>('');

  React.useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setCurrentTime(formatted);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Studio Status Header Banner */}
        <div className="mb-12 p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                  Rahul Kumar Studio
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {tCommon('status')}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Delivering web, mobile, and AI solutions with zero subcontracting.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700/60">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>Noida, IN: {currentTime || '12:00 PM IST'}</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>{tNav('hireMe')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5-Column Studio Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
              {tNav('about')}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              {t('services')}
            </h3>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/projects"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-block"
                >
                  {tNav('projects')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-block"
                >
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-block"
                >
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-block"
                >
                  {tNav('contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-block"
                >
                  {tNav('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              {t('contact')}
            </h3>
            <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{siteConfig.timezone} (EST/GMT Overlap)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & guarantees */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved. Built with Next.js 16 &amp; Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Direct Senior Developer
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              100% IP Handover
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
