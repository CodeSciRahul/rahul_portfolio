import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
  pattern?: 'grid' | 'dot' | 'none';
  border?: 'top' | 'bottom' | 'both' | 'none';
}

export function Section({
  className,
  containerClassName,
  pattern = 'none',
  border = 'none',
  children,
  ...props
}: SectionProps) {
  const patternClasses = {
    grid: 'bg-grid-subtle',
    dot: 'bg-dot-subtle',
    none: '',
  };

  const borderClasses = {
    top: 'border-t border-neutral-200/80 dark:border-neutral-800/80',
    bottom: 'border-b border-neutral-200/80 dark:border-neutral-800/80',
    both: 'border-y border-neutral-200/80 dark:border-neutral-800/80',
    none: '',
  };

  return (
    <section
      className={cn(
        'relative py-16 sm:py-24 overflow-hidden',
        patternClasses[pattern],
        borderClasses[border],
        className
      )}
      {...props}
    >
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
