/* Detail-page QR labels; existing page language handling remains authoritative. */
(function () {
    "use strict";
    const copy = {
    en: ["Open on phone", "Hide QR", "Scan with your phone camera to open the web version.", "QR code"],
    hr: ["Otvori na mobitelu", "Sakrij QR", "Skenirajte kamerom mobitela za otvaranje web-verzije.", "QR kod"],
    de: ["Auf dem Handy öffnen", "QR ausblenden", "Mit der Handykamera scannen, um die Webversion zu öffnen.", "QR-Code"],
    it: ["Apri sul telefono", "Nascondi QR", "Scansiona con la fotocamera del telefono per aprire la versione web.", "Codice QR"],
    es: ["Abrir en el móvil", "Ocultar QR", "Escanea con la cámara del móvil para abrir la versión web.", "Código QR"]
};
    const nodes = Array.from(document.querySelectorAll(".ag-phone-qr[data-ag-phone-url]"));
    if (!nodes.length) return;
    function update() {
        const lang = document.documentElement.lang.toLowerCase().split("-")[0];
        const labels = copy[lang] || copy.en;
        for (const node of nodes) {
            node.querySelector(".ag-phone-show").textContent = "📱 " + labels[0];
            node.querySelector(".ag-phone-hide").textContent = labels[1];
            node.querySelector(".ag-phone-hint").textContent = labels[2];
            node.querySelector("svg").setAttribute("aria-label", labels[3]);
        }
    }
    update();
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
