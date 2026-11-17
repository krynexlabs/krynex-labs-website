import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.krynexlabs.in';
const auditDir = 'C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\complete-audit';
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

// 23 canonical routes from sitemap + additional public routes
const testRoutes = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/products/solarops',
  '/products/krynex-lawos',
  '/technology',
  '/approach',
  '/research',
  '/industries',
  '/industries/solar',
  '/industries/legal',
  '/solutions',
  '/solutions/ai-ml',
  '/solutions/enterprise-software',
  '/solutions/web-mobile',
  '/solutions/cloud-data',
  '/resources',
  '/resources/optimizing-solar-plant-yield-algorithmic-soiling-detection',
  '/resources/deterministic-statutory-conveyancing-bilingual-property-deeds',
  '/resources/product-led-saas-architecture-problem-first-engineering',
  '/privacy',
  '/terms',
  '/thank-you',
  '/products/dastaveg', // Expected 308 redirect
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.webmanifest',
  '/icon',
  '/apple-icon',
  '/opengraph-image'
];

async function runDiscovery() {
  console.log(`Starting Phase 1 Discovery on ${BASE_URL}...`);
  const results = [];
  const linkIssues = [];
  const imageIssues = [];

  for (const route of testRoutes) {
    const fullUrl = `${BASE_URL}${route}`;
    const startTime = Date.now();
    try {
      const res = await fetch(fullUrl, { redirect: 'manual' });
      const elapsed = Date.now() - startTime;
      const status = res.status;
      const contentType = res.headers.get('content-type') || '';
      const location = res.headers.get('location') || null;

      let title = null;
      let h1 = null;
      let canonical = null;
      let metaDesc = null;
      let ogTitle = null;
      let hasJsonLd = false;
      let internalLinks = [];
      let images = [];

      if (contentType.includes('text/html') && status === 200) {
        const html = await res.text();
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        title = titleMatch ? titleMatch[1].trim() : null;

        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null;

        const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
        canonical = canonicalMatch ? canonicalMatch[1] : null;

        const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
        metaDesc = descMatch ? descMatch[1] : null;

        const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
        ogTitle = ogTitleMatch ? ogTitleMatch[1] : null;

        hasJsonLd = html.includes('application/ld+json');

        // Extract internal links
        const hrefMatches = [...html.matchAll(/href=["'](\/[^"']*)["']/g)];
        internalLinks = [...new Set(hrefMatches.map(m => m[1]))];

        // Extract images
        const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)];
        images = imgMatches.map(m => ({
          tag: m[0],
          src: m[1],
          hasAlt: /alt=["'][^"']*["']/i.test(m[0])
        }));
      }

      results.push({
        route,
        status,
        elapsedMs: elapsed,
        contentType,
        location,
        title,
        h1,
        canonical,
        metaDesc,
        ogTitle,
        hasJsonLd,
        internalLinksCount: internalLinks.length,
        imagesCount: images.length
      });

      console.log(`[${status}] ${route} (${elapsed}ms) - Title: ${title ? title.slice(0, 35) + '...' : (location ? 'Redirect -> ' + location : 'N/A')}`);
    } catch (err) {
      results.push({
        route,
        status: 'FETCH_ERROR',
        error: err.message
      });
      console.error(`[ERR] ${route}: ${err.message}`);
    }
  }

  // Save report JSON
  const outputPath = path.join(auditDir, 'phase1-discovery-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Phase 1 Discovery complete. Results written to ${outputPath}`);
}

runDiscovery().catch(console.error);
