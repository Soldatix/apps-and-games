import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const html=read("mobile-coverage/index.html"),css=read("mobile-coverage/styles.css"),script=read("mobile-coverage/app.js"),portal=read("index.html"),portalJs=read("script.js"),worker=JSON.parse(read("mobile-coverage/wrangler.jsonc"));
test("official nPerf map tag and licensed hostname are preserved",()=>{
  assert.match(html,/https:\/\/ws\.nperf\.com\/partner\/js-map\?l=026f70f3-da84-43d1-bb18-716133fa9c88&locale=en/);
  assert.equal((html.match(/ws\.nperf\.com\/partner\/js-map/g)||[]).length,1);
  assert.match(html,/rel="canonical" href="https:\/\/mobile-coverage\.appsandgames\.org\/"/);
  assert.match(html,/name="robots" content="index,follow"/);
});
test("nine countries, five languages, no ad vendor source in static HTML",()=>{
  for(const code of ["CH","HR","DE","IT","AT","FR","ES","GB","US"])assert.match(script,new RegExp("'"+code+"'"));
  for(const lang of ["en","hr","de","it","es"])assert.match(script,new RegExp("\\b"+lang+":\\{"));
  assert.doesNotMatch(html,/bauval\.org|data-ad-placement/);
  assert.equal((html.match(/src="\.\/adsterra-banner-loader\.js"/g)||[]).length,2);
  assert.match(html,/https:\/\/appsandgames\.org\/privacy-choice\.js/);
  assert.match(css,/@media\(max-width:550px\)/);
});
test("dedicated Worker and portal staging don't touch existing nPerf Speed Test",()=>{
  assert.equal(worker.name,"mobile-coverage");
  assert.equal(worker.assets.directory,".");
  assert.match(portal,/>Mobile Network Coverage<\/h3>/, "portal must feature live Mobile Coverage");
  assert.match(portalJs,/name: "Mobile Network Coverage"/, "registry must include Mobile Coverage");
  assert.match(portalJs,/mobileCoverageCardTranslations/, "five-language catalog entry required");
  const rootIgnore=read(".assetsignore");
  assert.match(rootIgnore,/^\/mobile-coverage\/\s*$/m, "main portal Worker must exclude dedicated app files");
});

test("Wrangler temporary files and secrets are excluded from deployed static assets",()=>{
  const ignored=read("mobile-coverage/.assetsignore");
  assert.match(ignored,/^\.wrangler\/$/m);
  assert.match(ignored,/^\*\*\/\.wrangler\/\*\*$/m);
  for(const pattern of [".env", "*.pem", "*.key", "/wrangler.jsonc"]) {
    assert.ok(ignored.includes(pattern), "missing ignore rule for "+pattern);
  }
});

test("standard portal header and consent-gated responsive Adsterra placement",()=>{
  assert.match(html,/assets\/logo\/apps-and-games-logo\.png/);
  assert.match(html,/class="main-nav"/);
  assert.match(html,/class="header-actions"/);
  assert.match(html,/data-ag-language-menu/);
  assert.match(html,/id="themeToggle"/);
  assert.match(html,/id="ad-area"[^>]*hidden/);
  assert.match(html,/data-ad-size="728x90"/);
  assert.match(html,/data-ad-size="320x50"/);
  assert.doesNotMatch(html,/bauval\.org|https:\/\/.*adsterra/);
  assert.match(html,/id="ad-desktop-slot"[^>]*hidden><script src="\.\/adsterra-banner-loader\.js" data-unit="desktop"/);
  assert.match(html,/id="ad-mobile-slot"[^>]*hidden><script src="\.\/adsterra-banner-loader\.js" data-unit="mobile"/);
  assert.match(css,/@media\(max-width:799px\)/);
  assert.match(css,/\.future-ad-area \.ad-slot\[hidden\]\{display:none!important\}/);
  assert.match(css,/\.future-ad-area\[hidden\]\{display:none!important\}/);
  assert.match(html,/id="nperf-embed"/);
  assert.match(script,/initResponsiveNPerfMap\(\)/);
  assert.match(script,/canvas\.style\.transform = 'scale\('/);
});


test("Mobile Coverage hero uses identical same-origin optimized WebP from the catalog card",()=>{
  const hero=readFileSync(new URL("../mobile-coverage/mobile-coverage-neon.webp",import.meta.url));
  const card=readFileSync(new URL("../assets/images/mobile-coverage-neon.webp",import.meta.url));
  assert.equal(hero.byteLength,14070);
  assert.deepEqual(hero,card,"Hero and app listing must use identical image bytes");
  assert.equal(hero.subarray(0,4).toString("ascii"),"RIFF");
  assert.equal(hero.subarray(8,12).toString("ascii"),"WEBP");
  assert.match(html,/class="hero-illustration" src="\.\/mobile-coverage-neon\.webp"/);
  assert.doesNotMatch(html,/class="hero-illustration" src="\.\/cover\.svg"/);
  assert.match(html,/property="og:image" content="https:\/\/mobile-coverage\.appsandgames\.org\/mobile-coverage-neon\.webp"/);
  assert.match(html,/name="twitter:image" content="https:\/\/mobile-coverage\.appsandgames\.org\/mobile-coverage-neon\.webp"/);
});
