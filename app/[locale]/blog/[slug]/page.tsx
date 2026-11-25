import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { blogPosts, BlogPost } from '@/data/blog';
import { siteConfig } from '@/data/site-config';
import { generateLocalizedMetadata } from '@/lib/seo';
import { CtaSection } from '@/components/cta-section';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowUpRight,
  BookOpen,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Info,
  Terminal,
  Code2,
  Sparkles,
  Lock,
  UserCheck,
} from 'lucide-react';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  routing.locales.forEach((locale) => {
    blogPosts.forEach((post) => {
      params.push({ locale, slug: post.slug });
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
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return generateLocalizedMetadata({
    locale: locale as Locale,
    path: `/blog/${slug}`,
    title: `${post.title} — Engineering Insights`,
    description: post.description,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  // Related articles lookup
  const relatedPosts = blogPosts
    .filter((p) => post.relatedSlugs?.includes(p.slug) || (p.category === post.category && p.slug !== post.slug))
    .slice(0, 2);

  // Article JSON-LD Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: post.publishedAt,
    keywords: post.tags.join(', '),
  };

  return (
    <article className="min-h-screen py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Back Link */}
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Insights', href: '/blog' },
            { name: post.title },
          ]}
          className="mb-4"
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-sky-600 dark:hover:text-sky-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>&larr; Back to all articles</span>
        </Link>

        {/* Article Header */}
        <header className="max-w-4xl mb-12 pb-8 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-500">
            <span className="font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[11px] bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>

            {post.status === 'draft' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400">
                <Lock className="w-3 h-3" />
                <span>Editorial Draft Blueprint</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Published Guide</span>
              </span>
            )}

            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedAt}</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
            {/* Author Bar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0">
                {post.author.avatarInitials}
              </div>
              <div className="text-xs">
                <div className="font-bold text-neutral-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-neutral-500 font-medium">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* 2-Column Content Layout: Main Article + Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Article Body (3 Columns) */}
          <div className="lg:col-span-3 space-y-12">
            {/* Draft Notice if draft */}
            {post.status === 'draft' && (
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">
                    Pre-Release Editorial Blueprint
                  </span>
                  <span>
                    This article outline is prepared as a practical architectural guide. Have questions or want to discuss this topic in-depth for your company? Feel free to reach out directly.
                  </span>
                </div>
              </div>
            )}

            {/* Sections */}
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-5"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  {section.title}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Callout Box */}
                {section.callout && (
                  <div
                    className={`p-5 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                      section.callout.type === 'tip'
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-neutral-800 dark:text-neutral-200'
                        : section.callout.type === 'warning'
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-neutral-800 dark:text-neutral-200'
                        : 'border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {section.callout.type === 'tip' && (
                      <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {section.callout.type === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    )}
                    {section.callout.type === 'note' && (
                      <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      {section.callout.title && (
                        <h4 className="font-bold mb-1 text-neutral-900 dark:text-white">
                          {section.callout.title}
                        </h4>
                      )}
                      <p className="leading-relaxed">{section.callout.message}</p>
                    </div>
                  </div>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-lg">
                    {section.codeSnippet.title && (
                      <div className="px-4 py-2 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>{section.codeSnippet.title}</span>
                        </div>
                        <span className="uppercase text-[10px] text-neutral-500">
                          {section.codeSnippet.language}
                        </span>
                      </div>
                    )}
                    <pre className="p-4 text-xs sm:text-sm font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Key Takeaways Checklist */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 space-y-2.5">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Key Takeaways:
                    </h4>
                    <div className="space-y-2">
                      {section.keyTakeaways.map((item, kIdx) => (
                        <div
                          key={kIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Author Bio Box */}
            <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-lg shrink-0">
                {post.author.avatarInitials}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div>
                  <div className="text-base font-bold text-neutral-900 dark:text-white">
                    Written by {post.author.name}
                  </div>
                  <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                    {post.author.role}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {post.author.bio}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>GitHub Profile</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <Link
                    href="/contact"
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Discuss a Project &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Related Engineering Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-sky-500/40 hover:shadow-md transition-all group block"
                    >
                      <div className="text-[10px] font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                        {rel.category}
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-2 line-clamp-2">
                        {rel.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                        <span>Read Guide</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar: Table of Contents & Direct Consultation Card */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="sticky top-24 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-2">
                  {post.tableOfContents.map((toc) => (
                    <a
                      key={toc.id}
                      href={`#${toc.id}`}
                      className="block text-xs text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-sky-500 leading-snug"
                    >
                      {toc.title}
                    </a>
                  ))}
                </nav>

                {/* Consultation Card */}
                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span>Need Custom Development?</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Have an upcoming web app, mobile product, or business automation project? Let&apos;s discuss technical feasibility and timelines.
                  </p>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <CtaSection />
    </article>
  );
}
