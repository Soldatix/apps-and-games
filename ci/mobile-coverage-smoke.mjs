import assert from "node:assert/strict";
import { chromium } from "playwright";
import {fileURLToPath} from "node:url";

const root="http://127.0.0.1:4173/mobile-coverage/";
const browser=await chromium.launch({headless:true});
try {
  const context=await browser.newContext({viewport:{width:1280,height:800}});
  let mapCalls=0,adCalls=0;
  const local=(path)=>fileURLToPath(new URL("../"+path,import.meta.url));
  await context.route(/ws\.nperf\.com\/partner\/js-map/,route=>{
    mapCalls++;
    return route.fulfill({status:200,contentType:"application/javascript",
      body:"document.currentScript.insertAdjacentHTML('afterend','<iframe id=\\\"mock-nperf-map\\\" width=\\\"560\\\" height=\\\"385\\\" srcdoc=\\\"<p>nPerf test map</p>\\\"></iframe>');"});
  });
  await context.route(/adsterra|bauval\.org|googletagmanager|google-analytics/,route=>{adCalls++;return route.abort()});
  await context.route("https://appsandgames.org/privacy-choice.js",route=>route.fulfill({path:local("privacy-choice.js"),contentType:"application/javascript"}));
  await context.route("https://appsandgames.org/privacy-choice.css",route=>route.fulfill({path:local("privacy-choice.css"),contentType:"text/css"}));
  await context.route("https://appsandgames.org/assets/js/ag-language-menu.js",route=>route.fulfill({path:local("assets/js/ag-language-menu.js"),contentType:"application/javascript"}));
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",err=>errors.push(err.message));
  await page.goto(root,{waitUntil:"domcontentloaded"});
  await page.locator("#mock-nperf-map").waitFor();
  assert.equal(mapCalls,1,"vendor script requested once");
  assert.equal(adCalls,0,"no pre-approval ad requests");
  assert.equal(await page.locator(".site-logo-image").count(),1,"portal header logo");
  assert.equal(await page.locator(".main-nav a").count(),3,"portal header links");
  assert.equal(await page.locator("#ad-area").isHidden(),true,"no premature advertising area");
  await page.waitForFunction(()=>document.getElementById('nperf-map')?.dataset.mapScale);
  const largeMap = await page.evaluate(()=>{
    const frame=document.getElementById('mock-nperf-map').getBoundingClientRect();
    const element=document.getElementById('nperf-map');
    const stage=element.getBoundingClientRect();
    return {frameWidth:frame.width,stageWidth:stage.width,scale:parseFloat(element.dataset.mapScale)};
  });
  assert.ok(largeMap.frameWidth>900,"desktop provider map scales wider than the 560px native embed");
  assert.ok(largeMap.frameWidth <= largeMap.stageWidth,"map stays inside wide stage");
  assert.ok(largeMap.scale>1.6,"map scales on desktop");
  assert.match(await page.locator("h1").innerText(),/Mobile Network Coverage/);
  assert.equal(await page.locator("#countryList li").count(),9);
  const cover=await page.locator(".hero-illustration").evaluate(el=>({complete:el.complete,naturalWidth:el.naturalWidth}));
  assert.ok(cover.complete&&cover.naturalWidth>0,"coverage illustration loads");
  await page.locator("#languageSelect").selectOption("hr");
  assert.match(await page.locator("h1").innerText(),/Pokrivenost mobilnih mreža/);
  assert.equal(await page.locator("html").getAttribute("lang"),"hr");
  await page.locator("#themeToggle").click();
  assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
  await page.reload({waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("html").getAttribute("lang"),"hr");
  assert.equal(await page.locator("html").getAttribute("data-theme"),"light");
  for(const width of [375,768,1280]){
    await page.setViewportSize({width,height:820});
    const bounds=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,language:(()=>{const a=document.querySelector(".ag-language-button")||document.querySelector("#languageSelect");const r=a.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width}})(),theme:(()=>{const r=document.querySelector("#themeToggle").getBoundingClientRect();return {left:r.left,right:r.right,width:r.width}})()}));
    assert.ok(bounds.scrollWidth<=width+1,"no horizontal overflow at "+width+"px");
    for(const name of ["language","theme"]){const el=bounds[name];assert.ok(el.width>25&&el.left>=-1&&el.right<=width+1,name+" visible at "+width+"px");}
    await page.waitForFunction(()=>{
      const stage=document.getElementById("nperf-map")?.getBoundingClientRect();
      const frame=document.getElementById("mock-nperf-map")?.getBoundingClientRect();
      return stage && frame && frame.width <= stage.width+1;
    },null,{timeout:6000});
    const map=await page.evaluate(()=>({stage:document.getElementById("nperf-map").getBoundingClientRect(),frame:document.getElementById("mock-nperf-map").getBoundingClientRect()}));
    assert.ok(map.frame.width <= map.stage.width+1,"whole provider map fits the "+width+"px viewport");
  }
  assert.deepEqual(errors,[],"no client-side page errors");
  assert.equal(adCalls,0);
  console.log("PASS: Mobile Coverage — licensed script, 9 countries, 5-language UI, theme, mobile and zero ad requests");
} finally {await browser.close();}
