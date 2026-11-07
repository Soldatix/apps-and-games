# Website analytics opt-in gate — review-only implementation (2026-11-06)

This branch is **NOT** a Google-certified advertising CMP, an IAB TCF CMP,
or a substitute for publisher consent requirements.

## Purpose
Block direct GA4 tag load and collection on the Apps & Games WEBSITE until
a visitor explicitly enables optional website analytics. Provide equal
Accept/Reject and a persistent Privacy choices control to change/withdraw
permission. All choices are stored on this browser in a versioned
localStorage key. When permission is withdrawn after loading the tag, a
page reload prevents further GA4 execution and attempts to clear first-party
_ga cookies; this does NOT erase server-side data or all third-party storage.

## Advertising intentionally disabled
- The pre-existing static AdSense script tags are omitted from website HTML.
  They are NOT reloaded when Analytics is accepted.
- This is a temporary fail-closed precaution while Google AdSense account
  and a **Google-certified IAB TCF Web CMP** remain unverified.
- Google publisher rules for EEA/UK/CH require a certified CMP for ads:
  https://support.google.com/adsense/answer/13554116
- Cloudflare Zaraz is OFF with no purposes/tools; turning its Consent
  Management toggle on cannot gate tags hardcoded into static HTML.
- Future ads require a separate certified CMP integration, disclosures,
  testing and explicit user approval. This draft is analytics-only.

## Security and privacy
- HTML directly included GA4/AdSense on 15 pages; this draft replaces
  those tags with same-origin `privacy-choice.js` and `privacy-choice.css`.
- The preference gate uses **Google Basic Consent Mode**. It does not
  load `gtag/js` or send Google requests until explicit opt-in.
- Consent Mode v2 default-denied (ad/analytics) is enqueued before
  the post-opt-in Analytics-granted update and GA4 config.
- No ad storage or ad personalization is granted by this mechanism.
- Site navigation, game logic, and app download links work without consent.
- Popup: languages EN/HR/DE/IT/ES via site language selector or browser.
- Privacy Policy content itself is in the separate Draft PR #37 and must
  be reconciled after both reviews, before production deployment.
- External scripts injected via Cloudflare/Workers/Zaraz/custom tags
  have not been audited by this code and can circumvent the local gate.

## Tests / release gates
- Static source test: every HTML page has same-origin gate; no direct GA4
  or AdSense script references or eager gtag config.
- Chromium test: consent absent/rejected -> zero Google requests; accepted
  -> GA4 request; ads not loaded; withdrawn -> no further requests.
- Existing portal regression, app link, i18n, mobile layout tests must pass.
- Site CMP and legal review must be completed, including impact on
  existing web analytics and full Google AdSense certification needs.
- Do **not** merge/deploy while this PR remains Draft. Explicit approval
  required. Validate published site in clean Chrome Network when approved.

No Android changes. AdMob/LevelPlay SDK runtime remains OFF.
`SITE_WEB_ADS=OFF; ANDROID_REAL_ADS=OFF; PRODUCTION_NO_GO=TRUE`.
