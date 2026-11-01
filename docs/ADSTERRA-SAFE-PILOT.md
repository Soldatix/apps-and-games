# Adsterra safe banner pilot — Apps & Games

**Status: REVIEW ONLY / PRODUCTION NO-GO.** This branch is not deployed. It must not be merged or deployed automatically.

## Publisher-supplied units (2026-11-01)

| Unit | Adsterra ID | Key | Purpose |
| --- | --- | --- | --- |
| 728×90 | 32042360 | 3e88187807f72645af6b39e90957f6a8 | Desktop |
| 320×50 | 32042361 | fc02ce1675aa14021ad3dee29c123264 | Mobile |
| 300×250 | 32042362 | 0f5386e1fbab687b18a7f7686197bec7 | Optional secondary |

Source supplied by account owner directly from Adsterra Publisher Dashboard (approved site 6168026).

## Built in

- Two isolated HTML placeholder regions, one responsive top slot (desktop/mobile) and one optional 300×250.
- `adsterra-pilot.js` has `adsEnabled: false` and `secondaryEnabled: false` by default.
- Preview mock placements locally using `?adPreview=1`. This mode never loads third-party advertising.
- If the flag is enabled after independent review, the script requires an explicit first-party Adsterra opt-in before requesting the vendor. A preference button supports withdrawal. It does not claim to replace a compliant CMP or cover analytics / AdSense.
- Vendor snippets are assembled in separate sandboxed iframe documents to avoid shared `atOptions` collisions; may not work with every Adsterra campaign. Needs **provider approval / real browser testing** before go-live.
- Offline mode never requests ads. No files for PWA games, AI Factory, or Cloudflare Workers configuration modified.

## Stop / production gates

1. Confirm the publisher script origin `https://bauval.org/22/<key>` directly with Adsterra, and verify ad category protections. Never infer trust solely from appearance.
2. Confirm Adsterra policy permits nested sandboxed iframe and reports valid impressions; otherwise redesign placement without risking the host page.
3. Verify CMP and region-specific GDPR/ePrivacy/Swiss privacy behavior for Adsterra, including reject and withdrawal. The pilot's basic opt-in is **not** a legal compliance certification.
4. Review existing direct Google Analytics and AdSense integration; do not assume the existing Google CMP gates Adsterra. Avoid loading two ad stacks unintentionally.
5. Test desktop 728×90, mobile 320×50, tiny viewports, 300×250 optional unit, dark/light themes, EN/HR/DE/IT/ES, keyboard, offline behavior, ad blockers and CSP.
6. Do not invent an Adsterra `ads.txt` record; ask provider if it is required.
7. Run `node --check adsterra-pilot.js` and `node --test tests/adsterra-pilot.test.mjs` plus existing portal tests; run manual browser smoke tests. Results must be recorded.
8. Obtain explicit approval before enabling `adsEnabled`, merging, or any production deployment. AI Factory production HOLD remains untouched.

Rollback: drop this pilot branch or revert its eventual merge. All new markup is isolated and hidden when the feature is disabled.
