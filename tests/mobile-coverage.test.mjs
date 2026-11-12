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
test("nine countries, five languages, no premature ad vendor requests",()=>{
  for(const code of ["CH","HR","DE","IT","AT","FR","ES","GB","US"])assert.match(script,new RegExp("'"+code+"'"));
  for(const lang of ["en","hr","de","it","es"])assert.match(script,new RegExp("\\b"+lang+":\\{"));
  assert.doesNotMatch(html,/bauval\.org|adsterra-banner-loader|data-ad-placement/);
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

test("standard portal header and two future Adsterra sizes, no active ads",()=>{
  assert.match(html,/assets\/logo\/apps-and-games-logo\.png/);
  assert.match(html,/class="main-nav"/);
  assert.match(html,/class="header-actions"/);
  assert.match(html,/data-ag-language-menu/);
  assert.match(html,/id="themeToggle"/);
  assert.match(html,/id="ad-area"[^>]*hidden/);
  assert.match(html,/data-ad-size="728x90"/);
  assert.match(html,/data-ad-size="320x50"/);
  assert.doesNotMatch(html,/bauval\.org|adsterra-banner-loader|https:\/\/.*adsterra/);
  assert.match(css,/\.future-ad-area\[hidden\]\{display:none!important\}/);
  assert.match(html,/id="nperf-embed"/);
  assert.match(script,/initResponsiveNPerfMap\(\)/);
  assert.match(script,/canvas\.style\.transform = 'scale\('/);
});
