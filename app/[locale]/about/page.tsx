import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata, getProfilePageJsonLd } from '@/lib/seo';
import { PageHeader } from '@/components/page-header';
import { CtaSection } from '@/components/cta-section';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  CheckCircle2,
  Code2,
  ArrowUpRight,
  Globe,
  FileDown,
  ShieldCheck,
  Eye,
  Layers,
  Cpu,
  Smartphone,
  Server,
  Database,
  Sparkles,
  Cloud,
  Workflow,
  Laptop,
  Check,
  Building2,
  UserCheck,
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
    path: '/about',
    title: `${t('aboutTitle')} — Professional Background & Engineering Philosophy`,
    description: t('aboutDescription'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  // 7 Structured Technical Expertise Groups
  const technicalCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Laptop,
      color: 'text-sky-500',
      description:
        'Crafting responsive, high-performance user interfaces with modern Server Components, client caching, and accessible component architectures.',
      skills: siteConfig.skills.frontend,
    },
    {
      id: 'mobile-desktop',
      title: 'Mobile & Desktop Development',
      icon: Smartphone,
      color: 'text-indigo-500',
      description:
        'Engineering cross-platform iOS and Android mobile apps in React Native with 60 FPS virtualization, and secure desktop applications in Electron with sandboxed IPC bridges.',
      skills: siteConfig.skills.mobileDesktop,
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      color: 'text-emerald-500',
      description:
        'Designing modular RESTful architectures adhering strictly to MVC design, JWT token security, role-based access control, and low-latency Socket.io duplex streams.',
      skills: siteConfig.skills.backend,
    },
    {
      id: 'databases',
      title: 'Databases & Data Modeling',
      icon: Database,
      color: 'text-amber-500',
      description:
        'Architecting structured data schemas, cursor-based pagination, aggregation pipelines, and high-throughput query optimization for both document and relational workloads.',
      skills: siteConfig.skills.databases,
    },
    {
      id: 'ai-integrations',
      title: 'AI & Third-Party Integrations',
      icon: Sparkles,
      color: 'text-purple-500',
      description:
        'Connecting applications to large language models, streaming speech recognition (STT/TTS) over Twilio phone calls, and handling production Stripe recurring subscription billing.',
      skills: siteConfig.skills.aiIntegrations,
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-cyan-500',
      description:
        'Deploying and maintaining scalable cloud infrastructure across AWS services, containerizing microservices with Docker, and establishing reliable CI/CD pipelines.',
      skills: siteConfig.skills.cloudDevOps,
    },
    {
      id: 'automation',
      title: 'Automation & Workflows',
      icon: Workflow,
      color: 'text-rose-500',
      description:
        'Automating business workflows, lead qualification, CRM synchronization, and event-driven webhook processing using self-hosted n8n and API integrations.',
      skills: siteConfig.skills.automation,
    },
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProfilePageJsonLd(locale as Locale)),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About' }]} />
      </div>
      <PageHeader
        badge="Independent Software Developer"
        title={t('title')}
        subtitle="Full-stack engineer, cross-platform mobile developer, and reliable technology partner helping startups and international teams build production software."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main 2 Columns */}
          <div className="lg:col-span-2 space-y-16">
            {/* Story & Philosophy */}
            <section aria-labelledby="story-heading" className="space-y-6">
              <h2
                id="story-heading"
                className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
              >
                {t('myStoryTitle')}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                <p>
                  I am an independent software developer with hands-on experience building production full-stack web applications, cross-platform mobile products with React Native, custom desktop software, and business automation workflows.
                </p>
                <p>
                  My engineering philosophy is simple: <strong>software exists to serve a clear commercial purpose</strong>. I do not build convoluted architectures for the sake of novelty, nor do I leave clients stranded with undocumented spaghetti code. Instead, I write clean, maintainable, and thoroughly tested software that founders and product teams can confidently deploy, operate, and scale.
                </p>
                <p>
                  Throughout my career—including engineering production mobile applications at <strong>Spirehubs Pvt. Ltd.</strong> and full-stack web platforms with 25+ REST APIs and AI voice agents at <strong>W3 Dev</strong>—I have learned that clear communication and technical empathy are just as crucial as engineering proficiency. When you work with me, you work directly with the developer building your software: no account managers, no translation loss, and no surprises.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Direct Partnership
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Collaborate directly with the engineer executing your roadmap. Fast iterations and total transparency.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Maintainable Code
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Standardized patterns, TypeScript typing, modular architecture, and zero vendor lock-in.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Practical Innovation
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Pragmatic AI integrations, voice agents, and automation that deliver genuine operational return.
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Experience Section */}
            <section aria-labelledby="experience-heading" className="space-y-8">
              <div>
                <h2
                  id="experience-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5"
                >
                  <Briefcase className="w-6 h-6 text-sky-500" />
                  <span>{t('experienceTitle')}</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Verified professional roles grounded in my official resume and verified client deliverables.
                </p>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800">
                {/* Spirehubs Pvt. Ltd. */}
                <div className="relative pl-8 group">
                  <div className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full border-2 border-sky-500 bg-white dark:bg-neutral-950" />

                  <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <span>Jr. React Native Developer</span>
                        </h3>
                        <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Spirehubs Pvt. Ltd. &bull; Remote</span>
                        </div>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                        July 2026 &ndash; Present
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Contribute to the engineering and ongoing maintenance of cross-platform mobile applications using React Native, focusing on responsive interfaces, reliable functionality, and maintainable codebases across diverse hardware targets.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                        Key Applications &amp; Workflows Delivered:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Water World:</strong> Contributed to mobile application features, interactive user journeys, and customer-facing workflows.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Dwive:</strong> Developed key user-facing workflows for a comprehensive travel and mobility platform enabling discovery and booking of rides, buses, and flights, including live bus tracking and route telemetry.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Pwev:</strong> Contributed to an educational and professional-development platform where learners complete interactive courses, connect with mentors and peers, take skill assessments, and engage in freelance job discovery and community interaction.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                      {[
                        'React Native',
                        'JavaScript',
                        'TypeScript',
                        'REST APIs',
                        'Shopify FlashList',
                        'Mobile Architecture',
                        'Agile',
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* W3 Dev */}
                <div className="relative pl-8 group">
                  <div className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white dark:bg-neutral-950" />

                  <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                          <span>Full Stack Developer Intern</span>
                        </h3>
                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>W3 Dev &bull; Remote</span>
                        </div>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                        March 2025 &ndash; October 2025
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Developed and maintained two production-ready full-stack web applications using React.js, Next.js, Express.js, MongoDB, TanStack Query, and Tailwind CSS.
                    </p>

                    <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                        Key Engineering Milestones Delivered:
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>25+ RESTful APIs:</strong> Designed and deployed 25+ secure endpoints for authentication, user management, and transactional business workflows adhering strictly to MVC architecture.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Stripe Payment Gateway:</strong> Integrated complete subscription management, recurring billing portal flows, and idempotent webhook listeners to ensure zero double-billing.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>AI Voice Communication:</strong> Built real-time voice workflows chaining Twilio Media Streams, OpenAI APIs, Speech-to-Text (STT), Text-to-Speech (TTS), and LLM response streaming for natural telephone interactions.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>
                            <strong>Agile Team Collaboration:</strong> Collaborated within a remote Agile team of 6+ developers, UI designers, and QA engineers through code reviews, Postman validations, and CI/CD releases.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                      {[
                        'Next.js',
                        'React.js',
                        'Express.js',
                        'Node.js',
                        'MongoDB',
                        'TanStack Query',
                        'Stripe',
                        'Twilio SDK',
                        'OpenAI API',
                        'Tailwind CSS',
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Expertise (7 Grouped Categories) */}
            <section aria-labelledby="skills-heading" className="space-y-8">
              <div>
                <h2
                  id="skills-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5"
                >
                  <Cpu className="w-6 h-6 text-sky-500" />
                  <span>Technical Expertise by Domain</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Categorized skills based on verified production experience. No arbitrary percentages or unverified claims.
                </p>
              </div>

              <div className="space-y-4">
                {technicalCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm space-y-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                          <Icon className={`w-4 h-4 ${cat.color}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                            {cat.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {cat.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cat.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-50 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Education Section */}
            <section aria-labelledby="education-heading" className="space-y-6">
              <h2
                id="education-heading"
                className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5"
              >
                <GraduationCap className="w-6 h-6 text-sky-500" />
                <span>Academic Foundation</span>
              </h2>

              <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      Quest Group of Institution
                    </h3>
                    <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                      {siteConfig.education.degree}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold">
                      {siteConfig.education.score}
                    </span>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      {siteConfig.education.period}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  Comprehensive academic curriculum covering Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Operating Systems, Computer Networks, and Software Engineering methodologies.
                </p>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            {/* Download Verified Resume Card */}
            <div className="p-6 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 text-neutral-900 dark:text-white shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <FileDown className="w-4 h-4" />
                <span>Downloadable Resume</span>
              </div>

              <div>
                <h3 className="text-lg font-bold tracking-tight">
                  Official Verified Resume
                </h3>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Download a public-safe PDF copy of my professional resume. Details verified roles at Spirehubs Pvt. Ltd., W3 Dev, project milestones, and technical capabilities with residential address excluded for privacy.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="/downloads/Rahul_Kumar_Resume_Public.pdf"
                  download="Rahul_Kumar_Resume_Public.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 transition-colors shadow-sm"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume (PDF, 260 KB)</span>
                </a>

                <a
                  href="/downloads/Rahul_Kumar_Resume_Public.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-sky-500/50 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View in Browser Tab</span>
                </a>
              </div>

              <div className="pt-3 border-t border-sky-100 dark:border-sky-900/40 text-[10px] text-neutral-500 flex items-center justify-between font-mono">
                <span>Format: PDF &bull; 1 Page</span>
                <span>Updated: Q1 2026</span>
              </div>
            </div>

            {/* Timezone & Collaboration Card */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                <Globe className="w-4 h-4 text-sky-500" />
                <span>Global Collaboration</span>
              </div>

              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                International Timezone Overlap
              </h3>

              <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>
                    Based in <strong>Noida, India (UTC+5:30 / IST)</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>
                    Working hours structured to overlap with North America (EST/PST), Europe (GMT/CET), and Asia-Pacific teams.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Proactive asynchronous updates via Slack, GitHub PRs, email, and scheduled video demos.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  <span>Schedule a Discovery Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                Engineering Highlights
              </h4>
              <div className="space-y-2.5">
                {siteConfig.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between"
                  >
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      {m.label}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <CtaSection />
    </div>
  );
}
