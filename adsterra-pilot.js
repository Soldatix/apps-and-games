/* Apps & Games / Adsterra: PREVIEW ONLY.
   Adsterra Support confirmed custom iframe placement is PROHIBITED (2026-11-04).
   This file NEVER executes, embeds, fetches or configures third-party ad scripts.
   It is intentionally safe to review on a draft branch before consent integration.
*/
(() => {
  "use strict";
  const regions = {
    top: document.getElementById("adsterra-pilot-top"),
    secondary: document.getElementById("adsterra-pilot-secondary")
  };
  if (!regions.top || !regions.secondary) return;
  if (new URLSearchParams(window.location.search).get("adPreview") !== "1") return;

  // Dimensions are the approved ad inventory, NOT active ad tags.
  const sizes = Object.freeze({
    desktop: Object.freeze({width: 728, height: 90}),
    mobile: Object.freeze({width: 320, height: 50}),
    optional: Object.freeze({width: 300, height: 250})
  });
  const labels = Object.freeze({
    en: { ad: "Advertisement", preview: "Ad placement preview — no advertising code loaded" },
    hr: { ad: "Oglas", preview: "Pregled mjesta za oglas — oglasni kod nije učitan" },
    de: { ad: "Anzeige", preview: "Vorschau der Anzeigenposition — kein Werbecode geladen" },
    it: { ad: "Pubblicità", preview: "Anteprima posizione annuncio — nessun codice pubblicitario caricato" },
    es: { ad: "Publicidad", preview: "Vista previa de la posición — no se ha cargado código publicitario" }
  });
  const desktopQuery = window.matchMedia("(min-width: 768px)");
  function currentLabels() {
    const select = document.getElementById("languageSelect");
    const code = String(select?.value || document.documentElement.lang || "en").toLowerCase().slice(0, 2);
    return labels[code] || labels.en;
  }
  function createText(content, className) {
    const el = document.createElement("p");
    el.className = className;
    el.textContent = content;
    return el;
  }
  function createPreview(size, translated) {
    const box = document.createElement("div");
    box.className = "adsterra-slot adsterra-slot-preview";
    box.style.setProperty("--ad-width", size.width + "px");
    box.style.setProperty("--ad-height", size.height + "px");
    box.append(createText(translated.preview, "adsterra-hint"));
    return box;
  }
  function paint(region, size) {
    const translated = currentLabels();
    region.hidden = false;
    region.replaceChildren(
      createText(translated.ad, "adsterra-label"),
      createPreview(size, translated)
    );
  }
  function render() {
    paint(regions.top, desktopQuery.matches ? sizes.desktop : sizes.mobile);
    paint(regions.secondary, sizes.optional);
  }
  render();
  desktopQuery.addEventListener("change", render);
  document.getElementById("languageSelect")?.addEventListener("change", render);
})();