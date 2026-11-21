/** Deterministic service-worker lifecycle simulation (not browser E2E).
 * Validates only static/allowed precache, offline navigation, update cleanup,
 * no sensitive runtime cache writes and no unrelated cache deletion. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const base='http://127.0.0.1:8765/qr-code-generator/';
const store=new Map();
store.set('another-pwa-cache',new Map([['http://127.0.0.1:8765/other',new Response('not ours')]]));
let online=true,skipWaitingCalls=0,claimCalls=0;
const cacheApi={
  async open(name){
    if(!store.has(name))store.set(name,new Map());
    const data=store.get(name);
    return {
      async addAll(requests) {
        if(!online) throw new Error('precache network unavailable');
        for(const req of requests) {
          const url=typeof req==='string'?req:req.url;
          assert.ok(url.startsWith(base),'precache must stay in app scope');
          const ct=url.endsWith('/')||url.endsWith('.html')?'text/html':'text/plain';
          data.set(url,new Response('public shell',{headers:{'content-type':ct}}));
        }
      },
      async match(url){const found=data.get(typeof url==='string'?url:url.url);return found?.clone();},
      async keys(){return [...data.keys()].map(url=>({url}));}
    };
  },
  async keys(){return [...store.keys()];},
  async delete(name){return store.delete(name);},
  async match(url){
    const key=typeof url==='string'?url:url.url;
    for(const data of store.values()) if(data.has(key)) return data.get(key).clone();
    return undefined;
  }
};
const fetchStub=async(request) => {
  if(!online) throw new TypeError('Network unavailable');
  const url=typeof request==='string'?request:request.url;
  return new Response('online',{headers:{'content-type':url.endsWith('.js')?'text/javascript':'text/html'}});
};
function createWorker(code){
  const listeners={};
  const self={registration:{scope:base},
    clients:{claim:async()=>{claimCalls++;}},
    skipWaiting:()=>{skipWaitingCalls++;},
    addEventListener:(name,fn)=>{listeners[name]=fn;}};
  vm.runInNewContext(code,{self,URL,Request,Response,caches:cacheApi,fetch:fetchStub,Set,Promise,console});
  return {
    async run(type,arg={}){
      let pending=null,answered;
      const event={...arg,waitUntil(p){pending=p;},respondWith(p){answered=p;}};
      listeners[type](event);
      if(pending) await pending;
      return answered ? await answered : undefined;
    }
  };
}
let code=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf-8');
let worker=createWorker(code);
await worker.run('install');
assert.ok(store.has('ag-qr-code-generator-shell-1.3.0-r2'));
const shell=store.get('ag-qr-code-generator-shell-1.3.0-r2');
assert.ok(shell.size>=25,'complete app shell');
console.log('PASS install precaches explicit app assets');
await worker.run('activate');
assert.ok(store.has('another-pwa-cache'));
assert.equal(claimCalls,1);
console.log('PASS activate retains unrelated cache');
online=false;
let result=await worker.run('fetch',{request:{method:'GET',mode:'navigate',url:base+'?install=web&ssid=secretvalue'}});
assert.equal(await result.text(),'public shell');
assert.ok([...shell.keys()].every(k=>!k.includes('?')&&!k.includes('secretvalue')));
console.log('PASS offline ?install=web served without caching URL query');
result=await worker.run('fetch',{request:{method:'GET',mode:'same-origin',url:base+'assets/js/payload.mjs'}});
assert.equal(await result.text(),'public shell');
console.log('PASS offline app assets served from precache');
const keysBefore=shell.size;
await worker.run('fetch',{request:{method:'POST',mode:'same-origin',url:base+'private-qr-data'}});
await worker.run('fetch',{request:{method:'GET',mode:'same-origin',url:base+'private-qr-data?password=secret'}});
await worker.run('fetch',{request:{method:'GET',mode:'same-origin',url:'https://other.invalid/tracker'}});
assert.equal(shell.size,keysBefore);
console.log('PASS no runtime caching of private or cross-origin requests');
online=true;
result=await worker.run('fetch',{request:{method:'GET',mode:'same-origin',url:base+'assets/js/app.mjs'}});
assert.equal(await result.text(),'online','online modules must prefer network to avoid mixed-version HTML + JS');
assert.equal(await shell.get(base+'assets/js/app.mjs').clone().text(),'public shell','fetch MUST NOT rewrite immutable versioned cache');
console.log('PASS online static modules bypass stale cached copy without runtime cache writes');
online=false;
result=await worker.run('fetch',{request:{method:'GET',mode:'same-origin',url:base+'assets/js/app.mjs'}});
assert.equal(await result.text(),'public shell');
console.log('PASS offline static module still falls back to the exact precached version');
worker.run('message',{data:{type:'SKIP_WAITING'}});
assert.equal(skipWaitingCalls,1);
console.log('PASS skipWaiting called only after explicit message');
online=true;
worker=createWorker(code.replace('1.3.0-r2','1.3.0-r3'));
await worker.run('install');
await worker.run('activate');
assert.ok(store.has('ag-qr-code-generator-shell-1.3.0-r3'));
assert.ok(!store.has('ag-qr-code-generator-shell-1.3.0-r2'));
assert.ok(store.has('another-pwa-cache'));
console.log('PASS version bump activates new cache, removes own stale cache only');
console.log('SW_SIMULATION=9/9 PASS');
