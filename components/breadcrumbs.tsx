import * as React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

export interface BreadcrumbCrumb {
  name: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // Convert items to full URLs for JSON-LD schema
  const schemaItems = items.map((item) => ({
    name: item.name,
    url: item.href || '',
  }));

  const breadcrumbJsonLd = getBreadcrumbJsonLd(schemaItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn('py-3 text-xs text-neutral-500 dark:text-neutral-400 font-medium', className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5 list-none m-0 p-0">
          {items.map((crumb, idx) => {
            const isLast = idx === items.length - 1;
            const isFirst = idx === 0;

            return (
              <li key={idx} className="inline-flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast || !crumb.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="text-neutral-900 dark:text-white font-semibold truncate max-w-[220px] sm:max-w-md"
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="inline-flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                    <span>{crumb.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
