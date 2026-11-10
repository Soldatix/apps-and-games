import assert from "node:assert/strict";
import { chromium } from "playwright";

const root = "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  let vendorRequests = 0;
  await context.route(/ws\\.nperf\\.com/, route => { vendorRequests += 1; return route.abort(); });
  await context.route(/googletagmanager\\.com|googlesyndication\\.com|google-analytics\\.com/, route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", err => errors.push(err.message));

  await page.goto(root, { waitUntil: "domcontentloaded" });
  const card = page.locator(".app-card").filter({ has: page.locator("h3", { hasText: "Internet Speed Test" }) });
  assert.equal(await card.count(), 1, "Speed Test card must exist exactly once");
  const preview = card.locator("img.app-image");
  await preview.waitFor({ state: "visible" });
  const image = await preview.evaluate(async el => {
    if (!el.complete) await new Promise(resolve => {
      el.addEventListener("load", resolve, { once: true });
      el.addEventListener("error", resolve, { once: true });
    });
    return { complete: el.complete, naturalWidth: el.naturalWidth, src: el.getAttribute("src") };
  });
  assert.ok(image.complete && image.naturalWidth > 0, "Speed Test preview should load and decode");
  assert.equal(image.src, "assets/images/speed-test-neon.webp");
  console.log("PASS: approved neon WebP thumbnail decodes on the Speed Test card");

  await page.goto(root + "speed-test/", { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#themeToggle").count(), 1);
  assert.equal(await page.locator(".ag-language-button").count(), 1, "Shared flags language menu must render");
  assert.equal(await page.locator(".ag-language-flag svg").count() > 0, true);
  assert.equal(await page.locator("#nperf-intro").isVisible(), true);
  assert.equal(vendorRequests, 0, "nPerf must not load before user initiates test");

  await page.locator("#themeToggle").click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  assert.equal(await page.evaluate(() => localStorage.getItem("theme")), "light");
  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light", "Theme must persist after reload");

  await page.locator(".ag-language-button").click();
  await page.locator('.ag-language-option[data-language="hr"]').click();
  assert.equal(await page.locator("html").getAttribute("lang"), "hr");
  assert.equal(await page.locator("#nperf-intro h2").innerText(), "Spremni za provjeru veze?");
  assert.equal(await page.evaluate(() => localStorage.getItem("appsGamesLanguage")), "hr");
  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("html").getAttribute("lang"), "hr", "Language must persist after reload");
  assert.equal(await page.locator(".ag-language-button .ag-language-name").innerText(), "Hrvatski");
  assert.equal(vendorRequests, 0);
  console.log("PASS: shared language flags, translated intro, persistent theme and locale");

  await page.setViewportSize({ width: 375, height: 812 });
  const mobile = await page.evaluate(() => {
    const items = ["#themeToggle", ".ag-language-button"].map(selector => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width };
    });
    return { scrollWidth: document.documentElement.scrollWidth, width: window.innerWidth, items };
  });
  assert.ok(mobile.scrollWidth <= mobile.width + 1, "Speed Test page must not overflow 375px viewport");
  for (const item of mobile.items) {
    assert.ok(item && item.width > 24 && item.left >= -1 && item.right <= 376,
      "Header language/theme control must stay in mobile viewport");
  }
  assert.equal(await page.locator(".ag-language-flag").first().isVisible(), true);
  assert.deepEqual(errors, [], "No page errors expected from our scripts");
  console.log("PASS: 375px responsive header keeps language and theme controls accessible");

  await page.goto(root, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light",
    "Main website must reuse the same saved theme");
  assert.equal(await page.locator("html").getAttribute("lang"), "hr",
    "Main website must reuse the same saved language");
  console.log("PASS: shared preferences are consistent with the homepage");

  await context.close();
} finally {
  await browser.close();
}
