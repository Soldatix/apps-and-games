# Mobile Network Coverage — pre-production

nPerf maps are licensed for `https://mobile-coverage.appsandgames.org/` and up to 10 free countries (nine initially requested: CH, HR, DE, IT, AT, FR, ES, GB, US). License and original tag are embedded in `index.html`; do not replace, modify locale=en, or load the tag on a different production hostname without vendor approval. Map availability in Cloudflare PR preview may be limited by nPerf origin authorization.

## Release gates — do not publish until approved
1. Keep this PR unmerged until the owner explicitly authorizes the initial release. This PR contains **no Mobile Coverage card in the main portal**; add catalog/ItemList/sitemap entries only during the final public launch.
2. Confirm nPerf works on the final hostname; maps, operators and speed overlays must render on desktop/mobile. The existing nPerf Speed Test is unrelated and must remain unchanged.
3. After approved merge into `main`, select **Continue with GitHub** and set up a separate Cloudflare Worker named exactly `mobile-coverage`, connected to GitHub repo `Soldatix/apps-and-games`, production branch `main`, **Root directory = mobile-coverage**, build command none, deploy command `npx wrangler deploy`. Add custom domain `mobile-coverage.appsandgames.org`. Until then the source exists only on the PR branch. The main portal's `.assetsignore` excludes `/mobile-coverage/`, so this directory will not be served through the existing `apps-and-games` Worker.
4. Register the exact hostname in Adsterra, wait for Approved, create distinct Active units for 728×90 and 320×50. Only then integrate exact Get Code using the existing shared opt-in cookie logic. Never reuse the main domain's keys or emit ad requests before affirmative advertising consent.
5. Keep Google Analytics and advertising optional through shared https://appsandgames.org/privacy-choice.js (cookies shared by the appsandgames.org parent domain).
6. After production testing and explicit approval, update the draft robots meta from noindex,follow to index,follow, then add both catalog entries as LIVE. Confirm the final canonical URL, correct social preview, Worker Ready and sitemap.
7. nPerf said maps automatically follow browser language, yet supplied script contains `locale=en`. Keep vendor-issued URL unchanged; verify language behavior or ask Priscilla before altering it.
8. No subscription, credits, or usage limits for approved ten-country license; advertising alongside maps explicitly permitted by nPerf.

## Layout v2 / future advertising
- Uses the same Apps & Games image logo, 3 navigation links, shared language dropdown with flags and persisted light/dark toggle as the homepage.
- Wraps the *unchanged* nPerf embed in a responsive canvas. It scales the actual iframe together with its controls, without editing provider code or embedding a second map.
- HTML contains a **hidden** ad reservation zone between hero and map. Desktop 728x90 and mobile 320x50 are alternative responsive placements, not simultaneous placements. No scripts, IDs or ad impressions until original per-domain Get Code and approved consent logic are integrated in a separate PR.
- Before launch of ads, test 375px mobile, 768px tablet and >1024px desktop, and verify map zoom/menus still work on the licensed hostname.
