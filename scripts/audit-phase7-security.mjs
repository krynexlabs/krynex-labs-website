async function testSecurity() {
  const res = await fetch('https://www.krynexlabs.in/');
  console.log('=== LIVE SECURITY HEADERS ===');
  for (const [k, v] of res.headers.entries()) {
    if (
      k.includes('security') ||
      k.includes('x-') ||
      k.includes('content-type') ||
      k.includes('referrer') ||
      k.includes('permissions')
    ) {
      console.log(`${k}: ${v}`);
    }
  }

  console.log('\n=== TESTING RFC 9116 SECURITY.TXT ===');
  const secRes = await fetch('https://www.krynexlabs.in/.well-known/security.txt');
  console.log('security.txt status:', secRes.status);
  if (secRes.status === 200) {
    const secText = await secRes.text();
    console.log(secText.trim());
  }

  console.log('\n=== TESTING CSP DIRECTIVES ===');
  const csp = res.headers.get('content-security-policy');
  console.log('Content-Security-Policy:', csp ? csp : 'None (Managed by Next.js / Edge)');
}

testSecurity().catch(console.error);
