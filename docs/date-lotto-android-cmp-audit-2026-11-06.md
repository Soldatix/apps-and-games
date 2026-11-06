# Website CMP and Date Lotto Android mediation — read-only source audit
Date: 2026-11-06
Status: **HOLD — further verification required before publication**

## Evidence: website repository `Soldatix/apps-and-games`

Main branch observed: `be292e6c04f542a06047d86eb59aea6f239e5f9f`.
Site source is static HTML deployed via Cloudflare Workers assets
(`wrangler.jsonc`). The following are **source facts**, not assertions
about any Cloudflare-side script injection or live user data.

- `index.html`, lines 37–42, directly load `googletagmanager.com/gtag/js`
  and run `gtag("config", ...)` on page startup. Lines 45–46 load the
  `googlesyndication.com` AdSense script.
- `privacy-policy.html`, lines 16–21, directly load GA4 on the **privacy
  policy page itself**, including a startup `gtag("config", ...)`.
- `date-lotto-generator.html`, lines 31–39, directly load GA4 and AdSense.
  Its final inline script sends open-app events through `window.gtag`.
- `script.js` contains a general `window.gtag` event function, but no
  checked consent gate protecting startup of the GA4/AdSense script tags.
- In the above reviewed source files there is **no verified CMP banner,
  Consent Mode default-denied initialization or consent-gated dynamic
  insertion** before those tags. A Cloudflare dashboard, Zaraz,
  external tag, transform or WAF behavior could change the delivered page
  and has NOT been audited here. A live browser/network check is required.
- Important: source inclusion of an AdSense script does NOT demonstrate
  paid ads are actually displayed, approved, or receiving traffic.
- Avoid assuming that the newly drafted Android **AdMob UMP CMP** also
  manages cookies/GA4/AdSense on the public WEBSITE. These are separate
  consent surfaces. The original Section 5 said a Google-certified
  website CMP was in use; repository evidence alone did not substantiate it.

### Website decision

**SITE_CONSENT_READINESS=HOLD** pending verification of live delivered
website/CMP, actual page-loading network order from a fresh EEA/CH browser,
and privacy-choice withdrawal function. In particular, direct GA4 and
AdSense tag loading could initiate tracking before consent. This is an
implementation risk, not a legal finding or conclusive proof of a live
policy violation.

Suggested read-only verification:
1. In private/incognito browser, open the website and its policy URL.
   Without clicking any consent button, use Chrome DevTools > Network:
   observe `gtag/js`, GA4 `collect`, and `adsbygoogle.js` requests.
   Inspect Cookies/Local Storage, CMP UI, and any consent signal.
2. Inspect the Cloudflare Dashboard's Zaraz/Workers/custom-tags and
   optional deployed consent scripts; do not treat dashboard configuration
   as proof without verifying HTTP/browser runtime.
3. If there is no effective pre-consent gating, prepare a SEPARATE
   implementation/review PR to delay non-essential requests, configure
   a suitable website CMP and apply Consent Mode defaults/updates.
4. Confirm how users reopen or withdraw the website privacy preferences.
5. Retest public URL and browser network before declaring site compliant.

## Evidence: Android pilot `Soldatix/lotto-date-generator-android`

Pilot branch head observed `c7377743f1f29ff893221ae7530e66cffbc2649a`
(Draft PR #2, base main).

- `src-tauri/gen/android/app/build.gradle.kts` only includes
  `com.unity3d.ads-mediation:mediation-sdk:9.5.0` and
  `com.google.android.ump:user-messaging-platform:4.0.0` under
  `-PappsGamesLevelPlaySdkPilot=true`. Debug package identity uses
  isolated `.levelplaypilot` suffix; release tasks are denied.
- No verified ad-network-specific Android adapter/dependency in the
  inspected Gradle file for AppLovin, Unity Ads, Mintegral or others.
  Mentioned networks remain **candidate partners**, not integrated.
- `LevelPlaySdkBannerDraft.kt` hard-stops all ad requests:
  `APPROVED_AD_REQUESTS=false`, and N4/N6 gates are false.
- `N6UmpConsentApiDraft.kt` has `N6_UMP_RUNTIME_APPROVED=false` and
  `N6_ADMOB_CONFIGURATION_APPROVED=false`; not called by MainActivity.
- The production Android manifest has no AdMob application ID; no
  LevelPlay initialization path verified in ordinary MainActivity.
- User's AdMob dashboard screenshots confirm account + unpublished
  Android app creation and its app ID; account/app approvals are pending.
  European regulations message is `Draft`, not published.
- The selected **198 common Google ad technology partners** are potential
  Google demand vendors for GDPR disclosures, NOT 198 Android SDKs or
  independently confirmed mediation networks.
- Before enabling LevelPlay mediation, confirm accounts, actual network
  roster, every selected adapter, Google UMP/Additional Consent coverage,
  underage policies, data safety and privacy disclosure.

### Android decision

**ANDROID_REAL_ADS=OFF; UMP_RUNTIME=OFF; PRODUCTION_NO_GO=TRUE**.
The Android Privacy Policy may discuss conditional future advertising;
it must not claim that its consent dialog or SDK is already live.

## External reference evidence

- Google certified CMP requirements (EEA/UK/CH):
  https://support.google.com/admob/answer/13554116
- AdMob ad tech partner list:
  https://support.google.com/admob/answer/9012903
- Unity LevelPlay GDPR/TCF+Additional Consent:
  https://docs.unity.com/en-us/grow/levelplay/platform/legal-resources/ironsource-gdpr-compliance
- UMP Android official implementation:
  https://developers.google.com/admob/android/privacy

## Review gates

- [ ] Confirm live website GA4/AdSense and CMP network behavior.
- [ ] Ensure website consent handling is accurate and compliant.
- [ ] Verify Android release binary, partner roster, consent architecture.
- [ ] Final human/legal review of `privacy-policy.html`.
- [ ] Obtain explicit separate user approval to merge/deploy website PR #37.
- [ ] Verify public privacy-policy URL after merge and before AdMob
  GDPR draft publication or any SDK/ad request activation.

This audit adds **no tracking, consent runtime, ad SDK code, publication
or public website change**.
