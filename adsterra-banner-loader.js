/* Apps & Games: Adsterra banner loader, parser-time only.
 * Uses original GET CODE for ONE responsive banner per viewport,
 * plus a separate approved 300x250 sidebar on sufficiently wide screens.
 * The original code is NOT inserted unless unified advertising consent
 * has been explicitly stored on a previous page load. document.write() compatibility is provider-unconfirmed.
 * No custom iframe wrapper, no hidden ad impressions, no auto-refresh.
 */
(() => {
  "use strict";
  const script = document.currentScript;
  const slot = script && script.parentElement;
  if (!slot || document.readyState !== "loading") return;
  const unit = script.dataset.unit;
  const validDevice = unit === "desktop"
    ? matchMedia("(min-width: 800px)").matches
    : unit === "mobile"
      ? matchMedia("(min-width: 320px) and (max-width: 799px)").matches
      : unit === "sidebar" && matchMedia("(min-width: 1280px)").matches;
  if (!validDevice) return;
  // Match the shared privacy dialog's selection order: newest valid local
  // preference or first-party consent cookie. Mobile visits via a different
  // subdomain may have only the shared cookie on this origin.
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
  catch (_) { /* Storage unavailable: no local consent. */ }
  try {
    const part = document.cookie.split("; ").find(value =>
      value.startsWith("ag_privacy_choices_v1="));
    if (part) shared = validConsent(decodeURIComponent(
      part.slice("ag_privacy_choices_v1=".length)));
  } catch (_) { /* Invalid or unavailable cookie: no shared consent. */ }
  const selected = shared && (!local || shared.timestamp >= local.timestamp)
    ? shared : local;
  if (!selected || selected.advertising !== true) return;
  const snippets = {
    desktop: "<script>\n  atOptions = {\n    'key' : '3e88187807f72645af6b39e90957f6a8',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/3e88187807f72645af6b39e90957f6a8\"></script>",
    mobile: "<script>\n  atOptions = {\n    'key' : 'fc02ce1675aa14021ad3dee29c123264',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/fc02ce1675aa14021ad3dee29c123264\"></script>",
    sidebar: "<script>\n  atOptions = {\n    'key' : '0f5386e1fbab687b18a7f7686197bec7',\n    'format' : 'iframe',\n    'height' : 250,\n    'width' : 300,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/0f5386e1fbab687b18a7f7686197bec7\"></script>"
  };
  slot.hidden = false;
  const adLabel = document.createElement("span");
  adLabel.className = "ag-ad-label";
  adLabel.textContent = "Advertisement";
  slot.insertBefore(adLabel, script);
  document.write(snippets[unit]);
})();
