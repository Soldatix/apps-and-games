import assert from "node:assert/strict";
import { chromium } from "playwright";
import {fileURLToPath} from "node:url";

const browser=await chromium.launch({headless:true});
const root="http://127.0.0.1:4173/mobile-coverage/";
const local=(path)=>fileURLToPath(new URL("../"+path,import.meta.url));
const noAdRecord=null;
const yesAdRecord=JSON.stringify({
  version:1,partnerRevision:"adsterra-2026-11",
  analytics:false,advertising:true,timestamp:Date.now()
});
const rejectedRecord=JSON.stringify({
  version:1,partnerRevision:"adsterra-2026-11",
  analytics:false,advertising:false,timestamp:Date.now()
});

async function visit(width,choice){
  const context=await browser.newContext({viewport:{width,height:860}});
  let vendorRequests=0,mapRequests=0,firstPartyLoader=0;
  if(choice){
    await context.addInitScript(({value})=>{
      try {
        if(location.hostname==="127.0.0.1"){
          localStorage.setItem("appsGamesPrivacyConsentV1",value);
          localStorage.setItem("appsGamesLanguage","hr");
        }
      } catch (_){}
    },{value:choice});
  }
  await context.route(/ws\.nperf\.com\/partner\/js-map/,route=>{
    mapRequests++;
    return route.fulfill({status:200,contentType:"application/javascript",body: "const frame=document.createElement(\"iframe\");frame.id=\"mock-nperf-map\";frame.width=\"560\";frame.height=\"385\";document.currentScript.insertAdjacentElement(\"afterend\",frame);"});
  });
  await context.route(/https:\/\/bauval\.org\/22\//,route=>{
    vendorRequests++;
    return route.fulfill({status:200,contentType:"application/javascript",body:
      'const el=document.createElement("iframe");el.id="mock-ad-banner";el.width=String(window.atOptions?.width||0);el.height=String(window.atOptions?.height||0);document.currentScript.parentElement.append(el);'});
  });
  await context.route("https://appsandgames.org/privacy-choice.js",route=>route.fulfill({path:local("privacy-choice.js"),contentType:"application/javascript"}));
  await context.route("https://appsandgames.org/privacy-choice.css",route=>route.fulfill({path:local("privacy-choice.css"),contentType:"text/css"}));
  await context.route("https://appsandgames.org/assets/js/ag-language-menu.js",route=>route.fulfill({path:local("assets/js/ag-language-menu.js"),contentType:"application/javascript"}));
  await context.route(/127\.0\.0\.1:4173\/mobile-coverage\/adsterra-banner-loader\.js/,route=>{firstPartyLoader++;return route.continue()});
  const page=await context.newPage();
  const errors=[];page.on("pageerror",err=>errors.push(err.message));
  await page.goto(root,{waitUntil:"domcontentloaded"});
  await page.locator("#mock-nperf-map").waitFor();
  await page.waitForTimeout(150);
  const result=await page.evaluate(()=>{
    const area=document.getElementById("ad-area");
    const frame=document.getElementById("mock-ad-banner");
    const mapShell=document.querySelector(".map-shell");
    const box=el=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width}};
    return {
      areaHidden:area.hidden,
      adCount:document.querySelectorAll("#mock-ad-banner").length,
      frameWidth:frame?Number(frame.width):null,
      frameHeight:frame?Number(frame.height):null,
      slotDesktopHidden:document.getElementById("ad-desktop-slot").hidden,
      slotMobileHidden:document.getElementById("ad-mobile-slot").hidden,
      areaBox:box(area),
      mapBox:box(mapShell),
      docWidth:document.documentElement.scrollWidth,
      adLabels:area.querySelectorAll(".ag-ad-label").length
    };
  });
  await context.close();
  return {width,choice:choice===yesAdRecord?"allow":choice===rejectedRecord?"reject":"none",vendorRequests,mapRequests,firstPartyLoader,result,errors};
}

try{
  for(const width of [375,768,800,1280]){
    const x=await visit(width,noAdRecord);
    assert.equal(x.mapRequests,1,"nPerf always loads "+width);
    assert.equal(x.vendorRequests,0,"no ads without consent "+width);
    assert.equal(x.result.adCount,0);
    assert.equal(x.result.areaHidden,true);
    assert.equal(x.firstPartyLoader,2);
    assert.deepEqual(x.errors,[]);
  }
  for(const width of [320,375,768,799,800,1280]){
    const x=await visit(width,yesAdRecord);
    const expected=width<800?320:728;
    assert.equal(x.mapRequests,1,"nPerf still works on "+width);
    assert.equal(x.vendorRequests,1,"exactly one Adsterra placement at "+width);
    assert.equal(x.result.adCount,1);
    assert.equal(x.result.frameWidth,expected);
    assert.equal(x.result.frameHeight,expected===320?50:90);
    assert.equal(x.result.areaHidden,false);
    assert.equal(x.result.adLabels,1);
    assert.equal(x.result.slotDesktopHidden,expected!==728);
    assert.equal(x.result.slotMobileHidden,expected!==320);
    assert.ok(x.result.areaBox.bottom <= x.result.mapBox.top+1,"ad must be above nPerf map");
    assert.ok(x.result.areaBox.left>=-1 && x.result.areaBox.right<=width+1,"ad container fits viewport");
    assert.deepEqual(x.errors,[],"client errors at "+width);
    console.log("PASS: consented "+width+"px => "+expected+"px original Adsterra unit, nPerf intact");
  }
  for(const width of [375,1280]){
    const x=await visit(width,rejectedRecord);
    assert.equal(x.vendorRequests,0,"rejected choice never calls Adsterra");
    assert.equal(x.result.areaHidden,true);
    assert.deepEqual(x.errors,[]);
  }
  console.log("PASS: Mobile Coverage consent, originals, responsive placements, map separation");
} finally {await browser.close();}
