import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const source=read("adsterra-banner-loader.js");
const html=read("index.html");
const css=read("style.css");
const DAY=86400000;

function queryMatches(q,w) {
 const min=q.match(/min-width:\\s*(\\d+)px/);
 const max=q.match(/max-width:\\s*(\\d+)px/);
 return (!min||w>=Number(min[1]))&&(!max||w<=Number(max[1]));
}
function simulate(unit,width,choice="allow",ageDays=0,readyState="loading"){
 const output=[];
 const slot={hidden:true,insertBefore(){}};
 const script={dataset:{unit},parentElement:slot};
 const document={currentScript:script,readyState,createElement:()=>({}),write:code=>output.push(code)};
 const localStorage={getItem:()=>choice===null?null:JSON.stringify({
    version:2,choice,when:Date.now()-ageDays*DAY})};
 const matchMedia=query=>({matches:queryMatches(query,width)});
 runInNewContext(source,{document,localStorage,matchMedia,Date});
 return {output,hidden:slot.hidden};
}
const codes=(width,choice="allow",age=0)=>["desktop","mobile","sidebar"]
  .flatMap(unit=>simulate(unit,width,choice,age).output);

test("tablets use size that fits; wide desktop gets a second distinct banner",()=>{
 for(const [width,count] of [[319,0],[320,1],[390,1],[767,1],[768,1],
                            [799,1],[800,1],[1024,1],[1279,1],[1280,2],[1440,2]]) {
   assert.equal(codes(width).length,count,"viewport "+width);
 }
 assert.match(codes(768)[0],/fc02ce1675aa14021ad3dee29c123264/);
 assert.match(codes(1024)[0],/3e88187807f72645af6b39e90957f6a8/);
 assert.match(codes(1440)[1],/0f5386e1fbab687b18a7f7686197bec7/);
});
test("no ad requests without active ad consent",()=>{
 for(const w of [390,768,800,1024,1280,1440]){
  assert.equal(codes(w,"reject").length,0);
  assert.equal(codes(w,null).length,0);
  assert.equal(codes(w,"allow",181).length,0);
 }
 assert.equal(simulate("sidebar",1440,"allow",0,"complete").output.length,0);
});
test("original snippets and unique placement IDs remain intact",()=>{
 assert.equal((html.match(/src="adsterra-banner-loader\\.js"/g)||[]).length,3);
 for(const [unit,id] of [["desktop","32042360"],["mobile","32042361"],["sidebar","32042362"]]) {
  assert.match(html,new RegExp('data-ad-placement="'+id+'"[^>]*hidden><script src="adsterra-banner-loader.js"[^>]*data-unit="'+unit+'"'));
 }
 for(const snippet of codes(1440)) {
   assert.match(snippet,/format' : 'iframe'/);
   assert.match(snippet,/^<script>/);
   assert.match(snippet,/https:\\/\\/bauval\\.org\\/22\\//);
 }
 assert.match(css,/@media \\(max-width: 799px\\)/);
 assert.match(css,/@media \\(min-width: 1280px\\)/);
});
