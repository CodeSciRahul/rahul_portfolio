'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Globe2,
  Calendar,
  DollarSign,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
}

const SERVICE_OPTIONS = [
  { slug: 'custom-web-development', title: 'Custom Web Development', key: 'serviceWeb' },
  { slug: 'mobile-app-development', title: 'Mobile App Development', key: 'serviceMobile' },
  { slug: 'desktop-application-development', title: 'Desktop Application Development', key: 'serviceDesktop' },
  { slug: 'ai-agent-development', title: 'AI Agent Development', key: 'serviceAi' },
  { slug: 'n8n-business-automation', title: 'n8n and Business Automation', key: 'serviceAutomation' },
  { slug: 'ecommerce-development', title: 'E-commerce Development', key: 'serviceEcommerce' },
  { slug: 'backend-api-development', title: 'Backend and API Development', key: 'serviceBackend' },
  { slug: 'cloud-deployment-maintenance', title: 'Cloud Deployment and Maintenance', key: 'serviceCloud' },
  { slug: 'other', title: 'Other / Custom Consultation', key: 'serviceOther' },
] as const;

const BUDGET_OPTIONS = [
  { value: '< $5,000 (MVP / Small Scope)', key: 'budgetOption1' },
  { value: '$5,000 – $15,000 (Standard Production Solution)', key: 'budgetOption2' },
  { value: '$15,000 – $35,000 (Comprehensive Platform)', key: 'budgetOption3' },
  { value: '$35,000+ (Enterprise / Scaled Architecture)', key: 'budgetOption4' },
  { value: 'Undecided / Flexible Discussion', key: 'budgetOption5' },
] as const;

const TIMELINE_OPTIONS = [
  { value: 'Urgent (< 1 month)', key: 'timelineOption1' },
  { value: '1 – 2 months', key: 'timelineOption2' },
  { value: '2 – 3 months', key: 'timelineOption3' },
  { value: '3+ months / Flexible', key: 'timelineOption4' },
  { value: 'Ongoing Retainer / Dedicated Support', key: 'timelineOption5' },
] as const;

