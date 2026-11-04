# Adsterra banner pilot — PREVIEW ONLY / PRODUCTION NO-GO

**Account-specific Adsterra support reply received on 2026-11-04.**
- `bauval.org` IS their authorized banner serving domain.
- Embedding publisher ad tags **inside our own iframe** is forbidden by Adsterra Terms and could lead to account suspension.
- Adsterra says their standard banners do not cause forced redirects; clicking a normal banner can lead to advertiser landing pages. No unusual redirect was reported.
- Adsterra does not advise on jurisdiction-specific consent compliance. Obtain independent review before production.
- Support's follow-up explains repeated placements are counted as unique impressions and recommends modest ad density; we deliberately use one active unit per page.

## Adsterra follow-up confirmation (2026-11-04)

Support answered the two remaining technical questions:

1. **Yes**: the unmodified publisher-supplied snippet with `'format': 'iframe'` is correct when inserted directly into the page BODY. **Do not** wrap the code in a publisher-created iframe; Adsterra's built-in iframe format is distinct.
2. For repeated displays of the **same** Banner placement on the same page, Adsterra counts only unique impressions (repeats do not generate additional counted impressions). They recommend differing banner sizes on different pages and avoiding excessive ad density. This is **not** an assurance that any number or arrangement of placements is desirable.

**Pilot decision:** one ad unit per page view; 728×90 on desktop OR 320×50 on mobile; 300×250 remains inactive for a later, separate-page trial. Do not load both responsive units and hide one with CSS, which could cause invisible ad requests. No automatic refresh/repeat.

**Production implementation still pending:** use Adsterra's original two script tags in the ordinary page body **only after** the consent manager authorizes the relevant vendor/purposes. The preview-only pilot does not implement live tags, and no integration is presumed to be legally compliant merely because a generic consent flag exists. Confirm how the chosen CMP exposes vendor-specific consent, that users can refuse/revoke it, and test actual tag insertion without violating provider policy. Google Consent Mode alone governs Google's tags, not arbitrary Adsterra JavaScript.

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

## Existing consent/CMP code audit (2026-11-04)

Evidence reviewed from `main`:
- `index.html` includes an immediately loaded Google Analytics tag (`gtag/js`, followed by `gtag('config', ...)`) and the Google AdSense `adsbygoogle.js` tag in `<head>`.
- `privacy-policy.html` also loads `gtag/js` and states that the site uses a **Google-certified CMP**.
- `script.js` emits analytics events through `gtag`, but a repository search in these files found no explicitly implemented `__tcfapi`, consent default/update, Adsterra vendor permission callback, or publisher-side CMP controls.
- **Important limitation**: Google's AdSense / Privacy & messaging may inject the actual CMP remotely; source-code inspection does **not** prove its absence or that users do not see a consent message. We cannot infer its live configuration or whether Adsterra is a declared vendor.

Next verification requested from owner:
1. Inspect AdSense > Privacy & messaging > European regulations: is the message for appsandgames.org published and which vendors, purposes and revocation settings are configured?
2. Confirm Google CMP integration and `__tcfapi` state in a live browser (consent denied/accepted), and independently determine whether Adsterra is covered or requires separate opt-in/vendor declaration.
3. Only after verified coverage, design native original-tag insertion directly in the page body with **one** responsive banner per page and no vendor request before relevant consent; re-test withdrawal and no reloads in offline mode.

**No consent or advertising behavior was changed in the portal by this audit.**

## Google CMP vendor lookup (2026-11-04)

The site owner checked the live Google AdSense Privacy & messaging partner selector: **Adsterra is not among available partners**.

**Consequence:** We cannot treat Google's published EU consent message or Google Consent Mode as affirmative authorization to load Adsterra's independent third-party ad tag. The Google-managed list only covers the vendors included in its TCF/ATP framework. Google describes Additional Consent as supporting non-TCF vendors *already present on Google's ATP list*, not arbitrary ad networks.

**Do not:** add Adsterra under another provider's name; equate Google's Accept All with Adsterra permission; load the Adsterra script before permission; use the originally prohibited publisher-created iframe; remove the existing Google CMP without an alternative tested for AdSense.

**Proposed approval-gated approach:**
1. Retain the published Google CMP without unreviewed changes while separately verifying it actually appears and records visitor consent in a fresh EU/CH browser session (AdSense reported 0 messages shown).
2. Choose either (a) one reviewed Google-certified TCF-compatible CMP supporting BOTH Google's partners and explicit/custom Adsterra vendor disclosures, or (b) keep Google's CMP for Google products AND implement a genuinely informed, separate Adsterra opt-in, provided legal review accepts the combined user experience. Two prompts may be confusing, so a unified CMP is preferable if practical.
3. For Adsterra, show clear purpose/vendor information before any script request, with equally accessible Accept / Reject, no preselected consent, persistent preference and easy withdrawal. Explain data processing and link to Adsterra's own policy; determine the exact categories, recipients and applicability from the vendor and jurisdiction.
4. On acceptance, render exactly one publisher-supplied native banner tag in page BODY (728x90 desktop OR 320x50 mobile). On reject, do not fetch it. After withdrawal, prevent further loading; inform users that previously set third-party cookies may require provider/browser controls. Never promise removing a DOM node deletes third-party cookies.
5. Confirm Google analytics/AdSense defaults and behavior with CMP denied before go-live. Update privacy policy to accurately document both vendors and data practices. Conduct real-browser tests including EEA/CH, mobile, offline and refusal.

**This documentation update does not activate Adsterra or change the production site.**

## Requirements before production

1. Respect Adsterra policy: insert the **original publisher-provided tag directly in the page body, never inside any publisher-created iframe**. Adsterra Support confirmed its own `format: 'iframe'` parameter is valid.
2. Start with only **one** active tag per page. Select 728×90 on desktop OR 320×50 on mobile. Repeated views of the same placement on the same page count as only one impression; extra ad density can hurt performance.
3. **Design and review a real consent integration** before enabling the network, including EU/EEA/UK/CH requirements, previous non-essential cookies, rejection and withdrawal. No local mock or basic button constitutes verified CMP compliance.
4. Review the existing AdSense and Analytics tags in `index.html` and on the privacy page. Existing Google CMP behavior is not confirmed for Adsterra.
5. Verify loaded banner visibility/interactions and tracking with Adsterra, plus ad safety categories, responsive layout, PWA/offline behavior and absence of unexpected redirects.
6. Test with vendor network blocked first; later one controlled external test after explicit approval. Keep third-party advertising absent from offline/PWA caches.
7. Do not add an invented `ads.txt` record. Await Adsterra's actual instructions.
8. **No merge, no feature activation, no production deploy** until all safety, policy, legal, functional and browser gates are reviewed and user explicitly approves.

Validation: `node --check adsterra-pilot.js`, `node --test tests/*.test.mjs` and Playwright `node ci/adsterra-pilot-smoke.mjs`. Run GitHub CI; record results.
