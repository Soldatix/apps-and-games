# Apps & Games — QR Code Generator Web/PWA v1.3.1

**Release candidate / review only.** This app is deployed at `/qr-code-generator/` under `appsandgames.org`. It does **not** introduce a new repo, hostname, ad placement or third-party SDK.

## Included

- Locally bundled PWA manifest and four PNG icons (192/512 regular + maskable).
- Install help via `?install=web` in EN/HR/DE/IT/ES/FR, with native `beforeinstallprompt` when supported and manual fallbacks.
- Versioned service worker `ag-qr-code-generator-shell-1.3.1-r1`, explicit static allow-list, network-first static read and offline fallback. No runtime caching or user QR data persistence.
- Core QR engine/payload/renderer retained unchanged; v1.3.1 adds a manual-update UI module and updates version information.

## Test without extra dependencies

From `qr-code-generator/` run `python -m unittest discover -s tests -p 'test_*.py'` and `node tests/qr_regression.mjs` and `node tests/sw_simulated.mjs` (Node 18+). `node --check sw.js` and `node --check assets/js/pwa.mjs` are optional syntax checks.

## Deployment requirements

1. Existing HTTPS path `/qr-code-generator/` must serve the manifest, icons and `sw.js` with correct types, and must not proxy files to the portal detail URL (`/qr-code-generator.html`).
2. Validate Chrome/Edge installability, repeated online/offline visits and update propagation under the *real HTTPS origin*, with a mobile viewport and real Android after deploy to a nonproduction preview.
3. No third-party advertising or analytics inside the generator; existing inactive banner remains unchanged; existing Info/Detail page and its consent-gated ads stay unchanged.
4. A draft PR is **not a production authorization**. Do not merge or deploy before the user's explicit go-ahead. The Web / PWA portal card and install CTA were already published in v1.3.0; no portal changes are needed for v1.3.1.

## Cloudflare HTML redirects and offline precache

Cloudflare Workers Static Assets defaults to `auto-trailing-slash`, redirecting `/qr-code-generator/index.html` to the canonical `/qr-code-generator/` (307). The PWA must therefore precache the **directory root** without query strings, not `/index.html` with `redirect:'error'`. A dedicated simulated regression verifies this behavior. Real Android offline testing is still a release gate.

## Known limits

- GPS position acquisition needs device permissions and platform location availability; offline geolocation is not guaranteed. Manual coordinates and `geo:` QR generation work offline.
- Open Map, donation links, Privacy Policy and other external URLs need a connection.
- Clipboard image copy and print depend on browser permissions and support.
- Previously installed `127.0.0.1` test PWA is **distinct** from the eventual installed HTTPS product.

Source baseline for v1.3.1: `ddb85e3d2e683c39c0ee6b3e0eec43d686f967ef` (public v1.3.0 and portal). PWA cache revision r1 retains the Cloudflare canonical-root offline fix. Licenses and THIRD_PARTY_NOTICES remain in `licenses/`.

## v1.3.1 — manual update checks (review only)

The QR Info dialog now includes current version, a **Check for updates** button and a localized, status-backed result in EN/HR/DE/IT/ES/FR. Browser service-worker registration.update() checks only the registered script; no QR payload, passwords or location information are read or transmitted. A ready new version exposes the existing explicit **Update app** action, which sends SKIP_WAITING only after a user click.

Manual states: current / available / offline / failed / unsupported / pending. An update already downloaded and waiting remains available even if the device goes offline. A slow or failed installation is never described as “up to date”. The browser's initial automatic check remains active. Versioned core pre-cache now includes update-check.mjs and uses `ag-qr-code-generator-shell-1.3.1-r1`, with Cloudflare canonical-root offline fallback unchanged.

**Release gate:** run the full Node and Python regression, including `node tests/pwa_update_check.mjs`, then verify actual installation and update transition on Android and Edge HTTPS previews before any main branch merge. Do not automatically deploy this branch.
