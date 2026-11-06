# Date Lotto Android — privacy policy review (2026-11-06)

Status: DRAFT ONLY — not deployed.

This PR proposes narrow edits to privacy-policy.html:
- Preserve all existing website analytics, advertising, donations, Windows,
  Digital Clock, local data and contact sections.
- Extend Section 12 to explicitly cover Android WebView local storage and
  Date Lotto Generator Android backup/History/Personal Key data.
- Clearly distinguish current Android production from a debug-only,
  no-ad LevelPlay pilot and a draft AdMob European regulations message.
- Describe future, conditional AdMob/LevelPlay data categories and choices.
- Correct Section 5's broad unverified assertion about website CMP use;
  web and Android consent controls are separate. This DOES NOT establish
  website consent compliance.

Source of facts: repository website content and the owner's Date Lotto
Android no-ad physical tests, AdMob unpublished app + draft CMP screenshots.
Current SDK/UMP N6 Android pilot is compile-only and hard-disabled.
No claim is made that AdMob account approval or OPPO store approval exists.

Official background:
https://developers.google.com/admob/android/privacy
https://docs.unity.com/grow/levelplay/platform/legal-resources/ironsource-gdpr-compliance
https://support.google.com/admob/answer/10502938

REVIEW REQUIRED BEFORE MERGING OR PUBLISHING:
1. Verify Android production binary never makes real AdMob/LevelPlay requests.
2. Confirm actual partner roster, data disclosures, audience/age policy,
   jurisdictional requirements, retention, data safety statements, and
   consent withdrawal/options when advertising is eventually activated.
3. Audit the WEBSITE consent banner and GA4/AdSense loading independently:
   the site currently includes GA4 script and AdSense on its app detail.
   The earlier website CMP certification claim was not verified here.
4. Confirm final website policy accuracy and legal/compliance review.
5. Publish the reviewed site change only with explicit separate approval,
   then verify live https://appsandgames.org/privacy-policy before
   publishing the AdMob GDPR message, UMP runtime or real advertisements.
6. Update the policy review date if public deployment occurs after 2026-11-06.

This change adds no SDK, tracking, advertising or consent runtime code.
No main branch change, no Cloudflare deployment, no production APK modification.
REAL_ADS=OFF; PRODUCTION_NO_GO=TRUE.
