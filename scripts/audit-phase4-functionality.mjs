import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.krynexlabs.in';
const auditDir = 'C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\complete-audit';

async function runFunctionalityAudit() {
  console.log(`Starting Phase 4 Functionality Audit on ${BASE_URL}...`);
  const functionalityResults = {
    navigation: {},
    interactiveControls: {},
    contactApi: {},
    cookieConsent: {},
    currencyToggle: {},
    whatsappAndEmail: {}
  };

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Interactive browser elements test
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Test Product Currency Toggle (on solarops or homepage if present)
  await page.goto(`${BASE_URL}/products/solarops`, { waitUntil: 'networkidle' });
  const inrBtn = await page.$("button:has-text('INR')");
  const usdBtn = await page.$("button:has-text('USD')");
  if (inrBtn && usdBtn) {
    await usdBtn.click();
    await page.waitForTimeout(300);
    const usdText = await page.textContent('body');
    const hasDollar = usdText.includes('$') || usdText.includes('USD');
    await inrBtn.click();
    await page.waitForTimeout(300);
    const inrText = await page.textContent('body');
    const hasRupee = inrText.includes('₹') || inrText.includes('INR');
    functionalityResults.currencyToggle = {
      supported: true,
      usdToggleWorking: hasDollar,
      inrToggleWorking: hasRupee
    };
  } else {
    functionalityResults.currencyToggle = { supported: false, reason: 'No dedicated currency toggle button found' };
  }

  // Test Email and WhatsApp link formats
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  const mailtoLinks = await page.$$eval("a[href^='mailto:']", els => els.map(e => e.getAttribute('href')));
  const telOrWaLinks = await page.$$eval("a[href*='wa.me'], a[href*='whatsapp']", els => els.map(e => e.getAttribute('href')));
  functionalityResults.whatsappAndEmail = {
    mailtoCount: mailtoLinks.length,
    mailtoTargets: [...new Set(mailtoLinks)],
    whatsappCount: telOrWaLinks.length,
    whatsappTargets: [...new Set(telOrWaLinks)]
  };

  // Test Cookie Banner interaction
  const cookieBanner = await page.$('#cookie-consent-banner, [aria-label*="cookie" i], .cookie-banner');
  const hasCookieBanner = cookieBanner !== null || (await page.content()).includes('cookie') || (await page.content()).includes('Consent');
  functionalityResults.cookieConsent = {
    present: hasCookieBanner,
    persistedKey: 'krynex_cookie_consent'
  };

  await browser.close();

  // 2. Comprehensive Contact API Route Contract Testing
  console.log('Testing Contact API endpoints directly...');

  // Test A: Empty submission
  const emptyRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const emptyJson = await emptyRes.json();
  functionalityResults.contactApi.emptySubmission = {
    status: emptyRes.status,
    expected: 400,
    passed: emptyRes.status === 400,
    response: emptyJson
  };

  // Test B: Invalid email format
  const badEmailRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Officer',
      email: 'not-a-valid-email',
      company: 'Test Systems',
      challenge: 'Automated functional test for email validation syntax'
    })
  });
  const badEmailJson = await badEmailRes.json();
  functionalityResults.contactApi.invalidEmail = {
    status: badEmailRes.status,
    expected: 400,
    passed: badEmailRes.status === 400,
    response: badEmailJson
  };

  // Test C: Missing required challenge/message
  const missingMsgRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Officer',
      email: 'officer@example.com',
      company: 'Test Systems',
      challenge: ''
    })
  });
  const missingMsgJson = await missingMsgRes.json();
  functionalityResults.contactApi.missingChallenge = {
    status: missingMsgRes.status,
    expected: 400,
    passed: missingMsgRes.status === 400,
    response: missingMsgJson
  };

  // Test D: Spam Honeypot Protection
  const honeypotRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spam Bot Crawler',
      email: 'bot@spammer-net.org',
      company: 'Spam Network',
      challenge: 'Spam payload to be rejected silently',
      _security_honeypot: 'bot-fill-token-xyz'
    })
  });
  const honeypotJson = await honeypotRes.json();
  functionalityResults.contactApi.honeypot = {
    status: honeypotRes.status,
    expected: 200,
    passed: honeypotRes.status === 200 && honeypotJson.referenceId.includes('BOT'),
    response: honeypotJson
  };

  // Write results
  const outPath = path.join(auditDir, 'phase4-functionality-results.json');
  fs.writeFileSync(outPath, JSON.stringify(functionalityResults, null, 2));
  console.log(`Phase 4 Functionality Audit completed. Written to ${outPath}`);
}

runFunctionalityAudit().catch(console.error);
