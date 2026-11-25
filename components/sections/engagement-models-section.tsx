import * as React from 'react';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Calendar,
  Briefcase,
  Layers,
  Wrench,
  ArrowUpRight,
} from 'lucide-react';

export function EngagementModelsSection() {
  const models = [
    {
      id: 'fixed-price',
      title: 'Fixed-Price Projects (MVP Sprints)',
      tag: 'Best for New Products',
      tagColor: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      duration: '3 to 6 Weeks Typical',
      summary:
        'Ideal for startup founders and businesses launching a new web app, mobile product, or automated workflow. We define a watertight scope, milestone deadlines, and a locked budget.',
      features: [
        'Clear deliverable roadmap with milestone sign-offs',
        'Fixed budget with zero unexpected invoice surprises',
        'Complete repository handover and 30-day post-launch warranty',
        'Daily async Loom video updates and weekly review calls',
      ],
      idealFor: 'Founders building a new MVP or agencies outsourcing a fixed client project.',
      cta: 'Scope Your Project',
    },
    {
      id: 'freelance-hourly',
      title: 'Freelance & Milestone Development',
      tag: 'Flexible Scope',
      tagColor: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
      duration: 'On-Demand / Milestone',
      summary:
        'Great for businesses needing a dedicated software engineer to build a specific feature, integrate a payment gateway, refactor a troublesome codebase, or conduct a technical architecture audit.',
      features: [
        'Rapid onboarding and seamless integration with your Git repo',
        'Transparent time tracking with itemized work logs',
        'Strict adherence to your existing code standards and conventions',
        'Zero long-term commitment required',
      ],
      idealFor: 'Companies needing targeted technical help without full-time overhead.',
      cta: 'Book Engineering Hours',
    },
    {
      id: 'retainer-contract',
      title: 'Ongoing Contractual Work (Dedicated Retainer)',
      tag: 'Dedicated Capacity',
      tagColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      duration: 'Monthly Commitment',
      summary:
        'Ideal for funded startups and growing engineering teams needing guaranteed monthly developer hours embedded into their team. I participate in sprint planning, code reviews, and ship features continuously.',
      features: [
        'Reserved weekly development hours dedicated exclusively to you',
        'Direct presence in your Slack, Discord, and Jira workspaces',
        'Flexible working hour overlap with North American and European teams',
        'Consistent sprint velocity without hiring lag',
      ],
      idealFor: 'Scale-ups seeking reliable senior engineering velocity.',
      cta: 'Discuss Retainer Options',
    },
    {
      id: 'maintenance-support',
      title: 'Maintenance, Monitoring & Reliability',
      tag: 'Stability & Security',
      tagColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      duration: 'Ongoing Monthly',
      summary:
        'For businesses that already have a live application and need ongoing peace of mind. I handle dependency upgrades, security patching, uptime monitoring, database backups, and emergency bug fixes.',
      features: [
        'Proactive framework and security dependency updates',
        'Database indexing, performance tuning, and backup verification',
        'Priority SLA for critical bug fixes and outage resolution',
        'Monthly technical health report and recommendations',
      ],
      idealFor: 'Businesses wanting high uptime and zero technical surprises.',
      cta: 'Protect Your Application',
    },
  ];

  return (
    <Section pattern="grid" border="bottom">
      <SectionHeading
        badge="Engagement Models"
        title="Flexible Ways We Can Work Together"
        subtitle="Choose the commercial arrangement that fits your business stage, budget constraints, and delivery timeline."
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {models.map((model) => (
          <div
            key={model.id}
            className="p-8 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${model.tagColor}`}>
                  {model.tag}
                </span>
                <span className="text-xs font-mono text-neutral-500 font-medium">
                  {model.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {model.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {model.summary}
              </p>

              <div className="space-y-2 pt-2 text-xs text-neutral-700 dark:text-neutral-300">
                {model.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[11px] text-neutral-500">
                <strong className="text-neutral-700 dark:text-neutral-300">Best for:</strong> {model.idealFor}
              </div>
              <Button href="/contact" variant="primary" size="sm" className="shrink-0">
                {model.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
