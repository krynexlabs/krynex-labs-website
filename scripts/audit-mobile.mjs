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

async function runAudit() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  console.log("=== STARTING MOBILE-FIRST RESPONSIVENESS AUDIT ===");
  const overflowIssues = [];
  const navIssues = [];
  const touchTargetIssues = [];

  // 1. Audit Navigation on Mobile (375x812)
  console.log("\n--- Testing Mobile Navigation (375x812) ---");
  const navPage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await navPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await navPage.waitForTimeout(500);

  // Capture closed nav screenshot
  await navPage.screenshot({ path: path.join(screenshotDir, "nav-closed-375px.png") });

  // Locate hamburger menu button
  const hamburgerBtn = await navPage.$("button[aria-label*='menu' i], button[aria-expanded], header button:has(svg), nav button:has(svg)");
  if (!hamburgerBtn) {
    navIssues.push("Hamburger menu button not identifiable with accessible selectors");
    console.log("✖ Hamburger menu button not found");
  } else {
    console.log("✔ Found mobile menu button");
    // Click to open
    await hamburgerBtn.click();
    await navPage.waitForTimeout(400);

    // Check if body scroll is locked
    const bodyOverflow = await navPage.evaluate(() => document.body.style.overflow);
    console.log(`  Body overflow when menu open: '${bodyOverflow}' (expected 'hidden')`);
    if (bodyOverflow !== "hidden") {
      navIssues.push("Background scrolling is NOT locked when mobile menu is open (body style overflow != hidden)");
    }

    // Capture open nav screenshot
    await navPage.screenshot({ path: path.join(screenshotDir, "nav-open-375px.png") });

    // Check if menu links are visible and accessible
    const menuLinksCount = await navPage.evaluate(() => {
      const links = Array.from(document.querySelectorAll("nav a, [role='dialog'] a, div[class*='fixed'] a"));
      return links.filter(a => a.offsetParent !== null).length;
    });
    console.log(`  Visible navigation links when menu open: ${menuLinksCount}`);

    // Click close button inside drawer
    const closeBtn = await navPage.$("button[aria-label*='Close' i]");
    if (closeBtn) {
      console.log("✔ Found close button inside drawer, clicking to close...");
      await closeBtn.click();
      await navPage.waitForTimeout(400);
      const bodyOverflowAfter = await navPage.evaluate(() => document.body.style.overflow);
      console.log(`  Body overflow after menu closed: '${bodyOverflowAfter}'`);
      if (bodyOverflowAfter === "hidden") {
        navIssues.push("Body overflow remains locked to 'hidden' after closing mobile menu");
      } else {
        console.log("✔ Body overflow cleanly restored to unset");
      }
    } else {
      console.log("✖ Close button inside drawer not found");
      navIssues.push("Close button inside drawer not found");
    }
  }
  await navPage.close();

  // 2. Audit Viewport Overflows across all routes and viewports
  console.log("\n--- Testing Viewport Overflows across 11 viewports and 12 routes ---");
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const r of routes) {
      try {
        await page.goto("http://localhost:3000" + r, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(200);

        const check = await page.evaluate(() => {
          const docW = document.documentElement.scrollWidth;
          const bodyW = document.body.scrollWidth;
          const winW = window.innerWidth;
          const maxW = Math.max(docW, bodyW);
          const hasOverflow = maxW > winW + 1;

          const elements = [];
          if (hasOverflow) {
            const all = document.querySelectorAll("*");
            for (const el of all) {
              const rect = el.getBoundingClientRect();
              if (rect.right > winW + 1.5) {
                elements.push({
                  tag: el.tagName,
                  className: (el.className || "").toString().slice(0, 100),
                  id: el.id,
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                  winW,
                });
                if (elements.length >= 6) break;
              }
            }
          }

          // Small touch targets check on mobile (< 44px)
          const smallTargets = [];
          if (winW <= 430) {
            const clickables = document.querySelectorAll("button, a, input, select");
            for (const c of clickables) {
              const r = c.getBoundingClientRect();
              if (r.width > 0 && r.height > 0 && (r.width < 32 || r.height < 32)) {
                smallTargets.push({
                  tag: c.tagName,
                  text: (c.textContent || "").trim().slice(0, 30),
                  w: Math.round(r.width),
                  h: Math.round(r.height),
                  className: (c.className || "").toString().slice(0, 50),
                });
                if (smallTargets.length >= 5) break;
              }
            }
          }

          return { hasOverflow, maxW, winW, elements, smallTargets };
        });

        if (check.hasOverflow) {
          overflowIssues.push({
            viewport: vp.name,
            width: vp.width,
            height: vp.height,
            route: r,
            maxW: check.maxW,
            winW: check.winW,
            diff: check.maxW - check.winW,
            elements: check.elements,
          });
          console.log(`✖ [OVERFLOW] ${vp.name} (${vp.width}px) on ${r}: width=${check.maxW}px exceeds ${check.winW}px by ${check.maxW - check.winW}px`);
        }

        if (check.smallTargets && check.smallTargets.length > 0 && vp.width === 375) {
          touchTargetIssues.push({ route: r, targets: check.smallTargets });
        }

        // Capture initial screenshots for key routes on 375px and 320px
        if (vp.width === 375 && (r === "/" || r === "/products/solarops" || r === "/products/krynex-lawos" || r === "/contact")) {
          const cleanName = r === "/" ? "homepage" : r.replace(/\//g, "-").slice(1);
          await page.screenshot({ path: path.join(screenshotDir, `initial-${cleanName}-375px.png`), fullPage: false });
        }
        if (vp.width === 320 && r === "/") {
          await page.screenshot({ path: path.join(screenshotDir, "initial-homepage-320px.png"), fullPage: false });
        }
      } catch (err) {
        console.error(`Error on ${r} at ${vp.name}:`, err.message);
      }
    }
    await page.close();
  }

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    totalOverflowIssues: overflowIssues.length,
    overflowIssues,
    navIssues,
    touchTargetIssues,
  };
  fs.writeFileSync(path.join(screenshotDir, "initial-audit-report.json"), JSON.stringify(report, null, 2));

  console.log("\n=======================================================");
  console.log(`AUDIT FINISHED: Found ${overflowIssues.length} overflow issues, ${navIssues.length} nav issues, ${touchTargetIssues.length} route touch issues.`);
  console.log("=======================================================\n");

  await browser.close();
}

runAudit();
