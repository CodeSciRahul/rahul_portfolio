import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Home } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <span className="text-5xl font-extrabold text-sky-600 dark:text-sky-400 tracking-tight">
          404
        </span>
        <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
          {t('notFoundTitle')}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t('notFoundDesc')}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t('backHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
