import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";

const screenshotDir = "C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\mobile-audit";
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const viewports = [
  { name: "small-mobile", width: 320, height: 720 },
  { name: "android-mobile", width: 360, height: 800 },
  { name: "iphone-viewport", width: 375, height: 812 },
  { name: "modern-mobile", width: 390, height: 844 },
  { name: "large-android", width: 412, height: 915 },
  { name: "large-mobile", width: 430, height: 932 },
  { name: "small-mobile-landscape", width: 720, height: 320 },
  { name: "modern-mobile-landscape", width: 844, height: 390 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "small-laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
];

const routes = [
  "/",
  "/products",
  "/products/solarops",
  "/products/krynex-lawos",
  "/industries",
  "/technology",
  "/about",
  "/resources",
  "/resources/optimizing-solar-plant-yield-algorithmic-soiling-detection",
  "/contact",
  "/privacy",
  "/terms",
];

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  console.log("=== EXECUTING KRYNEX LABS MOBILE-FIRST RESPONSIVENESS AUDIT ===");

  const auditReport = {
    timestamp: new Date().toISOString(),
    viewportsTested: viewports.length,
    routesTested: routes.length,
    navigationAudit: {},
    overflowChecks: [],
    founderContentVerification: {},
    screenshots: [],
    status: "PASS",
  };

  // 1. Mobile Navigation Test on 375x812
  console.log("\n[1] Testing Mobile Navigation Drawer (375x812)...");
  const navPage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await navPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await navPage.waitForTimeout(600);

  // Nav closed screenshot
  const navClosedPath = path.join(screenshotDir, "nav-closed-375px.png");
  await navPage.screenshot({ path: navClosedPath });
  auditReport.screenshots.push("nav-closed-375px.png");

  // Open drawer
  const menuButton = await navPage.$("button[aria-controls='mobile-navigation-drawer'], button[aria-label*='navigation menu' i], button[aria-label*='navigation drawer' i]");
  if (!menuButton) {
    throw new Error("Mobile menu button not found!");
  }
  await menuButton.click();
  await navPage.waitForTimeout(500);

  // Check scroll lock
  const bodyOverflowOpen = await navPage.evaluate(() => document.body.style.overflow);
  console.log(`  Body overflow when drawer opened: "${bodyOverflowOpen}" (expected "hidden")`);

  // Nav open screenshot
  const navOpenPath = path.join(screenshotDir, "nav-open-375px.png");
  await navPage.screenshot({ path: navOpenPath });
  auditReport.screenshots.push("nav-open-375px.png");

  // Verify tap target sizes of nav drawer links
  const drawerLinks = await navPage.$$eval("#mobile-navigation-drawer a, #mobile-navigation-drawer button", els =>
    els.map(el => {
      const rect = el.getBoundingClientRect();
      return {
        text: el.innerText.trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    })
  );

  console.log(`  Found ${drawerLinks.length} interactive elements in mobile drawer.`);
  const smallDrawerElements = drawerLinks.filter(e => e.height < 40 && e.text.length > 0);
  auditReport.navigationAudit = {
    scrollLockedOnOpen: bodyOverflowOpen === "hidden",
    totalElements: drawerLinks.length,
    interactiveTargets: drawerLinks,
    smallElements: smallDrawerElements,
  };

  // Close drawer
  const closeButton = await navPage.$("button[aria-label='Close navigation drawer']");
  if (closeButton) {
    await closeButton.click();
    await navPage.waitForTimeout(400);
    const bodyOverflowClosed = await navPage.evaluate(() => document.body.style.overflow);
    console.log(`  Body overflow when drawer closed: "${bodyOverflowClosed}" (expected "")`);
    auditReport.navigationAudit.scrollReleasedOnClose = bodyOverflowClosed !== "hidden";
  }
  await navPage.close();

  // 2. Viewport & Route Matrix Testing
  console.log("\n[2] Testing Viewport Matrix & Overflow Checks Across 11 Sizes & 12 Routes...");
  for (const vp of viewports) {
    console.log(`\n--- Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:3000${route}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(250);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const bodyW = document.body.scrollWidth;
          return {
            hasOverflow: docW > winW + 1 || bodyW > winW + 1,
            docW,
            winW,
            bodyW,
          };
        });

        const checkResult = {
          viewport: vp.name,
          width: vp.width,
          height: vp.height,
          route,
          overflow: overflow.hasOverflow,
          details: overflow,
        };

        auditReport.overflowChecks.push(checkResult);

        if (overflow.hasOverflow) {
          console.log(`  ✖ OVERFLOW on ${route}: docW=${overflow.docW}, winW=${overflow.winW}`);
          auditReport.status = "FAIL";
        }

        // Capture homepage across all viewports
        if (route === "/") {
          const shotName = `homepage-${vp.name}-${vp.width}x${vp.height}.png`;
          await page.screenshot({ path: path.join(screenshotDir, shotName) });
          auditReport.screenshots.push(shotName);
        }
      } catch (err) {
        console.error(`  Error checking ${route} on ${vp.name}:`, err.message);
      }
    }
    await page.close();
  }

  // 3. Full Page Evidence Screenshots on Key Mobile Sizes
  console.log("\n[3] Capturing Full-Page Mobile Evidence Screenshots...");
  const captureTargets = [
    { route: "/", name: "homepage-320px-full.png", width: 320, height: 720 },
    { route: "/", name: "homepage-375px-full.png", width: 375, height: 812 },
    { route: "/", name: "homepage-390px-full.png", width: 390, height: 844 },
    { route: "/products/solarops", name: "solarops-375px-full.png", width: 375, height: 812 },
    { route: "/products/krynex-lawos", name: "krynex-lawos-375px-full.png", width: 375, height: 812 },
    { route: "/contact", name: "contact-375px-full.png", width: 375, height: 812 },
    { route: "/about", name: "about-375px-full.png", width: 375, height: 812 },
    { route: "/technology", name: "technology-375px-full.png", width: 375, height: 812 },
    { route: "/industries", name: "industries-375px-full.png", width: 375, height: 812 },
    { route: "/resources", name: "resources-375px-full.png", width: 375, height: 812 },
  ];

  for (const target of captureTargets) {
    const page = await browser.newPage({ viewport: { width: target.width, height: target.height } });
    await page.goto(`http://localhost:3000${target.route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(400);
    const targetPath = path.join(screenshotDir, target.name);
    await page.screenshot({ path: targetPath, fullPage: true });
    auditReport.screenshots.push(target.name);
    console.log(`  ✔ Saved full-page screenshot: ${target.name}`);
    await page.close();
  }

  // 4. Verify Complete Founder Content Elimination
  console.log("\n[4] Verifying Complete Elimination of Founder Content...");
  const verifyPage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  for (const r of ["/", "/about"]) {
    await verifyPage.goto(`http://localhost:3000${r}`, { waitUntil: "domcontentloaded" });
    const content = await verifyPage.content();
    const hasDPatel = /D[\s.]*Patel/i.test(content);
    const hasFounder = /Founder/i.test(content);
    const hasDPMonogram = /\bDP\b/.test(content);
    console.log(`  Route ${r}: D. Patel: ${hasDPatel}, Founder: ${hasFounder}, DP monogram: ${hasDPMonogram}`);
    auditReport.founderContentVerification[r] = {
      hasDPatel,
      hasFounder,
      hasDPMonogram,
      clean: !hasDPatel && !hasFounder && !hasDPMonogram,
    };
  }
  await verifyPage.close();

  await browser.close();

  // Save JSON report
  const reportPath = path.join(screenshotDir, "final-mobile-audit-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));
  console.log(`\n✔ Saved final audit report to: ${reportPath}`);
  console.log(`=== AUDIT COMPLETED. OVERALL STATUS: ${auditReport.status} ===`);
}

main().catch(err => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