function ContactFormInner({ initialService }: ContactFormProps) {
  const t = useTranslations('contact');
  const searchParams = useSearchParams();

  // Determine initial service from prop or URL query parameter (?service=...)
  const queryServiceParam = searchParams?.get('service') || '';

  const resolveServiceTitle = (param?: string): string => {
    if (!param) return '';
    const cleanParam = param.trim().toLowerCase();
    const matched = SERVICE_OPTIONS.find(
      (opt) =>
        opt.slug.toLowerCase() === cleanParam ||
        opt.title.toLowerCase() === cleanParam ||
        opt.key.toLowerCase() === cleanParam
    );
    return matched ? matched.title : param;
  };

  const defaultService = resolveServiceTitle(initialService || queryServiceParam);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    country: '',
    service: defaultService,
    budget: '',
    timeline: '',
    message: '',
    privacyConsent: false,
    website: '', // Honeypot trap
  });

  type ContactKey = Parameters<typeof t>[0];

  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = React.useState<{ name: string; email: string; service: string } | null>(null);

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = t('validationName');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = t('validationEmail');
    }

    if (!formData.service) {
      errors.service = t('validationService');
    }

    if (!formData.budget) {
      errors.budget = t('validationBudget');
    }

    if (!formData.timeline) {
      errors.timeline = t('validationTimeline');
    }

    if (!formData.message.trim() || formData.message.trim().length < 20) {
      errors.message = t('validationMessage');
    }

    if (!formData.privacyConsent) {
      errors.privacyConsent = t('validationPrivacy');
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear individual field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Client-side check
    if (!validateClientSide()) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setStatus('error');
        setErrorMessage(data.error || t('formError'));
        return;
      }

      // Submission successfully validated and recorded by server
      setStatus('success');
      setSubmittedData({
        name: formData.name.trim(),
        email: formData.email.trim(),
        service: formData.service,
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(t('formError'));
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage(null);
    setFieldErrors({});
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      company: '',
      country: '',
      service: defaultService,
      budget: '',
      timeline: '',
      message: '',
      privacyConsent: false,
      website: '',
    });
  };

  if (status === 'success') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/20 p-8 sm:p-10 text-center animate-fade-in space-y-6"
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            {t('successHeading')}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto leading-relaxed">
            {t('successSub')}
          </p>
        </div>

        {submittedData && (
          <div className="p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-white/80 dark:bg-neutral-900/70 text-left max-w-md mx-auto text-xs space-y-1.5 font-medium">
            <div className="flex justify-between text-neutral-500 dark:text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
              <span>Client:</span>
              <span className="text-neutral-900 dark:text-white font-semibold">
                {submittedData.name}
              </span>
            </div>
            <div className="flex justify-between text-neutral-500 dark:text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
              <span>Direct Email:</span>
              <span className="text-neutral-900 dark:text-white font-semibold">
                {submittedData.email}
              </span>
            </div>
            <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
              <span>Service Selected:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {submittedData.service}
              </span>
            </div>
          </div>
        )}

        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          {t('successNextStep')}
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('sendAnother')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot Spam Field - Completely hidden from humans, traps automated scrapers */}
      <div
        className="opacity-0 absolute -z-50 pointer-events-none select-none h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website-trap">Website Address</label>
        <input
          id="website-trap"
          name="website"
          type="text"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Global Error Banner */}
      {status === 'error' && errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/80 flex items-start gap-3 text-xs text-red-600 dark:text-red-400 animate-shake"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Submission Notice:</span>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Row 1: Full Name & Email Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            {t('formName')} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            value={formData.name}
            onChange={handleChange}
            placeholder={t('formNamePlaceholder')}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.name
                ? 'border-red-500 focus:ring-red-400 dark:border-red-700'
                : 'border-neutral-200 dark:border-neutral-800 focus:ring-sky-500 focus:border-sky-500'
            }`}
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="mt-1 text-[11px] text-red-500 dark:text-red-400">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            {t('formEmail')} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            value={formData.email}
            onChange={handleChange}
            placeholder={t('formEmailPlaceholder')}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.email
                ? 'border-red-500 focus:ring-red-400 dark:border-red-700'
                : 'border-neutral-200 dark:border-neutral-800 focus:ring-sky-500 focus:border-sky-500'
            }`}
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="mt-1 text-[11px] text-red-500 dark:text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Company Name (Optional) & Country/Region (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-company"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t('formCompany')}</span>
            </span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder={t('formCompanyPlaceholder')}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="contact-country"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>{t('formCountry')}</span>
            </span>
          </label>
          <input
            id="contact-country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            placeholder={t('formCountryPlaceholder')}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>
      </div>

      {/* Row 3: Required Service & Project Budget Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-service"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            {t('formService')} <span className="text-red-500">*</span>
          </label>
          <select
            id="contact-service"
            name="service"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.service)}
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.service
                ? 'border-red-500 focus:ring-red-400 dark:border-red-700'
                : 'border-neutral-200 dark:border-neutral-800 focus:ring-sky-500 focus:border-sky-500'
            }`}
          >
            <option value="">{t('formServicePlaceholder')}</option>
            {SERVICE_OPTIONS.map((item) => (
              <option key={item.slug} value={item.title}>
                {t(item.key as ContactKey)}
              </option>
            ))}
          </select>
          {fieldErrors.service && (
            <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
              {fieldErrors.service}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-budget"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-neutral-400" />
            <span>{t('formBudget')} <span className="text-red-500">*</span></span>
          </label>
          <select
            id="contact-budget"
            name="budget"
            required
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.budget)}
            value={formData.budget}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
              fieldErrors.budget
                ? 'border-red-500 focus:ring-red-400 dark:border-red-700'
                : 'border-neutral-200 dark:border-neutral-800 focus:ring-sky-500 focus:border-sky-500'
            }`}
          >
            <option value="">{t('formBudgetPlaceholder')}</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {t(b.key as ContactKey)}
              </option>
            ))}
          </select>
          {fieldErrors.budget && (
            <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
              {fieldErrors.budget}
            </p>
          )}
        </div>
      </div>

      {/* Row 4: Expected Timeline */}
      <div>
        <label
          htmlFor="contact-timeline"
          className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
          <span>{t('formTimeline')} <span className="text-red-500">*</span></span>
        </label>
        <select
          id="contact-timeline"
          name="timeline"
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.timeline)}
          value={formData.timeline}
          onChange={handleChange}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
            fieldErrors.timeline
              ? 'border-red-500 focus:ring-red-400 dark:border-red-700'
              : 'border-neutral-200 dark:border-neutral-800 focus:ring-sky-500 focus:border-sky-500'
          }`}
        >
          <option value="">{t('formTimelinePlaceholder')}</option>
          {TIMELINE_OPTIONS.map((time) => (
            <option key={time.value} value={time.value}>
              {t(time.key as ContactKey)}
            </option>
          ))}
        </select>
        {fieldErrors.timeline && (
          <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
            {fieldErrors.timeline}
          </p>
        )}
      </div>

      {/* Row 5: Project Description & Requirements */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
          >
            {t('formMessage')} <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-[10px] font-mono ${
              formData.message.trim().length < 20
                ? 'text-neutral-400'
                : 'text-emerald-500 font-semibold'
            }`}
          >
            {formData.message.length} {t('charsCount')} ({t('minChars')})
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={Boolean(fieldErrors.message)}
          value={formData.message}
          onChange={handleChange}
          placeholder={t('formMessagePlaceholder')}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
            fieldErrors.message
              ? 'border-red-500 focus:ring-red-400 dark:border-red-700'
              : 'border-neutral-200 dark:border-neutral-800 focus:ring-sky-500 focus:border-sky-500'
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-[11px] text-red-500 dark:text-red-400">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Row 6: Privacy Consent Checkbox */}
      <div className="pt-1">
        <label
          htmlFor="contact-privacy"
          className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-600 dark:text-neutral-400"
        >
          <input
            id="contact-privacy"
            name="privacyConsent"
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-sky-600 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
          />
          <span className="leading-relaxed">
            {t('formPrivacyConsent')}{' '}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-sky-600 dark:text-sky-400 underline hover:text-sky-500"
            >
              {t('privacyPolicyLink')}
            </Link>
            . <span className="text-red-500">*</span>
          </span>
        </label>
        {fieldErrors.privacyConsent && (
          <p className="mt-1 text-[11px] text-red-500 dark:text-red-400 pl-6">
            {fieldErrors.privacyConsent}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{t('submitting')}</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>{t('formSubmit')}</span>
          </>
        )}
      </button>

      <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Strict confidentiality. Your data is never shared or sold.</span>
      </div>
    </form>
  );
}

export function ContactForm(props: ContactFormProps) {
  return (
    <React.Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
          <div className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
          <div className="h-28 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
        </div>
      }
    >
      <ContactFormInner {...props} />
    </React.Suspense>
  );
}
