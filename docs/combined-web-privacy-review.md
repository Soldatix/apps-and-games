# Integration review: PR #37 + PR #39 (2026-11-06)

STATUS: **DRAFT — NO PRODUCTION DEPLOYMENT**

Baseline: website main `be292e6c04f542a06047d86eb59aea6f239e5f9f`.
Combined review branch based on PR #39 `e513a6bc968f43d4daaee97d69be3a622acb8388`
plus the Android-related privacy policy sections from PR #37 at
`7741cf5e75b65c861d51a6615375e40fb2a2c989`.

## Confirmed overlapping file

Both PRs change `privacy-policy.html`:
- PR #37 changes privacy disclosures, including Android local data and
  future-only LevelPlay/AdMob, and scopes website vs Android consent.
- PR #39 removes hard-coded GA4 from `privacy-policy.html` and inserts
  `privacy-choice.css` + `privacy-choice.js` analytics-only preference UX.

The combined review version contains both changes and retains web/Windows
and Digital Clock disclosures. It must be deployed **as one reviewed
change**, not by merging the two independently without reconciliation.

## Guardrails and unresolved

- Android real ads and SDK initialization remain OFF; AdMob European
  regulations form remains Draft.
- Website AdSense is disabled by PR #39 until a Google-certified IAB TCF
  **website** CMP is configured and verified. This analytics-only banner
  is NOT a certified advertising CMP.
- Cloudflare Zaraz was observed OFF, with no purposes/tools configured.
- A browser screenshot on the unmodified live site confirmed a GA4 collect
  204 request before any visible choice. This combined code requires a
  fresh **post-publication** browser check before compliance can be claimed.
- The Android privacy section is explicitly prospective and must be
  reviewed against the final mediation adapter roster, identifier and
  data-safety disclosures before any SDK activation.
- All other apps / subdomains (e.g. `lotto.appsandgames.org`) must be
  separately audited if they load their own GA4 or advertising tags.
- Existing website AdSense / analytics must be reverified after any approved
  changes; no user confirmation of publication has been requested yet.
- The public website privacy notice still needs a human legal/content review.

## Automated acceptance

- Existing app registry, portal SEO/links, and five-language translation.
- All root pages static scan: zero direct GA4/AdSense script loads.
- New policy + consent integration assertions.
- Chromium desktop: no-Google traffic pre-choice, rejection persistence,
  opt-in loads GA4 only, revocation reload stops GA4.
- Mobile Chromium and multilingual checks to be added/reviewed here.
- GitHub CI PASS alone is not consent-law certification or evidence of
  verified live behavior.

NO merge, NO Cloudflare deployment, NO ad initialization without
separate explicit approval. Production main remains untouched.
