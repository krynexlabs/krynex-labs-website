import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site-data';

export default function robots(): MetadataRoute.Robots {
  // Always the single canonical host (https://www.krynexlabs.in).
  const baseUrl = siteConfig.url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
