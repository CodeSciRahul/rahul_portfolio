import { Metadata } from 'next';
import { siteConfig } from '@/data/site-config';
import { Locale, locales } from '@/i18n/routing';
import type { ServiceItem } from '@/data/services';
import type { ProjectItem } from '@/data/projects';
import type { BlogPost } from '@/data/blog';

interface MetadataProps {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function generateLocalizedMetadata({
  locale,
  path = '',
  title,
  description,
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
}: MetadataProps): Metadata {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const localizedPath = `${siteConfig.url}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`;

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${siteConfig.url}/${l}${cleanPath === '/' ? '' : cleanPath}`;
  });
  languages['x-default'] = `${siteConfig.url}/en${cleanPath === '/' ? '' : cleanPath}`;

  const pageTitle = `${title} | ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    keywords: keywords || [
      'freelance software developer',
      'full stack engineer',
      'Next.js developer',
      'React Native developer',
      'custom software development',
      'AI agents',
      'n8n workflow automation',
      'contract software developer',
      'hire remote developer',
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: localizedPath,
      languages,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: localizedPath,
      siteName: `${siteConfig.name} — Independent Software Developer`,
      locale,
      type: type === 'article' ? 'article' : 'website',
      ...(type === 'article' && publishedTime ? { publishedTime, modifiedTime: modifiedTime || publishedTime } : {}),
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [fullImageUrl],
      creator: '@codescirahul',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// =============================================================================
// JSON-LD Structured Data Generators
// =============================================================================

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: siteConfig.shortBio,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.whatsapp,
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Next.js 16 (App Router)',
      'React 19 & React Native',
      'TypeScript',
      'Node.js & Express.js',
      'RESTful API Architecture',
      'MongoDB & Mongoose',
      'Electron Desktop Software',
      'Stripe Payment Gateway Integration',
      'AI Agents & LLM Integration (OpenAI API)',
      'Twilio Real-Time Voice Streaming',
      'n8n Workflow Automation',
      'AWS Cloud Services',
      'Docker Containerization',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: siteConfig.education.institution,
      url: 'https://questgoi.org',
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.name} — Software Engineering Studio`,
    url: siteConfig.url,
    description: siteConfig.shortBio,
    inLanguage: ['en', 'fr', 'nl', 'ru'],
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  };
}

export function getProfilePageJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${siteConfig.url}/${locale}/about`,
    name: `About ${siteConfig.name} — Full-Stack & Contract Developer`,
    description: siteConfig.shortBio,
    mainEntity: getPersonJsonLd(),
  };
}

export function getProfessionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${siteConfig.name} — Software Development & Technical Consulting`,
    image: `${siteConfig.url}/og-image.png`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    areaServed: [
      'United States',
      'United Kingdom',
      'European Union',
      'Canada',
      'Australia',
      'Global',
    ],
  };
}

export function getServiceJsonLd(service: ServiceItem, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: `${service.title} Services`,
    description: service.shortDescription,
    url: `${siteConfig.url}/${locale}/services/${service.slug}`,
    provider: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables.map((item, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item,
        },
        position: index + 1,
      })),
    },
  };
}

export function getProjectJsonLd(project: ProjectItem, locale: Locale) {
  const isDesktop = project.category === 'Desktop';
  const isMobile = project.category === 'Mobile';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/${locale}/projects/${project.slug}`,
    applicationCategory: isDesktop
      ? 'DesktopApplication'
      : isMobile
      ? 'MobileApplication'
      : 'WebApplication',
    operatingSystem: isDesktop
      ? 'macOS, Windows, Linux'
      : isMobile
      ? 'iOS, Android'
      : 'All Modern Web Browsers',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function getArticleJsonLd(post: BlogPost, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
    image: `${siteConfig.url}/og-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: siteConfig.title,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item : `${siteConfig.url}${item}`,
    })),
  };
}
