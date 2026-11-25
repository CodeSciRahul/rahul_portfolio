import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bento' | 'glass' | 'interactive';
  glow?: boolean;
}

export function Card({
  className,
  variant = 'default',
  glow = false,
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-300 relative';

  const variants = {
    default:
      'border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-sm',
    bento:
      'border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700/80 backdrop-blur-sm',
    glass:
      'border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/40 backdrop-blur-md shadow-sm',
    interactive:
      'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-sky-500/50 dark:hover:border-sky-500/50 hover:shadow-lg dark:hover:shadow-sky-950/20 group cursor-pointer',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {glow && (
        <div
          className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 dark:bg-sky-500/10 blur-3xl pointer-events-none rounded-full"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
