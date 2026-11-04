/**
 * TEST HARNESS ONLY — NOT a production integration.
 * Native two-tag Adsterra snippet in the HTML body after explicit test choice.
 * All advertising requests are intercepted and answered with inert mock JS.
 * No custom iframe, no real impressions, no vendor traffic.
 * document.write during initial HTML parsing is a TEST hypothesis, not yet
 * a provider-approved deployment approach.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const origin = "http://127.0.0.1:4173";
const url = origin + "/__adsterra_native_ci_fixture__";
const units = {
  desktop: { key: "3e88187807f72645af6b39e90957f6a8", width: 728, height: 90 },
  mobile: { key: "fc02ce1675aa14021ad3dee29c123264", width: 320, height: 50 }
};
const storeKey = "appsGamesNativeHarnessChoice";
function originalSnippet(unit) {
  return [
    "<script>",
    "  atOptions = {",
    "    'key' : '" + unit.key + "',",
    "    'format' : 'iframe',",
    "    'height' : " + unit.height + ",",
    "    'width' : " + unit.width + ",",
    "    'params' : {}",
    "  };",
    "</script>",
    '<script src="https://bauval.org/22/' + unit.key + '"></script>'
  ].join("\n");
}
const safeLiteral = content => JSON.stringify(content).replace(/</g, "\\u003c");
const fixtureHtml = [
  '<!doctype html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1"></head><body>',
  '<h1>Local intercepted native-banner integration test</h1>',
  '<button id="accept" type="button">Allow test banner</button>',
  '<button id="reject" type="button">Reject test banner</button>',
  '<button id="withdraw" type="button">Withdraw test choice</button>',
  '<div id="placement"></div>',
  '<script>',
  'const CHOICE = ' + JSON.stringify(storeKey) + ';',
  'document.querySelector("#accept").addEventListener("click", () => { sessionStorage.setItem(CHOICE, "allow"); location.reload(); });',
  'document.querySelector("#reject").addEventListener("click", () => { sessionStorage.setItem(CHOICE, "reject"); location.reload(); });',
  'document.querySelector("#withdraw").addEventListener("click", () => { sessionStorage.setItem(CHOICE, "reject"); location.reload(); });',
  'if (sessionStorage.getItem(CHOICE) === "allow" && navigator.onLine) {',
  '  const snippet = matchMedia("(min-width: 768px)").matches',
  '    ? ' + safeLiteral(originalSnippet(units.desktop)),
  '    : ' + safeLiteral(originalSnippet(units.mobile)) + ';',
  '  document.write(snippet);',
  '}',
  '</script></body></html>'
].join("\n");

const browser = await chromium.launch({ headless: true });
try {
  async function makePage(viewport) {
    const context = await browser.newContext({ viewport });
    const requests = [];
    const unexpected = [];
    await context.route("**/*", route => {
      const dest = new URL(route.request().url());
      if (dest.href === url) return route.fulfill({ status: 200, contentType: "text/html", body: fixtureHtml });
      if (dest.hostname === "bauval.org" && /^\/22\/[a-f0-9]{32}$/.test(dest.pathname)) {
        requests.push(dest.href);
        return route.fulfill({
          status: 200, contentType: "application/javascript",
          body: 'window.__adsterraNativeMock = {key: atOptions.key, format: atOptions.format, width: atOptions.width, height: atOptions.height};'
        });
      }
      unexpected.push(dest.href);
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", err => errors.push(err.message));
    return {context, page, requests, unexpected, errors};
  }

  const a = await makePage({width: 1280, height: 800});
  await a.page.goto(url);
  assert.equal(a.requests.length, 0, "request before test choice");
  assert.equal(await a.page.locator("iframe").count(), 0);
  console.log("PASS native harness: no request before explicit consent");

  await a.page.locator("#reject").click();
  await a.page.waitForFunction(() => sessionStorage.getItem("appsGamesNativeHarnessChoice") === "reject");
  await a.page.reload();
  assert.equal(a.requests.length, 0, "request despite refusal");
  console.log("PASS native harness: refusal persists and blocks all ad requests");

  await a.page.locator("#accept").click();
  await a.page.waitForFunction(() => Boolean(window.__adsterraNativeMock));
  assert.equal(a.requests.length, 1, "more than one desktop ad request");
  assert.ok(a.requests[0].endsWith("/" + units.desktop.key));
  assert.deepEqual(await a.page.evaluate(() => window.__adsterraNativeMock), {
    key: units.desktop.key, format: "iframe", width: 728, height: 90
  });
  assert.equal(await a.page.locator("iframe").count(), 0, "publisher iframe was added");
  console.log("PASS native harness: one original desktop tag, no publisher iframe");

  await a.page.locator("#withdraw").click();
  await a.page.waitForFunction(() => sessionStorage.getItem("appsGamesNativeHarnessChoice") === "reject");
  await a.page.reload();
  assert.equal(a.requests.length, 1, "ad requested after withdrawal");
  assert.deepEqual(a.unexpected, []);
  assert.deepEqual(a.errors, []);
  console.log("PASS native harness: withdrawal blocks future requests on reload");
  await a.context.close();

  const b = await makePage({width: 375, height: 812});
  await b.page.goto(url);
  assert.equal(b.requests.length, 0);
  await b.page.locator("#accept").click();
  await b.page.waitForFunction(() => Boolean(window.__adsterraNativeMock));
  assert.equal(b.requests.length, 1, "more than one mobile ad request");
  assert.ok(b.requests[0].endsWith("/" + units.mobile.key), "wrong mobile ad unit");
  assert.deepEqual(await b.page.evaluate(() => window.__adsterraNativeMock), {
    key: units.mobile.key, format: "iframe", width: 320, height: 50
  });
  assert.equal(await b.page.locator("iframe").count(), 0);
  assert.deepEqual(b.unexpected, []);
  assert.deepEqual(b.errors, []);
  console.log("PASS native harness: one original mobile tag, not the desktop tag");
  await b.context.close();
  console.log("PASS all tests: 100% intercepted vendor script; ZERO Adsterra network traffic");
} finally {
  await browser.close();
}
