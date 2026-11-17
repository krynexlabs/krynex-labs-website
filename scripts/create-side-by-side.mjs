import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";

const comparisonDir = "C:\\Users\\dixit\\.gemini\\antigravity\\brain\\b32feb97-f77a-408a-a21f-051b9b3806bf\\comparison";

async function createSideBySide() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  console.log("Generating side-by-side comparison composites...");

  // 1. Mobile 390x844 Side-by-Side
  // We place GHINIX (390px) on left and KRYNEX (390px) on right with labels
  const mobileHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #111;
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            color: #fff;
            padding: 24px;
            display: inline-block;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .title {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .subtitle {
            font-size: 13px;
            color: #888;
            margin-top: 4px;
            font-family: ui-monospace, monospace;
          }
          .grid {
            display: flex;
            gap: 24px;
          }
          .card {
            background: #181818;
            border: 1px solid #333;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .card-header {
            padding: 12px 16px;
            background: #222;
            border-bottom: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .tag {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .tag-ghinix { color: #3b82f6; }
          .tag-krynex { color: #f5f5f5; }
          .url {
            font-size: 11px;
            color: #aaa;
            font-family: ui-monospace, monospace;
          }
          .shot {
            width: 390px;
            height: 844px;
            object-fit: cover;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">RESPONSIVE DESIGN COMPARISON — MOBILE VIEWPORT (390 × 844)</div>
          <div class="subtitle">GHINIX (REFERENCE) VS. KRYNEX LABS (OUR SYSTEM)</div>
        </div>
        <div class="grid">
          <div class="card">
            <div class="card-header">
              <span class="tag tag-ghinix">GHINIX (REFERENCE)</span>
              <span class="url">https://ghinix.com/</span>
            </div>
            <img class="shot" src="file:///${path.join(comparisonDir, 'ghinix-mobile-above-fold-390x844.png').replace(/\\/g, '/')}" />
          </div>
          <div class="card">
            <div class="card-header">
              <span class="tag tag-krynex">KRYNEX LABS (OUR PLATFORM)</span>
              <span class="url">https://www.krynexlabs.in/</span>
            </div>
            <img class="shot" src="file:///${path.join(comparisonDir, 'krynex-mobile-above-fold-390x844.png').replace(/\\/g, '/')}" />
          </div>
        </div>
      </body>
    </html>
  `;

  const page = await browser.newPage({ viewport: { width: 900, height: 1050 } });
  await page.setContent(mobileHtml, { waitUntil: "load" });
  await page.waitForTimeout(500);

  const mobileSideBySidePath = path.join(comparisonDir, "side-by-side-mobile-390x844.png");
  const mobileContainer = await page.$("body");
  await mobileContainer.screenshot({ path: mobileSideBySidePath });
  console.log("✔ Created: side-by-side-mobile-390x844.png");
  await page.close();

  // 2. Desktop 1440x900 Side-by-Side
  // We place GHINIX (scaled) alongside Krynex (scaled) in a high-res comparison sheet
  const desktopHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #111;
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            color: #fff;
            padding: 32px;
            display: inline-block;
          }
          .header {
            text-align: center;
            margin-bottom: 24px;
          }
          .title {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .subtitle {
            font-size: 14px;
            color: #888;
            margin-top: 6px;
            font-family: ui-monospace, monospace;
          }
          .grid {
            display: flex;
            gap: 32px;
          }
          .card {
            background: #181818;
            border: 1px solid #333;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          }
          .card-header {
            padding: 16px 20px;
            background: #222;
            border-bottom: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .tag {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .tag-ghinix { color: #3b82f6; }
          .tag-krynex { color: #f5f5f5; }
          .url {
            font-size: 12px;
            color: #aaa;
            font-family: ui-monospace, monospace;
          }
          .shot {
            width: 720px;
            height: 450px;
            object-fit: cover;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">RESPONSIVE DESIGN COMPARISON — LAPTOP / DESKTOP (1440 × 900)</div>
          <div class="subtitle">GHINIX (REFERENCE) VS. KRYNEX LABS (OUR SYSTEM)</div>
        </div>
        <div class="grid">
          <div class="card">
            <div class="card-header">
              <span class="tag tag-ghinix">GHINIX (REFERENCE)</span>
              <span class="url">https://ghinix.com/</span>
            </div>
            <img class="shot" src="file:///${path.join(comparisonDir, 'ghinix-desktop-above-fold-1440x900.png').replace(/\\/g, '/')}" />
          </div>
          <div class="card">
            <div class="card-header">
              <span class="tag tag-krynex">KRYNEX LABS (OUR PLATFORM)</span>
              <span class="url">https://www.krynexlabs.in/</span>
            </div>
            <img class="shot" src="file:///${path.join(comparisonDir, 'krynex-desktop-above-fold-1440x900.png').replace(/\\/g, '/')}" />
          </div>
        </div>
      </body>
    </html>
  `;

  const dPage = await browser.newPage({ viewport: { width: 1600, height: 750 } });
  await dPage.setContent(desktopHtml, { waitUntil: "load" });
  await dPage.waitForTimeout(500);

  const desktopSideBySidePath = path.join(comparisonDir, "side-by-side-desktop-1440x900.png");
  const desktopContainer = await dPage.$("body");
  await desktopContainer.screenshot({ path: desktopSideBySidePath });
  console.log("✔ Created: side-by-side-desktop-1440x900.png");
  await dPage.close();

  await browser.close();
  console.log("Side-by-side generation complete!");
}

createSideBySide().catch(e => {
  console.error("Side-by-side generation error:", e);
  process.exit(1);
});
