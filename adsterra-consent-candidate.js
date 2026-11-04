/* Apps & Games — PRODUCTION CANDIDATE, DISABLED.
 * DO NOT MERGE/DEPLOY. This is a reviewable native Adsterra loading prototype,
 * NOT a verified legal CMP. Google Analytics/AdSense consent is out of scope.
 * Adsterra support: own 'format: iframe' permitted, extra iframe prohibited.
 * Never enable before explicit owner approval, privacy/provider review and
 * browser validation. Adsterra requests are not sent with flag disabled.
 */
(() => {
  "use strict";
  const APPROVED_FOR_LIVE_ADS = false; // HARD STOP — production NO-GO
  if (!APPROVED_FOR_LIVE_ADS) return;
  if (new URLSearchParams(location.search).get("adPreview") === "1") return;

  const root = document.getElementById("adsterra-pilot-top");
  if (!root) return;
  const STORE_KEY = "appsGamesAdsterraExplicitConsentV1";
  const VERSION = 1;
  const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
  const DESKTOP = "(min-width: 768px)";
  const privacyUrl = "https://adsterra.com/privacy-policy-managed";

  const labels = {
    en: {
      title: "Optional Adsterra advertising",
      detail: "Apps & Games would like to load ads from Adsterra. Ad requests may share technical information with Adsterra and its ad partners, and may use cookies or similar identifiers to deliver, measure, or personalize advertising. You may continue using our apps and games without these ads.",
      sitePrivacy: "Our Privacy Policy", vendorPrivacy: "Adsterra Privacy Policy",
      accept: "Allow Adsterra ads", reject: "Reject Adsterra ads",
      change: "Advertising preferences", withdraw: "Withdraw ad permission",
      ad: "Advertisement", enabled: "Adsterra advertising was permitted.",
      storage: "This browser could not save your choice. No ads were loaded."
    },
    hr: {
      title: "Neobavezni Adsterra oglasi",
      detail: "Apps & Games želi učitavati Adsterra oglase. Oglasni zahtjevi mogu prenijeti tehničke podatke Adsterri i njezinim partnerima, uz kolačiće ili slične identifikatore za prikaz, mjerenje ili personalizaciju oglasa. Aplikacije i igre dostupne su i bez oglasa.",
      sitePrivacy: "Naša pravila privatnosti", vendorPrivacy: "Pravila privatnosti Adsterre",
      accept: "Dopusti Adsterra oglase", reject: "Odbij Adsterra oglase",
      change: "Postavke oglašavanja", withdraw: "Povuci dopuštenje za oglase",
      ad: "Oglas", enabled: "Adsterra oglasi su dopušteni.",
      storage: "Preglednik ne može spremiti odluku. Oglasi nisu učitani."
    },
    de: {
      title: "Optionale Adsterra-Werbung",
      detail: "Apps & Games möchte Werbung von Adsterra laden. Werbeanfragen können technische Daten an Adsterra und Werbepartner übertragen sowie Cookies oder ähnliche Kennungen für Auslieferung, Messung oder Personalisierung nutzen. Apps und Spiele bleiben ohne Werbung nutzbar.",
      sitePrivacy: "Unsere Datenschutzerklärung", vendorPrivacy: "Adsterra Datenschutz",
      accept: "Adsterra-Werbung erlauben", reject: "Adsterra-Werbung ablehnen",
      change: "Werbeeinstellungen", withdraw: "Einwilligung widerrufen",
      ad: "Anzeige", enabled: "Adsterra-Werbung wurde erlaubt.",
      storage: "Die Auswahl konnte nicht gespeichert werden. Keine Anzeigen geladen."
    },
    it: {
      title: "Pubblicità Adsterra facoltativa",
      detail: "Apps & Games vorrebbe caricare annunci Adsterra. Le richieste possono trasmettere dati tecnici ad Adsterra e ai suoi partner e usare cookie o identificatori simili per erogazione, misurazione o personalizzazione. App e giochi restano disponibili senza annunci.",
      sitePrivacy: "La nostra informativa privacy", vendorPrivacy: "Privacy Adsterra",
      accept: "Consenti annunci Adsterra", reject: "Rifiuta annunci Adsterra",
      change: "Preferenze pubblicitarie", withdraw: "Revoca il consenso",
      ad: "Pubblicità", enabled: "Annunci Adsterra consentiti.",
      storage: "Impossibile salvare la scelta. Nessun annuncio caricato."
    },
    es: {
      title: "Publicidad opcional de Adsterra",
      detail: "Apps & Games desea cargar anuncios de Adsterra. Las solicitudes pueden compartir datos técnicos con Adsterra y sus socios y utilizar cookies o identificadores similares para mostrar, medir o personalizar anuncios. Las aplicaciones y juegos siguen disponibles sin publicidad.",
      sitePrivacy: "Nuestra política de privacidad", vendorPrivacy: "Privacidad de Adsterra",
      accept: "Permitir anuncios Adsterra", reject: "Rechazar anuncios Adsterra",
      change: "Preferencias publicitarias", withdraw: "Retirar permiso",
      ad: "Publicidad", enabled: "Publicidad Adsterra permitida.",
      storage: "No se pudo guardar la elección. No se cargaron anuncios."
    }
  };

  function language() {
    const selected = document.getElementById("languageSelect")?.value ||
      document.documentElement.lang || "en";
    return labels[String(selected).toLowerCase().slice(0, 2)] || labels.en;
  }
  function readChoice() {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== VERSION ||
          !["allow", "reject"].includes(data.choice) ||
          typeof data.when !== "number" || !Number.isFinite(data.when) ||
          data.when > Date.now() + 60 * 1000 ||
          Date.now() - data.when > MAX_AGE_MS) return null;
      return data.choice;
    } catch (_) {
      return null; // fail closed: no stored consent
    }
  }
  function writeChoice(choice) {
    if (!["allow", "reject"].includes(choice)) return false;
    try {
      window.localStorage.setItem(STORE_KEY,
        JSON.stringify({ version: VERSION, choice, when: Date.now() }));
      return readChoice() === choice;
    } catch (_) {
      return false;
    }
  }
  function createElement(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  }
  function button(label, onclick) {
    const el = createElement("button", "adsterra-action", label);
    el.type = "button";
    el.addEventListener("click", onclick);
    return el;
  }
  function navigateAfterChoice(choice) {
    if (!writeChoice(choice)) {
      const error = createElement("p", "adsterra-hint", language().storage);
      root.append(error);
      return;
    }
    // A parser-time reload prevents loading an ad script before actual opt-in.
    // On withdrawal the reload stops further loads, but cannot erase cookies
    // already set by an outside ad server. Do not claim it can.
    window.location.reload();
  }
  function showConsentPanel() {
    const t = language();
    root.hidden = false;
    root.replaceChildren();
    const panel = createElement("div", "adsterra-consent-panel");
    panel.setAttribute("role", "group");
    panel.setAttribute("aria-label", t.title);
    panel.append(
      createElement("h2", "adsterra-consent-heading", t.title),
      createElement("p", "adsterra-consent-description", t.detail)
    );
    const links = createElement("p", "adsterra-consent-links");
    const site = createElement("a", "adsterra-consent-link", t.sitePrivacy);
    site.href = "privacy-policy.html";
    const vendor = createElement("a", "adsterra-consent-link", t.vendorPrivacy);
    vendor.href = privacyUrl;
    vendor.rel = "noopener noreferrer";
    vendor.target = "_blank";
    links.append(site, createElement("span", "", " · "), vendor);
    panel.append(links);
    const actions = createElement("div", "adsterra-consent-actions");
    actions.append(
      button(t.reject, () => navigateAfterChoice("reject")),
      button(t.accept, () => navigateAfterChoice("allow"))
    );
    panel.append(actions);
    root.append(panel);
  }
  function openPreferences() {
    showConsentPanel();
    root.scrollIntoView({behavior: "smooth", block: "center"});
  }
  function addFooterControl() {
    const footer = document.querySelector(".footer-links");
    if (!footer) return;
    const pref = button(language().change, openPreferences);
    pref.classList.add("adsterra-preferences-link");
    footer.append(pref);
    document.getElementById("languageSelect")?.addEventListener("change", () => {
      pref.textContent = language().change;
      if (root.querySelector(".adsterra-consent-panel")) showConsentPanel();
    });
  }

  const choice = readChoice();
  const width = window.innerWidth;
  if (choice === "allow" && navigator.onLine && width >= 320) {
    // Exact, publisher-provided two-script snippet, inserted in ordinary BODY
    // during initial synchronous parsing (not inside an external iframe).
    // Unverified in production: use of document.write needs provider approval.
    const desktopCode = "<script>\n  atOptions = {\n    'key' : '3e88187807f72645af6b39e90957f6a8',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/3e88187807f72645af6b39e90957f6a8\"></script>";
    const mobileCode = "<script>\n  atOptions = {\n    'key' : 'fc02ce1675aa14021ad3dee29c123264',\n    'format' : 'iframe',\n    'height' : 50,\n    'width' : 320,\n    'params' : {}\n  };\n</script>\n<script src=\"https://bauval.org/22/fc02ce1675aa14021ad3dee29c123264\"></script>";
    const unit = window.matchMedia(DESKTOP).matches ? desktopCode : mobileCode;
    root.hidden = false;
    root.append(createElement("p", "adsterra-label", language().ad));
    // Called only from this synchronous, parser-inserted external script.
    // Never invoke after DOMContentLoaded; that could replace the document.
    if (document.readyState === "loading") document.write(unit);
    else root.append(createElement("p", "adsterra-hint", language().storage));
    root.append(button(language().withdraw, () => navigateAfterChoice("reject")));
  } else if (choice === null) {
    showConsentPanel();
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", addFooterControl, {once: true});
  else addFooterControl();
})();
