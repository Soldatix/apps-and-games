import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const html=read("privacy-policy.html");
const analytics=read("privacy-choice.js");
const index=read("index.html");
const lotto=read("date-lotto-generator.html");

test("Privacy Policy combines Android disclosures with website opt-in script",()=>{
 assert.match(html,/Last updated: November 6, 2026/);
 assert.match(html,/12\.2\.1\. Date Lotto Generator — Android Edition/);
 assert.match(html,/12\.2\.2\. Android Advertising and Privacy Choices — Planned Integration/);
 assert.match(html,/real advertising requests disabled/);
 assert.match(html,/consent message is saved as a draft/);
 assert.match(html,/privacy-choice\.js/);
 assert.match(html,/privacy-choice\.css/);
 assert.doesNotMatch(html,/src="https:\/\/www\.googletagmanager\.com\/gtag\/js/);
 assert.doesNotMatch(html,/src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js/);
});

test("website disclosure and analytics mechanism agree on opt-in and no ads",()=>{
 assert.match(html,/Website consent controls, where configured, are separate/);
 assert.match(html,/consent controls currently deployed on the website are subject/);
 assert.match(analytics,/readChoice\(\) !== true\) return/);
 assert.match(analytics,/analytics_storage: "denied"/);
 assert.match(analytics,/ad_storage: "denied"/);
 assert.match(analytics,/ad_user_data: "denied"/);
 assert.match(analytics,/ad_personalization: "denied"/);
 for(const page of [index,lotto,html]){
  assert.match(page,/src="privacy-choice\.js"/);
  assert.doesNotMatch(page,/src="https:\/\/www\.googletagmanager\.com\/gtag/);
 }
 assert.doesNotMatch(analytics,/adsbygoogle|googlesyndication/);
});

test("site preserves existing GA4/Windows/Digital Clock policy areas",()=>{
 for(const h of ["3. Google Analytics","4. Google AdSense and Advertising",
  "12.1. Digital Clock","12.2. Date Lotto Generator",
  "12.3. Your Control of Application Data","14. Contact"]){
   assert.ok(html.includes(h),h);
 }
 assert.match(html,/WebView2 storage/);
 assert.match(html,/mailto:info@appsandgames\.org/);
});
