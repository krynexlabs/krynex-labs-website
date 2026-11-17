async function verifyAll() {
  const routes = [
    '/',
    '/products',
    '/products/solarops',
    '/products/krynex-lawos',
    '/about',
    '/resources',
    '/industries',
    '/technology',
    '/terms',
    '/privacy',
    '/contact',
    '/sitemap.xml',
    '/robots.txt'
  ];

  console.log('=== VERIFYING LIVE PRODUCTION ROUTES ===');
  for (const r of routes) {
    try {
      const res = await fetch('https://www.krynexlabs.in' + r, { redirect: 'manual' });
      console.log(`[${res.status}] https://www.krynexlabs.in${r}`);
    } catch (e) {
      console.error(`[FAIL] https://www.krynexlabs.in${r} - ${e.message}`);
    }
  }

  console.log('\n=== VERIFYING DASTAVEG REDIRECT ===');
  const redirRes = await fetch('https://www.krynexlabs.in/products/dastaveg', { redirect: 'manual' });
  console.log('Status:', redirRes.status, 'Location:', redirRes.headers.get('location'));

  console.log('\n=== VERIFYING PRODUCTION SECURITY HEADERS ===');
  const homeRes = await fetch('https://www.krynexlabs.in/');
  console.log('Strict-Transport-Security:', homeRes.headers.get('strict-transport-security'));
  console.log('X-Frame-Options:', homeRes.headers.get('x-frame-options'));
  console.log('X-Content-Type-Options:', homeRes.headers.get('x-content-type-options'));
  console.log('Referrer-Policy:', homeRes.headers.get('referrer-policy'));

  console.log('\n=== VERIFYING SITEMAP CONTENT ===');
  const sitemapRes = await fetch('https://www.krynexlabs.in/sitemap.xml');
  const sitemapXml = await sitemapRes.text();
  const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
  console.log(`Sitemap total URLs: ${urlMatches.length}`);
  console.log('Sitemap contains solarops:', sitemapXml.includes('/products/solarops'));
  console.log('Sitemap contains krynex-lawos:', sitemapXml.includes('/products/krynex-lawos'));
  console.log('Sitemap contains dastaveg:', sitemapXml.includes('dastaveg'));

  console.log('\n=== VERIFYING ROBOTS.TXT DIRECTIVES ===');
  const robotsRes = await fetch('https://www.krynexlabs.in/robots.txt');
  const robotsTxt = await robotsRes.text();
  console.log(robotsTxt.trim());
}

verifyAll().catch(console.error);
