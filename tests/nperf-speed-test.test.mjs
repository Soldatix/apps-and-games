import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,join} from "node:path";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const read=path=>readFileSync(join(root,path),"utf8");
test("official nPerf script is user-initiated only on dedicated speed test page",()=>{
 const page=read("speed-test/index.html");
 assert.match(page,/<form method="get" action="\/speed-test\/">/);
 assert.match(page,/<button[^>]+name="run" value="1"/);
 const guard=page.indexOf('new URLSearchParams(window.location.search).get("run") !== "1"');
 const insertion=page.indexOf("document.write(");
 assert.ok(guard>0 && insertion>guard,"nPerf embed must stay behind a query-string gate");
 assert.equal((page.match(/https:\/\/ws\.nperf\.com\/partner\/js\?l=1e09d953-2294-406b-833d-97e3ec53f71e/g)||[]).length,1);
 assert.match(page,/src="\.\.\/privacy-choice\.js"/);
 assert.match(page,/https:\/\/www\.nperf\.com\/en\/privacy-policy/);
 assert.doesNotMatch(page,/src="https:\/\/ws\.nperf\.com\/partner\/js/,"nPerf script must not be an unconditional HTML tag");
});
test("Speed Test entry is consistent across homepage and sitemap",()=>{
 const home=read("index.html"),catalog=read("script.js"),sitemap=read("sitemap.xml");
 assert.match(home,/class="secondary-button speed-test-button"/);
 assert.match(home,/href="\/speed-test\/"/);
 assert.match(home,/<h3>Internet Speed Test<\/h3>/);
 assert.match(catalog,/name: "Internet Speed Test"/);
 assert.match(catalog,/cardTranslations\[lang\]\[13\]/);
 assert.match(sitemap,/<loc>https:\/\/appsandgames\.org\/speed-test\/<\/loc>/);
 assert.equal((read("i18n.js").match(/speedTest:/g)||[]).length,5);
});
test("Speed Test wrapper translations and nPerf privacy disclosure",()=>{
 const page=read("speed-test/index.html"),policy=read("privacy-policy.html");
 for(const lang of ["en","hr","de","it","es"]) assert.match(page,new RegExp("\\b"+lang+":\\{"));
 assert.match(policy,/nPerf \(optional Internet Speed Test/);
 assert.match(policy,/nPerf's privacy policy/);
});
