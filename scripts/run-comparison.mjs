import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";

const comparisonDir = "C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\comparison";
if (!fs.existsSync(comparisonDir)) {
  fs.mkdirSync(comparisonDir, { recursive: true });
}

const viewports = [
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-412x915", width: 412, height: 915 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "laptop-1366x768", width: 1366, height: 768 },
  { name: "laptop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
];

async function inspectDesign(page) {
  return await page.evaluate(() => {
    // Helper to get computed style
    const getCS = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
      };
    };

    // Extract H1 info
    const h1 = document.querySelector("h1");
    const h1Style = h1 ? window.getComputedStyle(h1) : null;

    // Extract H2 info
    const h2 = document.querySelector("h2");
    const h2Style = h2 ? window.getComputedStyle(h2) : null;

    // Body style
    const bodyStyle = window.getComputedStyle(document.body);

    // Primary CTA
    const primaryBtn = document.querySelector("a[href*='contact'], a[href*='demo'], button.bg-white, a.bg-white, .btn-primary, button[type='submit']");
    const btnStyle = primaryBtn ? window.getComputedStyle(primaryBtn) : null;

    // Floating buttons (e.g., WhatsApp)
    const floatingEls = Array.from(document.querySelectorAll("a, button, div"))
      .filter(el => {
        const cs = window.getComputedStyle(el);
        return cs.position === "fixed" && (parseInt(cs.bottom) < 150 || parseInt(cs.right) < 150);
      })
      .map(el => ({
        tag: el.tagName,
        ariaLabel: el.getAttribute("aria-label") || el.innerText?.substring(0, 30),
        href: el.getAttribute("href"),
        className: el.className?.substring?.(0, 40),
        zIndex: window.getComputedStyle(el).zIndex,
        bottom: window.getComputedStyle(el).bottom,
        right: window.getComputedStyle(el).right,
      }))
      .slice(0, 6);

    // Header layout
    const header = document.querySelector("header, nav");
    const headerStyle = header ? window.getComputedStyle(header) : null;

    // Section count & tags
    const sections = Array.from(document.querySelectorAll("section, [id]")).map(s => s.id || s.className?.substring?.(0, 30)).filter(Boolean).slice(0, 15);

    // Page title and meta description
    const metaDesc = document.querySelector("meta[name='description']")?.getAttribute("content") || "";

    return {
      title: document.title,
      metaDescription: metaDesc,
      body: {
        fontFamily: bodyStyle.fontFamily,
        backgroundColor: bodyStyle.backgroundColor,
        color: bodyStyle.color,
      },
      h1: h1 ? {
        text: h1.innerText.replace(/\s+/g, " ").trim(),
        fontFamily: h1Style.fontFamily,
        fontSize: h1Style.fontSize,
        fontWeight: h1Style.fontWeight,
        lineHeight: h1Style.lineHeight,
        color: h1Style.color,
      } : null,
      h2: h2 ? {
        text: h2.innerText.replace(/\s+/g, " ").trim(),
        fontFamily: h2Style.fontFamily,
        fontSize: h2Style.fontSize,
        fontWeight: h2Style.fontWeight,
        color: h2Style.color,
      } : null,
      header: headerStyle ? {
        position: headerStyle.position,
        backgroundColor: headerStyle.backgroundColor,
        backdropFilter: headerStyle.backdropFilter,
        height: headerStyle.height,
      } : null,
      primaryBtn: btnStyle ? {
        text: primaryBtn.innerText.replace(/\s+/g, " ").trim(),
        backgroundColor: btnStyle.backgroundColor,
        color: btnStyle.color,
        borderRadius: btnStyle.borderRadius,
        padding: `${btnStyle.paddingTop} ${btnStyle.paddingRight}`,
        fontSize: btnStyle.fontSize,
        fontWeight: btnStyle.fontWeight,
      } : null,
      floatingWidgets: floatingEls,
      sections,
    };
  });
}

