/* Apps & Games — QR Code Generator, PWA v1.3.0
   Public, immutable application shell only. Never cache inputs, QR content, passwords,
   contacts, navigation query parameters, third-party content or user data. */
'use strict';
const CACHE_PREFIX = 'ag-qr-code-generator-shell-';
const CACHE_NAME = `${CACHE_PREFIX}1.3.0-r4`;
const SHELL = [
  './', './manifest.webmanifest',
  './assets/css/styles.css', './assets/css/pwa.css',
  './assets/js/app.mjs', './assets/js/export-filename.mjs', './assets/js/i18n.mjs',
  './assets/js/payload.mjs', './assets/js/renderer.mjs',
  './assets/js/vendor/qr-engine.mjs', './assets/js/pwa.mjs',
  './assets/images/mark.svg', './assets/images/social-cover.png',
  './assets/images/flags/gb.svg', './assets/images/flags/hr.svg',
  './assets/images/flags/de.svg', './assets/images/flags/it.svg',
  './assets/images/flags/es.svg', './assets/images/flags/fr.svg',
  './assets/images/pwa-192.png', './assets/images/pwa-512.png',
  './assets/images/pwa-maskable-192.png', './assets/images/pwa-maskable-512.png',
  './licenses/APACHE-2.0.txt', './licenses/MIT-QRCode-Kazuhiko-Arase.txt',
  './licenses/THIRD_PARTY_NOTICES.md'
];
const ROOT = new URL('./', self.registration.scope);
const ABSOLUTE = SHELL.map(name => new URL(name, ROOT).href);
const STATIC = new Set(ABSOLUTE.filter(x => x !== ROOT.href && x !== new URL('index.html', ROOT).href));
const ENTRY_PATHS = new Set([ROOT.pathname, new URL('index.html', ROOT).pathname]);
// Cloudflare Workers redirects /index.html to the canonical directory root.
// Never precache /index.html with redirect:'error'; cache the clean root instead.
// Only core assets block offline setup; optional preview/icon assets do not.
const REQUIRED = new Set([
  './','./assets/css/styles.css','./assets/css/pwa.css',
  './assets/js/app.mjs','./assets/js/export-filename.mjs','./assets/js/i18n.mjs',
  './assets/js/payload.mjs','./assets/js/renderer.mjs',
  './assets/js/vendor/qr-engine.mjs','./assets/js/pwa.mjs',
  './assets/images/mark.svg',
  './assets/images/flags/gb.svg','./assets/images/flags/hr.svg',
  './assets/images/flags/de.svg','./assets/images/flags/it.svg',
  './assets/images/flags/es.svg','./assets/images/flags/fr.svg'
].map(name => new URL(name, ROOT).href));
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const toRequest = url => new Request(url, {credentials:'same-origin',cache:'reload',redirect:'error'});
    await cache.addAll(ABSOLUTE.filter(url => REQUIRED.has(url)).map(toRequest));
    try { await cache.addAll(ABSOLUTE.filter(url => !REQUIRED.has(url)).map(toRequest)); }
    catch { /* A nonessential static asset failed; core app remains available. */ }
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== ROOT.origin) return;
  // Only the exact app entry can use the offline navigation fallback. Query string
  // (?install=web or otherwise) is NOT used as a cache key or stored.
  if (request.mode === 'navigate' && ENTRY_PATHS.has(url.pathname)) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response.ok && response.headers.get('content-type')?.includes('text/html')) return response;
      } catch { /* offline: use audited cached static shell */ }
      return (await caches.match(ROOT.href)) ||
        Response.error();
    })());
    return;
  }
  // Fixed allow-list; never runtime-cache arbitrary URLs or API responses.
  if (url.search || !STATIC.has(url.href)) return;
  event.respondWith((async () => {
    // Network-first for static assets while online. HTML navigation is also
    // network-first: the two must not mix a new index.html with stale modules
    // from the previous PWA cache during a rolling deployment. No runtime
    // cache.put is used, so only the versioned install list writes to Cache Storage.
    try {
      const fresh = await fetch(request, { cache: 'no-store' });
      if (fresh.ok) return fresh;
    } catch { /* offline or a temporary network failure */ }
    return (await caches.match(url.href)) || Response.error();
  })());
});
