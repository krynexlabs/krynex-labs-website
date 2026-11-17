async function checkLiveContent() {
  const pages = [
    'https://www.krynexlabs.in/',
    'https://www.krynexlabs.in/about',
    'https://www.krynexlabs.in/products',
    'https://www.krynexlabs.in/products/solarops',
    'https://www.krynexlabs.in/products/krynex-lawos',
    'https://www.krynexlabs.in/resources',
    'https://www.krynexlabs.in/terms',
    'https://www.krynexlabs.in/privacy',
    'https://www.krynexlabs.in/contact'
  ];

  const keywords = ['dastaveg', 'd. patel', 'dhaval', 'founder', 'fips 140', '99.99%'];
  let found = 0;
  for (const page of pages) {
    const res = await fetch(page);
    const html = (await res.text()).toLowerCase();
    for (const kw of keywords) {
      if (html.includes(kw)) {
        console.log(`[ALERT] Live page ${page} contains keyword: "${kw}"`);
        found++;
      }
    }
  }
  console.log(`Live content keyword scan completed. Total violations found: ${found}`);
}

checkLiveContent().catch(console.error);
