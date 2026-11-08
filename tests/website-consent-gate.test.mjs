import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";

const root=new URL("../",import.meta.url);
const read=path=>readFileSync(new URL(path,root),"utf8");
const pages=readdirSync(root).filter(x=>x.endsWith(".html")&&!x.startsWith("google"));

test("all public HTML pages load the opt-in analytics preference gate",()=>{
 for(const file of pages){
  const html=read(file);
  assert.match(html,/src="privacy-choice\.js"/,file);
  assert.match(html,/href="privacy-choice\.css"/,file);
  assert.doesNotMatch(html,/src="https:\/\/www\.googletagmanager\.com\/gtag\/js/,file);
  assert.doesNotMatch(html,/src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js/,file);
  assert.doesNotMatch(html,/gtag\s*\(\s*["']config["']/,file);
 }
});

test("GA4 and AdSense remain held when consent is absent",()=>{
 const js=read("privacy-choice.js");
 assert.match(js,/readChoice\(\) !== true/);
 assert.match(js,/analytics_storage: "denied"/);
 assert.match(js,/ad_storage: "denied"/);
 assert.match(js,/ad_user_data: "denied"/);
 assert.match(js,/ad_personalization: "denied"/);
 assert.match(js,/window\.location\.reload\(\)/);
 assert.match(js,/window\["ga-disable-" \+ GA_ID\] = true/);
 assert.doesNotMatch(js,/adsbygoogle|googlesyndication|ca-pub-/);
});

test("website analytics choices are translated into five languages",()=>{
 const js=read("privacy-choice.js");
 for(const code of ["en","hr","de","it","es"]){
  assert.match(js,new RegExp("^    "+code+": \\{","m"));
 }
});
