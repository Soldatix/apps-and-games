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

 // A new mobile, privacy-clean browser must be able to refuse without Google calls.
 const mobileContext=await browser.newContext({
   viewport:{width:375,height:812},locale:"hr-HR",isMobile:true,hasTouch:true
 });
 const mobileGoogle=[];
 await mobileContext.route(/googletagmanager\.com|google-analytics\.com|googlesyndication\.com|doubleclick\.net/,route=>{
  mobileGoogle.push(route.request().url());
  route.abort();
 });
 const mobile=await mobileContext.newPage();
 const mobileErrors=[];
 mobile.on("pageerror",error=>mobileErrors.push(error.message));
 await mobile.goto(url+"date-lotto-generator.html",{waitUntil:"domcontentloaded"});
 await mobile.waitForSelector("#ag-privacy-banner");
 const labels={
   en:"Reject analytics",hr:"Odbij analitiku",de:"Analyse ablehnen",
   it:"Rifiuta analisi",es:"Rechazar analítica"
 };
 for(const [code,label] of Object.entries(labels)){
   await mobile.locator("#languageSelect").evaluate((element,lang)=>{
    element.value=lang;
    element.dispatchEvent(new Event("change",{bubbles:true}));
   },code);
   await mobile.getByRole("button",{name:label,exact:true}).waitFor();
 }
 const rect=await mobile.locator("#ag-privacy-banner").boundingBox();
 assert.ok(rect,"Mobile banner is missing");
 assert.ok(rect.x>=0 && rect.y>=0 && rect.x+rect.width<=376 &&
   rect.y+rect.height<=813,"Mobile banner must remain visible within viewport");
 await mobile.getByRole("button",{name:"Rechazar analítica"}).click();
 assert.equal(mobileGoogle.length,0,"Rejecting on mobile must send no Google requests");
 assert.equal(await mobile.locator("#ag-privacy-banner").count(),0);
 assert.equal(await mobile.locator("#ag-privacy-choices").count(),1);
 assert.deepEqual(mobileErrors,[],"No mobile JavaScript errors");
 console.log("PASS: mobile 375px and five languages, no traffic when rejected");
 await mobileContext.close();
} finally {await browser.close();}
