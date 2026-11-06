import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser=await chromium.launch({headless:true});
try {
 const context=await browser.newContext({locale:"en-US"});
 const url="http://127.0.0.1:4173/";
 const seen=[];
 await context.route(/googletagmanager\.com|google-analytics\.com|googlesyndication\.com|doubleclick\.net/,route=>{
  seen.push(route.request().url());
  route.abort();
 });
 const page=await context.newPage();
 await page.goto(url+"privacy-policy.html",{waitUntil:"domcontentloaded"});
 await page.waitForSelector("#ag-privacy-banner");
 assert.equal(seen.length,0,"No Google network traffic before choice");
 await page.getByRole("button",{name:"Reject analytics"}).click();
 assert.equal(await page.locator("#ag-privacy-banner").count(),0);
 assert.equal(seen.length,0,"No Google traffic after rejection");
 await page.goto(url+"date-lotto-generator.html",{waitUntil:"domcontentloaded"});
 assert.equal(await page.locator("#ag-privacy-banner").count(),0);
 assert.equal(seen.length,0,"Rejection persists across pages");
 await page.getByRole("button",{name:"Privacy choices"}).click();
 await page.getByRole("checkbox",{name:"Website analytics (Google Analytics 4)"}).check();
 await page.getByRole("button",{name:"Save choices"}).click();
 await page.waitForFunction(()=>window.__neverUsed===undefined && typeof window.gtag==="function");
 await page.waitForTimeout(250);
 assert.ok(seen.some(x=>x.includes("gtag/js")),"GA4 loads after explicit opt-in");
 assert.ok(!seen.some(x=>x.includes("adsbygoogle")),"AdSense remains disabled");
 const before=seen.length;
 await page.getByRole("button",{name:"Privacy choices"}).click();
 await page.getByRole("checkbox",{name:"Website analytics (Google Analytics 4)"}).uncheck();
 await page.getByRole("button",{name:"Save choices"}).click();
 await page.waitForLoadState("domcontentloaded");
 await page.waitForTimeout(200);
 assert.equal(await page.evaluate(()=>typeof window.gtag),"undefined","Rejection unloads analytics via navigation");
 assert.equal(seen.length,before,"No further GA requests after withdrawal");
 await page.reload({waitUntil:"domcontentloaded"});
 assert.equal(seen.length,before,"Reload after withdrawal stays clean");
 assert.equal(await page.locator("#ag-privacy-choices").count(),1);
 console.log("PASS: default no network, rejection, opt-in, withdrawal, ads held");
 await context.close();
} finally {await browser.close();}
