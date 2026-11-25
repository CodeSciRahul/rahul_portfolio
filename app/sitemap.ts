import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site-config';
import { locales } from '@/i18n/routing';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  const createAlternates = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const languages: Record<string, string> = {};
    locales.forEach((l) => {
      languages[l] = `${baseUrl}/${l}${cleanPath === '/' ? '' : cleanPath}`;
    });
    languages['x-default'] = `${baseUrl}/en${cleanPath === '/' ? '' : cleanPath}`;
    return { languages };
  };

  const staticRoutes = [
    { path: '', changeFreq: 'weekly' as const, priority: 1.0 },
    { path: '/services', changeFreq: 'monthly' as const, priority: 0.9 },
    { path: '/projects', changeFreq: 'monthly' as const, priority: 0.85 },
    { path: '/about', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/blog', changeFreq: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFreq: 'monthly' as const, priority: 0.9 },
    { path: '/privacy-policy', changeFreq: 'yearly' as const, priority: 0.3 },
  ];

  locales.forEach((locale) => {
    // 1. Static Core Pages
    staticRoutes.forEach(({ path, changeFreq, priority }) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      entries.push({
        url: `${baseUrl}/${locale}${cleanPath === '/' ? '' : cleanPath}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority: locale === 'en' ? priority : Math.max(0.4, priority - 0.05),
        alternates: createAlternates(cleanPath),
      });
    });

    // 2. Service Landing Pages
    services.forEach((service) => {
      const servicePath = `/services/${service.slug}`;
      entries.push({
        url: `${baseUrl}/${locale}${servicePath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.9 : 0.85,
        alternates: createAlternates(servicePath),
      });
    });

    // 3. Project Case Studies
    projects.forEach((project) => {
      const projectPath = `/projects/${project.slug}`;
      entries.push({
        url: `${baseUrl}/${locale}${projectPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.85 : 0.8,
        alternates: createAlternates(projectPath),
      });
    });

    // 4. Blog & Engineering Insights
    blogPosts.forEach((post) => {
      const blogPath = `/blog/${post.slug}`;
      entries.push({
        url: `${baseUrl}/${locale}${blogPath}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.75 : 0.7,
        alternates: createAlternates(blogPath),
      });
    });
  });

  return entries;
}
