import * as React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, Wifi, Battery, Signal, Terminal } from 'lucide-react';

interface DesktopMockupProps {
  title?: string;
  url?: string;
  statusBadge?: string;
  children: React.ReactNode;
  className?: string;
}

export function DesktopMockup({
  title = 'Studio Application',
  url = 'https://app.rahulkumar.dev',
  statusBadge = '200 OK • 42ms',
  children,
  className,
}: DesktopMockupProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100/80 dark:bg-neutral-900/80 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col',
        className
      )}
    >
      {/* Window Title Bar */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/90 dark:bg-neutral-950/80 select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/30" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/30" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/30" />
        </div>

        {/* URL / Address Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/70 dark:border-neutral-800/70 max-w-sm w-full justify-center truncate">
          <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-neutral-500 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{statusBadge}</span>
        </div>
      </div>

      {/* Screen Content */}
      <div className="bg-white dark:bg-neutral-950/95 overflow-hidden flex-1 relative">
        {children}
      </div>
    </div>
  );
}

interface MobileMockupProps {
  appName?: string;
  children: React.ReactNode;
  className?: string;
}

export function MobileMockup({
  appName = 'Dwive Mobility',
  children,
  className,
}: MobileMockupProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[310px] rounded-[40px] p-3.5 bg-neutral-900 dark:bg-neutral-800 shadow-2xl border-4 border-neutral-800 dark:border-neutral-700 select-none',
        className
      )}
    >
      {/* Screen Frame */}
      <div className="relative rounded-[32px] overflow-hidden bg-white dark:bg-neutral-950 flex flex-col h-[560px] border border-neutral-200/50 dark:border-neutral-800/60">
        {/* Dynamic Island / Speaker */}
        <div className="pt-2 px-6 flex items-center justify-between text-[11px] text-neutral-800 dark:text-neutral-200 font-semibold bg-neutral-50/80 dark:bg-neutral-900/80 z-20">
          <span>9:41</span>
          <div className="w-20 h-4 bg-neutral-900 dark:bg-black rounded-full" />
          <div className="flex items-center gap-1 text-[10px]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Mobile Viewport Content */}
        <div className="flex-1 overflow-y-auto relative scrollbar-none">
          {children}
        </div>

        {/* Home Bar */}
        <div className="h-5 flex items-center justify-center bg-white dark:bg-neutral-950">
          <div className="w-28 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>
    </div>
  );
}
