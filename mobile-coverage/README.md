# Mobile Network Coverage — LIVE (2026-11-12)

nPerf maps are licensed for `https://mobile-coverage.appsandgames.org/` and up to 10 free countries (nine initially requested: CH, HR, DE, IT, AT, FR, ES, GB, US). License and original tag are embedded in `index.html`; do not replace, modify locale=en, or load the tag on a different production hostname without vendor approval. Map availability in Cloudflare PR preview may be limited by nPerf origin authorization.

## Release status
- **LIVE:** https://mobile-coverage.appsandgames.org/ — verified on the licensed domain, including country/operator selection and an active coverage map.
- **LIVE catalog:** Published on https://appsandgames.org/ in both the no-JavaScript HTML and five-language JavaScript app list.
- **Google search:** This application's robots meta is `index,follow`. Its canonical URL and `mobile-coverage/sitemap.xml` identify the dedicated subdomain. The root domain's sitemap retains only `appsandgames.org` pages; its homepage `lastmod` is updated.
- **No ads yet:** Dedicated Adsterra approval for the new hostname and original 728×90 and 320×50 GET CODE are still required. Both reserved ad placements remain hidden, with no Adsterra scripts or requests.
- **nPerf license:** Nine requested countries, original nPerf script unchanged, no subscription or use limits, advertising alongside the map explicitly permitted by nPerf.

## Layout v2 / future advertising
- Uses the same Apps & Games image logo, 3 navigation links, shared language dropdown with flags and persisted light/dark toggle as the homepage.
- Wraps the *unchanged* nPerf embed in a responsive canvas. It scales the actual iframe together with its controls, without editing provider code or embedding a second map.
- HTML contains a **hidden** ad reservation zone between hero and map. Desktop 728x90 and mobile 320x50 are alternative responsive placements, not simultaneous placements. No scripts, IDs or ad impressions until original per-domain Get Code and approved consent logic are integrated in a separate PR.
- Before launch of ads, test 375px mobile, 768px tablet and >1024px desktop, and verify map zoom/menus still work on the licensed hostname.
