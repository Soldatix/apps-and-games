import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const main=read("index.html");
const consent=read("privacy-choice.js");
test("AdSense ownership claim uses an inert meta tag only",()=>{
  const expected='<meta name="google-adsense-account" content="ca-pub-6296601518048221">';
  assert.equal(main.split(expected).length-1,1);
  assert.ok(main.indexOf(expected)>main.indexOf("<head>") && main.indexOf(expected)<main.indexOf("</head>"));
  assert.doesNotMatch(main,/src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
  assert.doesNotMatch(main,/src="https:\/\/www\.googletagmanager\.com\/gtag\/js/);
  assert.doesNotMatch(consent,/adsbygoogle|googlesyndication/);
});
test("privacy-message choice remains independent of AdSense verification",()=>{
 assert.match(main,/src="privacy-choice\.js"/);
 assert.match(consent,/readChoice\(\) !== true/);
 assert.doesNotMatch(main,/<script[^>]+src="https:\/\/(?:pagead2|fundingchoices)/);
});
