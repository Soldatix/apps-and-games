/* Apps & Games — Adsterra GDPR consent UX review only.
 * HARD STOP: no third-party scripts, network requests, cookie identifiers or ad revenue.
 * Preview using ?adConsentPreview=1. Session choice is not legal/production consent.
 * The provider's exact GET CODE must be integrated in a separately approved release.
 */
(() => {
  "use strict";
  const PRODUCTION_ADS_ENABLED = false;
  if (PRODUCTION_ADS_ENABLED) return; // Only this safe test-only module exists here.
  if (new URLSearchParams(location.search).get("adConsentPreview") !== "1") return;
  const STORAGE_KEY = "appsGamesAdsterraConsentDemoV1";
  const labels = {
    en: ["Adsterra consent — demonstration only", "Advertising consent is separate from analytics. This preview sends no Adsterra requests, even after approval.", "Allow (demo)", "Reject (demo)", "Withdraw (demo)", "Demo only — no real ad requests", "Choice: permitted for this preview only", "Choice: rejected; no ad placements shown", "Privacy Policy"],
    hr: ["Adsterra privola — samo demonstracija", "Privola za oglase odvojena je od analitike. Ovaj pregled ne šalje zahtjeve Adsterri, čak ni nakon prihvaćanja.", "Prihvati (demo)", "Odbij (demo)", "Povuci (demo)", "Samo prikaz — bez stvarnih oglasa", "Odabrano: dopušteno samo za ovaj pregled", "Odabrano: odbijeno; mjesta za oglase su skrivena", "Pravila privatnosti"],
    de: ["Adsterra-Einwilligung — nur Demo", "Werbeeinwilligung ist von Analysen getrennt. Diese Vorschau sendet auch nach Zustimmung keine Werbeanfragen.", "Zulassen (Demo)", "Ablehnen (Demo)", "Widerrufen (Demo)", "Nur Vorschau — keine echten Anzeigen", "Entscheidung: nur für Vorschau zugelassen", "Entscheidung: abgelehnt, Anzeigenplätze verborgen", "Datenschutz"],
    it: ["Consenso Adsterra — solo dimostrazione", "Il consenso pubblicitario è distinto da quello per le analisi. Nessuna richiesta ad Adsterra viene inviata.", "Accetta (demo)", "Rifiuta (demo)", "Revoca (demo)", "Solo anteprima — nessun annuncio reale", "Scelta: consenso solo per questa anteprima", "Scelta: rifiutato; spazi pubblicitari nascosti", "Privacy"],
    es: ["Consentimiento de Adsterra — solo demostración", "El consentimiento publicitario es independiente del de analítica. Esta vista no envía solicitudes de anuncios.", "Permitir (demo)", "Rechazar (demo)", "Retirar (demo)", "Solo vista previa — sin anuncios reales", "Elección: permitido solo en la vista previa", "Elección: rechazado; espacios ocultos", "Privacidad"]
  };
  const slots = Array.from(document.querySelectorAll("[data-ad-placement]"));
  const firstSlot = document.querySelector(".ag-ad-slot--desktop");
  if (slots.length !== 3 || !firstSlot) return;
  let choice = null;
  try { const saved = sessionStorage.getItem(STORAGE_KEY); if (saved === "allow" || saved === "reject") choice = saved; }
  catch (_) { choice = null; }
  const make = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  };
  const section = make("section", "ag-ad-consent-demo");
  section.id = "ag-ad-consent-demo";
  section.setAttribute("role", "region");
  firstSlot.parentNode.insertBefore(section, firstSlot);
  const render = () => {
    const language = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    const t = labels[language] || labels.en;
    section.replaceChildren();
    section.setAttribute("aria-label", t[0]);
    section.append(make("h2", "", t[0]), make("p", "", t[1]));
    const actions = make("div", "ag-ad-demo-actions");
    const choose = (value) => {
      choice = value;
      try { sessionStorage.setItem(STORAGE_KEY, value); }
      catch (_) { choice = "reject"; }
      render();
    };
    const action = (caption, value) => {
      const button = make("button", "", caption);
      button.type = "button";
      button.addEventListener("click", () => choose(value));
      return button;
    };
    actions.append(action(t[2], "allow"), action(t[3], "reject"), action(t[4], "reject"));
    section.append(actions);
    const status = make("p", "", choice === "allow" ? t[6] : choice === "reject" ? t[7] : t[5]);
    status.setAttribute("role", "status");
    section.append(status);
    const policy = make("a", "", t[8]);
    policy.href = "privacy-policy.html";
    section.append(policy);
    slots.forEach(slot => {
      slot.replaceChildren();
      slot.hidden = choice !== "allow";
      if (choice === "allow") {
        const dimensions = slot.dataset.adPlacement === "32042360" ? "728 × 90"
          : slot.dataset.adPlacement === "32042361" ? "320 × 50" : "300 × 250";
        slot.append(make("span", "ag-ad-demo-placeholder", dimensions + " — " + t[5]));
      }
    });
  };
  render();
  const picker = document.getElementById("languageSelect");
  if (picker) picker.addEventListener("change", () => setTimeout(render, 0));
})();
