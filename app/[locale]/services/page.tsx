import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { services } from '@/data/services';
import { generateLocalizedMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/page-header';
import { CtaSection } from '@/components/cta-section';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Smartphone,
  Monitor,
  Bot,
  Workflow,
  ShoppingBag,
  Server,
  Cloud,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateLocalizedMetadata({
    locale: locale as Locale,
    path: '/services',
    title: 'Software Development Services | Web, Mobile, AI & Desktop Engineering',
    description:
      'Explore full-stack web applications, React Native mobile apps, custom desktop software, AI voice agents, n8n automation, and backend API engineering services.',
  });
}

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case 'Globe':
      return <Globe className="w-6 h-6" />;
    case 'Smartphone':
      return <Smartphone className="w-6 h-6" />;
    case 'Monitor':
      return <Monitor className="w-6 h-6" />;
    case 'Bot':
      return <Bot className="w-6 h-6" />;
    case 'Workflow':
      return <Workflow className="w-6 h-6" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-6 h-6" />;
    case 'Server':
      return <Server className="w-6 h-6" />;
    case 'Cloud':
      return <Cloud className="w-6 h-6" />;
    default:
      return <Layers className="w-6 h-6" />;
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Services' }]} />
      </div>
      <PageHeader
        badge="Software Engineering Services"
        badgePulse
        title="Software Solutions Engineered for Measurable Business Growth"
        subtitle="From initial MVP builds and cross-platform mobile apps to AI agents, workflow automation, and custom desktop software. Every service is positioned around solving practical business problems."
      />

      {/* Services Grid Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 p-8 sm:p-10 hover:shadow-2xl hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 group"
            >
              <div className="space-y-6">
                {/* Header row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Title & Headline */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </h2>
                  <p className="mt-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
                    {service.heroTagline}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Business Problems & Solution Callout */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold">
                    Business Problem Solved:
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.businessProblems[0]}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Core Capabilities:
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                    {service.capabilities.slice(0, 4).map((cap, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Relevant Project Cross-Link (if any) */}
                {service.relevantProjects.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Relevant Proven Work:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.relevantProjects.slice(0, 2).map((proj) => (
                        <Link
                          key={proj.id}
                          href={`/projects/${proj.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:border-sky-500 hover:text-sky-600 transition-colors"
                        >
                          <span>{proj.title}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Service Page &amp; Deliverables</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Button href={`/services/${service.slug}`} variant="primary" size="sm">
                  View Specs
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="py-16 sm:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Commercial Structures
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-1">
              Transparent, Flexible Engagement Models
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Work with me through clear milestone sprints, dedicated engineering retainers, or flexible hourly collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-4">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Fixed-Scope MVP Sprints
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Turnaround: 3 - 6 Weeks
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Clear milestones, locked budget, and guaranteed deliverables. Perfect for founders launching a new web app, mobile product, or custom desktop software.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Watertight specifications with zero scope creep</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% intellectual property ownership</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>30-day post-launch warranty included</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-4">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Dedicated Monthly Retainer
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Flexible Monthly Commitment
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Dedicated weekly engineering hours embedded directly into your team. Continuous release velocity, code reviews, and architectural leadership.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Direct presence in your Slack &amp; GitHub</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>4 to 6 hours daily overlap with US &amp; EU teams</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Zero long-term contract lock-in</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm space-y-4">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Maintenance &amp; Reliability
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Ongoing Operational Support
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For existing production applications requiring regular dependency security patching, uptime health monitoring, database tuning, and emergency bug fixes.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Proactive security &amp; dependency patches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Priority response SLA for critical bugs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Database backups &amp; uptime monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <CtaSection
        title="Ready to build your next digital product?"
        subtitle="Send an inquiry with your project requirements or schedule a 15-minute intro discovery call. Direct communication with senior technical execution."
      />
    </div>
  );
}
