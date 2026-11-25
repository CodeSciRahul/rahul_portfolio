import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Locale } from '@/i18n/routing';
import { blogPosts } from '@/data/blog';
import { generateLocalizedMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/page-header';
import { CtaSection } from '@/components/cta-section';
import { BlogFilter } from '@/components/blog-filter';
import { Breadcrumbs } from '@/components/breadcrumbs';

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
    path: '/blog',
    title: `${t('blogTitle')} — Engineering Insights & Architectural Guides`,
    description: t('blogDescription'),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Insights' }]} />
      </div>
      <PageHeader
        badge="Engineering Insights & Guides"
        title={t('title')}
        subtitle="Practical architectural breakdowns, real-world development trade-offs, and strategic advice on web apps, mobile engineering, and automation."
      />

      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogFilter posts={blogPosts} />
      </section>

      <CtaSection />
    </div>
  );
}
