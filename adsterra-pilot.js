/* Apps & Games / Adsterra: TEST-ONLY consent interface.
   PRODUCTION NO-GO. The sole entry point is ?adPreview=1.
   No Adsterra vendor script, iframe, cookie, network call or ad tag is loaded.
   A demo selection in sessionStorage is NOT production/legal consent.
   The existing Google Analytics/AdSense code is unaffected by this module. */
(() => {
  "use strict";
  const top = document.getElementById("adsterra-pilot-top");
  const secondary = document.getElementById("adsterra-pilot-secondary");
  if (!top || !secondary) return;
  if (new URLSearchParams(window.location.search).get("adPreview") !== "1") return;

  const KEY = "appsGamesAdsterraPilotChoiceV1";
  const media = window.matchMedia("(min-width: 768px)");
  const sizes = Object.freeze({
    desktop: Object.freeze({ width: 728, height: 90 }),
    mobile: Object.freeze({ width: 320, height: 50 }),
    optional: Object.freeze({ width: 300, height: 250 }) // Reserved, never displayed
  });
  const labels = Object.freeze({
    en: {
      title: "Adsterra advertising — consent preview",
      description: "Apps & Games plans to show advertising from Adsterra. Its ads may involve external requests, cookies or similar identifiers for delivery, measurement or personalization. Choosing is optional; the apps and games remain available.",
      demo: "TEST ONLY: No real advertising or tracking is loaded in this preview.",
      privacy: "Privacy Policy", provider: "Adsterra Privacy Policy",
      accept: "Allow Adsterra ads", reject: "Reject Adsterra ads",
      accepted: "Preview choice: allowed. No real ad has been loaded.",
      rejected: "Preview choice: rejected. No Adsterra tag is loaded.",
      advertisement: "Advertisement", mock: "Ad placement preview — no advertising code loaded",
      change: "Change advertising choice", withdraw: "Withdraw permission",
      preferences: "Adsterra ad choices (preview)"
    },
    hr: {
      title: "Adsterra oglasi — probna privola",
      description: "Apps & Games planira prikazivati oglase Adsterre. Ti oglasi mogu uključivati zahtjeve prema vanjskim poslužiteljima, kolačiće ili slične identifikatore za prikaz, mjerenje ili personalizaciju. Odluka nije obvezna; aplikacije i igre ostaju dostupne.",
      demo: "SAMO TEST: Ovaj pregled ne učitava stvarne oglase ni praćenje.",
      privacy: "Pravila privatnosti", provider: "Adsterra — pravila privatnosti",
      accept: "Dopusti Adsterra oglase", reject: "Odbij Adsterra oglase",
      accepted: "Probna odluka: dopušteno. Stvarni oglas nije učitan.",
      rejected: "Probna odluka: odbijeno. Adsterra kod nije učitan.",
      advertisement: "Oglas", mock: "Pregled mjesta za oglas — oglasni kod nije učitan",
      change: "Promijeni odluku o oglasima", withdraw: "Povuci dopuštenje",
      preferences: "Postavke Adsterra oglasa (test)"
    },
    de: {
      title: "Adsterra-Werbung — Einwilligungsvorschau",
      description: "Apps & Games plant Werbung von Adsterra. Dabei können externe Anfragen, Cookies oder ähnliche Kennungen zur Auslieferung, Messung oder Personalisierung verwendet werden. Die Entscheidung ist freiwillig; Apps und Spiele bleiben verfügbar.",
      demo: "NUR TEST: Es werden keine echten Anzeigen oder Tracker geladen.",
      privacy: "Datenschutzerklärung", provider: "Adsterra-Datenschutzerklärung",
      accept: "Adsterra-Werbung erlauben", reject: "Adsterra-Werbung ablehnen",
      accepted: "Testentscheidung: erlaubt. Keine echte Werbung geladen.",
      rejected: "Testentscheidung: abgelehnt. Kein Adsterra-Code geladen.",
      advertisement: "Anzeige", mock: "Anzeigenplatzvorschau — kein Werbecode geladen",
      change: "Werbeentscheidung ändern", withdraw: "Einwilligung widerrufen",
      preferences: "Adsterra-Werbeeinstellungen (Test)"
    },
    it: {
      title: "Annunci Adsterra — anteprima consenso",
      description: "Apps & Games prevede annunci Adsterra. Possono comportare richieste esterne, cookie o identificatori simili per erogazione, misurazione o personalizzazione. La scelta è facoltativa; app e giochi restano disponibili.",
      demo: "SOLO TEST: Nessun annuncio reale o tracciamento viene caricato.",
      privacy: "Informativa sulla privacy", provider: "Privacy di Adsterra",
      accept: "Consenti annunci Adsterra", reject: "Rifiuta annunci Adsterra",
      accepted: "Scelta di prova: consentito. Nessun annuncio reale caricato.",
      rejected: "Scelta di prova: rifiutato. Codice Adsterra non caricato.",
      advertisement: "Pubblicità", mock: "Anteprima posizione — nessun codice pubblicitario caricato",
      change: "Modifica scelta pubblicitaria", withdraw: "Revoca il consenso",
      preferences: "Preferenze Adsterra (test)"
    },
    es: {
      title: "Anuncios Adsterra — vista previa del consentimiento",
      description: "Apps & Games prevé mostrar anuncios de Adsterra. Pueden implicar solicitudes externas, cookies o identificadores similares para mostrar, medir o personalizar anuncios. La elección es opcional; las aplicaciones y juegos siguen disponibles.",
      demo: "SOLO PRUEBA: No se cargan anuncios ni rastreadores reales.",
      privacy: "Política de privacidad", provider: "Privacidad de Adsterra",
      accept: "Permitir anuncios Adsterra", reject: "Rechazar anuncios Adsterra",
      accepted: "Elección de prueba: permitido. No se cargó publicidad real.",
      rejected: "Elección de prueba: rechazado. No se cargó código Adsterra.",
      advertisement: "Publicidad", mock: "Vista previa de ubicación — no se cargó código publicitario",
      change: "Cambiar elección publicitaria", withdraw: "Retirar consentimiento",
      preferences: "Opciones de Adsterra (prueba)"
    }
  });

  let memoryChoice = null;
  let editing = false;
  function readChoice() {
    try {
      const choice = window.sessionStorage.getItem(KEY);
      return choice === "allow" || choice === "reject" ? choice : null;
    } catch (_) {
      return memoryChoice;
    }
  }
  function saveChoice(choice) {
    memoryChoice = choice;
    try { window.sessionStorage.setItem(KEY, choice); }
    catch (_) { /* Private mode may disable storage. */ }
    editing = false;
    render();
  }
  function getText() {
    const select = document.getElementById("languageSelect");
    const lang = String(select?.value || document.documentElement.lang || "en").toLowerCase().slice(0, 2);
    return labels[lang] || labels.en;
  }
  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }
  function button(label, action, extraClass) {
    const btn = element("button", "adsterra-action " + (extraClass || ""), label);
    btn.type = "button";
    btn.addEventListener("click", action);
    return btn;
  }
  function link(text, href, external = false) {
    const a = element("a", "adsterra-consent-link", text);
    a.href = href;
    if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    return a;
  }
  function mockSlot(size, t) {
    const box = element("div", "adsterra-slot adsterra-slot-preview");
    box.style.setProperty("--ad-width", size.width + "px");
    box.style.setProperty("--ad-height", size.height + "px");
    box.append(element("p", "adsterra-hint", t.mock));
    return box;
  }
  const footer = document.querySelector(".footer-links");
  const footerButton = footer
    ? button("", () => { editing = true; render(); top.scrollIntoView({ behavior: "smooth", block: "center" }); }, "adsterra-preferences-link")
    : null;
  if (footerButton) footer.append(footerButton);

  function render() {
    const t = getText();
    const choice = readChoice();
    // Exactly one active mock slot; optional 300x250 remains disabled.
    secondary.hidden = true;
    secondary.replaceChildren();
    top.hidden = false;
    const contents = [];
    if (!choice || editing) {
      const panel = element("div", "adsterra-consent-panel");
      panel.setAttribute("role", "group");
      panel.setAttribute("aria-label", t.title);
      panel.append(
        element("h2", "adsterra-consent-heading", t.title),
        element("p", "adsterra-consent-description", t.description),
        element("p", "adsterra-consent-demo", t.demo)
      );
      const links = element("p", "adsterra-consent-links");
      links.append(
        link(t.privacy, "privacy-policy.html"),
        element("span", "adsterra-link-separator", " · "),
        link(t.provider, "https://adsterra.com/privacy-policy-managed", true)
      );
      panel.append(links);
      const actions = element("div", "adsterra-consent-actions");
      actions.append(
        button(t.reject, () => saveChoice("reject"), "adsterra-reject"),
        button(t.accept, () => saveChoice("allow"), "adsterra-accept")
      );
      panel.append(actions);
      contents.push(panel);
    } else {
      contents.push(element("p", "adsterra-consent-status", choice === "allow" ? t.accepted : t.rejected));
      const actions = element("div", "adsterra-consent-actions");
      if (choice === "allow") {
        actions.append(button(t.withdraw, () => saveChoice("reject"), "adsterra-withdraw"));
      }
      actions.append(button(t.change, () => { editing = true; render(); }, "adsterra-change"));
      contents.push(actions);
      if (choice === "allow") {
        contents.push(element("p", "adsterra-label", t.advertisement));
        contents.push(mockSlot(media.matches ? sizes.desktop : sizes.mobile, t));
      }
    }
    top.replaceChildren(...contents);
    if (footerButton) footerButton.textContent = t.preferences;
  }

  render();
  media.addEventListener("change", render);
  document.getElementById("languageSelect")?.addEventListener("change", render);
})();