'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const t = useTranslations('common');
  const tA11y = useTranslations('a11y');

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  const themes = [
    { key: 'light', label: t('light'), icon: Sun },
    { key: 'dark', label: t('dark'), icon: Moon },
    { key: 'system', label: t('system'), icon: Laptop },
  ];

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 shadow-sm"
        aria-label={tA11y('toggleTheme')}
        aria-expanded={isOpen}
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-amber-500 transition-transform" />
        ) : theme === 'dark' ? (
          <Moon className="w-4 h-4 text-sky-400 transition-transform" />
        ) : (
          <Laptop className="w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xl py-1 z-50 ring-1 ring-black/5 dark:ring-white/5 animate-in fade-in-50 zoom-in-95 duration-100"
          role="menu"
        >
          {themes.map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.key;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setTheme(t.key);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-50/60 dark:bg-sky-950/40'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
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
