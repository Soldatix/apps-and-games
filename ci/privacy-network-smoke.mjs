/* Draft PR #36: network-level privacy smoke for the whole portal.
 * Verifies the 15 modified HTML pages never request GA4, AdSense or Adsterra
 * during a normal visit, even with an old Adsterra consent record.
 * Tests are browser-only and make no real third-party network requests.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const paths = [
  "crossword.html","date-lotto-generator.html","digital-clock.html",
  "emoji-copy-paste.html","habit-tracker.html","index.html",
  "memory-game.html","modern-snake.html","neon-pacman.html",
  "phoenix-arcade.html","privacy-policy.html","tetris.html",
  "ufo-invaders.html","unit-converter.html","wizard-chess-3d.html"
];
const root = "http://127.0.0.1:4173/";
const origin = new URL(root).origin;
const domains = /(^|\.)googletagmanager\.com$|(^|\.)google-analytics\.com$|(^|\.)googlesyndication\.com$|(^|\.)doubleclick\.net$|(^|\.)bauval\.org$/i;
const browser = await chromium.launch({headless: true});
try {
  const context = await browser.newContext({viewport:{width: 1280,height:800}});
  const blocked = [];
  await context.route("**/*", route => {
    const request = route.request();
    const url = new URL(request.url());
    if(url.origin===origin) return route.continue();
    blocked.push({url:url.href,adResource:domains.test(url.hostname)});
    return route.abort();
  });
  const page = await context.newPage();
  await page.goto(root,{waitUntil:"domcontentloaded"});
  await page.evaluate(() => localStorage.setItem("appsGamesAdsterraExplicitConsentV1",JSON.stringify({
    version:1,choice:"allow",when:Date.now()
  })));
  for(const path of paths) {
    const before = blocked.length;
    await page.goto(root+path,{waitUntil:"domcontentloaded"});
    // Give scripts and first-turn asynchronous requests a chance to begin.
    await page.waitForTimeout(160);
    const newAds = blocked.slice(before).filter(x=>x.adResource);
    assert.deepEqual(newAds,[], "Unexpected tag requests from " + path);
    console.log("PASS no Google/Adsterra tag request: " + path);
  }
  await context.close();
  console.log("PASS: all 15 pages fail closed; no real third-party ad/analytics requests");
} finally {
  await browser.close();
}
