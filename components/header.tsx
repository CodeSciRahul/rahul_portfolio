'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { navigationItems } from '@/data/navigation';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Menu, X, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close mobile menu when pathname changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Studio Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group text-neutral-900 dark:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl p-1"
        >
          <div className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white leading-none">
                {siteConfig.name}
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider">
                Studio
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium tracking-normal mt-0.5">
              Independent Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (visible on lg: 1024px and up) */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/60 dark:bg-neutral-900/60 p-1 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
          {navigationItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls & CTAs */}
        <div className="flex items-center gap-2">
          {/* Availability Status Dot (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{tCommon('status')}</span>
          </div>

          <LanguageSwitcher />
          <ThemeToggle />

          {/* Primary CTA */}
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex"
          >
            {t('hireMe')}
          </Button>

          {/* Mobile & Tablet menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label={mobileMenuOpen ? t('closeMenu') : t('menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{tCommon('status')}</span>
          </div>

          {navigationItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50/80 dark:bg-sky-950/50'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              href="/contact"
              variant="accent"
              size="md"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full"
            >
              {t('hireMe')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
