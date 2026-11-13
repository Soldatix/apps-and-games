# Mobile Network Coverage — LIVE (2026-11-12)

nPerf maps are licensed for `https://mobile-coverage.appsandgames.org/` and up to 10 free countries (nine initially requested: CH, HR, DE, IT, AT, FR, ES, GB, US). License and original tag are embedded in `index.html`; do not replace, modify locale=en, or load the tag on a different production hostname without vendor approval. Map availability in Cloudflare PR preview may be limited by nPerf origin authorization.

## Release status
- **LIVE:** https://mobile-coverage.appsandgames.org/ — verified on the licensed domain, including country/operator selection and an active coverage map.
- **LIVE catalog:** Published on https://appsandgames.org/ in both the no-JavaScript HTML and five-language JavaScript app list.
- **Google search:** This application's robots meta is `index,follow`. Its canonical URL and `mobile-coverage/sitemap.xml` identify the dedicated subdomain. The root domain's sitemap retains only `appsandgames.org` pages; its homepage `lastmod` is updated.
- **Adsterra codes configured:** Dedicated original desktop 728×90 (`7723b6772f152328437cf4a849099699`) and mobile 320×50 (`2986915dcf6de53c61c5f9eee1731627`) GET CODE received from the site owner for this hostname. The active unit appears only after explicit, valid advertising consent, on the next page load. All other visits have no Adsterra requests.
- **nPerf license:** Nine requested countries, original nPerf script unchanged, no subscription or use limits, advertising alongside the map explicitly permitted by nPerf.

## Layout v2 / future advertising
- Uses the same Apps & Games image logo, 3 navigation links, shared language dropdown with flags and persisted light/dark toggle as the homepage.
- Wraps the *unchanged* nPerf embed in a responsive canvas. It scales the actual iframe together with its controls, without editing provider code or embedding a second map.
- HTML uses a **hidden until consent** ad area between hero and map. The exact provider GET CODE is emitted parser-time by `adsterra-banner-loader.js` only on a page load with valid advertising opt-in from our shared local choice or subdomain cookie (180-day expiry, newest choice wins). Desktop ≥800px: 728×90; mobile 320–799px: 320×50; never both. No overlays, self-refresh, auto-resize of ads or unapproved extra placements.
- Before launch of ads, test 375px mobile, 768px tablet and >1024px desktop, and verify map zoom/menus still work on the licensed hostname.

## Advertising verification
- The shared `https://appsandgames.org/privacy-choice.js` UI is authoritative. Opting in reloads and enables a single device-matched Adsterra unit; opting out reloads and disables it. Analytics and advertising purposes remain separate.
- Consent is checked synchronously at parse time before the original provider tag appears. The first-party loader may be downloaded for all visitors, but it makes **zero Adsterra requests** unless a valid advertising choice was recorded on an earlier page load.
- The vendor script paths, original tag syntax, ad keys and 728×90 / 320×50 dimensions must remain unchanged. No edits to an Adsterra iframe or source script.
- Production checks: standard desktop, 768px tablet, 375px and 320px phone, no horizontal overflow and no nPerf map overlap. Browser extensions may block actual ad creative; provider rendering must be visually checked on the published hostname.
