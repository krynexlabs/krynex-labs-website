import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/dixit/.gemini/antigravity/brain/b32feb97-f77a-408a-a21f-051b9b3806bf/complete-audit/lighthouse';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAuditWithRetry(preset, runNumber) {
  const isMobile = preset === 'mobile';
  const outPath = path.join(outDir, `run-${preset}-${runNumber}`);
  const cmd = `npx lighthouse http://127.0.0.1:3000/ --output=json,html --output-path="${outPath}" --chrome-flags="--headless=new --no-sandbox" ${
    isMobile ? '--form-factor=mobile --screenEmulation.mobile=true' : '--preset=desktop'
  }`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Running ${preset} audit #${runNumber} (attempt ${attempt})...`);
      execSync(cmd, { stdio: 'inherit' });
      const jsonReport = JSON.parse(fs.readFileSync(`${outPath}.report.json`, 'utf8'));
      // Verify valid run
      if (jsonReport.categories && jsonReport.categories.performance && jsonReport.categories.performance.score !== null) {
        await sleep(2000);
        return {
          run: runNumber,
          performance: Math.round(jsonReport.categories.performance.score * 100),
          accessibility: Math.round(jsonReport.categories.accessibility.score * 100),
          bestPractices: Math.round(jsonReport.categories['best-practices'].score * 100),
          seo: Math.round(jsonReport.categories.seo.score * 100),
          fcp: jsonReport.audits['first-contentful-paint'].numericValue,
          fcpDisplay: jsonReport.audits['first-contentful-paint'].displayValue,
          lcp: jsonReport.audits['largest-contentful-paint'].numericValue,
          lcpDisplay: jsonReport.audits['largest-contentful-paint'].displayValue,
          tbt: jsonReport.audits['total-blocking-time'].numericValue,
          tbtDisplay: jsonReport.audits['total-blocking-time'].displayValue,
          cls: jsonReport.audits['cumulative-layout-shift'].numericValue,
          clsDisplay: jsonReport.audits['cumulative-layout-shift'].displayValue,
          speedIndex: jsonReport.audits['speed-index'].numericValue,
          speedIndexDisplay: jsonReport.audits['speed-index'].displayValue,
        };
      }
    } catch (err) {
      console.warn(`Attempt ${attempt} for ${preset} #${runNumber} encountered issue: ${err.message}. Retrying in 3s...`);
      await sleep(3000);
    }
  }
  throw new Error(`Failed all 3 attempts for ${preset} audit #${runNumber}`);
}

function getMedian(arr, key) {
  const sorted = [...arr].sort((a, b) => a[key] - b[key]);
  return sorted[Math.floor(sorted.length / 2)];
}

async function main() {
  const mobileRuns = [];
  const desktopRuns = [];

  for (let i = 1; i <= 3; i++) {
    mobileRuns.push(await runAuditWithRetry('mobile', i));
  }
  for (let i = 1; i <= 3; i++) {
    desktopRuns.push(await runAuditWithRetry('desktop', i));
  }

  const medianMobile = getMedian(mobileRuns, 'performance');
  const medianDesktop = getMedian(desktopRuns, 'performance');

  const finalSummary = {
    mobileRuns,
    desktopRuns,
    medianMobile,
    medianDesktop,
  };

  fs.writeFileSync(
    path.join(outDir, 'post-optimization-summary.json'),
    JSON.stringify(finalSummary, null, 2),
    'utf8'
  );

  console.log('\n======================================================');
  console.log('=== POST-OPTIMIZATION LIGHTHOUSE MEDIAN RESULTS ===');
  console.log('======================================================');
  console.log('MOBILE MEDIAN (Run #' + medianMobile.run + '):');
  console.log('  Performance:   ', medianMobile.performance);
  console.log('  Accessibility: ', medianMobile.accessibility);
  console.log('  Best Practices:', medianMobile.bestPractices);
  console.log('  SEO:           ', medianMobile.seo);
  console.log('  FCP:           ', medianMobile.fcpDisplay);
  console.log('  LCP:           ', medianMobile.lcpDisplay);
  console.log('  TBT:           ', medianMobile.tbtDisplay);
  console.log('  CLS:           ', medianMobile.clsDisplay);
  console.log('  Speed Index:   ', medianMobile.speedIndexDisplay);

  console.log('\nDESKTOP MEDIAN (Run #' + medianDesktop.run + '):');
  console.log('  Performance:   ', medianDesktop.performance);
  console.log('  Accessibility: ', medianDesktop.accessibility);
  console.log('  Best Practices:', medianDesktop.bestPractices);
  console.log('  SEO:           ', medianDesktop.seo);
  console.log('  FCP:           ', medianDesktop.fcpDisplay);
  console.log('  LCP:           ', medianDesktop.lcpDisplay);
  console.log('  TBT:           ', medianDesktop.tbtDisplay);
  console.log('  CLS:           ', medianDesktop.clsDisplay);
  console.log('  Speed Index:   ', medianDesktop.speedIndexDisplay);
}

main().catch(console.error);
