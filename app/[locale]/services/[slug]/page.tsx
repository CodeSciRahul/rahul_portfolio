import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { services } from '@/data/services';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/contact-form';
import { CtaSection } from '@/components/cta-section';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowUpRight,
  Layers,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  Cpu,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  routing.locales.forEach((locale) => {
    services.forEach((service) => {
      params.push({ locale, slug: service.slug });
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
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return generateLocalizedMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title: `${service.title} | Software Engineering Services`,
    description: service.shortDescription,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = services.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  // Schema.org ProfessionalService structured data
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.capabilities.map((cap) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: cap,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero Header & Breadcrumb */}
      <div className="py-14 sm:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-grid-subtle relative overflow-hidden">
        {/* Subtle ambient spotlight */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-sky-500/10 via-sky-500/5 to-transparent blur-3xl opacity-70"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Services', href: '/services' },
              { name: service.title },
            ]}
            className="mb-4"
          />

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-sky-600 dark:hover:text-sky-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← All Engineering Services</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="md" pulse>
                {service.badge}
              </Badge>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold">
                Available for Contract
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {service.heroTagline}
            </p>

            {/* Quick Commitments */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Direct Senior Engineering
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Code &amp; IP Ownership Handover
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-500" />
                US/EU Timezone Overlap
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (8 cols): Core Content */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-14">
            {/* 1. Business Problems & Solutions Comparison */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Solving Critical Business Bottlenecks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problems Card */}
                <div className="p-6 rounded-3xl border border-rose-200/80 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Challenges You Face</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    {service.businessProblems.map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions Card */}
                <div className="p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-950/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>How I Solve Them</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    {service.proposedSolutions.map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-1 shrink-0" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Key Capabilities Breakdown */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-500" />
                <span>Key Capabilities &amp; Technical Scope</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 flex items-start gap-3 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Expected Deliverables */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>What You Will Receive (Deliverables)</span>
              </h2>
              <div className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 flex items-start gap-3.5 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Relevant Projects & Internal Case Study Links */}
            {service.relevantProjects.length > 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  <span>Proven Work in This Domain</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.relevantProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          <span>Explore Architectural Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Step-by-Step Delivery Process */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" />
                <span>Development &amp; Handover Process</span>
              </h2>
              <div className="space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 flex items-start gap-4 shadow-sm"
                  >
                    <span className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Service-Specific FAQs */}
            {service.faqs.length > 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-neutral-400" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/30"
                    >
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Inquiry Card & Curated Tech Stack */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Service-Specific Inquiry Card */}
            <div className="p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 shadow-xl sticky top-24 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
                  Direct Inquiry
                </span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                  Inquire About {service.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Fill out the form below. I will personally review your technical requirements and respond within 24 hours.
                </p>
              </div>

              {/* Inquiry Form Pre-filled with Current Service */}
              <ContactForm initialService={service.title} />

              {/* Direct Booking Link */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Prefer a Video Discovery Call?
                </div>
                <Button
                  href={siteConfig.social.calendarBooking}
                  external
                  variant="outline"
                  size="sm"
                  leftIcon={<Calendar className="w-4 h-4 text-sky-500" />}
                  className="w-full"
                >
                  Book 15-Min Intro on Cal.com
                </Button>
              </div>

              {/* Trust Pillars */}
              <div className="space-y-2 pt-2 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% IP &amp; Code Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Overlap with US (EST/PST) &amp; EU hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct Senior Developer Access</span>
                </div>
              </div>
            </div>

            {/* Curated Tech Stack Box */}
            <div className="p-6 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                Technologies Used For This Service
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CtaSection
        title={`Looking to build with ${service.title}?`}
        subtitle="Let's schedule a 15-minute intro to discuss your technical requirements, architectural options, and timelines."
      />
    </div>
  );
}
