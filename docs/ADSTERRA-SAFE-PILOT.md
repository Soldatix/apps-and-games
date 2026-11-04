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

## Separate Adsterra consent preview implemented (2026-11-04)

The draft PR has a fully localized **TEST-ONLY** UI, available only on a local deployment/branch at `/?adPreview=1`:

- In EN/HR/DE/IT/ES, it introduces Adsterra by name, explains possible outside requests and identifiers, and links to the portal's privacy notice and Adsterra's published privacy policy.
- Equal prominence **Allow** and **Reject** buttons. Optional consent, not preselected. Declining has no impact on Apps & Games access.
- A session-scoped **pilot-only** choice is stored under `appsGamesAdsterraPilotChoiceV1`; reload remembers accept/reject in the same browser tab. This is deliberately **NOT** reused for eventual live ad consent.
- A **Withdraw permission** action turns an accepted test choice into reject; **Change choice** and footer preferences permit reopening and updating. Responsive mock shows a single 728×90 desktop OR 320×50 mobile placeholder only after an accepted choice. The 300×250 is always inactive.
- Absolutely **no ad delivery, ad tag, third-party scripts, own iframe wrappers, analytics integrations or Adsterra calls** are included in this preview. This branch must remain unmerged until the real consent and policy questions are resolved.
- Existing GA4 and AdSense loads in `index.html` remain unchanged and are **outside the scope** of this pilot: the mock cannot be presented as site-wide privacy compliance. AdSense's site approval still shows **Needs attention / Low value content**, and the published Google CMP did not appear in the owner's private-browsing test.

Before live deployment, **replace the TEST ONLY interface with a reviewed production consent management design** (including how Adsterra handles actual personal data and withdrawal, persistent preferences, CMP coexistence, vendor disclosures, and regional applicability). Reusing this pilot's session preference for production would be invalid.

## Native original-tag blocked-network acceptance test (2026-11-04)

GitHub Actions run: https://github.com/Soldatix/apps-and-games/actions/runs/41831983863 — **PASS**.
- Portal static tests: **12/12 PASS**, existing responsive browser smoke tests: **PASS**.
- `ci/adsterra-native-guard-smoke.mjs` contains a local-only, completely intercepted browser fixture. It uses two Adsterra-style publisher tags (`atOptions` and external `bauval.org` script, with exact publisher keys and sizes) directly in the normal HTML body, **no publisher-created iframe**.
- In the fixture only, a prior affirmative session choice allows `document.write` of exactly one original-format tag *while the HTML parser is still running*. This is an experimental test method, **not yet approved by Adsterra for production**.
- Test cases: no request before opt-in; rejection remains blocked after reload; explicit desktop 728×90 opt-in triggers exactly one intercepted request; withdrawal prevents later requests after reload; mobile 320×50 activates only mobile unit.
- All requests for `bauval.org` are fulfilled with an inert local JavaScript stub. **No real Adsterra request, tracking, or payable impression.**
- Actual portal `adsterra-pilot.js` is still **preview-only**, with a session-scoped choice that is deliberately **not** production consent. No live tag was added to `index.html` and no production deployment took place.

Before production, confirm vendor acceptance of any conditional or `document.write`-based insertion, or choose an allowed alternative that inserts the original code only after verified consent. Separate legal review is needed for vendor purposes, user disclosure, retention, cookies, refusal, and withdrawal. A previously loaded third-party tag or its cookies cannot be undone merely by removing its DOM element; reload and vendor/browser data handling are required.

## Gated native consent release candidate — disabled (2026-11-04)

Files: `adsterra-consent-candidate.js` wired synchronously inside the top HTML BODY section; `ci/adsterra-candidate-smoke.mjs` for intercepted tests. **`const APPROVED_FOR_LIVE_ADS = false;` is a hard fail-closed stop.** The public site and Draft branch default show no live ads and do not expose the candidate consent interface (the separate `?adPreview=1` demonstration continues to work).

**Functional draft:** If this flag is explicitly enabled in a *test-only served copy*:
- An independent Adsterra-specific notice appears, with provider and publisher privacy links, equally weighted Allow/Reject options, EN/HR/DE/IT/ES strings and no pre-checked state.
- Decisions save a minimal, versioned first-party preference to localStorage (allow/reject, version and timestamp only). A missing, stale (>180 days), malformed or inaccessible preference fails closed.
- Withdrawal and re-entry through a footer Preferences control are supported; a reload prevents any future requests after rejection. Reload **cannot remove already-set third-party cookies**.
- After affirmative permission only, a parser-time native two-script Adsterra snippet is written directly into the BODY at the designated placement: either desktop 728×90 **or** mobile 320×50, never both, no additional wrapper iframe. Screens narrower than 320px and offline views skip loading.
- The native tag uses `document.write` at initial parsing in this **candidate only**. This is *not* yet a confirmed production-allowed delivery method with Adsterra, and long-blocking external scripts may harm page speed. Obtain vendor acceptance or replace with an approved equivalent.

**CI run:** https://github.com/Soldatix/apps-and-games/actions/runs/41834747184 **PASS** — 14/14 static tests plus all Chromium smoke tests; extra candidate checks verified no pre-consent network, rejection, acceptance, correct single desktop/mobile tag, withdrawal, viewport <320px and expired consent. Every Adsterra call was fulfilled with inert mock JS; **ZERO actual external Adsterra requests/impressions**.

**Outstanding release blockers**:
1. The live main page currently fetches Google Analytics and AdSense tags in its HEAD without verified consent gating. The Google CMP message was published in AdSense but did **not** appear in the owner's incognito browser tests, and AdSense currently marks the site `Needs attention — Low value content`. The site-wide Google collection/privacy behavior requires its own audit and corrections; this Adsterra-only manager does **not** solve it.
2. Determine whether a separate Adsterra-specific first-party consent prompt legally suffices in the target jurisdictions, or adopt a unified compliant CMP. Confirm the actual vendor purposes, third parties, retention, cookie practices and privacy disclosures (https://adsterra.com/privacy-policy-managed).
3. Obtain Adsterra approval for the **conditional native-code insertion technique**; its approval of the original `format:'iframe'` option is not blanket approval of `document.write`.
4. Controlled real-ad staging test only after approved consent, network safety and opt-out checks; then require explicit owner authorization to modify `APPROVED_FOR_LIVE_ADS`, merge and deploy.
5. Do not enable a script solely based on the old pilot `sessionStorage` demo choice. The release candidate maintains its own separate preference key.

**NO MERGE / NO PRODUCTION DEPLOY / NO REAL AD REQUEST**.

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
