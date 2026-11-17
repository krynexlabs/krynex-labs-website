import { chromium } from "playwright-core";

async function analyze() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://ghinix.com/", { waitUntil: "domcontentloaded" });

  const data = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3")).map(h => ({
      tag: h.tagName,
      text: h.innerText.replace(/\s+/g, " ").trim(),
      fontSize: window.getComputedStyle(h).fontSize,
      fontFamily: window.getComputedStyle(h).fontFamily,
      margin: window.getComputedStyle(h).marginBottom,
    }));

    // Find cards in What we build or services
    const cards = Array.from(document.querySelectorAll("section h3, div h3"))
      .map(h3 => {
        const parent = h3.closest("div");
        return {
          title: h3.innerText.replace(/\s+/g, " ").trim(),
          parentClass: parent?.className?.substring(0, 80),
          padding: parent ? window.getComputedStyle(parent).padding : "",
          bg: parent ? window.getComputedStyle(parent).backgroundColor : "",
          border: parent ? window.getComputedStyle(parent).border : "",
          borderRadius: parent ? window.getComputedStyle(parent).borderRadius : "",
        };
      })
      .slice(0, 10);

    // Nav links
    const navLinks = Array.from(document.querySelectorAll("header a, nav a")).map(a => ({
      text: a.innerText.replace(/\s+/g, " ").trim(),
      href: a.getAttribute("href"),
    })).filter(a => a.text.length > 0);

    // CTA buttons
    const ctas = Array.from(document.querySelectorAll("a, button"))
      .filter(el => {
        const text = el.innerText?.toLowerCase() || "";
        return text.includes("start") || text.includes("talk") || text.includes("discuss") || text.includes("quote") || text.includes("contact");
      })
      .map(el => ({
        tag: el.tagName,
        text: el.innerText.replace(/\s+/g, " ").trim(),
        href: el.getAttribute("href"),
        bg: window.getComputedStyle(el).backgroundColor,
        color: window.getComputedStyle(el).color,
        radius: window.getComputedStyle(el).borderRadius,
      }))
      .slice(0, 8);

    // Trust indicators / Stats
    const stats = Array.from(document.querySelectorAll("*"))
      .filter(el => {
        const text = el.innerText?.trim();
        return text && /^[0-9]+(\+|%|x|\/)/.test(text) && text.length < 25 && el.children.length === 0;
      })
      .map(el => el.innerText.trim());

    // Floating widgets
    const floating = Array.from(document.querySelectorAll("*"))
      .filter(el => {
        const cs = window.getComputedStyle(el);
        return cs.position === "fixed" && parseInt(cs.zIndex) > 10;
      })
      .map(el => ({
        tag: el.tagName,
        ariaLabel: el.getAttribute("aria-label"),
        href: el.getAttribute("href"),
        class: el.className?.substring?.(0, 50),
        bottom: window.getComputedStyle(el).bottom,
        right: window.getComputedStyle(el).right,
      }));

    // Footer info
    const footer = document.querySelector("footer");
    const footerText = footer ? footer.innerText.replace(/\s+/g, " ").substring(0, 300) : "";

    return {
      headings,
      cards,
      navLinks,
      ctas,
      stats,
      floating,
      footerText,
    };
  });

  console.log("GHINIX DEEP ANALYSIS:\n", JSON.stringify(data, null, 2));
  await browser.close();
}

analyze().catch(console.error);
