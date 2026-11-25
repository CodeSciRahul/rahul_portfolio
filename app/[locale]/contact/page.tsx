import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Sparkles,
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
  const t = await getTranslations({ locale, namespace: 'meta' });

  return generateLocalizedMetadata({
    locale: locale as Locale,
    path: '/contact',
    title: t('contactTitle'),
    description: t('contactDescription'),
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const serviceParam = resolvedSearchParams?.service;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
      </div>
      <PageHeader
        badge="Direct Inquiry &amp; Consultation"
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Inquiry Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 shadow-xl backdrop-blur-sm">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Proposal Intake</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  {t('formTitle')}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Fill out the form below. I will personally review your technical scope, architecture constraints, and deliverables, and respond within 24 hours.
                </p>
              </div>

              <ContactForm initialService={serviceParam} />
            </div>
          </div>

          {/* Direct Verified Communication Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Communication Channels Card */}
            <div className="p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t('directChannels')}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {t('directChannelsSubtitle')}
                </p>
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {t('emailLabel')}
                    </div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {t('phoneLabel')}
                    </div>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {t('locationLabel')}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {siteConfig.location}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {siteConfig.timezone} (4–6 hours daily overlap with US &amp; EU)
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  {t('socialLabel')}
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 transition-all bg-neutral-50/50 dark:bg-neutral-900/50"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 transition-all bg-neutral-50/50 dark:bg-neutral-900/50"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={siteConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:border-emerald-300 transition-all bg-neutral-50/50 dark:bg-neutral-900/50"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Video Discovery Call Booking Box */}
            <div className="p-7 rounded-3xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t('bookCallTitle')}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t('bookCallSub')}
                </p>
              </div>
              <a
                href={siteConfig.social.calendarBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow"
              >
                <span>{t('bookCallBtn')}</span>
              </a>
            </div>

            {/* Response Time Guarantee & NDA Pledge */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    {t('responsePledge')}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    {t('responsePledgeSub')}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    Mutual NDA &amp; Intellectual Property Protection
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                    Standard Non-Disclosure Agreements can be executed prior to sharing proprietary repositories or architectural roadmaps.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
