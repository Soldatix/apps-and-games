# Apps & Games: AdSense review preflight (2026-10-03)

## Verified repository baseline
- Repository: Soldatix/apps-and-games; base: main.
- AdSense screenshot on 2026-10-03: site needs attention, reason "Low value content"; ads.txt authorized. The payment profile and ad settings are complete.
- Existing site includes About, FAQ, Contact, Privacy Policy, sitemap.xml, and detail pages with project descriptions.
- Original landing-page catalogs were entirely generated in script.js. This branch places all 12 app/game cards in index.html before JavaScript runs, preserving the JavaScript-rendered language selection and analytics.
- Tests: run from repository root with \`node --test tests/adsense-static-catalog.test.mjs\` (Node 18+). This test checks static cards, linked project registry, privacy link, Google scripts, and sitemap. It is not a browser test.

## Remaining checks before requesting AdSense review
1. On a preview deploy, turn JavaScript off and verify six utility cards and six game cards are visible and both links on every card work. Check desktop and mobile. Then enable JavaScript and switch EN / HR / DE / IT / ES: cards must not duplicate or disappear.
2. Verify HTTP 200, actual content and correct canonical URLs for the main site, each of the 12 detail routes, privacy-policy, sitemap.xml, and all listed app subdomains. Check for broken images, redirects and missing pages. Do not assume a sitemap entry proves availability.
3. Check original project screenshots, working user guidance and accurate feature claims on each detail page; add useful, project-specific walkthroughs only where needed. Avoid generic filler or copy-pasted keyword content.
4. In Search Console, use URL Inspection with a live test of the home page and representative detail pages; inspect Google's rendered HTML. Check coverage/indexing for canonical URLs and fix any crawl problems.
5. Verify privacy/consent disclosures match actual analytics/advertising behavior and the region-specific consent configuration. Avoid intrusive ad placements and accidental-click risks.
6. Only after manual runtime verification and a human-approved merge/deploy, request a fresh AdSense site review. Approval is not guaranteed, and the "Low value content" notice does not identify a single confirmed cause.

## Deployment and human gates
- This branch is a proposal only; no main merge, deployment, Google Search Console action, or AdSense review submission is authorized by this change.
- The local AI Factory Bridge, MiMo and Windows worktree cannot be verified through this GitHub-only workflow. Run the normal local Factory startup preflight and any browser/a11y checks before release.
