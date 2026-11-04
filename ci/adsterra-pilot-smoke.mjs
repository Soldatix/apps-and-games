import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

/** Mock-only acceptance test: never contact Adsterra or other third parties. */
const base = "http://127.0.0.1:4173/";
const origin = new URL(base).origin;
const pilot = readFileSync(new URL("../adsterra-pilot.js", import.meta.url), "utf8");
const desktopKey = "3e88187807f72645af6b39e90957f6a8";
const mobileKey = "fc02ce1675aa14021ad3dee29c123264";
const interceptedAdRequests = [];

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    if (url.hostname === "bauval.org") {
      interceptedAdRequests.push(url.href);
      return route.fulfill({
        status: 200, contentType: "application/javascript",
        body: 'document.body.setAttribute("data-adsterra-mock", "1");'
      });
    }
    // No real Google Analytics/AdSense/Adsterra/other third-party traffic.
    return route.abort();
  });

  const page = await context.newPage();
  await page.goto(base, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#adsterra-pilot-top").isHidden(), true);
  assert.equal(await page.locator("#adsterra-pilot-top iframe").count(), 0);
  assert.deepEqual(interceptedAdRequests, []);
  console.log("PASS default-off: no ad display or third-party ad requests");

  await page.goto(base + "?adPreview=1", { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#adsterra-pilot-top").isVisible(), true);
  assert.equal(await page.locator("#adsterra-pilot-secondary").isVisible(), true);
  const desktopSlot = page.locator("#adsterra-pilot-top .adsterra-slot-preview");
  const desktopRect = await desktopSlot.boundingBox();
  assert.ok(desktopRect && desktopRect.width >= 700 && desktopRect.width <= 730,
    "Desktop banner mock did not get width 728");
  assert.equal(await page.locator(".adsterra-vendor-frame").count(), 0);
  assert.deepEqual(interceptedAdRequests, []);
  console.log("PASS desktop 728x90: preview-only, no ad vendor request");

  await page.setViewportSize({ width: 375, height: 812 });
  const mobileRect = await desktopSlot.boundingBox();
  const secondaryRect = await page.locator("#adsterra-pilot-secondary .adsterra-slot-preview").boundingBox();
  assert.ok(mobileRect && mobileRect.width >= 310 && mobileRect.width <= 321,
    "Mobile banner mock did not get width 320");
  assert.ok(mobileRect.x >= -1 && mobileRect.x + mobileRect.width <= 376,
    "Mobile 320x50 overflows viewport");
  assert.ok(secondaryRect && secondaryRect.width >= 295 && secondaryRect.width <= 301,
    "300x250 preview missing or incorrect");
  assert.deepEqual(interceptedAdRequests, []);
  console.log("PASS mobile 320x50 + optional 300x250: responsive mock, no ad request");

  await page.locator("#languageSelect").selectOption("hr");
  assert.match(await page.locator("#adsterra-pilot-top .adsterra-label").textContent(), /Oglas/);
  await page.locator("#languageSelect").selectOption("de");
  assert.match(await page.locator("#adsterra-pilot-top .adsterra-label").textContent(), /Anzeige/);
  assert.deepEqual(interceptedAdRequests, []);
  console.log("PASS language changes: HR and DE");

  // Explicitly test the opt-in path using *intercepted mock vendor JS*.
  // This is NOT a live advertising request, real eCPM test, or GDPR approval.
  await context.route("**/adsterra-pilot.js", route => {
    const modified = pilot.replace("adsEnabled: false, // PRODUCTION HOLD",
      "adsEnabled: true, // TEST HARNESS ONLY");
    assert.notEqual(modified, pilot, "Could not activate harness-only flag");
    return route.fulfill({ status: 200, contentType: "application/javascript", body: modified });
  });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#adsterra-pilot-top iframe").count(), 0);
  assert.equal(interceptedAdRequests.length, 0);
  const firstAdRequest = page.waitForRequest(req =>
    new URL(req.url()).hostname === "bauval.org", { timeout: 15000 });
  await page.locator("#adsterra-pilot-top button.adsterra-action").click();
  await firstAdRequest;
  assert.equal(interceptedAdRequests.length, 1, "Exactly one banner should load");
  assert.ok(interceptedAdRequests[0].includes(desktopKey),
    "Wrong desktop ad key loaded");
  assert.equal(await page.locator("#adsterra-pilot-secondary iframe").count(), 0,
    "Secondary banner must remain off");
  console.log("PASS explicit opt-in: precisely one mocked banner request");

  await page.locator(".footer-links .adsterra-preferences-link").click();
  assert.equal(await page.locator("#adsterra-pilot-top iframe").count(), 0);
  assert.equal(await page.evaluate(() =>
    localStorage.getItem("appsGamesAdsterraConsentV1")), "no");
  console.log("PASS withdrawal: existing frame removed and preference persisted");

  await context.close();
} finally {
  await browser.close();
}
