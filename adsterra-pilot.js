/* Apps & Games Adsterra staging pilot — disabled unless explicitly reviewed.
   This module does not load any vendor script in its default configuration.
   Source of ad unit identifiers: publisher's Adsterra dashboard, Nov 1 2026. */
(() => {
  "use strict";
  const config = Object.freeze({
    adsEnabled: false, // PRODUCTION HOLD: change only after privacy/provider/browser review
    secondaryEnabled: false, // begin with one banner only
    previewParameter: "adPreview",
    consentKey: "appsGamesAdsterraConsentV1",
    units: Object.freeze({
      desktop: Object.freeze({ key: "3e88187807f72645af6b39e90957f6a8", width: 728, height: 90 }),
      mobile: Object.freeze({ key: "fc02ce1675aa14021ad3dee29c123264", width: 320, height: 50 }),
      square: Object.freeze({ key: "0f5386e1fbab687b18a7f7686197bec7", width: 300, height: 250 })
    })
  });

  const labels = {
    en: { advertisement: "Advertisement", preview: "Ad placement preview — no advertising code loaded", choices: "Advertising preferences", disabled: "Ads are off. You can enable third-party ads from Adsterra; it may use cookies and similar identifiers. Read our Privacy Policy.", enable: "Allow Adsterra ads", disable: "Disable Adsterra ads" },
    hr: { advertisement: "Oglas", preview: "Pregled mjesta za oglas — oglasni kod nije učitan", choices: "Postavke oglašavanja", disabled: "Oglasi su isključeni. Možete dopustiti oglase Adsterre, koja može koristiti kolačiće i slične identifikatore. Pročitajte Pravila privatnosti.", enable: "Dopusti Adsterra oglase", disable: "Isključi Adsterra oglase" },
    de: { advertisement: "Anzeige", preview: "Vorschau der Anzeigenposition — kein Werbecode geladen", choices: "Werbeeinstellungen", disabled: "Werbung ist deaktiviert. Sie können Adsterra-Werbung erlauben; Cookies oder ähnliche Kennungen können verwendet werden. Lesen Sie die Datenschutzerklärung.", enable: "Adsterra-Werbung erlauben", disable: "Adsterra-Werbung deaktivieren" },
    it: { advertisement: "Pubblicità", preview: "Anteprima posizione annuncio — nessun codice pubblicitario caricato", choices: "Preferenze pubblicitarie", disabled: "La pubblicità è disattivata. Puoi consentire gli annunci Adsterra, che possono usare cookie e identificatori simili. Leggi l'Informativa sulla privacy.", enable: "Consenti annunci Adsterra", disable: "Disattiva annunci Adsterra" },
    es: { advertisement: "Publicidad", preview: "Vista previa de la posición — no se ha cargado código publicitario", choices: "Preferencias publicitarias", disabled: "Los anuncios están desactivados. Puedes permitir anuncios de Adsterra, que puede utilizar cookies e identificadores similares. Lee la Política de privacidad.", enable: "Permitir anuncios Adsterra", disable: "Desactivar anuncios Adsterra" }
  };
  const regionTop = document.getElementById("adsterra-pilot-top");
  const regionSecondary = document.getElementById("adsterra-pilot-secondary");
  const footerLinks = document.querySelector(".footer-links");
  if (!regionTop || !regionSecondary) return;

  const params = new URLSearchParams(window.location.search);
  const previewOnly = !config.adsEnabled && params.get(config.previewParameter) === "1";
  if (!previewOnly && !config.adsEnabled) return;

  let memoryConsent = null;
  const readConsent = () => {
    try { return window.localStorage.getItem(config.consentKey); }
    catch (_) { return memoryConsent; }
  };
  const writeConsent = (choice) => {
    memoryConsent = choice;
    try { window.localStorage.setItem(config.consentKey, choice); }
    catch (_) { /* private browsing: memory-only consent */ }
  };
  const language = () => {
    const selected = document.getElementById("languageSelect")?.value;
    const detected = (selected || document.documentElement.lang || "en").toLowerCase().slice(0, 2);
    return labels[detected] || labels.en;
  };
  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
  function clear(element) { element.replaceChildren(); }
  function paragraph(text, className) {
    const item = document.createElement("p");
    item.className = className;
    item.textContent = text;
    return item;
  }
  function previewSlot(region, dimensions) {
    const slot = document.createElement("div");
    slot.className = "adsterra-slot adsterra-slot-preview";
    slot.style.setProperty("--ad-width", dimensions.width + "px");
    slot.style.setProperty("--ad-height", dimensions.height + "px");
    slot.append(paragraph(language().preview, "adsterra-hint"));
    region.append(slot);
  }
  function createVendorFrame(unit) {
    const frame = document.createElement("iframe");
    frame.width = String(unit.width);
    frame.height = String(unit.height);
    frame.title = language().advertisement;
    frame.loading = "lazy";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    // Separate documents prevent cross-unit atOptions collisions and protect the host page.
    // Unverified: some Adsterra campaigns may require a different iframe sandbox policy.
    frame.setAttribute("sandbox", "allow-scripts allow-popups");
    frame.setAttribute("scrolling", "no");
    frame.className = "adsterra-vendor-frame";
    // The publisher supplied exact 'iframe' Adsterra snippet and matching dimensions.
    // A third-party network request happens only after an explicit opt-in.
    frame.srcdoc = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head>' +
      '<body style="margin:0;padding:0;overflow:hidden">' +
      '<script>atOptions = {' +
      "'key' : '" + unit.key + "', 'format' : 'iframe', 'height' : " + unit.height +
      ", 'width' : " + unit.width + ", 'params' : {}" +
      '};<\\/script>'.replace('\\/', '/') +
      '<script src="https://bauval.org/22/' + unit.key + '"><\\/script>'.replace('\\/', '/') +
      '</body></html>';
    return frame;
  }
  function actionButton(text, callback) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "adsterra-action";
    button.textContent = text;
    button.addEventListener("click", callback);
    return button;
  }
  let preferencesButton = null;
  function render() {
    regionTop.hidden = false;
    clear(regionTop);
    clear(regionSecondary);
    const label = paragraph(language().advertisement, "adsterra-label");
    regionTop.append(label);
    const chosen = isDesktop() ? config.units.desktop : config.units.mobile;
    if (previewOnly) {
      previewSlot(regionTop, chosen);
      regionSecondary.hidden = false;
      regionSecondary.append(paragraph(language().advertisement, "adsterra-label"));
      previewSlot(regionSecondary, config.units.square);
      return;
    }
    const consented = readConsent() === "yes";
    regionSecondary.hidden = !(consented && config.secondaryEnabled);
    if (consented && navigator.onLine) {
      const slot = document.createElement("div");
      slot.className = "adsterra-slot";
      slot.append(createVendorFrame(chosen));
      regionTop.append(slot);
      if (config.secondaryEnabled) {
        regionSecondary.append(paragraph(language().advertisement, "adsterra-label"));
        const secondary = document.createElement("div");
        secondary.className = "adsterra-slot";
        secondary.append(createVendorFrame(config.units.square));
        regionSecondary.append(secondary);
      }
    } else {
      regionTop.append(paragraph(language().disabled, "adsterra-hint"));
      regionTop.append(actionButton(language().enable, () => {
        writeConsent("yes");
        render();
      }));
    }
    if (preferencesButton) {
      preferencesButton.textContent = consented ? language().disable : language().choices;
      preferencesButton.setAttribute("aria-label", preferencesButton.textContent);
    }
  }
  if (!previewOnly && footerLinks) {
    preferencesButton = actionButton("", () => {
      if (readConsent() === "yes") {
        writeConsent("no");
        render();
      } else {
        regionTop.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
    preferencesButton.classList.add("adsterra-preferences-link");
    footerLinks.append(preferencesButton);
  }
  render();
  // Re-render on viewport/language changes. No new network request occurs when ads are disabled.
  window.matchMedia("(min-width: 768px)").addEventListener("change", render);
  document.getElementById("languageSelect")?.addEventListener("change", render);
  window.addEventListener("online", render);
  window.addEventListener("offline", render);
})();