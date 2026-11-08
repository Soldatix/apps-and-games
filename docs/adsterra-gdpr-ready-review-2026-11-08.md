# appsandgames.org — Adsterra consent and placement review (2026-11-08)

## Scope and dependency
- Source: Soldatix/apps-and-games.
- This branch starts from `review/combined-web-privacy-2026-11-06` (draft PR #40), not from production `main`.
- Responsive placements are carried over from draft PR #43. The source drafts remain unmerged; do not deploy this candidate.
- Publisher website ID: 6168026; already approved. Slots approved: desktop 728x90 / 32042360; mobile 320x50 / 32042361; 300x250 / 32042362.
- Production ad requests **OFF**. No Adsterra GET CODE scripts are embedded.

## Ready for review
- Analytics preferences from PR #40 remain independent, opt-in only.
- Homepage has three hidden Adsterra containers. Desktop 728x90 above catalog; mobile 320x50 above catalog; sidebar 300x250 at >=1280px. These containers remain hidden by default.
- Preview-only, five-language Adsterra-choice UI: append `?adConsentPreview=1` to a **non-production preview URL**. It offers Allow/Reject/Withdraw for a *demo* session choice and reveals **local mock placeholders only**, never vendor scripts.
- No test clicks on live advertisements are needed. This preview is not legal consent and does not monetize.
- The Privacy Policy explains that Adsterra is planned but not active and that advertising consent differs from analytics consent.

## Required gates BEFORE a separately approved live activation
1. Confirm how Adsterra's **unchanged** GET CODE banner scripts may be conditionally included after a valid advertising consent. Their own `format: 'iframe'` is part of the provided snippet; do not add an extra iframe. Existing unapproved `document.write()` technique must not be assumed supported.
2. Obtain sufficiently specific information on data purposes, third-party partners, cookie/identifier use, applicable transfers, retention, and withdrawal behavior; make matching disclosures and consent interface updates. Provider privacy page alone may not enumerate partner behavior for this exact placement.
3. Define real production ad-specific consent storage, versioning, expiration, withdrawal and pre-request gating; this test demo's sessionStorage choice MUST NOT be treated as actual permission.
4. Review PR #40 independently and make sure no unconditional GA4/AdSense tags remain on any relevant live pages. This branch inherits that proposal but does not publish it.
5. After explicit owner approval, add only **one responsive Adsterra banner first**, then validate on an actual approved public page with consent and no overlap. Hold 300x250 until separate layout and multi-tag behavior is verified.
6. Confirm displayed ads and attributable revenue in Adsterra publisher reports; `Active` status and mocked banners do NOT establish revenue or payment eligibility.
7. Review real Payout method (PayPal/Hyperwallet and CHF Local Bank Transfer require $25 before account UI unlocks), KYC and earnings thresholds. Never test by artificially generating impressions/clicks.

## Safeguards
- NO `bauval.org` external scripts in this branch.
- NO production code, ad tag, Cloudflare deployment, or automatic merge.
- Avoid injecting scripts through Zaraz; it already failed to render approved banner code.
- All changes to `main` require separate explicit approval.

## Validation performed
- JavaScript syntax: PASS for `adsterra-consent-preview.js`.
- Three initially hidden slots: PASS.
- Responsive breakpoints (mobile <=767px / sidebar >=1280px): PASS.
- No actual Adsterra script URL or vendor request mechanism in preview file: PASS.
- Manual browser acceptance/rejection/withdrawal and viewport/a11y checks are outstanding before any deployment.
