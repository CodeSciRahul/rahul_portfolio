import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata } from '@/lib/seo';
import { CtaSection } from '@/components/cta-section';
import { ScreenshotGallery } from '@/components/screenshot-gallery';
import { DesktopMockup, MobileMockup } from '@/components/ui/device-mockup';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
  UserCheck,
  Building2,
  Target,
  AlertTriangle,
  ShieldCheck,
  Smartphone,
  Monitor,
  Lock,
  Workflow,
  Wrench,
  Award,
} from 'lucide-react';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  routing.locales.forEach((locale) => {
    projects.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const image = project.actualScreenshots?.[0]?.imagePath || '/og-image.png';

  return generateLocalizedMetadata({
    locale: locale as Locale,
    path: `/projects/${slug}`,
    title: `${project.title} — Case Study & Architecture`,
    description: project.summary,
    image,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'projectDetail' });

  // JSON-LD structured data for CreativeWork / SoftwareApplication
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.summary,
    applicationCategory: project.category,
    operatingSystem:
      project.category === 'Desktop'
        ? 'macOS, Windows, Linux'
        : project.category === 'Mobile'
        ? 'iOS, Android'
        : 'All Modern Web Browsers',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(project.client
      ? {
          customer: {
            '@type': 'Organization',
            name: project.client,
          },
        }
      : {}),
    ...(project.actualScreenshots?.[0]
      ? {
          screenshot: `${siteConfig.url}${project.actualScreenshots[0].imagePath}`,
        }
      : {}),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      {/* Hero & Metadata Header */}
      <header className="py-12 sm:py-16 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Back Navigation */}
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Projects', href: '/projects' },
              { name: project.title },
            ]}
            className="mb-4"
          />

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-sky-600 dark:hover:text-sky-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('backToProjects')}</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-2.5 py-0.5 rounded-full">
                {project.category}
              </span>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {project.status}
              </span>
              {project.client && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                  <Building2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Client: {project.client}</span>
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {project.tagline}
            </p>

            {/* Meta Information Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-sky-500" />
                <span className="font-semibold text-neutral-900 dark:text-white">{t('role')}:</span>
                <span>{project.role}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">{t('timeline')}:</span>
                <span>{project.period}</span>
              </div>
              {project.client && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-neutral-900 dark:text-white">{t('clientLabel')}:</span>
                  <span>{project.client}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-16">
            {/* Key Metrics Callout */}
            <section aria-labelledby="metrics-heading" className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-sm">
              <h2 id="metrics-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-6">
                {t('metricsTitle')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800 text-center"
                  >
                    <div className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
                      {m.value}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Overview & Objectives */}
            <section aria-labelledby="overview-heading" className="space-y-8">
              <div>
                <h2 id="overview-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
                  {t('overview')}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {project.summary}
                </p>
              </div>

              {/* Project Objectives */}
              {project.projectObjectives && project.projectObjectives.length > 0 && (
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-sky-500" />
                    <span>{t('objectivesTitle')}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.projectObjectives.map((obj, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950/60 flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Role & Responsibilities */}
            {project.roleAndResponsibilities && project.roleAndResponsibilities.length > 0 && (
              <section aria-labelledby="responsibilities-heading">
                <h2 id="responsibilities-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-sky-500" />
                  <span>{t('role')}</span>
                </h2>
                <div className="space-y-2.5">
                  {project.roleAndResponsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Problem & Solution Comparison */}
            <section aria-labelledby="challenge-heading" className="space-y-6">
              {/* Business Problem Card */}
              <div className="p-6 sm:p-7 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/10">
                <h2 id="challenge-heading" className="text-lg font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>{t('problemTitle')}</span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution Delivered Card */}
              <div className="p-6 sm:p-7 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/10">
                <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('solutionTitle')}</span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>

            {/* Key Features Delivered */}
            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-500" />
                <span>{t('featuresTitle')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Mockups (Desktop & Mobile) */}
            {(project.desktopMockup || project.mobileMockup) && (
              <section aria-labelledby="mockups-heading" className="space-y-6">
                <div>
                  <h2 id="mockups-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-sky-500" />
                    <span>{t('mockupsTitle')}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    High-fidelity desktop and mobile software interface architecture.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {/* Desktop Mockup Frame */}
                  {project.desktopMockup && (
                    <DesktopMockup
                      title={project.desktopMockup.title}
                      url={project.desktopMockup.url}
                      statusBadge={project.desktopMockup.statusBadge}
                      className="w-full"
                    >
                      <div className="p-6 sm:p-8 bg-neutral-900 text-white min-h-[260px] flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                            <span className="font-mono text-xs font-semibold text-neutral-200">
                              {project.desktopMockup.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400">
                            {project.desktopMockup.statusBadge}
                          </span>
                        </div>

                        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {project.desktopMockup.highlights.map((h, hIdx) => (
                            <div
                              key={hIdx}
                              className="p-3 rounded-lg bg-neutral-800/80 border border-neutral-700/60 text-xs text-neutral-300 flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                              <span className="line-clamp-2">{h}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between pt-3 border-t border-neutral-800/80">
                          <span>Verified Client Build: {project.client || 'Client Distribution'}</span>
                          <span>{project.period} Production</span>
                        </div>
                      </div>
                    </DesktopMockup>
                  )}

                  {/* Mobile Mockup Frame (For Mobile & E-commerce projects) */}
                  {project.mobileMockup && (
                    <div className="py-4">
                      <div className="max-w-md mx-auto">
                        <MobileMockup appName={project.mobileMockup.appName}>
                          <div className="p-5 bg-neutral-900 text-white flex flex-col justify-between h-full">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                                <div className="flex items-center gap-2">
                                  <Smartphone className="w-4 h-4 text-sky-400" />
                                  <span className="text-xs font-bold text-white">
                                    {project.mobileMockup.appName}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono text-neutral-400">
                                  {project.mobileMockup.platform}
                                </span>
                              </div>

                              <div className="space-y-2.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                                  Native Mobile Capabilities
                                </span>
                                {project.mobileMockup.highlights.map((mh, mIdx) => (
                                  <div
                                    key={mIdx}
                                    className="p-3 rounded-xl bg-neutral-800/90 border border-neutral-700/70 text-xs text-neutral-200 flex items-center gap-2.5"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span>{mh}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-6 pt-3 border-t border-neutral-800 text-center">
                              <span className="text-[10px] font-mono text-neutral-400">
                                React Native Expo • iOS &amp; Android Verified
                              </span>
                            </div>
                          </div>
                        </MobileMockup>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Verified Screenshots & Assets Gallery */}
            <section aria-labelledby="screenshots-heading" className="space-y-6">
              <div>
                <h2 id="screenshots-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
                  {t('screenshotsTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500">
                  {t('screenshotsSubtitle')}
                </p>
              </div>

              <ScreenshotGallery
                screenshots={project.actualScreenshots}
                draftFields={project.draftFields}
                projectTitle={project.title}
              />
            </section>

            {/* Technical Architecture & Flow */}
            <section aria-labelledby="architecture-heading">
              <h2 id="architecture-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-sky-500" />
                <span>{t('architectureTitle')}</span>
              </h2>
              <div className="space-y-3">
                {project.technicalArchitecture.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed"
                  >
                    <Workflow className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Challenges & Solutions */}
            {project.technicalChallengesAndSolutions &&
              project.technicalChallengesAndSolutions.length > 0 && (
                <section aria-labelledby="challenges-heading" className="space-y-6">
                  <h2 id="challenges-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-amber-500" />
                    <span>{t('challengesTitle')}</span>
                  </h2>
                  <div className="space-y-4">
                    {project.technicalChallengesAndSolutions.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-sm"
                      >
                        <div className="p-4 sm:p-5 bg-neutral-50/80 dark:bg-neutral-950/70 border-b border-neutral-200/80 dark:border-neutral-800/80">
                          <div className="flex items-start gap-2.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/70 px-2 py-0.5 rounded">
                              Challenge #{idx + 1}
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                              {item.challenge}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 sm:p-5 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                              Engineering Solution:
                            </span>
                            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {item.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Verified Outcomes */}
            {project.verifiedOutcomes && project.verifiedOutcomes.length > 0 && (
              <section aria-labelledby="outcomes-heading">
                <h2 id="outcomes-heading" className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <span>{t('outcomesTitle')}</span>
                </h2>
                <div className="space-y-3">
                  {project.verifiedOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 flex items-start gap-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Tech Stack, Related Services & Direct CTA */}
          <aside className="space-y-8">
            {/* Tech Stack Card */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.links?.github && (
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View GitHub Profile / Repos</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Related Engineering Services Cross-Links */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                {t('relatedServicesTitle')}
              </h3>
              <div className="space-y-2.5">
                {services
                  .filter(
                    (s) =>
                      project.relatedServices?.some((rs) => rs.slug === s.slug) ||
                      s.relevantProjects.some((rp) => rp.slug === project.slug || rp.id === project.id)
                  )
                  .slice(0, 3)
                  .map((relService) => (
                    <Link
                      key={relService.id}
                      href={`/services/${relService.slug}`}
                      className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-950/40 hover:border-sky-500/40 hover:bg-white dark:hover:bg-neutral-900 transition-all flex items-center justify-between group block"
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {relService.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                          {relService.badge}
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-sky-500 transition-colors shrink-0 ml-2" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Build Something Similar Conversion Card */}
            <div className="p-6 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 text-neutral-900 dark:text-white shadow-sm space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Need a Similar Solution?</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight">
                {t('ctaTitle')}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t('ctaSub')}
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm"
              >
                <span>{t('ctaBtn')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Global Conversion CTA Section */}
      <CtaSection />
    </div>
  );
}
