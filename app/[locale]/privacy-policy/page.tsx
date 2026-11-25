import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/page-header';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShieldCheck, Mail, Lock, Database, EyeOff, Server, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

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
    path: '/privacy-policy',
    title: t('privacyTitle'),
    description: t('privacyDescription'),
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }]} />
      </div>
      <PageHeader
        badge="Legal &amp; Data Transparency"
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-xl backdrop-blur-sm space-y-10">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="text-xs font-mono font-medium text-neutral-400">
              {t('effectiveDate')}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Tracker Architecture</span>
            </div>
          </div>

          {/* Quick Summary Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <EyeOff className="w-4 h-4 text-sky-500" />
                <span>Zero Tracking Pixels</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                No third-party advertising cookies, Meta pixels, or user behavior tracking software.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>End-to-End Encryption</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                All form submissions and communications are encrypted in transit over modern TLS/SSL.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <Database className="w-4 h-4 text-indigo-500" />
                <span>Zero Data Monetization</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Your contact details and technical project specifications are never sold, rented, or shared.
              </p>
            </div>
          </div>

          {/* Section 1: Information Collected */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              <FileText className="w-5 h-5 text-sky-500" />
              <h2>{t('section1Title')}</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {t('section1Text')}
            </p>
            <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 space-y-2">
              <span className="font-semibold text-neutral-900 dark:text-white block">
                Information collected via the Project Inquiry Form includes:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 list-disc text-neutral-500 dark:text-neutral-400">
                <li>Full Name</li>
                <li>Business Email Address</li>
                <li>Company / Organization Name (Optional)</li>
                <li>Country / Timezone Region (Optional)</li>
                <li>Required Service Category</li>
                <li>Estimated Project Budget Range</li>
                <li>Target Completion Timeline</li>
                <li>Detailed Project Specifications &amp; Requirements</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Purpose and Usage */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              <Server className="w-5 h-5 text-emerald-500" />
              <h2>{t('section2Title')}</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {t('section2Text')}
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 pl-4 border-l-2 border-sky-500">
              <p>
                <strong>Evaluation &amp; Architecture:</strong> Analyzing your business needs to determine feasibility, technical architecture, and implementation timelines.
              </p>
              <p>
                <strong>Direct Communication:</strong> Sending technical proposals, milestone updates, code review invitations, and scheduling discovery calls.
              </p>
              <p>
                <strong>Contractual Deliverables:</strong> Drafting milestone agreements, statements of work (SOW), and invoicing documentation.
              </p>
            </div>
          </section>

          {/* Section 3: Security & Anti-Spam Architecture */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              <Lock className="w-5 h-5 text-indigo-500" />
              <h2>3. Form Security, Rate Limiting &amp; Anti-Spam Architecture</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              To safeguard server resources and prevent automated exploitation, the contact form incorporates multi-layered security controls:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 pl-5 list-disc leading-relaxed">
              <li>
                <strong>Server-Side Validation:</strong> Every submitted field is sanitized, stripped of executable HTML/script tags, and strictly validated against RFC email specifications and length boundaries.
              </li>
              <li>
                <strong>Honeypot Trap Protection:</strong> A hidden field traps automated bot scrapers without disrupting genuine client users. Bot submissions are dropped silently.
              </li>
              <li>
                <strong>Sliding-Window IP Rate Limiting:</strong> Inquiries are rate-limited to 5 requests per 15-minute window per IP address, preventing denial-of-service or email flooding attacks.
              </li>
              <li>
                <strong>Transactional Email Delivery:</strong> Inquiries are securely delivered via authenticated API integration (Resend / AWS SES) over TLS.
              </li>
            </ul>
          </section>

          {/* Section 4: Code & IP Confidentiality */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h2>{t('section3Title')}</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {t('section3Text')}
            </p>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                Standard Mutual Non-Disclosure Agreements (NDAs) can be executed upon request prior to discussing sensitive proprietary architectures, API keys, or private Git repositories.
              </span>
            </div>
          </section>

          {/* Section 5: Data Retention & User Rights */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              <Database className="w-5 h-5 text-sky-500" />
              <h2>5. Data Retention &amp; Erasure Requests</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              Inquiry records are retained only for as long as necessary to conduct project discussions or fulfill ongoing software development contracts. You retain full rights under applicable data protection laws (including GDPR) to request an export of your information or immediate erasure from my records.
            </p>
          </section>

          {/* Section 6: Contact & Inquiries */}
          <section className="space-y-3.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              <Mail className="w-5 h-5 text-sky-500" />
              <h2>{t('section4Title')}</h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {t('section4Text')}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-semibold text-neutral-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-sky-500" />
                <span>{siteConfig.email}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <span>Go to Direct Inquiry Form &rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
