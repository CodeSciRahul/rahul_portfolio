'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, Locale } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const tA11y = useTranslations('a11y');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={tA11y('selectLanguage')}
      >
        <Globe className="w-3.5 h-3.5 text-neutral-500" />
        <span className="uppercase font-mono font-semibold tracking-wider text-[11px]">
          {currentLocale}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xl py-1 z-50 ring-1 ring-black/5 dark:ring-white/5 animate-in fade-in-50 zoom-in-95 duration-100"
          role="menu"
          aria-orientation="vertical"
        >
          {locales.map((loc) => {
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                role="menuitem"
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-sky-50/70 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
                }`}
              >
                <div className="flex flex-col">
                  <span>{localeNames[loc].nativeName}</span>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase">{loc}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-sky-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
