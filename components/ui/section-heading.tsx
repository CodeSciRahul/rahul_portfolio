import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

export interface SectionHeadingProps {
  badge?: string;
  badgePulse?: boolean;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  badge,
  badgePulse = false,
  title,
  subtitle,
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        isCenter ? 'text-center max-w-3xl mx-auto' : 'flex flex-col md:flex-row md:items-end justify-between gap-6',
        className
      )}
    >
      <div className={cn(isCenter ? 'w-full' : 'max-w-2xl')}>
        {badge && (
          <div className={cn('mb-3', isCenter && 'flex justify-center')}>
            <Badge variant="accent" size="md" pulse={badgePulse}>
              {badge}
            </Badge>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {!isCenter && action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
