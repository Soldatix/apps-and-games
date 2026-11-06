/*
 * Apps & Games: website ANALYTICS consent gate, version 1 (draft).
 * Not a Google-certified CMP / IAB TCF implementation. Advertising stays OFF.
 * No GA network request, tag load, or queued tracking event before opt-in.
 */
(() => {
  "use strict";

  const GA_ID = "G-8QJLPBJPJ8";
  const STORAGE_KEY = "appsGamesWebAnalyticsChoiceV1";
  const LANGS = {
    en: {
      title: "Your privacy choices",
      intro: "Optional website analytics help us understand visits. Google Analytics is not loaded unless you agree. Advertising is disabled while we prepare a certified consent solution.",
      accept: "Accept analytics", reject: "Reject analytics", manage: "Manage options",
      preferences: "Privacy choices", details: "Website analytics (Google Analytics 4)",
      explain: "Allow measurement of visits and interactions. Lottery combinations and Personal Keys are not sent to Apps & Games for analytics.",
      save: "Save choices", cancel: "Cancel", policy: "Privacy Policy"
    },
    hr: {
      title: "Vaši izbori privatnosti",
      intro: "Neobavezna analitika pomaže nam razumjeti posjete. Google Analytics ne učitava se bez vaše privole. Oglasi su isključeni dok pripremamo certificirano rješenje.",
      accept: "Prihvati analitiku", reject: "Odbij analitiku", manage: "Upravljaj postavkama",
      preferences: "Postavke privatnosti", details: "Analitika web-stranice (Google Analytics 4)",
      explain: "Dopusti mjerenje posjeta i interakcija. Lotto kombinacije i osobni ključevi ne šalju se Apps & Gamesu radi analitike.",
      save: "Spremi izbore", cancel: "Odustani", policy: "Pravila privatnosti"
    },
    de: {
      title: "Ihre Datenschutzeinstellungen",
      intro: "Optionale Analysen helfen uns, Besuche zu verstehen. Google Analytics wird nur nach Ihrer Zustimmung geladen. Werbung bleibt bis zur Einführung einer zertifizierten Einwilligungslösung deaktiviert.",
      accept: "Analyse akzeptieren", reject: "Analyse ablehnen", manage: "Einstellungen verwalten",
      preferences: "Datenschutzeinstellungen", details: "Website-Analyse (Google Analytics 4)",
      explain: "Messung von Besuchen und Interaktionen erlauben. Lotto-Kombinationen und persönliche Schlüssel werden nicht für Analysen an Apps & Games gesendet.",
      save: "Auswahl speichern", cancel: "Abbrechen", policy: "Datenschutzerklärung"
    },
    it: {
      title: "Le tue scelte sulla privacy",
      intro: "Le analisi facoltative ci aiutano a capire le visite. Google Analytics viene caricato solo con il tuo consenso. La pubblicità resta disattivata in attesa di una soluzione certificata.",
      accept: "Accetta analisi", reject: "Rifiuta analisi", manage: "Gestisci opzioni",
      preferences: "Scelte sulla privacy", details: "Analisi del sito (Google Analytics 4)",
      explain: "Consenti la misurazione di visite e interazioni. Le combinazioni del lotto e le chiavi personali non vengono inviate a Apps & Games per l'analisi.",
      save: "Salva le scelte", cancel: "Annulla", policy: "Informativa sulla privacy"
    },
    es: {
      title: "Tus opciones de privacidad",
      intro: "La analítica opcional nos ayuda a entender las visitas. Google Analytics solo se carga con tu consentimiento. La publicidad sigue desactivada hasta contar con una solución certificada.",
      accept: "Aceptar analítica", reject: "Rechazar analítica", manage: "Gestionar opciones",
      preferences: "Opciones de privacidad", details: "Analítica del sitio (Google Analytics 4)",
      explain: "Permite medir visitas e interacciones. Las combinaciones de lotería y claves personales no se envían a Apps & Games para analítica.",
      save: "Guardar opciones", cancel: "Cancelar", policy: "Política de privacidad"
    }
  };

  let analyticsLoaded = false;
  let currentDialog = null;
  let lastFocused = null;

  const readChoice = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return value && value.version === 1 && (value.analytics === true || value.analytics === false)
        ? value.analytics : null;
    } catch { return null; }
  };

  const saveChoice = value => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1, analytics: value, updatedAt: new Date().toISOString()
      }));
    } catch {
      // If storage is disabled, fail closed on the next navigation.
    }
  };

  const language = () => {
    const picker = document.getElementById("languageSelect");
    const lang = (picker && picker.value) || navigator.language || document.documentElement.lang || "en";
    return LANGS[lang.slice(0, 2).toLowerCase()] || LANGS.en;
  };

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const action = (label, className, callback) => {
    const button = element("button", className, label);
    button.type = "button";
    button.addEventListener("click", callback);
    return button;
  };

  const privacyLink = t => {
    const link = element("a", "ag-privacy-link", t.policy);
    link.href = "/privacy-policy";
    return link;
  };

  const removeGaCookies = () => {
    // Best-effort first-party cleanup; cannot erase Google's server-side data.
    const names = document.cookie.split(";").map(x => x.split("=")[0].trim());
    const domains = [null, location.hostname, ".appsandgames.org"];
    for (const name of names) {
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = encodeURIComponent(name) + "=; Max-Age=0; path=/; SameSite=Lax" +
          (domain ? "; domain=" + domain : "");
      }
    }
  };

  const loadAnalyticsOnlyAfterConsent = () => {
    if (analyticsLoaded || readChoice() !== true) return;
    analyticsLoaded = true;
    window["ga-disable-" + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Basic consent mode: zero Google requests before explicit opt-in.
    window.gtag("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied"
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(tag);
  };

  const closeDialog = () => {
    if (currentDialog) currentDialog.remove();
    currentDialog = null;
    if (lastFocused && lastFocused.isConnected) lastFocused.focus();
  };

  const closeBanner = () => {
    const banner = document.getElementById("ag-privacy-banner");
    if (banner) banner.remove();
  };

  const choose = analytics => {
    const wasLoaded = analyticsLoaded;
    saveChoice(analytics);
    if (analytics) {
      closeDialog();
      closeBanner();
      loadAnalyticsOnlyAfterConsent();
      return;
    }
    window["ga-disable-" + GA_ID] = true;
    removeGaCookies();
    closeDialog();
    closeBanner();
    // The script cannot be unloaded cleanly after a previous opt-in.
    if (wasLoaded) window.location.reload();
  };

  const openPreferences = () => {
    if (currentDialog) return;
    const t = language();
    lastFocused = document.activeElement;
    const backdrop = element("div", "ag-privacy-backdrop");
    const panel = element("section", "ag-privacy-dialog");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "ag-privacy-dialog-title");
    const title = element("h2", "", t.title);
    title.id = "ag-privacy-dialog-title";
    const intro = element("p", "", t.intro);
    const row = element("label", "ag-privacy-toggle");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = readChoice() === true;
    row.append(input, document.createTextNode(t.details));
    const explanation = element("p", "ag-privacy-explain", t.explain);
    const links = element("div", "ag-privacy-links");
    links.append(privacyLink(t));
    const buttons = element("div", "ag-privacy-actions");
    const cancel = action(t.cancel, "ag-privacy-btn ag-privacy-secondary", closeDialog);
    const save = action(t.save, "ag-privacy-btn ag-privacy-primary", () => choose(input.checked));
    buttons.append(cancel, save);
    panel.append(title, intro, row, explanation, links, buttons);
    backdrop.append(panel);
    document.body.append(backdrop);
    currentDialog = backdrop;
    input.focus();
    backdrop.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); closeDialog(); }
      if (event.key !== "Tab") return;
      const focusable = [...panel.querySelectorAll("button, a[href], input")];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
  };

  const showBanner = () => {
    if (readChoice() !== null || document.getElementById("ag-privacy-banner")) return;
    const t = language();
    const banner = element("aside", "ag-privacy-banner");
    banner.id = "ag-privacy-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", t.title);
    const title = element("h2", "", t.title);
    const message = element("p", "", t.intro);
    const links = element("div", "ag-privacy-links");
    links.append(privacyLink(t));
    const buttons = element("div", "ag-privacy-actions");
    buttons.append(
      action(t.reject, "ag-privacy-btn ag-privacy-secondary", () => choose(false)),
      action(t.accept, "ag-privacy-btn ag-privacy-primary", () => choose(true)),
      action(t.manage, "ag-privacy-btn ag-privacy-tertiary", openPreferences)
    );
    banner.append(title, message, links, buttons);
    document.body.appendChild(banner);
  };

  const addPersistentControl = () => {
    const t = language();
    const footer = document.querySelector(".footer-links") || document.querySelector("footer") || document.body;
    if (document.getElementById("ag-privacy-choices")) return;
    const button = action(t.preferences, "ag-privacy-footer-control", openPreferences);
    button.id = "ag-privacy-choices";
    footer.appendChild(button);
  };

  const start = () => {
    addPersistentControl();
    if (readChoice() === true) loadAnalyticsOnlyAfterConsent();
    else showBanner();
    const picker = document.getElementById("languageSelect");
    if (picker) picker.addEventListener("change", () => {
      const old = document.getElementById("ag-privacy-choices");
      if (old) old.textContent = language().preferences;
      const banner = document.getElementById("ag-privacy-banner");
      if (banner) { banner.remove(); showBanner(); }
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once: true});
  else start();
})();
