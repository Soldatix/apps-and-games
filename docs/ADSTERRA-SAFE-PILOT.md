# Adsterra banner pilot — PREVIEW ONLY / PRODUCTION NO-GO

**Account-specific Adsterra support reply received on 2026-11-04.**
- `bauval.org` IS their authorized banner serving domain.
- Embedding publisher ad tags **inside our own iframe** is forbidden by Adsterra Terms and could lead to account suspension.
- Adsterra says their standard banners do not cause forced redirects; clicking a normal banner can lead to advertiser landing pages. No unusual redirect was reported.
- Adsterra does not advise on jurisdiction-specific consent compliance. Obtain independent review before production.
- Support's warning mentioned more than one ad code on the same page; **clarify whether two separate native placements on one page are permitted**, rather than assuming.

## Approved publisher inventory (not activated on site)

| Size | Ad unit ID | Key |
| --- | --- | --- |
| Desktop 728×90 | 32042360 | 3e88187807f72645af6b39e90957f6a8 |
| Mobile 320×50 | 32042361 | fc02ce1675aa14021ad3dee29c123264 |
| Optional 300×250 | 32042362 | 0f5386e1fbab687b18a7f7686197bec7 |

Website ID: 6168026, appsandgames.org (Publisher Dashboard approved).

## Implemented safely in this branch

- `adsterra-pilot.js` renders **mock placement boxes only**, and only when `?adPreview=1` is present.
- Preview boxes reflect desktop/mobile breakpoints and a future optional 300×250 placement.
- There is **no** iframe wrapper, vendor script, vendor tag insertion, first-party consent promise, or outside network request in the preview.
- Without `?adPreview=1`, both regions stay hidden and the portal behaves as before.
- HTML/CSS additions are isolated; no changes to game code, workers configuration, AI Factory, or production deployment.

## Requirements before production

1. Respect Adsterra policy: insert the **original publisher-provided tag directly in the page body, never inside any publisher-created iframe**. Adsterra's own `format: 'iframe'` parameter appears in its official output; ask support to confirm this is allowed and differs from a publisher wrapper.
2. Start with only **one** active tag per page. Select 728×90 on desktop or 320×50 on mobile. Do not combine tags until explicit clarification about more than one code on a page.
3. **Design and review a real consent integration** before enabling the network, including EU/EEA/UK/CH requirements, previous non-essential cookies, rejection and withdrawal. No local mock or basic button constitutes verified CMP compliance.
4. Review the existing AdSense and Analytics tags in `index.html` and on the privacy page. Existing Google CMP behavior is not confirmed for Adsterra.
5. Verify loaded banner visibility/interactions and tracking with Adsterra, plus ad safety categories, responsive layout, PWA/offline behavior and absence of unexpected redirects.
6. Test with vendor network blocked first; later one controlled external test after explicit approval. Keep third-party advertising absent from offline/PWA caches.
7. Do not add an invented `ads.txt` record. Await Adsterra's actual instructions.
8. **No merge, no feature activation, no production deploy** until all safety, policy, legal, functional and browser gates are reviewed and user explicitly approves.

Validation: `node --check adsterra-pilot.js`, `node --test tests/*.test.mjs` and Playwright `node ci/adsterra-pilot-smoke.mjs`. Run GitHub CI; record results.
