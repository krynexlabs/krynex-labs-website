import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  // Always the single canonical host (https://www.krynexlabs.in).
  const baseUrl = siteConfig.url;

  const routes = [
    '',
    '/about',
    '/what-we-do',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/what-we-do' || route === '/about' ? 0.9 : 0.8,
  }));
}
