# Apps & Games — QR Code Generator Web/PWA v1.3.0

**Release candidate / review only.** This app is deployed at `/qr-code-generator/` under `appsandgames.org`. It does **not** introduce a new repo, hostname, ad placement or third-party SDK.

## Included

- Locally bundled PWA manifest and four PNG icons (192/512 regular + maskable).
- Install help via `?install=web` in EN/HR/DE/IT/ES/FR, with native `beforeinstallprompt` when supported and manual fallbacks.
- Versioned service worker `ag-qr-code-generator-shell-1.3.0-r2`, explicit static allow-list, network-first static read and offline fallback. No runtime caching or user QR data persistence.
- Existing QR generator HTML/CSS/modules retained; only `index.html` was augmented to load PWA assets and show v1.3.0.

## Test without extra dependencies

From `qr-code-generator/` run `python -m unittest discover -s tests -p 'test_*.py'` and `node tests/qr_regression.mjs` and `node tests/sw_simulated.mjs` (Node 18+). `node --check sw.js` and `node --check assets/js/pwa.mjs` are optional syntax checks.

## Deployment requirements

1. Existing HTTPS path `/qr-code-generator/` must serve the manifest, icons and `sw.js` with correct types, and must not proxy files to the portal detail URL (`/qr-code-generator.html`).
2. Validate Chrome/Edge installability, repeated online/offline visits and update propagation under the *real HTTPS origin*, with a mobile viewport and real Android after deploy to a nonproduction preview.
3. No third-party advertising or analytics inside the generator; existing inactive banner remains unchanged; existing Info/Detail page and its consent-gated ads stay unchanged.
4. A draft PR is **not a production authorization**. Do not merge or deploy before the user's explicit go-ahead. Portal card `Web / PWA` and `?install=web` CTA should be updated only after public install/offline proof.

## Known limits

- GPS position acquisition needs device permissions and platform location availability; offline geolocation is not guaranteed. Manual coordinates and `geo:` QR generation work offline.
- Open Map, donation links, Privacy Policy and other external URLs need a connection.
- Clipboard image copy and print depend on browser permissions and support.
- Previously installed `127.0.0.1` test PWA is **distinct** from the eventual installed HTTPS product.

Source baseline: `fbf663b12060e8204b6a83e4fbfc07f9475605f1`; product source v1.2.1. PWA implementation r2. Licenses and THIRD_PARTY_NOTICES remain in `licenses/`.
