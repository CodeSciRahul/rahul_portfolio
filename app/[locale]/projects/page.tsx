import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { generateLocalizedMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/page-header';
import { ProjectFilter } from '@/components/project-filter';
import { CtaSection } from '@/components/cta-section';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    path: '/projects',
    title: 'Client Projects & Case Studies | NilesCart, edaCleaner & Production Software',
    description:
      'Detailed architectural case studies of verified client projects for Aluma, Spirehubs, and W3 Dev: web storefronts, mobile apps, desktop software, and real-time systems.',
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Projects' }]} />
      </div>
      <PageHeader
        badge="Verified Case Studies"
        badgePulse
        title="Production Digital Products &amp; Client Projects"
        subtitle="Explore detailed architectural case studies across web applications, cross-platform mobile apps, custom desktop software, and real-time systems. Strictly grounded in verified client work and production codebases."
      />

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verification banner */}
        <div className="mb-10 p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-neutral-700 dark:text-neutral-300">
              Primary Client Engagements: <strong className="text-neutral-900 dark:text-white">Aluma</strong> (NilesCart &amp; edaCleaner), <strong className="text-neutral-900 dark:text-white">Spirehubs</strong>, and <strong className="text-neutral-900 dark:text-white">W3 Dev</strong>.
            </span>
          </div>
          <span className="text-neutral-500 font-mono text-[11px] shrink-0">
            {projects.length} Verified Production Implementations
          </span>
        </div>

        {/* 5-Category Project Filter Component */}
        <ProjectFilter projects={projects} />
      </section>

      <CtaSection
        title="Need a similar digital product built for your business?"
        subtitle="Whether you are planning an e-commerce platform, cross-platform mobile app, or custom desktop software, I am available for new contracts."
      />
    </div>
  );
}
