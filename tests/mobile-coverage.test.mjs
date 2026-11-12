import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const html=read("mobile-coverage/index.html"),css=read("mobile-coverage/styles.css"),script=read("mobile-coverage/app.js"),portal=read("index.html"),portalJs=read("script.js"),worker=JSON.parse(read("mobile-coverage/wrangler.jsonc"));
test("official nPerf map tag and licensed hostname are preserved",()=>{
  assert.match(html,/https:\/\/ws\.nperf\.com\/partner\/js-map\?l=026f70f3-da84-43d1-bb18-716133fa9c88&locale=en/);
  assert.equal((html.match(/ws\.nperf\.com\/partner\/js-map/g)||[]).length,1);
  assert.match(html,/rel="canonical" href="https:\/\/mobile-coverage\.appsandgames\.org\/"/);
  assert.match(html,/name="robots" content="noindex,follow"/);
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
  assert.doesNotMatch(portal,/>Mobile Network Coverage<\/h3>/, "portal card must wait for approved launch");
  assert.doesNotMatch(portalJs,/name: "Mobile Network Coverage"/, "registry card must wait for launch");
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
