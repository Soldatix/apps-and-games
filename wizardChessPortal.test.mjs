import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p => readFileSync(new URL('./'+p,import.meta.url),'utf8');
const idx=read('index.html'), js=read('script.js'), detail=read('wizard-chess-3d.html'),i18n=read('detail-i18n.js');
test('chess static catalog and dynamic catalog',()=>{assert.match(idx,/href="wizard-chess-3d"/);assert.match(js,/detailsUrl: "wizard-chess-3d"/);});
test('existing catalog indexes and appended index 12',()=>{assert.match(js,/cardTranslations\[language\]\[11\] = habitText\.card/);assert.match(js,/cardTranslations\[language\]\[12\] = entry\.card/);});
test('SEO JSON-LD count matches the static app and game catalog',()=>{const m=idx.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);assert.ok(m);const a=JSON.parse(m[1]);const list=a['@graph'].find(x=>x['@type']==='ItemList');const cardCount=(idx.match(/<article class="app-card" data-static-catalog>/g)||[]).length;assert.ok(cardCount>0);assert.equal(list.numberOfItems,cardCount);assert.equal(list.itemListElement.length,cardCount);assert.ok(list.itemListElement.some(x=>x.item.name==='Animated 3D Chess'));assert.ok(list.itemListElement.some(x=>x.item.name==='QR Code Generator'));});
test('detail has five languages and PWA install entrypoint',()=>{assert.match(i18n,/"wizard-chess-3d"/);for(const k of ['en','hr','de','it','es'])assert.ok(i18n.includes('"'+k+'"'),k);assert.match(detail,/\?install=web/);});
test('real chess screenshots are staged as PNG files',()=>{for(const p of ['assets/images/wizard-chess-3d-cover.png','assets/images/wizard-chess-3d-side.png']){const b=readFileSync(new URL('./'+p,import.meta.url));assert.ok(b.length>1024);assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');}});
test('SEO sitemap and canonical route',()=>{assert.match(read('sitemap.xml'),/appsandgames\.org\/wizard-chess-3d/);assert.match(detail,/rel="canonical"/);});
test('existing catalog and website consent remain available',()=>{assert.match(idx,/href="tetris"/);assert.match(js,/detailsUrl: "tetris"/);assert.match(detail,/privacy-choice\.js/);});
test('Stockfish cache limitation disclosed',()=>{assert.match(detail,/Stockfish level 6 needs its engine files cached/);});

test('Microsoft Store chess distribution card and desktop platform metadata',()=>{assert.match(detail,/id="windows-store-card"/);assert.match(detail,/https:\/\/apps\.microsoft\.com\/detail\/9MWQ5CZNLSBD/);assert.match(detail,/platform-download-grid--two/);assert.match(idx,/Web \/ PWA · Windows \(Microsoft Store\)/);assert.match(js,/platforms: \["Web \/ PWA", "Windows \(Microsoft Store\)"\]/);assert.match(read("style.css"),/\.platform-download-grid--two/);});
test('Store card is translated in all supported site languages',()=>{for(const k of ["en","hr","de","it","es"])assert.match(i18n,new RegExp('"' + k + '":\\s*\\{[\\s\\S]*?"storeOpen"'));assert.match(i18n,/windows-store-open/);assert.match(i18n,/windows-store-description/);});

test('Windows V1.1 and Web/PWA V1.1 are both advertised as online capable',()=>{assert.match(detail,/Online Multiplayer — Web\/PWA and Windows V1\.1/);assert.match(detail,/Internet is required for online play/);assert.match(js,/private online multiplayer on Web\/PWA V1\.1 and Windows V1\.1/);assert.match(idx,/private online multiplayer on Web\/PWA V1\.1 and Windows V1\.1/);});

test('Web/PWA V1.1 and Windows V1.1 cross-platform online information is consistent',()=>{
 assert.match(detail,/online multiplayer in both V1\.1 editions/);
 assert.match(detail,/Both Web\/PWA V1\.1 and Windows V1\.1 support online multiplayer/);
 assert.match(js,/private online multiplayer on Web\/PWA V1\.1 and Windows V1\.1/);
 assert.match(idx,/private online multiplayer on Web\/PWA V1\.1 and Windows V1\.1/);
});
