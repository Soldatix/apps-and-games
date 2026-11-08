/* Apps & Games — ad consent (production candidate).
 * Explicit, independent, versioned & revocable advertising choice.
 * No Adsterra script insertion happens here; synchronous parser loader
 * handles eligible impressions only after an allowed choice + page reload.
 */
(() => {
  "use strict";
  const KEY = "appsGamesAdsterraChoiceV2";
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const labels = {
    en: ["Optional Adsterra advertising","May we show ads from Adsterra? Ads and partners may process your IP address, device data, cookies and interactions to deliver, measure, or personalize advertising. You can use our site without ads.","Allow ads","Reject ads","Advertising preferences","Withdraw ad consent","Adsterra Privacy Policy","Adsterra Cookies Policy","Privacy Policy","You may also clear third-party cookies using your browser settings.","Your choice could not be saved; no ads will be loaded."],
    hr: ["Neobavezni Adsterra oglasi","Smijemo li prikazivati Adsterra oglase? Adsterra i partneri mogu obrađivati IP adresu, podatke o uređaju, kolačiće i interakcije radi prikaza, mjerenja ili personalizacije oglasa. Stranicu možete koristiti i bez oglasa.","Dopusti oglase","Odbij oglase","Postavke oglasa","Povuci privolu za oglase","Pravila privatnosti Adsterre","Adsterra kolačići","Pravila privatnosti","Kolačiće trećih strana možete izbrisati u postavkama preglednika.","Nije moguće spremiti odluku; oglasi se neće učitati."],
    de: ["Optionale Adsterra-Werbung","Dürfen wir Adsterra-Werbung anzeigen? Adsterra und Partner können IP-Adresse, Gerätedaten, Cookies und Interaktionen zur Auslieferung, Messung oder Personalisierung verarbeiten. Die Website bleibt ohne Werbung nutzbar.","Werbung erlauben","Werbung ablehnen","Werbeeinstellungen","Werbeeinwilligung widerrufen","Adsterra Datenschutz","Adsterra Cookies","Datenschutz","Cookies von Drittanbietern können im Browser gelöscht werden.","Ihre Entscheidung konnte nicht gespeichert werden; keine Werbung wird geladen."],
    it: ["Pubblicità Adsterra facoltativa","Possiamo mostrare annunci Adsterra? Adsterra e partner possono trattare indirizzo IP, dati del dispositivo, cookie e interazioni per erogazione, misurazione o personalizzazione. Il sito funziona anche senza annunci.","Consenti annunci","Rifiuta annunci","Preferenze annunci","Revoca consenso annunci","Privacy Adsterra","Cookie Adsterra","Informativa privacy","Puoi eliminare i cookie di terze parti dalle impostazioni del browser.","Scelta non salvata; gli annunci non verranno caricati."],
    es: ["Anuncios Adsterra opcionales","¿Podemos mostrar anuncios de Adsterra? Adsterra y sus socios pueden tratar dirección IP, datos del dispositivo, cookies e interacciones para mostrar, medir o personalizar anuncios. Puedes usar el sitio sin anuncios.","Permitir anuncios","Rechazar anuncios","Preferencias de anuncios","Retirar consentimiento","Privacidad Adsterra","Cookies Adsterra","Política de privacidad","Puedes eliminar cookies de terceros en la configuración del navegador.","No se pudo guardar tu elección; no se mostrarán anuncios."]
  };
  const readChoice = () => {
    try {
      const record = JSON.parse(localStorage.getItem(KEY) || "null");
      const age = record && Date.now() - record.when;
      return record && record.version === 2 && (record.choice === "allow" || record.choice === "reject") &&
        Number.isFinite(age) && age >= 0 && age <= MAX_AGE ? record.choice : null;
    } catch (_) { return null; }
  };
  const writeChoice = choice => {
    if (choice !== "allow" && choice !== "reject") return false;
    try {
      localStorage.setItem(KEY, JSON.stringify({version: 2, choice, when: Date.now()}));
      return readChoice() === choice;
    } catch (_) { return false; }
  };
  const elem = (tag, cls, txt) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (typeof txt === "string") node.textContent = txt;
    return node;
  };
  const currentLabels = () => {
    const lang = (document.getElementById("languageSelect")?.value || document.documentElement.lang || navigator.language || "en").slice(0,2).toLowerCase();
    return labels[lang] || labels.en;
  };
  const primary = document.querySelector(".ag-ad-slot--desktop");
  if (!primary) return;
  let panel = null;
  const show = () => {
    const t = currentLabels();
    if (!panel) {
      panel = elem("section", "ag-ad-consent-panel");
      panel.id = "ag-ad-consent-panel";
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-live", "polite");
      primary.parentElement.insertBefore(panel,primary);
    }
    panel.replaceChildren(elem("h2", "", t[0]),elem("p","",t[1]));
    const links = elem("div","ag-ad-consent-links");
    for (const [caption,url] of [[t[6],"https://adsterra.com/privacy-policy-managed/"],[t[7],"https://adsterra.com/cookies/"],[t[8],"privacy-policy.html"]]) {
      const link=elem("a","",caption);
      link.href=url;
      if (url.startsWith("https://")) {link.target="_blank";link.rel="noopener noreferrer";}
      links.append(link);
    }
    panel.append(links);
    const buttons = elem("div","ag-ad-consent-actions");
    const save = value => {
      if (writeChoice(value)) {
        location.reload(); // reparse entire original ad snippet; withdrawal stops future requests
      } else {
        panel.append(elem("p","ag-ad-disclaimer",t[10]));
      }
    };
    const btn = (caption,cls,value) => {
      const b=elem("button",cls,caption);b.type="button";
      b.addEventListener("click",()=>save(value));return b;
    };
    buttons.append(btn(t[3],"ag-ad-reject","reject"),btn(t[2],"ag-ad-accept","allow"));
    panel.append(buttons,elem("p","ag-ad-disclaimer",t[9]));
  };
  const start = () => {
    const footer = document.querySelector(".footer-links") || document.querySelector("footer");
    const button=elem("button","ag-ad-privacy-control",currentLabels()[4]);
    button.type="button";
    button.id="ag-ad-privacy-control";
    button.addEventListener("click",()=>{
      show();
      panel.scrollIntoView({behavior:"smooth",block:"center"});
    });
    footer?.append(button);
    if (readChoice() === null) show();
    document.getElementById("languageSelect")?.addEventListener("change",()=>{
      button.textContent=currentLabels()[4];
      if(panel)show();
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();
