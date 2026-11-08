/*
 * Apps & Games — unified website privacy choices: analytics + advertising.
 * Optional purposes stay independent. Never loads analytics or ads without an opt-in.
 * This lightweight interface is NOT a Google-certified/IAB TCF advertising CMP.
 * Changing the disclosed advertising partners or purposes requires a revision bump.
 */
(() => {
  "use strict";
  const GA_ID = "G-8QJLPBJPJ8";
  const CONSENT_KEY = "appsGamesPrivacyConsentV1";
  const PARTNER_REVISION = "adsterra-2026-11";
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const LEGACY_ANALYTICS_KEY = "appsGamesWebAnalyticsChoiceV1";
  const LEGACY_ADVERTISING_KEY = "appsGamesAdsterraChoiceV2";

  const LANGS = {
    en: {
      title: "Your privacy choices",
      intro: "We use optional technologies for analytics and advertising. Choose what to allow. Apps & Games works without either; you can change your choices at any time.",
      accept: "Accept all", reject: "Reject all", manage: "Settings", preferences: "Privacy choices",
      save: "Save choices", cancel: "Cancel", policy: "Privacy Policy",
      analytics: "Website analytics", analyticsInfo: "Google Analytics measures visits and website usage.",
      advertising: "Advertising", advertisingInfo: "Advertising partners may use device information, identifiers, cookies and ad interactions for delivery, measurement or personalization.",
      partnerHeading: "Partners and details", partners: "Current providers: Google Analytics for analytics, and Adsterra for advertising on the homepage. New or materially changed partners require a new consent request.",
      adPolicy: "Adsterra Privacy Policy", adCookies: "Adsterra Cookies Policy",
      withdraw: "You can withdraw either permission here at any time. Declining never blocks access to Apps & Games.",
      error: "Unable to save your choice. Nonessential scripts will remain disabled."
    },
    hr: {
      title: "Vaši izbori privatnosti",
      intro: "Koristimo neobavezne tehnologije za analitiku i oglašavanje. Sami birate što dopuštate. Apps & Games radi i bez njih, a odluku možete promijeniti u svakom trenutku.",
      accept: "Prihvati sve", reject: "Odbij sve", manage: "Postavke", preferences: "Postavke privatnosti",
      save: "Spremi odabir", cancel: "Odustani", policy: "Pravila privatnosti",
      analytics: "Analitika stranice", analyticsInfo: "Google Analytics mjeri posjete i korištenje stranice.",
      advertising: "Oglašavanje", advertisingInfo: "Oglašivački partneri mogu koristiti podatke o uređaju, identifikatore, kolačiće i interakcije radi prikaza, mjerenja ili personalizacije oglasa.",
      partnerHeading: "Partneri i detalji", partners: "Trenutačni pružatelji: Google Analytics za analitiku i Adsterra za oglase na početnoj stranici. Novi ili bitno promijenjeni partneri zahtijevaju novu privolu.",
      adPolicy: "Pravila privatnosti Adsterre", adCookies: "Adsterra kolačići",
      withdraw: "Bilo koju privolu ovdje možete povući u svakom trenutku. Odbijanje ne ograničava pristup Apps & Games.",
      error: "Odabir se ne može spremiti. Neobavezne skripte ostat će isključene."
    },
    de: {
      title: "Ihre Datenschutzeinstellungen",
      intro: "Wir verwenden optionale Technologien für Analysen und Werbung. Sie entscheiden, was Sie erlauben. Apps & Games funktioniert auch ohne beides. Ihre Wahl kann jederzeit geändert werden.",
      accept: "Alle akzeptieren", reject: "Alle ablehnen", manage: "Einstellungen", preferences: "Datenschutzeinstellungen",
      save: "Auswahl speichern", cancel: "Abbrechen", policy: "Datenschutzerklärung",
      analytics: "Website-Analyse", analyticsInfo: "Google Analytics misst Besuche und die Nutzung der Website.",
      advertising: "Werbung", advertisingInfo: "Werbepartner können Gerätedaten, Kennungen, Cookies und Anzeigeninteraktionen zur Bereitstellung, Messung und Personalisierung verwenden.",
      partnerHeading: "Partner und Details", partners: "Aktuelle Anbieter: Google Analytics für Analysen und Adsterra für Werbung auf der Startseite. Neue oder wesentlich veränderte Partner erfordern eine neue Einwilligung.",
      adPolicy: "Adsterra Datenschutz", adCookies: "Adsterra Cookies",
      withdraw: "Sie können jede Einwilligung hier jederzeit widerrufen. Ablehnen schränkt die Website nicht ein.",
      error: "Auswahl konnte nicht gespeichert werden. Optionale Skripte bleiben deaktiviert."
    },
    it: {
      title: "Le tue scelte sulla privacy",
      intro: "Usiamo tecnologie facoltative per analisi e pubblicità. Scegli tu cosa consentire. Apps & Games funziona anche senza e puoi cambiare idea in qualsiasi momento.",
      accept: "Accetta tutto", reject: "Rifiuta tutto", manage: "Impostazioni", preferences: "Preferenze privacy",
      save: "Salva scelte", cancel: "Annulla", policy: "Informativa privacy",
      analytics: "Analisi del sito", analyticsInfo: "Google Analytics misura visite e utilizzo del sito.",
      advertising: "Pubblicità", advertisingInfo: "I partner pubblicitari possono usare dati del dispositivo, identificatori, cookie e interazioni per distribuire, misurare o personalizzare annunci.",
      partnerHeading: "Partner e dettagli", partners: "Fornitori attuali: Google Analytics per le analisi e Adsterra per gli annunci nella pagina iniziale. Nuovi partner o modifiche sostanziali richiederanno un nuovo consenso.",
      adPolicy: "Privacy Adsterra", adCookies: "Cookie Adsterra",
      withdraw: "Puoi revocare qualsiasi consenso in ogni momento. Rifiutare non limita l'accesso.",
      error: "Impossibile salvare la scelta. Gli script facoltativi resteranno disattivati."
    },
    es: {
      title: "Tus opciones de privacidad",
      intro: "Usamos tecnologías opcionales para analítica y publicidad. Tú eliges qué permitir. Apps & Games funciona sin ellas y puedes cambiar tus elecciones cuando quieras.",
      accept: "Aceptar todo", reject: "Rechazar todo", manage: "Configuración", preferences: "Opciones de privacidad",
      save: "Guardar selección", cancel: "Cancelar", policy: "Política de privacidad",
      analytics: "Analítica del sitio", analyticsInfo: "Google Analytics mide las visitas y el uso del sitio.",
      advertising: "Publicidad", advertisingInfo: "Los socios publicitarios pueden usar datos del dispositivo, identificadores, cookies e interacciones para mostrar, medir y personalizar anuncios.",
      partnerHeading: "Socios y detalles", partners: "Proveedores actuales: Google Analytics para analítica y Adsterra para anuncios en la página principal. Los socios nuevos o cambios importantes requerirán un nuevo consentimiento.",
      adPolicy: "Privacidad Adsterra", adCookies: "Cookies Adsterra",
      withdraw: "Puedes retirar cualquier permiso aquí en cualquier momento. Rechazar no restringe el sitio.",
      error: "No se pudo guardar la elección. Los scripts opcionales permanecerán desactivados."
    }
  };

  const validTimestamp = value =>
    Number.isFinite(value) && Date.now() >= value && Date.now() - value <= MAX_AGE;

  const readPreferences = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
      return stored && stored.version === 1 && stored.partnerRevision === PARTNER_REVISION &&
        typeof stored.analytics === "boolean" && typeof stored.advertising === "boolean" &&
        validTimestamp(stored.timestamp) ? stored : null;
    } catch (_) { return null; }
  };
  const readChoice = () => readPreferences()?.analytics ?? null;

  const legacyChoices = () => {
    let analytics = null, advertising = null;
    try {
      const prior = JSON.parse(localStorage.getItem(LEGACY_ANALYTICS_KEY) || "null");
      const time = Date.parse(prior?.updatedAt || "");
      if (prior?.version === 1 && typeof prior.analytics === "boolean" &&
          validTimestamp(time)) analytics = prior.analytics;
    } catch (_) { /* No legacy choice. */ }
    try {
      const prior = JSON.parse(localStorage.getItem(LEGACY_ADVERTISING_KEY) || "null");
      if (prior?.version === 2 && validTimestamp(prior.when) &&
          (prior.choice === "allow" || prior.choice === "reject")) {
        advertising = prior.choice === "allow";
      }
    } catch (_) { /* No legacy choice. */ }
    return {analytics, advertising};
  };

  const store = (analytics, advertising) => {
    if (typeof analytics !== "boolean" || typeof advertising !== "boolean") return false;
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        version: 1, partnerRevision: PARTNER_REVISION,
        analytics, advertising, timestamp: Date.now()
      }));
      const saved = readPreferences();
      return !!saved && saved.analytics === analytics && saved.advertising === advertising;
    } catch (_) { return false; }
  };

  // Only migrate previously recorded opt-ins for the SAME disclosed providers;
  // never silently migrate if new partners/purposes are introduced.
  const migrateExistingChoices = () => {
    if (readPreferences() || PARTNER_REVISION !== "adsterra-2026-11") return;
    const old = legacyChoices();
    if (old.analytics !== null && old.advertising !== null) store(old.analytics, old.advertising);
  };

  let analyticsLoaded = false, currentDialog = null, lastFocused = null;
  const language = () => {
    const picker = document.getElementById("languageSelect");
    const preferred = picker?.value || document.documentElement.lang || navigator.language || "en";
    return LANGS[preferred.slice(0,2).toLowerCase()] || LANGS.en;
  };
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const action = (caption, className, onClick) => {
    const button = element("button", className, caption);
    button.type = "button";
    button.addEventListener("click", onClick);
    return button;
  };
  const privacyLink = t => {
    const link = element("a", "ag-privacy-link", t.policy);
    link.href = "/privacy-policy";
    return link;
  };
  const externalLink = (caption, url) => {
    const link = element("a", "ag-privacy-link", caption);
    link.href = url;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    return link;
  };
  const removeGaCookies = () => {
    const names = document.cookie.split(";").map(part => part.split("=")[0].trim());
    for (const name of names) {
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of [null, location.hostname, ".appsandgames.org"]) {
        document.cookie = encodeURIComponent(name) +
          "=; Max-Age=0; path=/; SameSite=Lax" + (domain ? "; domain=" + domain : "");
      }
    }
  };
  const loadAnalyticsOnlyAfterConsent = () => {
    if (analyticsLoaded || readChoice() !== true) return;
    analyticsLoaded = true;
    window["ga-disable-" + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied"
    });
    window.gtag("consent", "update", {analytics_storage: "granted"});
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(tag);
  };

  const closeDialog = () => {
    currentDialog?.remove();
    currentDialog = null;
    if (lastFocused?.isConnected) lastFocused.focus();
  };
  const closeBanner = () => document.getElementById("ag-privacy-banner")?.remove();

  const choose = (analytics, advertising, errorHost) => {
    if (!store(analytics, advertising)) {
      const message = element("p", "ag-privacy-error", language().error);
      message.setAttribute("role", "alert");
      (errorHost || document.getElementById("ag-privacy-banner") || currentDialog)?.append(message);
      return;
    }
    if (!analytics) {
      window["ga-disable-" + GA_ID] = true;
      removeGaCookies();
    }
    // A full navigation ensures the existing Adsterra iframes stop after withdrawal,
    // and its parser-time original GET CODE runs only when consent is stored.
    closeDialog();
    closeBanner();
    window.location.reload();
  };

  const openPreferences = () => {
    if (currentDialog) return;
    const t = language();
    lastFocused = document.activeElement;
    const overlay = element("div", "ag-privacy-backdrop");
    const panel = element("section", "ag-privacy-dialog");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "ag-privacy-dialog-title");
    const title = element("h2", "", t.title);
    title.id = "ag-privacy-dialog-title";
    const intro = element("p", "", t.intro);
    const existing = readPreferences();
    const earlier = legacyChoices();
    const switchRow = (name, description, checked, id) => {
      const row = element("label", "ag-privacy-toggle");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.id = id;
      check.checked = checked === true;
      const descriptionBox = element("span", "ag-privacy-toggle-text");
      descriptionBox.append(element("strong", "", name), element("small", "", description));
      row.append(check, descriptionBox);
      return {row, check};
    };
    const analytics = switchRow(t.analytics,t.analyticsInfo,existing?.analytics ?? earlier.analytics,"ag-analytics-toggle");
    const advertising = switchRow(t.advertising,t.advertisingInfo,existing?.advertising ?? earlier.advertising,"ag-advertising-toggle");
    const detail = element("div","ag-privacy-partners");
    detail.append(element("strong","",t.partnerHeading),element("p","",t.partners));
    detail.append(externalLink(t.adPolicy,"https://adsterra.com/privacy-policy-managed/"),
      externalLink(t.adCookies,"https://adsterra.com/cookies/"));
    const note = element("p","ag-privacy-explain",t.withdraw);
    const links = element("div","ag-privacy-links");
    links.append(privacyLink(t));
    const buttons = element("div","ag-privacy-actions");
    buttons.append(
      action(t.reject,"ag-privacy-btn ag-privacy-secondary",()=>choose(false,false,panel)),
      action(t.save,"ag-privacy-btn ag-privacy-primary",()=>choose(analytics.check.checked, advertising.check.checked,panel)),
      action(t.cancel,"ag-privacy-btn ag-privacy-tertiary",closeDialog)
    );
    panel.append(title,intro,analytics.row,advertising.row,detail,note,links,buttons);
    overlay.append(panel);
    document.body.append(overlay);
    currentDialog = overlay;
    analytics.check.focus();
    overlay.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); closeDialog(); }
      if (event.key !== "Tab") return;
      const focusable = [...panel.querySelectorAll("button, a[href], input")];
      const first = focusable[0], last = focusable[focusable.length-1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
  };

  const showBanner = () => {
    if (readPreferences() || document.getElementById("ag-privacy-banner")) return;
    const t = language();
    const banner = element("aside","ag-privacy-banner");
    banner.id = "ag-privacy-banner";
    banner.setAttribute("role","region");
    banner.setAttribute("aria-label",t.title);
    const links = element("div","ag-privacy-links");
    links.append(privacyLink(t));
    const buttons = element("div","ag-privacy-actions");
    buttons.append(
      action(t.reject,"ag-privacy-btn ag-privacy-secondary",()=>choose(false,false,banner)),
      action(t.manage,"ag-privacy-btn ag-privacy-tertiary",openPreferences),
      action(t.accept,"ag-privacy-btn ag-privacy-primary",()=>choose(true,true,banner))
    );
    banner.append(element("h2","",t.title),element("p","",t.intro),links,buttons);
    document.body.append(banner);
  };
  const addPersistentControl = () => {
    const footer = document.querySelector(".footer-links") || document.querySelector("footer") || document.body;
    if (document.getElementById("ag-privacy-choices")) return;
    const button = action(language().preferences,"ag-privacy-footer-control",openPreferences);
    button.id = "ag-privacy-choices";
    footer.append(button);
  };
  const start = () => {
    migrateExistingChoices();
    addPersistentControl();
    if (readChoice() === true) loadAnalyticsOnlyAfterConsent();
    showBanner();
    document.getElementById("languageSelect")?.addEventListener("change",() => {
      const control = document.getElementById("ag-privacy-choices");
      if (control) control.textContent = language().preferences;
      if (document.getElementById("ag-privacy-banner")) { closeBanner(); showBanner(); }
      if (currentDialog) { closeDialog(); openPreferences(); }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();