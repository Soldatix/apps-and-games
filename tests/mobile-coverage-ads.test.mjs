import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const source=read("mobile-coverage/adsterra-banner-loader.js");
const html=read("mobile-coverage/index.html");
const css=read("mobile-coverage/styles.css");
const DAY=86400000;
const makeChoice=(advertising,timestamp=Date.now(),extra={})=>JSON.stringify({
  version:1,partnerRevision:"adsterra-2026-11",analytics:false,advertising,timestamp,...extra
});
const media=(query,width)=>{
  const min=query.match(/min-width:\s*(\d+)px/);
  const max=query.match(/max-width:\s*(\d+)px/);
  return (!min||width>=Number(min[1]))&&(!max||width<=Number(max[1]));
};
function simulate(unit,width,local=null,shared=null,readyState="loading"){
  const writes=[];
  const area={id:"ad-area",hidden:true};
  const slot={hidden:true,parentElement:area,insertBefore(el){this.label=el}};
  const current={parentElement:slot,dataset:{unit}};
  const doc={
    currentScript:current,readyState,
    cookie:shared?"ag_privacy_choices_v1="+encodeURIComponent(shared):"",
    createElement:tag=>({tagName:tag,className:"",textContent:""}),
    write:content=>writes.push(content)
  };
  const localStorage={getItem:key=>{
    if(key==="appsGamesPrivacyConsentV1")return local;
    if(key==="appsGamesLanguage")return "hr";
    return null;
  }};
  runInNewContext(source,{document:doc,localStorage,matchMedia:q=>({matches:media(q,width)}),navigator:{language:"en-GB"},Date,Number,JSON});
  return {writes,area,slot};
}
const activeAt=(width,choice=makeChoice(true))=>
  ["desktop","mobile"].map(unit=>simulate(unit,width,choice));

test("desktop and mobile original, distinct Adsterra GET CODE load once per size",()=>{
  for(const [width,expected] of [[319,0],[320,1],[375,1],[768,1],[799,1],[800,1],[1024,1],[1440,1]]){
    const placements=activeAt(width);
    assert.equal(placements.flatMap(x=>x.writes).length,expected,"width "+width);
    if(expected){
      const unit=width<800?1:0;
      assert.equal(placements[unit].writes.length,1);
      assert.equal(placements[unit].area.hidden,false);
      assert.equal(placements[unit].slot.hidden,false);
      assert.equal(placements[1-unit].slot.hidden,true);
      assert.equal(placements[unit].slot.label.textContent,"Oglas");
      assert.equal(placements[unit].slot.label.className,"ag-ad-label");
    }
  }
  const desktop=activeAt(1024).flatMap(x=>x.writes)[0];
  const mobile=activeAt(375).flatMap(x=>x.writes)[0];
  assert.match(desktop,/^<script>\n\s+atOptions = \{/);
  assert.match(desktop,/'key' : '7723b6772f152328437cf4a849099699'/);
  assert.match(desktop,/'format' : 'iframe'/);
  assert.match(desktop,/'height' : 90/);
  assert.match(desktop,/'width' : 728/);
  assert.match(desktop,/src="https:\/\/bauval\.org\/22\/7723b6772f152328437cf4a849099699"/);
  assert.match(mobile,/^<script>\n\s+atOptions = \{/);
  assert.match(mobile,/'key' : '2986915dcf6de53c61c5f9eee1731627'/);
  assert.match(mobile,/'format' : 'iframe'/);
  assert.match(mobile,/'height' : 50/);
  assert.match(mobile,/'width' : 320/);
  assert.match(mobile,/src="https:\/\/bauval\.org\/22\/2986915dcf6de53c61c5f9eee1731627"/);
});

test("deny, missing, expired, malformed, future and wrong-provider consent never load ads",()=>{
  const cases=[
    null,makeChoice(false),makeChoice(true,Date.now()-181*DAY),
    "invalid",makeChoice(true,Date.now()+DAY),
    makeChoice(true,Date.now(),{partnerRevision:"other-provider"}),
    makeChoice(true,Date.now(),{version:2})
  ];
  for(const width of [320,375,768,799,800,1024,1440])for(const local of cases){
    for(const unit of ["desktop","mobile"]){
      const x=simulate(unit,width,local);
      assert.equal(x.writes.length,0,"no ad on "+width+" with "+local);
      assert.equal(x.area.hidden,true);
    }
  }
  assert.equal(simulate("desktop",1024,makeChoice(true),null,"complete").writes.length,0);
});

test("newest valid shared cookie overrides stale local choice across subdomains",()=>{
  const old=Date.now()-3*DAY,latest=Date.now()-DAY;
  assert.equal(simulate("desktop",1280,makeChoice(true,old),makeChoice(false,latest)).writes.length,0);
  assert.equal(simulate("desktop",1280,makeChoice(false,old),makeChoice(true,latest)).writes.length,1);
  assert.equal(simulate("mobile",375,null,makeChoice(true)).writes.length,1);
  assert.equal(simulate("mobile",375,makeChoice(true),makeChoice(false,latest)).writes.length,0);
});

test("Adsterra tags are not in unconsented HTML and consented units do not overlap nPerf",()=>{
  assert.doesNotMatch(html,/https:\/\/bauval\.org\/22\//);
  assert.equal((html.match(/src="\.\/adsterra-banner-loader\.js"/g)||[]).length,2);
  assert.match(html,/id="ad-area"[^>]*hidden/);
  assert.match(html,/id="ad-desktop-slot"[^>]*hidden/);
  assert.match(html,/id="ad-mobile-slot"[^>]*hidden/);
  assert.ok(html.indexOf('id="ad-area"')<html.indexOf('id="nperf-map"'));
  assert.match(css,/@media\(max-width:799px\)/);
  assert.match(css,/@media\(max-width:319px\)/);
  assert.doesNotMatch(source,/setInterval|setTimeout|location\.reload|new Worker|createElement\("iframe"\)/);
});
