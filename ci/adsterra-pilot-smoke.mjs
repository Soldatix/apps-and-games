import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4173/";
const origin = new URL(base).origin;
const externalRequests = [];
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.route("**/*", route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    externalRequests.push(url.href);
    return route.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", err => errors.push(err.message));

  await page.goto(base, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#adsterra-pilot-top").isHidden(), true);
  assert.equal(await page.locator("#adsterra-pilot-secondary").isHidden(), true);
  assert.equal(await page.locator(".adsterra-vendor-frame").count(), 0);
  console.log("PASS: preview disabled by default");

  await page.goto(base + "?adPreview=1", { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#adsterra-pilot-top").isVisible(), true);
  assert.equal(await page.locator("#adsterra-pilot-secondary").isVisible(), true);
  const top = page.locator("#adsterra-pilot-top .adsterra-slot-preview");
  let box = await top.boundingBox();
  assert.ok(box && box.width >= 700 && box.width <= 730, "728x90 mock missing");
  assert.equal(await page.locator("#adsterra-pilot-top iframe").count(), 0);
  assert.equal(externalRequests.filter(url => /bauval\.org/.test(url)).length, 0);
  console.log("PASS: 728x90 desktop placeholder; no Adsterra network request");

  await page.setViewportSize({ width: 375, height: 812 });
  box = await top.boundingBox();
  const secondary = await page.locator("#adsterra-pilot-secondary .adsterra-slot-preview").boundingBox();
  assert.ok(box && box.width >= 310 && box.width <= 321, "320x50 mock missing");
  assert.ok(box.x >= -1 && box.x + box.width <= 376, "mobile overflow");
  assert.ok(secondary && secondary.width >= 295 && secondary.width <= 301, "300x250 mock missing");
  assert.equal(await page.locator("#adsterra-pilot-secondary iframe").count(), 0);
  console.log("PASS: 320x50 mobile and 300x250 optional placeholders; no custom iframe");

  for (const [lang, text] of [["hr", "Oglas"], ["de", "Anzeige"], ["it", "Pubblicità"], ["es", "Publicidad"]]) {
    await page.locator("#languageSelect").selectOption(lang);
    const rendered = await page.locator("#adsterra-pilot-top .adsterra-label").innerText();
    console.log("LANGUAGE CHECK", lang, JSON.stringify(rendered));
    assert.ok(rendered.includes(text), "Language " + lang + " rendered " + JSON.stringify(rendered));
  }
  console.log("PASS: HR/DE/IT/ES preview labels");
  assert.equal(externalRequests.filter(url => /bauval\.org/.test(url)).length, 0);
  assert.deepEqual(errors, []);
  console.log("PASS: zero vendor ad requests and no uncaught page errors");
  await context.close();
} finally {
  await browser.close();
}