async function runCapture() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const comparisonData = {
    timestamp: new Date().toISOString(),
    ghinix: { url: "https://ghinix.com/", design: {}, viewports: {}, overflow: {} },
    krynex: { url: "http://localhost:3000/", productionUrl: "https://www.krynexlabs.in/", design: {}, viewports: {}, overflow: {} },
  };

  console.log("=================================================");
  console.log("STEP 1: CAPTURING GHINIX (REFERENCE WEBSITE)");
  console.log("=================================================");

  // 1A. GHINIX Desktop 1440x900 Above Fold & Full Page
  const ghinixDesktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log("Navigating to https://ghinix.com/ on Desktop 1440x900...");
  await ghinixDesktopPage.goto("https://ghinix.com/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await ghinixDesktopPage.waitForTimeout(1500);

  // Capture Above the Fold
  const ghinixDesktopAboveFold = path.join(comparisonDir, "ghinix-desktop-above-fold-1440x900.png");
  await ghinixDesktopPage.screenshot({ path: ghinixDesktopAboveFold });
  console.log("✔ Captured: ghinix-desktop-above-fold-1440x900.png");

  // Capture Full Page
  const ghinixDesktopFull = path.join(comparisonDir, "ghinix-desktop-fullpage-1440x900.png");
  await ghinixDesktopPage.screenshot({ path: ghinixDesktopFull, fullPage: true });
  console.log("✔ Captured: ghinix-desktop-fullpage-1440x900.png");

  // Extract design tokens on Desktop
  comparisonData.ghinix.design = await inspectDesign(ghinixDesktopPage);
  await ghinixDesktopPage.close();

  // 1B. GHINIX Mobile 390x844 (iPhone 14 / Modern Mobile)
  console.log("\nNavigating to https://ghinix.com/ on Mobile 390x844...");
  const ghinixMobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
  });
  await ghinixMobilePage.goto("https://ghinix.com/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await ghinixMobilePage.waitForTimeout(1500);

  // Mobile Above Fold
  const ghinixMobileAboveFold = path.join(comparisonDir, "ghinix-mobile-above-fold-390x844.png");
  await ghinixMobilePage.screenshot({ path: ghinixMobileAboveFold });
  console.log("✔ Captured: ghinix-mobile-above-fold-390x844.png");

  // Mobile Full Page
  const ghinixMobileFull = path.join(comparisonDir, "ghinix-mobile-fullpage-390x844.png");
  await ghinixMobilePage.screenshot({ path: ghinixMobileFull, fullPage: true });
  console.log("✔ Captured: ghinix-mobile-fullpage-390x844.png");

  // Mobile Navigation Open
  console.log("Attempting to open GHINIX mobile navigation...");
  const ghinixHamburger = await ghinixMobilePage.$("button[aria-label*='menu' i], .menu-toggle, .hamburger, header button:has(svg), nav button:has(svg), [class*='hamburger'], [class*='menu'] button");
  if (ghinixHamburger) {
    try {
      await ghinixHamburger.click();
      await ghinixMobilePage.waitForTimeout(600);
      const ghinixNavOpen = path.join(comparisonDir, "ghinix-mobile-nav-open-390x844.png");
      await ghinixMobilePage.screenshot({ path: ghinixNavOpen });
      console.log("✔ Captured: ghinix-mobile-nav-open-390x844.png");

      // Try closing it or reload
      const closeBtn = await ghinixMobilePage.$("button[aria-label*='close' i], .close-menu, [class*='close']");
      if (closeBtn) await closeBtn.click();
      else await ghinixHamburger.click();
      await ghinixMobilePage.waitForTimeout(400);
    } catch (e) {
      console.log("Note: GHINIX nav toggle click:", e.message);
    }
  } else {
    console.log("Could not find standard hamburger button on GHINIX");
  }

  // Scroll to and capture Services section
  console.log("Locating GHINIX services section...");
  const servicesEl = await ghinixMobilePage.$("#services, section:has(h2:has-text('Services')), [id*='service']");
  if (servicesEl) {
    await servicesEl.scrollIntoViewIfNeeded();
    await ghinixMobilePage.waitForTimeout(500);
    const ghinixServices = path.join(comparisonDir, "ghinix-mobile-services-390x844.png");
    await ghinixMobilePage.screenshot({ path: ghinixServices });
    console.log("✔ Captured: ghinix-mobile-services-390x844.png");
  } else {
    // Scroll 1000px down as fallback
    await ghinixMobilePage.evaluate(() => window.scrollTo(0, 1000));
    await ghinixMobilePage.waitForTimeout(500);
    const ghinixServices = path.join(comparisonDir, "ghinix-mobile-services-390x844.png");
    await ghinixMobilePage.screenshot({ path: ghinixServices });
    console.log("✔ Captured: ghinix-mobile-services-390x844.png (via scroll offset)");
  }

  // Scroll to and capture Footer
  console.log("Locating GHINIX footer...");
  const ghinixFooter = await ghinixMobilePage.$("footer");
  if (ghinixFooter) {
    await ghinixFooter.scrollIntoViewIfNeeded();
    await ghinixMobilePage.waitForTimeout(500);
    const ghinixFooterShot = path.join(comparisonDir, "ghinix-mobile-footer-390x844.png");
    await ghinixMobilePage.screenshot({ path: ghinixFooterShot });
    console.log("✔ Captured: ghinix-mobile-footer-390x844.png");
  } else {
    await ghinixMobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await ghinixMobilePage.waitForTimeout(500);
    const ghinixFooterShot = path.join(comparisonDir, "ghinix-mobile-footer-390x844.png");
    await ghinixMobilePage.screenshot({ path: ghinixFooterShot });
    console.log("✔ Captured: ghinix-mobile-footer-390x844.png (via bottom scroll)");
  }
  await ghinixMobilePage.close();

  // 1C. GHINIX Across Viewports (360, 390, 412, 768, 1366, 1440, 1920)
  console.log("\nTesting GHINIX across all 7 viewports...");
  for (const vp of viewports) {
    const p = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await p.goto("https://ghinix.com/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await p.waitForTimeout(800);

    const overflow = await p.evaluate(() => {
      return {
        docWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth,
        bodyWidth: document.body.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      };
    });
    comparisonData.ghinix.overflow[vp.name] = overflow;

    const shotPath = path.join(comparisonDir, `ghinix-${vp.name}.png`);
    await p.screenshot({ path: shotPath });
    comparisonData.ghinix.viewports[vp.name] = shotPath;
    console.log(`  ✔ GHINIX at ${vp.name} (${vp.width}x${vp.height}): Overflow=${overflow.hasOverflow}`);
    await p.close();
  }

  console.log("\n=================================================");
  console.log("STEP 2: CAPTURING KRYNEX LABS (OUR WEBSITE)");
  console.log("=================================================");

  const krynexBaseUrl = "http://localhost:3000";

  // 2A. Krynex Desktop 1440x900 Above Fold & Full Page
  const krynexDesktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log(`Navigating to ${krynexBaseUrl}/ on Desktop 1440x900...`);
  await krynexDesktopPage.goto(krynexBaseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await krynexDesktopPage.waitForTimeout(1500);

  // Capture Above the Fold
  const krynexDesktopAboveFold = path.join(comparisonDir, "krynex-desktop-above-fold-1440x900.png");
  await krynexDesktopPage.screenshot({ path: krynexDesktopAboveFold });
  console.log("✔ Captured: krynex-desktop-above-fold-1440x900.png");

  // Capture Full Page
  const krynexDesktopFull = path.join(comparisonDir, "krynex-desktop-fullpage-1440x900.png");
  await krynexDesktopPage.screenshot({ path: krynexDesktopFull, fullPage: true });
  console.log("✔ Captured: krynex-desktop-fullpage-1440x900.png");

  // Extract design tokens on Desktop
  comparisonData.krynex.design = await inspectDesign(krynexDesktopPage);
  await krynexDesktopPage.close();

  // 2B. Krynex Mobile 390x844 (iPhone 14 / Modern Mobile)
  console.log(`\nNavigating to ${krynexBaseUrl}/ on Mobile 390x844...`);
  const krynexMobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
  });
  await krynexMobilePage.goto(krynexBaseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await krynexMobilePage.waitForTimeout(1500);

  // Mobile Above Fold
  const krynexMobileAboveFold = path.join(comparisonDir, "krynex-mobile-above-fold-390x844.png");
  await krynexMobilePage.screenshot({ path: krynexMobileAboveFold });
  console.log("✔ Captured: krynex-mobile-above-fold-390x844.png");

  // Mobile Full Page
  const krynexMobileFull = path.join(comparisonDir, "krynex-mobile-fullpage-390x844.png");
  await krynexMobilePage.screenshot({ path: krynexMobileFull, fullPage: true });
  console.log("✔ Captured: krynex-mobile-fullpage-390x844.png");

  // Mobile Navigation Open
  console.log("Opening Krynex mobile navigation...");
  const krynexHamburger = await krynexMobilePage.$("button[aria-controls='mobile-navigation-drawer'], button[aria-label*='navigation menu' i]");
  if (krynexHamburger) {
    await krynexHamburger.click();
    await krynexMobilePage.waitForTimeout(500);
    const krynexNavOpen = path.join(comparisonDir, "krynex-mobile-nav-open-390x844.png");
    await krynexMobilePage.screenshot({ path: krynexNavOpen });
    console.log("✔ Captured: krynex-mobile-nav-open-390x844.png");

    const krynexClose = await krynexMobilePage.$("button[aria-label='Close navigation drawer']");
    if (krynexClose) await krynexClose.click();
    await krynexMobilePage.waitForTimeout(400);
  }

  // Scroll to and capture Products section on mobile
  console.log("Locating Krynex products section...");
  const krynexProducts = await krynexMobilePage.$("#products");
  if (krynexProducts) {
    await krynexProducts.scrollIntoViewIfNeeded();
    await krynexMobilePage.waitForTimeout(500);
    const krynexProductsShot = path.join(comparisonDir, "krynex-mobile-products-390x844.png");
    await krynexMobilePage.screenshot({ path: krynexProductsShot });
    console.log("✔ Captured: krynex-mobile-products-390x844.png");
  }

  // Scroll to and capture Footer
  console.log("Locating Krynex footer...");
  const krynexFooter = await krynexMobilePage.$("footer");
  if (krynexFooter) {
    await krynexFooter.scrollIntoViewIfNeeded();
    await krynexMobilePage.waitForTimeout(500);
    const krynexFooterShot = path.join(comparisonDir, "krynex-mobile-footer-390x844.png");
    await krynexMobilePage.screenshot({ path: krynexFooterShot });
    console.log("✔ Captured: krynex-mobile-footer-390x844.png");
  }
  await krynexMobilePage.close();

  // 2C. Krynex Across Viewports (360, 390, 412, 768, 1366, 1440, 1920)
  console.log("\nTesting Krynex across all 7 viewports...");
  for (const vp of viewports) {
    const p = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await p.goto(krynexBaseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await p.waitForTimeout(800);

    const overflow = await p.evaluate(() => {
      return {
        docWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth,
        bodyWidth: document.body.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      };
    });
    comparisonData.krynex.overflow[vp.name] = overflow;

    const shotPath = path.join(comparisonDir, `krynex-${vp.name}.png`);
    await p.screenshot({ path: shotPath });
    comparisonData.krynex.viewports[vp.name] = shotPath;
    console.log(`  ✔ Krynex at ${vp.name} (${vp.width}x${vp.height}): Overflow=${overflow.hasOverflow}`);
    await p.close();
  }

  await browser.close();

  // Write comparison JSON
  fs.writeFileSync(path.join(comparisonDir, "comparison-data.json"), JSON.stringify(comparisonData, null, 2));
  console.log("\n✔ Saved comparison analysis data to comparison-data.json");
  console.log("=== CAPTURE COMPLETE ===");
}

runCapture().catch(e => {
  console.error("Comparison capture error:", e);
  process.exit(1);
});
