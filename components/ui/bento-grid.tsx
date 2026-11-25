import * as React from 'react';
import { cn } from '@/lib/utils';

export function BentoGrid({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 3 | 4 | 6 | 8 | 12;
  glow?: boolean;
}

export function BentoCard({
  colSpan = 4,
  glow = false,
  className,
  children,
  ...props
}: BentoCardProps) {
  const colSpans = {
    3: 'md:col-span-3 lg:col-span-3',
    4: 'md:col-span-3 lg:col-span-4',
    6: 'md:col-span-6 lg:col-span-6',
    8: 'md:col-span-6 lg:col-span-8',
    12: 'md:col-span-6 lg:col-span-12',
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/40 p-6 lg:p-8 backdrop-blur-md transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700/80 hover:shadow-lg dark:hover:shadow-neutral-950/40 flex flex-col justify-between',
        colSpans[colSpan],
        className
      )}
      {...props}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-3xl transition-opacity group-hover:opacity-100 opacity-60"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
