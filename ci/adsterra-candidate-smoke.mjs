/* SAFE browser integration: intercept Adsterra, flip hard-stop in memory ONLY.
 * Published branch file remains disabled. Never connect to a real ad server.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const root = "http://127.0.0.1:4173/";
const source = readFileSync(new URL("../adsterra-consent-candidate.js", import.meta.url), "utf8");
assert.match(source, /const APPROVED_FOR_LIVE_ADS = false/);
const mockSource = source.replace(
  "const APPROVED_FOR_LIVE_ADS = false;",
  "const APPROVED_FOR_LIVE_ADS = true; // CI-ONLY override; never committed"
);
assert.notEqual(mockSource, source);
const keys = {
  desktop: "3e88187807f72645af6b39e90957f6a8",
  mobile: "fc02ce1675aa14021ad3dee29c123264"
};
const consentKey = "appsGamesAdsterraExplicitConsentV1";
const browser = await chromium.launch({headless: true});
try {
  async function setup(width, height = 850) {
    const context = await browser.newContext({viewport:{width,height}});
    const vendorRequests = [];
    const pageErrors = [];
    const blockedExternal = [];
    await context.route("**/*", async route => {
      const request = route.request();
      const target = new URL(request.url());
      if (target.origin === new URL(root).origin) return route.continue();
      if (target.hostname === "bauval.org") {
        vendorRequests.push(target.href);
        return route.fulfill({
          status: 200,
          contentType: "application/javascript",
          body: "window.__mockAdsterra = {key:atOptions.key,width:atOptions.width,height:atOptions.height,format:atOptions.format};"
        });
      }
      blockedExternal.push(target.href);
      return route.abort();
    });
    // Route precedence is later-first. ONLY the test browser sees enabled code.
    await context.route("**/adsterra-consent-candidate.js", route => route.fulfill({
      status:200, contentType:"application/javascript", body:mockSource
    }));
    const page = await context.newPage();
    page.on("pageerror", e => pageErrors.push(e.message));
    return {context,page,vendorRequests,pageErrors,blockedExternal};
  }

  const desktop = await setup(1280);
  await desktop.page.goto(root, {waitUntil:"domcontentloaded"});
  assert.equal(await desktop.page.locator(".adsterra-consent-panel").count(),1);
  assert.equal(await desktop.page.locator("#adsterra-pilot-top .adsterra-action").count(),2);
  assert.equal(desktop.vendorRequests.length,0,"Vendor loaded before consent");
  console.log("PASS candidate: first visit presents equal accept/reject, no ad requests");

  await desktop.page.locator("#adsterra-pilot-top .adsterra-action").first().click();
  await desktop.page.waitForFunction(k => JSON.parse(localStorage.getItem(k)).choice === "reject",consentKey);
  await desktop.page.reload({waitUntil:"domcontentloaded"});
  assert.equal(desktop.vendorRequests.length,0);
  assert.equal(await desktop.page.locator(".adsterra-consent-panel").count(),0);
  console.log("PASS candidate: refusal persisted, no banner or vendor requests");

  // The settings control remains available after a refusal.
  await desktop.page.locator(".footer-links .adsterra-preferences-link").click();
  assert.equal(await desktop.page.locator(".adsterra-consent-panel").count(),1);
  await desktop.page.locator("#adsterra-pilot-top .adsterra-action").nth(1).click();
  await desktop.page.waitForFunction(() => Boolean(window.__mockAdsterra));
  assert.equal(desktop.vendorRequests.length,1);
  assert.ok(desktop.vendorRequests[0].endsWith("/"+keys.desktop));
  assert.deepEqual(await desktop.page.evaluate(() => window.__mockAdsterra),{
    key:keys.desktop, width:728, height:90, format:"iframe"
  });
  assert.equal(await desktop.page.locator("#adsterra-pilot-top iframe").count(),0);
  console.log("PASS candidate: one native desktop 728x90 request, no custom iframe");

  await desktop.page.locator("#adsterra-pilot-top .adsterra-action").first().click();
  await desktop.page.waitForFunction(k => JSON.parse(localStorage.getItem(k)).choice === "reject",consentKey);
  await desktop.page.reload({waitUntil:"domcontentloaded"});
  assert.equal(desktop.vendorRequests.length,1,"Withdrawal caused another vendor request");
  assert.deepEqual(desktop.pageErrors,[]);
  console.log("PASS candidate: withdrawal prevents subsequent ad requests");
  await desktop.context.close();

  const mobile = await setup(375,812);
  await mobile.page.goto(root, {waitUntil:"domcontentloaded"});
  assert.equal(mobile.vendorRequests.length,0);
  await mobile.page.locator("#adsterra-pilot-top .adsterra-action").nth(1).click();
  await mobile.page.waitForFunction(() => Boolean(window.__mockAdsterra));
  assert.equal(mobile.vendorRequests.length,1);
  assert.ok(mobile.vendorRequests[0].endsWith("/"+keys.mobile));
  assert.deepEqual(await mobile.page.evaluate(() => window.__mockAdsterra),{
    key:keys.mobile,width:320,height:50,format:"iframe"
  });
  assert.equal(await mobile.page.locator("#adsterra-pilot-top iframe").count(),0);
  assert.deepEqual(mobile.pageErrors,[]);
  console.log("PASS candidate: one original-format mobile 320x50 ad, desktop never loaded");
  await mobile.context.close();

  const small = await setup(300,700);
  await small.page.goto(root, {waitUntil:"domcontentloaded"});
  await small.page.evaluate(k => localStorage.setItem(k,JSON.stringify({
    version:1,choice:"allow",when:Date.now()
  })),consentKey);
  await small.page.reload({waitUntil:"domcontentloaded"});
  assert.equal(small.vendorRequests.length,0,"Ad requested in undersized 300px viewport");
  await small.context.close();
  console.log("PASS candidate: screens under 320px do not load a truncated banner");

  const expired = await setup(1024,768);
  await expired.page.goto(root,{waitUntil:"domcontentloaded"});
  await expired.page.evaluate(k => localStorage.setItem(k,JSON.stringify({
    version:1,choice:"allow",when:Date.now()-(181*24*60*60*1000)
  })),consentKey);
  await expired.page.reload({waitUntil:"domcontentloaded"});
  assert.equal(expired.vendorRequests.length,0,"Expired consent allowed vendor request");
  assert.equal(await expired.page.locator(".adsterra-consent-panel").count(),1);
  await expired.context.close();
  console.log("PASS candidate: expired consent is invalid and blocks ad delivery");

  console.log("PASS candidate CI: external ad requests intercepted; ZERO real Adsterra impressions");
} finally {
  await browser.close();
}
