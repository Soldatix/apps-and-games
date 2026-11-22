/** Cloudflare auto-trailing-slash regression; simulated redirect, not real deployment. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const code=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
const base='https://preview.example.test/qr-code-generator/';
const store=new Map();
let online=true,redirectCount=0;
const caches={
  async open(name){
    if(!store.has(name))store.set(name,new Map());
    const entries=store.get(name);
    return {async addAll(reqs){
      for(const req of reqs){
        const url=typeof req==='string'?req:req.url;
        assert.ok(url.startsWith(base),'precache must remain in app scope');
        assert.equal(req.redirect,'error','redirect must remain blocked');
        if(url.endsWith('/index.html')){redirectCount++;throw new TypeError('Cloudflare 307 index.html redirect blocked');}
        if(!online)throw new TypeError('offline');
        entries.set(url,new Response('cached shell',{headers:{'content-type':url.endsWith('/')?'text/html':'text/plain'}}));
      }
    }};
  },
  async keys(){return [...store.keys()];},
  async delete(name){return store.delete(name);},
  async match(url){
    for(const entries of store.values())if(entries.has(url))return entries.get(url).clone();
    return undefined;
  }
};
const listeners={};
const self={registration:{scope:base},clients:{claim:async()=>{}},skipWaiting(){},addEventListener(k,fn){listeners[k]=fn;}};
const fetch=async()=>{if(!online)throw new TypeError('Network unavailable');return new Response('fresh shell',{headers:{'content-type':'text/html'}});};
vm.runInNewContext(code,{URL,Request,Response,Set,Promise,caches,fetch,self});
async function fire(type,request){
  let pending=null,answer=null;
  listeners[type]({request,waitUntil(x){pending=x;},respondWith(x){answer=x;}});
  if(pending)await pending;
  return answer?await answer:null;
}
await fire('install');
assert.equal(redirectCount,0,'SW install must not ask for a noncanonical /index.html');
assert.deepEqual(await caches.keys(),['ag-qr-code-generator-shell-1.3.0-r4']);
assert.ok(await caches.match(base),'canonical root must be precached');
assert.equal(await caches.match(base+'index.html'),undefined);
console.log('PASS Cloudflare redirect-simulated install caches canonical HTML root');
await fire('activate');
online=false;
let page=await fire('fetch',{method:'GET',mode:'navigate',url:base+'?install=web&ssid=secret'});
assert.equal(await page.text(),'cached shell');
page=await fire('fetch',{method:'GET',mode:'navigate',url:base+'index.html'});
assert.equal(await page.text(),'cached shell');
console.log('PASS offline app navigation uses canonical cached shell');
const module=await fire('fetch',{method:'GET',mode:'same-origin',url:base+'assets/js/export-filename.mjs'});
assert.equal(await module.text(),'cached shell');
console.log('PASS offline filename-export dependency');
assert.ok((await caches.keys()).every(s=>!s.includes('secret')));
console.log('PASS private query strings never become cache names');
console.log('CLOUDFLARE_REDIRECT_SIM=4/4 PASS');
