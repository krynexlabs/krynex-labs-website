async function findLearnMore() {
  const res = await fetch('https://www.krynexlabs.in/');
  const html = await res.text();
  const matches = [...html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  for (const m of matches) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (/learn more/i.test(text)) {
      console.log('Found generic link:', m[1], '| Text:', text, '| Full tag:', m[0]);
    }
  }
}
findLearnMore().catch(console.error);
