import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/motion-container';
import { HeroWorkflowVisual } from '@/components/hero-workflow-visual';
import { CredibilitySection } from '@/components/sections/credibility-section';
import { ServicesOverviewSection } from '@/components/sections/services-overview-section';
import { FeaturedProjectsSection } from '@/components/sections/featured-projects-section';
import { WhyWorkWithMeSection } from '@/components/sections/why-work-with-me-section';
import { DevelopmentProcessSection } from '@/components/sections/development-process-section';
import { TechStackSection } from '@/components/sections/tech-stack-section';
import { EngagementModelsSection } from '@/components/sections/engagement-models-section';
import { FaqSection } from '@/components/sections/faq-section';
import { CtaSection } from '@/components/cta-section';
import { ArrowUpRight, Calendar, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return generateLocalizedMetadata({
    locale: locale as Locale,
    path: '/',
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div className="flex flex-col min-h-screen">
      {/* ============================================================
          SECTION 1: HERO SECTION
          ============================================================ */}
      <section className="relative pt-16 pb-20 lg:pt-28 lg:pb-32 overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80 bg-grid-subtle">
        {/* Soft Ambient Radial Background Glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-b from-sky-500/10 via-sky-500/5 to-transparent blur-3xl opacity-75"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Eyebrow */}
            <FadeIn direction="up">
              <div className="flex justify-center">
                <Badge variant="accent" size="md" pulse>
                  {t('eyebrow')}
                </Badge>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn direction="up" delay={0.08}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                {t('headline')}
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn direction="up" delay={0.16}>
              <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {t('description')}
              </p>
            </FadeIn>

            {/* Calls to Action */}
            <FadeIn direction="up" delay={0.24}>
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  {t('ctaPrimary')}
                </Button>

                <Button href="#featured-projects" variant="outline" size="lg">
                  {t('ctaSecondary')}
                </Button>

                <Button
                  href={siteConfig.social.calendarBooking}
                  external
                  variant="ghost"
                  size="lg"
                  leftIcon={<Calendar className="w-4 h-4 text-sky-500" />}
                >
                  {t('ctaSchedule')}
                </Button>
              </div>
            </FadeIn>

            {/* Trust Assurances */}
            <FadeIn direction="up" delay={0.32}>
              <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {t('trustPill1')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-500" />
                  {t('trustPill2')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {t('trustPill3')}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Visual Representation of Capabilities */}
          <div className="mt-14 lg:mt-20">
            <HeroWorkflowVisual />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CREDIBILITY SECTION (VERIFIED RESUME ACHIEVEMENTS)
          ============================================================ */}
      <CredibilitySection />

      {/* ============================================================
          SECTION 3: SERVICES OVERVIEW (SOLVING BUSINESS PROBLEMS)
          ============================================================ */}
      <ServicesOverviewSection />

      {/* ============================================================
          SECTION 4: FEATURED PROJECTS (NILESCART & EDACLEANER)
          ============================================================ */}
      <FeaturedProjectsSection />

      {/* ============================================================
          SECTION 5: WHY WORK WITH ME
          ============================================================ */}
      <WhyWorkWithMeSection />

      {/* ============================================================
          SECTION 6: MY DEVELOPMENT PROCESS (7 STRUCTURED STEPS)
          ============================================================ */}
      <DevelopmentProcessSection />

      {/* ============================================================
          SECTION 7: TECHNOLOGIES & TECHNICAL EXPERTISE BY CATEGORY
          ============================================================ */}
      <TechStackSection />

      {/* ============================================================
          SECTION 8: ENGAGEMENT MODELS
          ============================================================ */}
      <EngagementModelsSection />

      {/* ============================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS
          ============================================================ */}
      <FaqSection />

      {/* ============================================================
          SECTION 10: FINAL CONVERSION-FOCUSED CONTACT SECTION
          ============================================================ */}
      <CtaSection
        title="Ready to turn your idea into reliable software?"
        subtitle="Whether you need an MVP built from scratch, a cross-platform mobile app, custom desktop tooling, or automated AI workflows, I am here to deliver. Fast response, direct engineering, and clean code."
      />
    </div>
  );
}
