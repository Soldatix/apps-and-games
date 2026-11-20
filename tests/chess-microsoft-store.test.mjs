import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const detail = read('wizard-chess-3d.html');
const i18n = read('detail-i18n.js');
const main = read('index.html');
const catalog = read('script.js');
const style = read('style.css');
const store = 'https://apps.microsoft.com/detail/9MWQ5CZNLSBD';

test('chess detail links to published Microsoft Store edition alongside original Web App', () => {
  assert.equal(detail.split('id="windows-store-card"').length - 1, 1);
  assert.equal(detail.split('id="web-app-open"').length - 1, 1);
  assert.match(detail, /href="https:\/\/chess\.appsandgames\.org\/\?install=web"/);
  assert.ok(detail.includes('href="' + store + '"'));
  assert.match(detail, /platform-download-grid--two/);
  assert.match(style, /\.platform-download-grid--two\s*\{/);
  assert.match(style, /@media \(max-width: 760px\)/);
});

test('all five languages translate the chess Store button and card text', () => {
  const begin = i18n.indexOf('if (slug === "wizard-chess-3d")');
  const end = i18n.indexOf('if (slug === "tetris")', begin);
  assert.ok(begin >= 0 && end > begin);
  const chess = i18n.slice(begin, end);
  assert.equal((chess.match(/"storeOpen":/g) || []).length, 5);
  assert.equal((chess.match(/"storeDescription":/g) || []).length, 5);
  assert.match(chess, /windows-store-open/);
  assert.match(chess, /windows-store-description/);
  for (const lang of ['en','hr','de','it','es']) {
    assert.ok(chess.includes('"' + lang + '": {'), lang);
  }
});

test('catalog advertises Windows while preserving existing chess play link', () => {
  const pos = catalog.indexOf('name: "Animated 3D Chess"');
  const next = catalog.indexOf('name:', pos+10);
  assert.ok(pos >= 0);
  const entry = catalog.slice(pos, next);
  assert.match(entry, /platforms: \["Web \/ PWA", "Windows \(Microsoft Store\)"\]/);
  assert.match(entry, /https:\/\/chess\.appsandgames\.org\//);
  assert.match(main, /Web \/ PWA · Windows \(Microsoft Store\)/);
  assert.match(main, /href="wizard-chess-3d"/);
});

test('chess JSON-LD carries Windows distribution link', () => {
  const json = detail.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(json);
  const data = JSON.parse(json[1]);
  assert.equal(data['@type'], 'VideoGame');
  assert.equal(data.installUrl, store);
  assert.match(data.gamePlatform, /Windows 11/);
});

test('Windows V1.1 private online multiplayer has distinct Web/PWA wording',()=>{
  assert.match(detail,/Windows 10\/11 x64 · V1\.1 · Free/);
  assert.match(detail,/Windows V1\.1 — Online Multiplayer/);
  assert.match(detail,/Web\/PWA remains local\/offline/);
  const start=i18n.indexOf('if (slug === "wizard-chess-3d")');
  const stop=i18n.indexOf('if (slug === "tetris")',start);
  const section=i18n.slice(start,stop);
  assert.equal((section.match(/"storeDescription":/g)||[]).length,5);
  assert.match(section,/10-znakovni/);
  assert.match(catalog,/private online multiplayer on Windows V1\.1/);
  assert.match(main,/private online multiplayer on Windows V1\.1/);
});

test('Web/PWA V1.1 and Microsoft Store V1.1 descriptions present cross-platform online play',()=>{
  assert.match(detail,/online multiplayer in both V1\.1 editions/);
  assert.match(detail,/Both Web\/PWA V1\.1 and Windows V1\.1 support online multiplayer/);
  assert.match(detail,/Internet is required for online play/);
  const start=i18n.indexOf('if (slug === "wizard-chess-3d")');
  const stop=i18n.indexOf('if (slug === "tetris")',start);
  const section=i18n.slice(start,stop);
  assert.equal((section.match(/"webDescription":/g)||[]).length,5);
  assert.equal((section.match(/"storeDescription":/g)||[]).length,5);
  assert.match(section,/Web\/PWA V1\.1/);
  assert.doesNotMatch(section,/Web\/PWA remains local\/offline|noch nicht in Web\/PWA/);
  assert.match(main,/private online multiplayer on Web\/PWA V1\.1 and Windows V1\.1/);
  assert.match(catalog,/private online multiplayer on Web\/PWA V1\.1 and Windows V1\.1/);
});
