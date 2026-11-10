import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,join} from "node:path";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const read=path=>readFileSync(join(root,path),"utf8");
test("public /speed-test/ invites a click before loading official nPerf script",()=>{
 const page=read("speed-test/index.html"),run=read("speed-test/run/index.html");
 const vendor='<script src="https://ws.nperf.com/partner/js?l=1e09d953-2294-406b-833d-97e3ec53f71e"></script>';
 assert.ok(!page.includes('id="nperf-coming-soon"'));
 assert.ok(page.includes('data-st="readyTitle"'));
 assert.ok(page.includes('=== "run" ? "run" : "ready"'));
 assert.ok(page.includes('html[data-nperf-trial="ready"] #nperf-intro'));
 assert.ok(page.includes('name="nperf_trial" value="run"'));
 assert.ok(page.includes('get("nperf_trial") === "run"'));
 assert.ok(page.includes('document.write('));
 assert.ok(!page.includes('\n        '+vendor+'\n'));
 assert.ok(page.includes('src="../privacy-choice.js"'));
 assert.ok(page.includes("https://www.nperf.com/en/privacy-policy"));
 assert.equal(run.split(vendor).length-1,1,"original direct embed retains the official nPerf tag");
 assert.match(page,/<title>Internet Speed Test — Free nPerf Speed Test/);
});

test("Speed Test entry is consistent across homepage and sitemap",()=>{
 const home=read("index.html"),catalog=read("script.js"),sitemap=read("sitemap.xml");
 assert.match(home,/class="secondary-button speed-test-button"/);
 assert.match(home,/href="\/speed-test\/"/);
 assert.match(home,/<h3>Internet Speed Test<\/h3>/);
 assert.match(home,/<span class="app-status">LIVE<\/span>/);
 assert.match(catalog,/status: "LIVE"/);
 assert.match(catalog,/app.status === "COMING_SOON"/);
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

test("speed-test cover and shared header components stay consistent",()=>{
 const svg=read("assets/images/speed-test.svg");
 const speed=read("speed-test/index.html");
 const homepage=read("index.html");
 const registry=read("script.js");
 assert.ok(svg.includes("Apps &amp; Games"),"SVG metadata must escape ampersands");
 assert.ok(!svg.includes("Apps & Games dark"),"Unescaped ampersand breaks XML image");
 assert.match(speed,/data-ag-language-menu/,"Use portal's shared language menu");
 assert.match(speed,/src="\\.\\.\\/assets\\/js\\/ag-language-menu\\.js"/);
 assert.match(speed,/id="themeToggle"/);
 assert.match(speed,/localStorage\\.getItem\\("theme"\\)/);
 assert.match(speed,/localStorage\\.setItem\\("theme",next\\)/);
 assert.match(homepage,/src="assets\\/images\\/speed-test\\.svg"/);
 assert.match(registry,/image: "assets\\/images\\/speed-test\\.svg"/);
});
