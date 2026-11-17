import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.krynexlabs.in';
const screenshotDir = 'C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\complete-audit\\screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const viewports = [
  // Mobile
  { category: 'mobile', name: '320x720', width: 320, height: 720, isMobile: true },
  { category: 'mobile', name: '360x800', width: 360, height: 800, isMobile: true },
  { category: 'mobile', name: '375x812', width: 375, height: 812, isMobile: true },
  { category: 'mobile', name: '390x844', width: 390, height: 844, isMobile: true },
  { category: 'mobile', name: '412x915', width: 412, height: 915, isMobile: true },
  { category: 'mobile', name: '430x932', width: 430, height: 932, isMobile: true },
  // Tablet
  { category: 'tablet', name: '768x1024', width: 768, height: 1024, isMobile: false },
  { category: 'tablet', name: '820x1180', width: 820, height: 1180, isMobile: false },
  // Laptop
  { category: 'laptop', name: '1024x768', width: 1024, height: 768, isMobile: false },
  { category: 'laptop', name: '1280x800', width: 1280, height: 800, isMobile: false },
  { category: 'laptop', name: '1366x768', width: 1366, height: 768, isMobile: false },
  { category: 'laptop', name: '1440x900', width: 1440, height: 900, isMobile: false },
  // Desktop
  { category: 'desktop', name: '1600x900', width: 1600, height: 900, isMobile: false },
  { category: 'desktop', name: '1920x1080', width: 1920, height: 1080, isMobile: false },
];

async function runResponsiveAudit() {
  console.log(`Starting Phase 3 Responsive Audit on ${BASE_URL}...`);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const viewportResults = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.isMobile ? 2 : 1,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check horizontal overflow
    const overflowInfo = await page.evaluate(() => {
      const doc = document.documentElement;
      const scrollW = doc.scrollWidth;
      const innerW = window.innerWidth;
      const hasOverflow = scrollW > innerW;
      let offenders = [];
      if (hasOverflow) {
        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > window.innerWidth || rect.width > window.innerWidth) {
            offenders.push({
              tag: el.tagName,
              className: el.className ? String(el.className).slice(0, 50) : '',
              right: rect.right,
              width: rect.width
            });
          }
        });
      }
      return { scrollW, innerW, hasOverflow, offenders: offenders.slice(0, 5) };
    });

    viewportResults.push({
      ...vp,
      overflow: overflowInfo
    });

    console.log(`[Viewport ${vp.name}] Inner: ${overflowInfo.innerW}px | Scroll: ${overflowInfo.scrollW}px | Overflow: ${overflowInfo.hasOverflow ? 'YES (FAIL)' : 'NO (PASS)'}`);
    await context.close();
  }

  // Now capture detailed screenshots requested
  console.log('Capturing designated screenshots...');

  // 1. Mobile captures (390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();

  // Mobile Homepage
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'homepage-mobile-390x844-above-fold.png')
  });
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'homepage-mobile-390x844-fullpage.png'),
    fullPage: true
  });

  // Mobile Footer
  const footerEl = await mobilePage.$('footer');
  if (footerEl) {
    await footerEl.scrollIntoViewIfNeeded();
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'footer-mobile-390x844.png')
    });
  }

  // Mobile Nav Open
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  const menuBtn = await mobilePage.$("button[aria-controls='mobile-navigation-drawer'], button[aria-label*='navigation' i], button[aria-label*='menu' i]");
  if (menuBtn) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({
      path: path.join(screenshotDir, 'navigation-mobile-open-390x844.png')
    });
  }

  // Mobile Products Directory
  await mobilePage.goto(`${BASE_URL}/products`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'products-mobile-390x844-fullpage.png'),
    fullPage: true
  });

  // Mobile SolarOps
  await mobilePage.goto(`${BASE_URL}/products/solarops`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'solarops-mobile-390x844-fullpage.png'),
    fullPage: true
  });

  // Mobile LawOS
  await mobilePage.goto(`${BASE_URL}/products/krynex-lawos`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'lawos-mobile-390x844-fullpage.png'),
    fullPage: true
  });

  // Mobile Contact
  await mobilePage.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({
    path: path.join(screenshotDir, 'contact-mobile-390x844-fullpage.png'),
    fullPage: true
  });

  await mobileContext.close();

  // 2. Laptop captures (1440x900)
  const laptopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const laptopPage = await laptopContext.newPage();

  // Laptop Homepage
  await laptopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await laptopPage.screenshot({
    path: path.join(screenshotDir, 'homepage-laptop-1440x900-above-fold.png')
  });
  await laptopPage.screenshot({
    path: path.join(screenshotDir, 'homepage-laptop-1440x900-fullpage.png'),
    fullPage: true
  });

  // Laptop Products
  await laptopPage.goto(`${BASE_URL}/products`, { waitUntil: 'networkidle' });
  await laptopPage.screenshot({
    path: path.join(screenshotDir, 'products-laptop-1440x900-fullpage.png'),
    fullPage: true
  });

  // Laptop SolarOps
  await laptopPage.goto(`${BASE_URL}/products/solarops`, { waitUntil: 'networkidle' });
  await laptopPage.screenshot({
    path: path.join(screenshotDir, 'solarops-laptop-1440x900-fullpage.png'),
    fullPage: true
  });

  // Laptop LawOS
  await laptopPage.goto(`${BASE_URL}/products/krynex-lawos`, { waitUntil: 'networkidle' });
  await laptopPage.screenshot({
    path: path.join(screenshotDir, 'lawos-laptop-1440x900-fullpage.png'),
    fullPage: true
  });

  // Laptop Contact
  await laptopPage.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await laptopPage.screenshot({
    path: path.join(screenshotDir, 'contact-laptop-1440x900-fullpage.png'),
    fullPage: true
  });

  await laptopContext.close();
  await browser.close();

  // Write summary JSON
  fs.writeFileSync(
    path.join('C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\complete-audit', 'phase3-responsive-results.json'),
    JSON.stringify(viewportResults, null, 2)
  );

  console.log('Phase 3 Responsive Audit & Screenshot Capture completed successfully!');
}

runResponsiveAudit().catch(console.error);
