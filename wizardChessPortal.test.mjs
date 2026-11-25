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

test('Microsoft Store chess distribution card and desktop platform metadata',()=>{assert.match(detail,/id="windows-store-card"/);assert.match(detail,/https:\/\/apps\.microsoft\.com\/detail\/9MWQ5CZNLSBD/);assert.match(detail,/id="chess-portable-card"/);assert.match(idx,/Web \/ PWA · Windows \(Microsoft Store\)/);assert.match(js,/platforms: \["Web \/ PWA", "Windows \(Microsoft Store\)", "Windows Portable"\]/);assert.match(read("style.css"),/\.platform-download-grid--two/);});
test('Store card is translated in all supported site languages',()=>{for(const k of ["en","hr","de","it","es"])assert.match(i18n,new RegExp('"' + k + '":\\s*\\{[\\s\\S]*?"storeOpen"'));assert.match(i18n,/windows-store-open/);assert.match(i18n,/windows-store-description/);});

test('Windows and Web/PWA V1.2.0 are both advertised as online capable',()=>{
 assert.match(detail,/Online Multiplayer — Web\/PWA and Windows V1\.2\.0/);
 assert.match(detail,/Internet is required for online play/);
 assert.match(js,/private online multiplayer and rematches with automatic color swaps on Web\/PWA and Windows V1\.2\.0/);
 assert.match(idx,/private online multiplayer and rematches with automatic color swaps on Web\/PWA and Windows V1\.2\.0/);
});
test('all chess translations and dynamic cards agree with the released version',()=>{
 const catalog=JSON.parse(js.match(/const wizardChessPortalI18n = (\{[\s\S]*?\n\});/)[1]);
 const detailTranslations=JSON.parse(i18n.match(/"wizard-chess-3d": (\{[\s\S]*?\n        \}),/)[1]);
 const platformTranslations=JSON.parse(i18n.match(/if \(slug === "wizard-chess-3d"\) \{\s*const w = (\{[\s\S]*?\n\})\[language\];/)[1]);
 for(const lang of ['en','hr','de','it','es']){
  assert.match(catalog[lang].card[0],/Windows V1\.2\.0/);
  for(const key of ['description','subtitle','text','info']) assert.match(detailTranslations[lang][key],/V1\.2\.0/);
  assert.match(detailTranslations[lang].info,/privacy-policy#animated-3d-chess/);
  assert.match(platformTranslations[lang].webDescription,/Windows V1\.2\.0/);
  assert.match(platformTranslations[lang].storeDescription,/1\.2\.0\.0/);
  assert.doesNotMatch(JSON.stringify([catalog[lang],detailTranslations[lang],platformTranslations[lang]]),/V1\.1/);
 }
});
test('both platform version labels and rematch disclosure',()=>{
 assert.match(detail,/Web \/ PWA · V1\.2\.0/);
 assert.match(detail,/Windows 10\/11 x64 · V1\.2\.0/);
 assert.match(detail,/Rematches with automatic color swaps require both players/);
 assert.match(i18n,/Revanš uz automatsku zamjenu boja/);
 assert.doesNotMatch(detail,/Windows V1\.1|Web\/PWA V1\.1/);
});

test('Portable download, matching source, checksum, and five localized security messages',()=>{
 const p=JSON.parse(read('downloads/animated-3d-chess/versions.json'));
 assert.equal(p.productId,'apps-games-animated-3d-chess');
 assert.equal(p.platforms.windowsPortable.published,true);
 assert.equal(p.platforms.windowsPortable.downloadUrl,'https://appsandgames.org/wizard-chess-3d');
 for(const s of ["https://github.com/Soldatix/Animated3DChess-Windows-Source/releases/download/animated-3d-chess-portable-v1.2.0/Animated3DChess-Portable-v1.2.0-x64.zip","https://github.com/Soldatix/Animated3DChess-Windows-Source/releases/download/animated-3d-chess-portable-v1.2.0/Animated3DChess-Portable-v1.2.0-Corresponding-Source.zip","https://github.com/Soldatix/Animated3DChess-Windows-Source/releases/tag/animated-3d-chess-portable-v1.2.0","c40f2f0f2184f5ab61eb169e675394b062cca1d576f8f55a9385120d2fee7f4f","Animated3DChess-Portable-v1.2.0-x64.zip"]) assert.ok(detail.includes(s),s);
 const translations=JSON.parse(i18n.match(/const chessPortable = (\{[\s\S]*?\n\});/)[1]);
 for(const k of ['en','hr','de','it','es']) assert.equal(translations[k].length,8);
 assert.match(read('privacy-policy.html'),/id="chess-portable-privacy"/);
 assert.match(detail,/Never bypass malware detections or disable SmartScreen/);
});
