import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync, readdirSync} from "node:fs";
import {runInNewContext} from "node:vm";

const root=new URL("../",import.meta.url);
const read=path=>readFileSync(new URL(path,root),"utf8");
const consent=read("privacy-choice.js");
const loader=read("adsterra-banner-loader.js");
const homepage=read("index.html");

function makeDom(stored={}) {
  const memory=new Map(Object.entries(stored));
  const nodes=[];
  const createElement=tag=>{
    const el={
      tag, children:[], listeners:{}, id:"", className:"", textContent:"",
      setAttribute(){}, append(...items){this.children.push(...items);},
      appendChild(item){this.children.push(item);}, remove(){this.removed=true;},
      addEventListener(type,cb){this.listeners[type]=cb;}, focus(){},
      get isConnected(){return true;}, querySelectorAll(){return [];}
    };
    nodes.push(el);
    return el;
  };
  const body=createElement("body");
  const footer=createElement("footer");
  const languageSelect=createElement("select");
  languageSelect.id="languageSelect";languageSelect.value="en";
  const getElementById=id=>nodes.find(n=>n.id===id&&!n.removed)||null;
  const callbacks={};
  const document={
    body,head:createElement("head"),readyState:"loading",documentElement:{lang:"en"},
    cookie:"",activeElement:null,createElement,getElementById,
    querySelector:s=>s===".footer-links"?footer:s==="footer"?footer:null,
    addEventListener:(type,cb)=>{callbacks[type]=cb;}
  };
  const storage={getItem:key=>memory.has(key)?memory.get(key):null,
    setItem:(key,value)=>memory.set(key,value)};
  let reloads=0;
  const window={location:{reload(){reloads++;}},dataLayer:[]};
  const location={hostname:"appsandgames.org"};
  runInNewContext(consent,{document,window,localStorage:storage,location,navigator:{language:"en"},Date});
  callbacks.DOMContentLoaded();
  return {nodes,memory,document,window,footer,
    get banner(){return getElementById("ag-privacy-banner");},
    get dialog(){return getElementById("ag-privacy-dialog-title");},
    get reloads(){return reloads;}
  };
}
const buttons=(node)=>node.children.flatMap(child=>{
  if(child?.tag==="div")return child.children.filter(el=>el.tag==="button");
  return [];
});

test("one website banner, separate purposes in Settings, no Adsterra popup",()=>{
  const d=makeDom();
  assert.ok(d.banner);
  assert.equal(d.nodes.filter(x=>x.id==="ag-privacy-banner"&&!x.removed).length,1);
  assert.deepEqual(buttons(d.banner).map(x=>x.textContent),["Reject all","Settings","Accept all"]);
  assert.doesNotMatch(homepage,/src="adsterra-consent\.js"/);
  assert.doesNotMatch(homepage,/src="https:\/\/bauval\.org/);
  const settings=buttons(d.banner).find(x=>x.textContent==="Settings");
  settings.listeners.click();
  assert.ok(d.dialog);
  assert.ok(d.nodes.find(x=>x.id==="ag-analytics-toggle"));
  assert.ok(d.nodes.find(x=>x.id==="ag-advertising-toggle"));
  assert.equal(d.nodes.find(x=>x.id==="ag-analytics-toggle").checked,false);
  assert.equal(d.nodes.find(x=>x.id==="ag-advertising-toggle").checked,false);
});

test("Accept all persists both choices then reloads; Reject all persists neither",()=>{
  for(const [buttonName,expected] of [["Accept all",true],["Reject all",false]]){
    const d=makeDom();
    buttons(d.banner).find(x=>x.textContent===buttonName).listeners.click();
    const record=JSON.parse(d.memory.get("appsGamesPrivacyConsentV1"));
    assert.equal(record.analytics,expected);
    assert.equal(record.advertising,expected);
    assert.equal(record.partnerRevision,"adsterra-2026-11");
    assert.equal(d.reloads,1);
  }
});

test("prior explicit analytics and Adsterra choices can be migrated without new opt-in",()=>{
  const d=makeDom({
    appsGamesWebAnalyticsChoiceV1:JSON.stringify({version:1,analytics:false,updatedAt:new Date().toISOString()}),
    appsGamesAdsterraChoiceV2:JSON.stringify({version:2,choice:"allow",when:Date.now()})
  });
  const record=JSON.parse(d.memory.get("appsGamesPrivacyConsentV1"));
  assert.equal(record.analytics,false);
  assert.equal(record.advertising,true);
  assert.equal(d.banner,null);
});

test("all five languages and vendor disclosures are in the shared control",()=>{
  for(const lang of ["en","hr","de","it","es"]){
    assert.match(consent,new RegExp("    "+lang+": \\{"));
  }
  assert.match(consent,/Adsterra Privacy Policy/);
  assert.match(consent,/analytics_storage: "denied"/);
  assert.match(consent,/ad_storage: "denied"/);
  assert.match(consent,/readChoice\(\) !== true \|\|/);
  assert.doesNotMatch(consent,/adsbygoogle|googlesyndication/);
  assert.match(loader,/appsGamesPrivacyConsentV1/);
  assert.match(loader,/if \(!selected \|\| selected\.advertising !== true\) return;/);
  assert.match(loader,/record\.partnerRevision === "adsterra-2026-11"/);
  const htmls=readdirSync(root).filter(x=>x.endsWith(".html")&&!x.startsWith("google"));
  for(const filename of htmls)assert.match(read(filename),/src="privacy-choice\.js"/);
});
