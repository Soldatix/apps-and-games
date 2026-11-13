/* Mobile Coverage — official Adsterra GET CODE, one responsive unit after
 * explicit, revocable Apps & Games advertising consent on a subsequent reload.
 * Keep partner-provided snippets EXACT, including sizes and provider src.
 * document.write() is required for this parser-time provider integration.
 * No hidden impressions, extra iframes, auto-refresh or second-unit fallback.
 */
(() => {
  "use strict";
  const current = document.currentScript;
  const slot = current && current.parentElement;
  const area = slot && slot.parentElement;
  if (!current || !slot || !area || area.id !== "ad-area" || document.readyState !== "loading") return;
  const unit = current.dataset.unit;
  const visible = unit === "desktop"
    ? matchMedia("(min-width: 800px)").matches
    : unit === "mobile" && matchMedia("(min-width: 320px) and (max-width: 799px)").matches;
  if (!visible) return;

  const validConsent = raw => {
    try {
      const record = JSON.parse(raw || "null");
      const age = record && Date.now() - record.timestamp;
      return record && record.version === 1 &&
        record.partnerRevision === "adsterra-2026-11" &&
        typeof record.analytics === "boolean" &&
        typeof record.advertising === "boolean" &&
        Number.isFinite(age) && age >= 0 &&
        age <= 180 * 24 * 60 * 60 * 1000 ? record : null;
    } catch (_) { return null; }
  };
  let local = null, shared = null;
  try { local = validConsent(localStorage.getItem("appsGamesPrivacyConsentV1")); }
  catch (_) { /* Storage unavailable: fail closed. */ }
  try {
    const part = document.cookie.split(";").map(x => x.trim()).find(x =>
      x.startsWith("ag_privacy_choices_v1="));
    if (part) shared = validConsent(decodeURIComponent(
      part.slice("ag_privacy_choices_v1=".length)));
  } catch (_) { /* Invalid or blocked shared cookie: fail closed. */ }
  const consent = shared && (!local || shared.timestamp >= local.timestamp) ? shared : local;
  if (!consent || consent.advertising !== true) return;

  const snippets = {
  "desktop": "<script>\n  atOptions = {\n    'key' : '7723b6772f152328437cf4a849099699',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/7723b6772f152328437cf4a849099699\"></script>",
  "mobile": "<script>\n  atOptions = {\n    'key' : '2986915dcf6de53c61c5f9eee1731627',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/2986915dcf6de53c61c5f9eee1731627\"></script>"
};
  // Only the selected, consented slot is unhidden; inactive placement remains
  // display:none. Map section follows in normal flow, never overlapped.
  area.hidden = false;
  slot.hidden = false;
  const adLabel = document.createElement("span");
  adLabel.className = "ag-ad-label";
  const lang = (() => {
    try { return localStorage.getItem("appsGamesLanguage") || navigator.language.slice(0,2); }
    catch (_) { return navigator.language.slice(0,2); }
  })();
  adLabel.textContent = ({en:"Advertisement",hr:"Oglas",de:"Werbung",it:"Pubblicità",es:"Publicidad"})[lang] || "Advertisement";
  slot.insertBefore(adLabel,current);
  document.write(snippets[unit]);
})();
