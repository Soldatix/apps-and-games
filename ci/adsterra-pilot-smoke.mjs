import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4173/";
const origin = new URL(base).origin;
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const vendorRequests = [];
  await context.route("**/*", route => {
    const target = new URL(route.request().url());
    if (target.origin === origin) return route.continue();
    vendorRequests.push(target.href);
    return route.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", err => errors.push(err.message));

  await page.goto(base, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("#adsterra-pilot-top").isHidden(), true);
  assert.equal(await page.locator("#adsterra-pilot-secondary").isHidden(), true);
  assert.equal(await page.locator(".adsterra-consent-panel").count(), 0);
  console.log("PASS: feature completely hidden on ordinary portal URL");

  await page.goto(base + "?adPreview=1", { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".adsterra-consent-panel").count(), 1);
  assert.equal(await page.locator(".adsterra-consent-actions button").count(), 2);
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 0);
  assert.equal(await page.locator("#adsterra-pilot-secondary").isHidden(), true);
  console.log("PASS: preview asks for separate consent; optional unit remains off");

  await page.locator(".adsterra-reject").click();
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 0);
  assert.equal(await page.evaluate(() => sessionStorage.getItem("appsGamesAdsterraPilotChoiceV1")), "reject");
  console.log("PASS: reject saves choice, does not render banner mock");

  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".adsterra-consent-panel").count(), 0);
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 0);
  await page.locator(".adsterra-change").click();
  assert.equal(await page.locator(".adsterra-consent-panel").count(), 1);
  await page.locator(".adsterra-accept").click();
  assert.equal(await page.evaluate(() => sessionStorage.getItem("appsGamesAdsterraPilotChoiceV1")), "allow");
  let box = await page.locator(".adsterra-slot-preview").boundingBox();
  assert.ok(box && box.width >= 700 && box.width <= 730, "728x90 desktop mock missing");
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 1);
  console.log("PASS: explicit accept shows exactly one 728x90 mock");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForFunction(() => document.querySelector("#adsterra-pilot-top .adsterra-slot-preview")
    ?.style.getPropertyValue("--ad-width") === "320px");
  box = await page.locator(".adsterra-slot-preview").boundingBox();
  assert.ok(box && box.width >= 310 && box.width <= 321, "mobile 320x50 mock missing");
  assert.ok(box.x >= -1 && box.x + box.width <= 376, "mobile ad preview overflows");
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 1);
  console.log("PASS: mobile responsive single ad mock");

  for (const [lang, phrase] of [["hr", "Dopusti"], ["de", "erlauben"], ["it", "Consenti"], ["es", "Permitir"]]) {
    await page.locator("#languageSelect").selectOption(lang);
    await page.locator(".adsterra-change").click();
    assert.ok((await page.locator(".adsterra-accept").textContent()).includes(phrase), lang);
    await page.locator(".adsterra-accept").click();
  }
  console.log("PASS: five-language consent UI and choices");

  await page.locator(".adsterra-withdraw").click();
  assert.equal(await page.evaluate(() => sessionStorage.getItem("appsGamesAdsterraPilotChoiceV1")), "reject");
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 0);
  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.locator(".adsterra-slot-preview").count(), 0);
  console.log("PASS: withdrawal persists and mock is removed");
  assert.equal(vendorRequests.filter(url => /bauval\.org|adsterra/i.test(url)).length, 0);
  assert.deepEqual(errors, []);
  console.log("PASS: no Adsterra network requests; no page errors");

  await context.close();
} finally {
  await browser.close();
}