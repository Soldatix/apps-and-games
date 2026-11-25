/* Share actions for the existing catalog/detail QR panels. No new QR generation or tracking. */
(function () {
"use strict";
const titles = {
  "https://digitalclock.appsandgames.org/": "Digital Clock",
  "https://lotto.appsandgames.org/": "Date Lotto Generator",
  "https://emoji.appsandgames.org/": "Emoji Copy & Paste",
  "https://unitconverter.appsandgames.org/": "Unit Converter",
  "https://crossword.appsandgames.org/": "Crossword",
  "https://habit-tracker.appsandgames.org/": "Habit Tracker / Daily Planner",
  "https://appsandgames.org/speed-test/": "Internet Speed Test",
  "https://mobile-coverage.appsandgames.org/": "Mobile Network Coverage",
  "https://appsandgames.org/qr-code-generator/": "QR Code Generator",
  "https://tetris.appsandgames.org/": "Tetris",
  "https://ufo-invaders.appsandgames.org/": "UFO Invaders: Neon Defense",
  "https://phoenix-arcade.appsandgames.org/": "Phoenix Arcade",
  "https://neonpacman.appsandgames.org/": "Neon Pac-Man",
  "https://snake.appsandgames.org/": "Modern Snake",
  "https://memory.appsandgames.org/": "Memory Game",
  "https://chess.appsandgames.org/": "Animated 3D Chess"
};
const copy = {
  "en": [
    "Open on phone / Share",
    "Copy link",
    "Share link",
    "Download PNG",
    "Download SVG",
    "Print QR",
    "Link copied.",
    "Select and copy the link manually.",
    "Sharing unavailable. You can copy the link instead.",
    "Could not create PNG. Download SVG instead.",
    "Could not print. Download the QR code instead.",
    "Could not export the QR code."
  ],
  "hr": [
    "Otvori na mobitelu / Podijeli",
    "Kopiraj poveznicu",
    "Podijeli poveznicu",
    "Preuzmi PNG",
    "Preuzmi SVG",
    "Ispiši QR",
    "Poveznica je kopirana.",
    "Označite i kopirajte poveznicu ručno.",
    "Dijeljenje nije dostupno. Možete kopirati poveznicu.",
    "PNG nije izrađen. Preuzmite SVG.",
    "Ispis nije uspio. Preuzmite QR kod.",
    "QR kod nije moguće izvesti."
  ],
  "de": [
    "Auf dem Handy öffnen / Teilen",
    "Link kopieren",
    "Link teilen",
    "PNG herunterladen",
    "SVG herunterladen",
    "QR drucken",
    "Link kopiert.",
    "Link bitte manuell markieren und kopieren.",
    "Teilen nicht verfügbar. Du kannst den Link kopieren.",
    "PNG konnte nicht erstellt werden. Lade stattdessen SVG herunter.",
    "Drucken nicht möglich. Lade den QR-Code herunter.",
    "QR-Code konnte nicht exportiert werden."
  ],
  "it": [
    "Apri sul telefono / Condividi",
    "Copia link",
    "Condividi link",
    "Scarica PNG",
    "Scarica SVG",
    "Stampa QR",
    "Link copiato.",
    "Seleziona e copia il link manualmente.",
    "Condivisione non disponibile. Puoi copiare il link.",
    "Impossibile creare il PNG. Scarica invece SVG.",
    "Stampa non riuscita. Scarica il codice QR.",
    "Impossibile esportare il codice QR."
  ],
  "es": [
    "Abrir en el móvil / Compartir",
    "Copiar enlace",
    "Compartir enlace",
    "Descargar PNG",
    "Descargar SVG",
    "Imprimir QR",
    "Enlace copiado.",
    "Selecciona y copia el enlace manualmente.",
    "Compartir no está disponible. Puedes copiar el enlace.",
    "No se pudo crear el PNG. Descarga SVG.",
    "No se pudo imprimir. Descarga el código QR.",
    "No se pudo exportar el código QR."
  ]
};
const keys = ["show","copy","share","png","svg","print","copied","manual","unavailable","pngError","printError","svgError"];
const actions = ["copy","share","png","svg","print"];
const selector = ".ag-phone-qr[data-ag-phone-url]";
const statusKeys = new WeakMap();
let printNode = null;
function messages() {
  const lang = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
  return Object.fromEntries(keys.map((k,i)=>[k,(copy[lang] || copy.en)[i]]));
}
function context(panel) {
  const url = panel.dataset.agPhoneUrl;
  if (!Object.prototype.hasOwnProperty.call(titles,url)) return null;
  const body = panel.querySelector(".ag-phone-body"), link = panel.querySelector(".ag-phone-link"), svg = body?.querySelector("svg");
  if (!body || !link || link.getAttribute("href") !== url || !svg) return null;
  return {url, title:titles[url], body,link,svg};
}
function report(panel,key) {
  statusKeys.set(panel,key);
  const status = panel.querySelector(".ag-phone-share-status");
  if (status) status.textContent = messages()[key] || "";
}
function enhance() {
  const labels = messages();
  for (const panel of document.querySelectorAll(selector)) {
    const c = context(panel); if (!c) continue;
    let group = panel.querySelector(".ag-phone-share-actions");
    if (!group) {
      group = document.createElement("div"); group.className = "ag-phone-share-actions";
      for (const action of actions) {
        const button = document.createElement("button"); button.type = "button"; button.dataset.agPhoneAction = action;
        group.append(button);
      }
      const status = document.createElement("p"); status.className = "ag-phone-share-status"; status.setAttribute("role","status");
      c.body.append(group,status);
    }
    panel.querySelector(".ag-phone-show").textContent = "📱 " + labels.show;
    for (const button of group.querySelectorAll("button")) button.textContent = labels[button.dataset.agPhoneAction];
    report(panel,statusKeys.get(panel) || "");
  }
}
function selectLink(link) {
  link.focus();
  const selection = window.getSelection(); if (!selection) return;
  const range = document.createRange(); range.selectNodeContents(link); selection.removeAllRanges(); selection.addRange(range);
}
async function copyLink(panel,c) {
  try { if (!navigator.clipboard?.writeText) throw Error("clipboard"); await navigator.clipboard.writeText(c.url); report(panel,"copied"); }
  catch {
    selectLink(c.link);
    try { if (document.execCommand("copy")) { report(panel,"copied"); return; } } catch {}
    report(panel,"manual");
  }
}
function qrMatrix(svg) {
  const view = /^0 0 (\d+) (\d+)$/.exec(svg.getAttribute("viewBox") || "");
  if (!view || view[1] !== view[2]) throw Error("viewBox");
  const n = Number(view[1]); if (n < 29 || n > 185 || (n-29)%4 !== 0) throw Error("size");
  const path = svg.querySelector("path")?.getAttribute("d") || "";
  const points = []; const re = /M(\d+),(\d+)h1v1h-1z/g; let m, count=0;
  while ((m=re.exec(path))) {
    const x=Number(m[1]), y=Number(m[2]); if (x<4 || y<4 || x>=n-4 || y>=n-4) throw Error("quiet zone");
    points.push([x,y]); count += m[0].length;
  }
  if (!points.length || count!==path.length || new Set(points.map(p=>p.join(","))).size!==points.length) throw Error("modules");
  return {n,points,path};
}
function save(blob,filename) {
  const objectUrl=URL.createObjectURL(blob), a=document.createElement("a");
  a.href=objectUrl; a.download=filename; document.body.append(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(objectUrl),15000);
}
function filename(title) { return "Apps-and-Games-"+title.replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"")+"-QR"; }
function exportSvg(c) {
  const {n,path}=qrMatrix(c.svg);
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+n+' '+n+'"><rect width="'+n+'" height="'+n+'" fill="#fff"/><path d="'+path+'" fill="#000"/></svg>';
  save(new Blob([svg],{type:"image/svg+xml"}),filename(c.title)+".svg");
}
async function exportPng(c) {
  const {n,points}=qrMatrix(c.svg), scale=Math.floor(1200/n);
  const canvas=document.createElement("canvas"); canvas.width=canvas.height=n*scale;
  const ctx=canvas.getContext("2d",{alpha:false}); if (!ctx) throw Error("canvas");
  ctx.fillStyle="#fff"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#000"; for(const [x,y] of points) ctx.fillRect(x*scale,y*scale,scale,scale);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/png")); if (!blob) throw Error("PNG");
  save(blob,filename(c.title)+".png");
}
function cleanupPrint() {
  document.body.classList.remove("ag-phone-print"); if (printNode) { printNode.remove(); printNode=null; }
}
function printQR(c) {
  cleanupPrint(); qrMatrix(c.svg);
  printNode=document.createElement("div"); printNode.className="ag-phone-print-page";
  const title=document.createElement("h1"); title.textContent=c.title;
  const brand=document.createElement("p"); brand.textContent="Apps & Games";
  const url=document.createElement("p"); url.textContent=c.url;
  printNode.append(brand,title,c.svg.cloneNode(true),url); document.body.append(printNode);
  document.body.classList.add("ag-phone-print");
  try { window.print(); } catch(e) { cleanupPrint(); throw e; }
}
document.addEventListener("click",async e=>{
  const button=e.target.closest?.("button[data-ag-phone-action]"); if (!button) return;
  const panel=button.closest(selector); if (!panel) return;
  const c=context(panel); if (!c) return;
  const action=button.dataset.agPhoneAction; report(panel,"");
  if(action==="copy") { await copyLink(panel,c); return; }
  if(action==="share") {
    try { if(!navigator.share) throw Error("share"); await navigator.share({title:c.title,url:c.url}); }
    catch(e) { if(e.name!=="AbortError") { selectLink(c.link); report(panel,"unavailable"); } } return;
  }
  try {
    if(action==="png") await exportPng(c);
    else if(action==="svg") exportSvg(c);
    else if(action==="print") printQR(c);
  } catch { report(panel,action==="png"?"pngError":action==="svg"?"svgError":"printError"); }
});
window.addEventListener("afterprint",cleanupPrint);
enhance();
new MutationObserver(enhance).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
for(const id of ["utilitiesGrid","gamesGrid"]) {
  const grid=document.getElementById(id); if(grid) new MutationObserver(enhance).observe(grid,{childList:true});
}
})();
