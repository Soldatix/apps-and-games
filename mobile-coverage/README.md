# Mobile Network Coverage — pre-production

nPerf maps are licensed for \`https://mobile-coverage.appsandgames.org/\` and up to 10 free countries (nine initially requested: CH, HR, DE, IT, AT, FR, ES, GB, US). License and original tag are embedded in \`index.html\`; do not replace, modify locale=en, or load the tag on a different production hostname without vendor approval. Map availability in Cloudflare PR preview may be limited by nPerf origin authorization.

## Release gates — do not publish until approved
1. Keep this PR unmerged. The website card says COMING SOON.
2. Confirm nPerf works on the final hostname; maps, operators and speed overlays must render on desktop/mobile. The existing nPerf Speed Test is unrelated and must remain unchanged.
3. Set up a new Cloudflare Worker named exactly \`mobile-coverage\`, connected to GitHub repo \`Soldatix/apps-and-games\`, production branch \`main\`, **Root directory = mobile-coverage**, build command none, deploy command \`npx wrangler deploy\`. Add custom domain \`mobile-coverage.appsandgames.org\`. Do not connect before launch planning because \`main\` currently lacks this directory.
4. Register the exact hostname in Adsterra, wait for Approved, create distinct Active units for 728×90 and 320×50. Only then integrate exact Get Code using the existing shared opt-in cookie logic. Never reuse the main domain's keys or emit ad requests before affirmative advertising consent.
5. Keep Google Analytics and advertising optional through shared https://appsandgames.org/privacy-choice.js (cookies shared by the appsandgames.org parent domain).
6. After production testing and explicit approval, update the draft robots meta from noindex,follow to index,follow, and both catalog cards from COMING_SOON to LIVE. Confirm the final canonical URL, correct social preview, Worker Ready and sitemap.
7. nPerf said maps automatically follow browser language, yet supplied script contains \`locale=en\`. Keep vendor-issued URL unchanged; verify language behavior or ask Priscilla before altering it.
8. No subscription, credits, or usage limits for approved ten-country license; advertising alongside maps explicitly permitted by nPerf.
