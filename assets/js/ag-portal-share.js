/* Portal share, no tracking or remote QR service. */
(function () {
"use strict";
const url = "https://appsandgames.org/";
const copy = {
  "en": [
    "Share",
    "Share Apps & Games",
    "Share free apps and games with your friends.",
    "Website link",
    "Copy link",
    "Share link",
    "Download PNG",
    "Download SVG",
    "Print QR",
    "Close",
    "QR code for Apps & Games",
    "Link copied.",
    "Select and copy the link manually.",
    "Sharing unavailable. You can copy the link instead.",
    "Could not create PNG. Download SVG instead.",
    "Could not print. Download the QR code instead."
  ],
  "hr": [
    "Podijeli",
    "Podijeli Apps & Games",
    "Podijelite besplatne aplikacije i igre s prijateljima.",
    "Poveznica portala",
    "Kopiraj poveznicu",
    "Podijeli poveznicu",
    "Preuzmi PNG",
    "Preuzmi SVG",
    "Ispiši QR",
    "Zatvori",
    "QR kod za Apps & Games",
    "Poveznica je kopirana.",
    "Označite i kopirajte poveznicu ručno.",
    "Dijeljenje nije dostupno. Možete kopirati poveznicu.",
    "PNG nije izrađen. Preuzmite SVG.",
    "Ispis nije uspio. Preuzmite QR kod."
  ],
  "de": [
    "Teilen",
    "Apps & Games teilen",
    "Teile kostenlose Apps und Spiele mit Freunden.",
    "Website-Link",
    "Link kopieren",
    "Link teilen",
    "PNG herunterladen",
    "SVG herunterladen",
    "QR drucken",
    "Schließen",
    "QR-Code für Apps & Games",
    "Link kopiert.",
    "Link bitte manuell markieren und kopieren.",
    "Teilen nicht verfügbar. Du kannst den Link kopieren.",
    "PNG konnte nicht erstellt werden. Lade stattdessen SVG herunter.",
    "Drucken nicht möglich. Lade den QR-Code herunter."
  ],
  "it": [
    "Condividi",
    "Condividi Apps & Games",
    "Condividi app e giochi gratuiti con gli amici.",
    "Link del sito",
    "Copia link",
    "Condividi link",
    "Scarica PNG",
    "Scarica SVG",
    "Stampa QR",
    "Chiudi",
    "Codice QR per Apps & Games",
    "Link copiato.",
    "Seleziona e copia il link manualmente.",
    "Condivisione non disponibile. Puoi copiare il link.",
    "Impossibile creare il PNG. Scarica invece SVG.",
    "Stampa non riuscita. Scarica il codice QR."
  ],
  "es": [
    "Compartir",
    "Compartir Apps & Games",
    "Comparte aplicaciones y juegos gratuitos con tus amigos.",
    "Enlace del sitio",
    "Copiar enlace",
    "Compartir enlace",
    "Descargar PNG",
    "Descargar SVG",
    "Imprimir QR",
    "Cerrar",
    "Código QR de Apps & Games",
    "Enlace copiado.",
    "Selecciona y copia el enlace manualmente.",
    "Compartir no está disponible. Puedes copiar el enlace.",
    "No se pudo crear el PNG. Descarga SVG.",
    "No se pudo imprimir. Descarga el código QR."
  ]
};
const keys = ["nav","title","intro","urlLabel","copy","share","png","svg","print","close","alt","copied","manual","unavailable","pngError","printError"];
const get = id => document.getElementById("ag-share-" + id);
const dialog = get("dialog"), trigger = get("open"), field = get("url"), qr = get("qr"), status = get("status");
if (!dialog || !trigger) return;
let messages, lastStatus = "";
function update() {
  const language = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
  messages = Object.fromEntries(keys.map((k,i) => [k,(copy[language] || copy.en)[i]]));
  document.querySelectorAll("[data-ag-share]").forEach(n => n.textContent = messages[n.dataset.agShare]);
  trigger.setAttribute("aria-label", messages.title);
  get("close").setAttribute("aria-label",messages.close);
  qr.alt = messages.alt;
  status.textContent = lastStatus ? messages[lastStatus] : "";
}
function report(key) { lastStatus = key; status.textContent = messages[key] || ""; }
update();
new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
trigger.addEventListener("click", e => {
  if (typeof dialog.showModal !== "function" || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
  e.preventDefault(); report(""); if (!dialog.open) dialog.showModal(); get("close").focus();
});
get("close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => { document.body.classList.remove("ag-share-print"); trigger.focus(); });
field.addEventListener("click", () => field.select());
async function copyLink() {
  try { if (!navigator.clipboard?.writeText) throw Error("unavailable"); await navigator.clipboard.writeText(url); report("copied"); }
  catch { field.focus(); field.select(); try { if (document.execCommand("copy")) { report("copied"); return; } } catch {} report("manual"); }
}
get("copy").addEventListener("click", copyLink);
get("native").addEventListener("click", async () => {
  if (!navigator.share) { report("unavailable"); field.focus(); field.select(); return; }
  try { await navigator.share({title:"Apps & Games",url}); }
  catch (e) { if (e.name !== "AbortError") { report("unavailable"); field.focus(); field.select(); } }
});
get("png").addEventListener("click", async () => {
  try {
    if (!qr.complete || !qr.naturalWidth) await qr.decode();
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1188;
    const ctx = canvas.getContext("2d",{alpha:false}); if (!ctx) throw Error("canvas");
    ctx.fillStyle="#fff"; ctx.fillRect(0,0,1188,1188); ctx.imageSmoothingEnabled=false;
    ctx.drawImage(qr,0,0,1188,1188);
    const blob = await new Promise(resolve => canvas.toBlob(resolve,"image/png")); if (!blob) throw Error("PNG");
    const objectUrl = URL.createObjectURL(blob), a = document.createElement("a");
    a.href=objectUrl; a.download="Apps-and-Games-QR.png"; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl),15000);
  } catch { report("pngError"); }
});
get("print").addEventListener("click", () => {
  document.body.classList.add("ag-share-print");
  try { window.print(); } catch { document.body.classList.remove("ag-share-print"); report("printError"); }
});
window.addEventListener("afterprint", () => document.body.classList.remove("ag-share-print"));
})();
