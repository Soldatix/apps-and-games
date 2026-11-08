import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";
const source=readFileSync(new URL("../adsterra-banner-loader.js",import.meta.url),"utf8");
function simulate(unit,width,choice,ageDays=0,readyState="loading"){
 const output=[];
 const slot={hidden:true,insertBefore(){}};
 const script={dataset:{unit},parentElement:slot};
 const document={currentScript:script,readyState,createElement:()=>({}),write:code=>output.push(code)};
 const localStorage={getItem:()=>JSON.stringify({version:2,choice,when:Date.now()-ageDays*86400000})};
 const matchMedia=q=>({matches:q.includes("min-width: 768px")?width>=768:width>=320&&width<=767});
 runInNewContext(source,{document,localStorage,matchMedia,Date});
 return output;
}
test("no ad requests after rejection, expiry, or mismatched viewport",()=>{
 assert.equal(simulate("desktop",1360,"reject").length,0);
 assert.equal(simulate("desktop",1360,"allow",181).length,0);
 assert.equal(simulate("desktop",390,"allow").length,0);
 assert.equal(simulate("mobile",1360,"allow").length,0);
 assert.equal(simulate("desktop",1360,"allow",0,"complete").length,0);
});
test("only correct original Adsterra GET CODE is emitted following opt-in",()=>{
 const a=simulate("desktop",1360,"allow");
 const b=simulate("mobile",390,"allow");
 assert.equal(a.length,1);
 assert.equal(b.length,1);
 assert.match(a[0],/3e88187807f72645af6b39e90957f6a8/);
 assert.match(b[0],/fc02ce1675aa14021ad3dee29c123264/);
 assert.match(a[0],/format' : 'iframe'/);
 assert.match(b[0],/format' : 'iframe'/);
});
