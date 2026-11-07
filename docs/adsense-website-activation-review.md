# AdSense ownership and existing Google CMP — deployment decision (2026-11-07)

**REVIEW ONLY. PR #40 stays DRAFT and remains UNDEPLOYED.**

## Verified facts
- Existing AdSense > Privacy & messaging > European regulations message:
  `Apps & Games Privacy Consent`, site `appsandgames.org`, status
  **Published** in AdSense; no message impressions observed earlier.
- Google AdSense message with logo, privacy URL
  `https://appsandgames.org/privacy-policy.html`, accept/reject/manage.
- Owner checked EN/HR/DE/IT/ES and confirmed all five translations display.
  Changes to the previously published message are **not assumed published**;
  owner has not clicked `Publish changes`.
- AdSense banner: "To start earning from AdSense, you need to add your
  payment info and connect your site". Site must become `Ready` before ads.
- Old website main HTML contained publisher ID
  `ca-pub-6296601518048221`, matched the public AdSense publisher
  code in the repository. An **inert** Google-documented verification
  meta tag is prepared in this review branch's `index.html`.
- Source of documentation:
  https://support.google.com/adsense/answer/12169212
  https://support.google.com/adsense/answer/13996652

## Why verification via meta tag
Google recognizes `<meta name="google-adsense-account" content="ca-pub-...">`
as a site ownership option. Unlike loading an AdSense JS tag, that
element does not itself initiate ads, consent dialogs or tracking.
**Verification cannot succeed until this tag is published on the
public site, and the owner selects Meta tag in the Sites workflow.**
No Google account state has been changed by this PR.

## Next concrete owner actions
1. In AdSense `Sites`, open `appsandgames.org` and read the current
   status. If asked to connect site, select **Meta tag** as the
   ownership method, not AdSense JS code, and compare the ID with
   `ca-pub-6296601518048221`.
2. Complete payment profile fields privately in AdSense. Do not
   share bank, address, ID or financial details in PR/comments/chat.
3. Before merging/deploying anything, obtain explicit owner approval
   for PR #40 and resolve website CMP design: its existing
   analytics-only preference banner must not coexist with Google's
   TCF messaging when the AdSense script is eventually enabled.
4. Once site meta tag is live, request Google ownership verification,
   then separate site review. Do not enable automatic ads.
5. Before monetization: replace/stage analytics-only UX with a
   **single Google-certified CMP**, integrate its official
   `googlefc.callbackQueue` `CONSENT_MODE_DATA_READY`, and only load
   GA4 when `analyticsStoragePurposeConsentStatus=GRANTED`.
   Use the supported `googlefc.showRevocationMessage()` to reopen.
   Treat missing/unknown consent as denied, and require no duplicate banner.
6. Verify real website network order, region and consent behavior before
   any AdSense tag is introduced; site approval is not consent compliance.
   
Official CMP integration docs:
https://developers.google.com/funding-choices/fc-api-docs
https://support.google.com/adsense/answer/14660912

**REAL_ADS_WEB=OFF, REAL_ADS_ANDROID=OFF, PRODUCTION_NO_GO=TRUE.**
