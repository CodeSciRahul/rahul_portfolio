'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Webhook,
  ShieldCheck,
  Cpu,
  Radio,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface Step {
  id: number;
  label: string;
  actor: string;
  protocol: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const workflowSteps: Step[] = [
  {
    id: 1,
    label: 'Inbound Event Trigger',
    actor: 'Stripe / Twilio Webhook',
    protocol: 'POST /api/v1/webhooks',
    description: 'Receives signed JSON payload from external provider with raw buffer preserved for cryptographic verification.',
    icon: Webhook,
  },
  {
    id: 2,
    label: 'Cryptographic Verification',
    actor: 'HMAC-SHA256 Validator',
    protocol: 'Idempotency Layer',
    description: 'Validates webhook signature against private secret and checks MongoDB event store to reject replay attacks.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    label: 'Async AI / Business Logic',
    actor: 'OpenAI & Worker Engine',
    protocol: 'Streaming Pipelines',
    description: 'Processes speech, synthesizes responses, or updates subscription entitlement with automated fallback policies.',
    icon: Cpu,
  },
  {
    id: 4,
    label: 'Real-Time State Broadcast',
    actor: 'Socket.io Cluster',
    protocol: 'WSS Event Dispatch',
    description: 'Broadcasts confirmed mutation to targeted room across Web and React Native clients with sub-80ms latency.',
    icon: Radio,
  },
];

export function WorkflowDiagram() {
  const [activeStep, setActiveStep] = React.useState<number>(1);

  return (
    <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/50 p-6 lg:p-8 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Real-World Automation Pipeline
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
            Event-Driven Webhook &amp; Real-Time Lifecycle
          </h3>
        </div>
        <div className="text-xs font-mono text-neutral-500">
          Step {activeStep} of 4
        </div>
      </div>

      {/* Step Buttons / Progress Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {workflowSteps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          const isCompleted = step.id < activeStep;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all relative select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                isActive
                  ? 'border-sky-500 bg-white dark:bg-neutral-900 shadow-sm'
                  : 'border-neutral-200 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 hover:bg-white dark:hover:bg-neutral-900/40'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    isActive
                      ? 'bg-sky-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-400">
                  0{step.id}
                </span>
              </div>

              <div className="text-xs font-bold text-neutral-900 dark:text-white">
                {step.label}
              </div>
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                {step.actor}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Details */}
      <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
              Stage 0{activeStep}: {workflowSteps[activeStep - 1].label}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-xs font-mono text-neutral-500">
              {workflowSteps[activeStep - 1].protocol}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            {workflowSteps[activeStep - 1].description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveStep((prev) => (prev % 4) + 1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <span>Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
