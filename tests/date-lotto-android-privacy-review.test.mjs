import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const privacy=read("privacy-policy.html");
const detail=read("date-lotto-generator.html");

test("site Privacy Policy retains website, Windows and Digital Clock sections",()=>{
 for(const part of ["3. Google Analytics","4. Google AdSense and Advertising",
  "8. Donations and Payments","12.1. Digital Clock",
  "12.2. Date Lotto Generator","12.3. Your Control of Application Data",
  "14. Contact"]) assert.ok(privacy.includes(part),part);
 assert.match(privacy,/WebView2 storage/);
 assert.match(privacy,/mailto:info@appsandgames\.org/);
 assert.match(privacy,/rel="canonical" href="https:\/\/appsandgames\.org\/privacy-policy"/);
});

test("separate Android local data and planned advertising disclosures exist",()=>{
 assert.match(privacy,/12\.2\.1\. Date Lotto Generator — Android Edition/);
 assert.match(privacy,/embedded Android WebView storage/);
 assert.match(privacy,/optional\s+Personal Keys/);
 assert.match(privacy,/does not operate a server that stores saved lotto combinations/);
 assert.match(privacy,/12\.2\.2\. Android Advertising and Privacy Choices — Planned Integration/);
 assert.match(privacy,/production Android edition does not request/);
 assert.match(privacy,/real advertising requests disabled/);
 assert.match(privacy,/Google AdMob/);
 assert.match(privacy,/Unity LevelPlay/);
 assert.match(privacy,/consent message is saved as a draft/);
 assert.match(privacy,/not been published\s+or activated/);
 assert.match(privacy,/IP addresses/);
 assert.match(privacy,/device and app characteristics/);
 assert.match(privacy,/in-app privacy options to manage or withdraw consent/);
 assert.match(privacy,/We do not treat a website consent choice as consent/);
 assert.doesNotMatch(privacy,/consent message is published and active/i);
});

test("existing Date Lotto landing page retains all platforms and policy link",()=>{
 assert.match(detail,/href="privacy-policy"/);
 assert.match(detail,/id="android-download"/);
 assert.match(detail,/id="windows-store-download"/);
 assert.match(detail,/id="web-app-open"/);
});
