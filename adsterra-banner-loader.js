/* Apps & Games: Adsterra banner loader, parser-time only.
 * Uses complete, unmodified publisher GET CODE for ONE responsive banner.
 * The original code is NOT inserted until opt-in choice was stored on
 * a previous page load. document.write() compatibility is provider-unconfirmed.
 * No custom iframe wrapper, no hidden ad impressions, no auto-refresh.
 */
(() => {
  "use strict";
  const script = document.currentScript;
  const slot = script && script.parentElement;
  if (!slot || document.readyState !== "loading") return;
  const unit = script.dataset.unit;
  const validDevice = unit === "desktop"
    ? matchMedia("(min-width: 768px)").matches
    : unit === "mobile" && matchMedia("(min-width: 320px) and (max-width: 767px)").matches;
  if (!validDevice) return;
  let allowed = false;
  try {
    const record = JSON.parse(localStorage.getItem("appsGamesAdsterraChoiceV2") || "null");
    const age = record && Date.now() - record.when;
    allowed = record && record.version === 2 && record.choice === "allow" &&
      Number.isFinite(age) && age >= 0 && age <= 180 * 24 * 60 * 60 * 1000;
  } catch (_) { allowed = false; }
  if (!allowed) return;
  const snippets = {
    desktop: "<script>\n  atOptions = {\n    'key' : '3e88187807f72645af6b39e90957f6a8',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/3e88187807f72645af6b39e90957f6a8\"></script>",
    mobile: "<script>\n  atOptions = {\n    'key' : 'fc02ce1675aa14021ad3dee29c123264',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/fc02ce1675aa14021ad3dee29c123264\"></script>"
  };
  slot.hidden = false;
  const adLabel = document.createElement("span");
  adLabel.className = "ag-ad-label";
  adLabel.textContent = "Advertisement";
  slot.insertBefore(adLabel, script);
  document.write(snippets[unit]);
})();
