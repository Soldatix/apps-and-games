/* Reuse QR Generator's five-language Portable security guidance. */
(function () {
    "use strict";
    const copy = {
  "en": [
    "Windows SmartScreen",
    "This EXE is not digitally signed. If Windows protected your PC reports an unrecognized app, verify that the ZIP came from our official GitHub Release, compare its SHA-256 with the value below and scan the extracted files. Only if these checks pass and you trust the source may you choose More info → Run anyway, if available and allowed by your device policy. Otherwise choose Don't run. Never bypass malware detections or disable SmartScreen.",
    "Official GitHub Release",
    "SHA-256 of the ZIP",
    "In PowerShell, open the folder containing the downloaded ZIP and run:"
  ],
  "hr": [
    "Windows SmartScreen",
    "Ovaj EXE nije digitalno potpisan. Ako Windows protected your PC upozori na neprepoznatu aplikaciju, provjerite da ZIP potječe iz našeg službenog GitHub Releasea, usporedite SHA-256 s vrijednošću ispod i skenirajte raspakirane datoteke. Samo ako provjere prođu i vjerujete izvoru, možete odabrati More info → Run anyway, ako je dostupno i dopušteno pravilima uređaja. U suprotnom odaberite Don't run. Ne zaobilazite detekcije zlonamjernog softvera i ne isključujte SmartScreen.",
    "Službeni GitHub Release",
    "SHA-256 ZIP-a",
    "U PowerShellu otvorite mapu s preuzetim ZIP-om i pokrenite:"
  ],
  "de": [
    "Windows SmartScreen",
    "Diese EXE ist nicht digital signiert. Wenn Windows protected your PC vor einer unbekannten App warnt, prüfen Sie, ob die ZIP-Datei aus unserem offiziellen GitHub Release stammt, vergleichen Sie den SHA-256-Wert unten und scannen Sie die entpackten Dateien. Nur wenn alle Prüfungen erfolgreich sind und Sie der Quelle vertrauen, können Sie Weitere Informationen → Trotzdem ausführen wählen, sofern verfügbar und durch die Geräterichtlinien erlaubt. Andernfalls Nicht ausführen wählen. Keine Malware-Erkennung umgehen oder SmartScreen deaktivieren.",
    "Offizielles GitHub Release",
    "SHA-256 der ZIP-Datei",
    "Öffnen Sie in PowerShell den Ordner mit der heruntergeladenen ZIP-Datei und führen Sie Folgendes aus:"
  ],
  "it": [
    "Windows SmartScreen",
    "Questo EXE non è firmato digitalmente. Se Windows protected your PC segnala un'app non riconosciuta, verifica che lo ZIP provenga dal nostro GitHub Release ufficiale, confronta il suo SHA-256 con il valore qui sotto e analizza i file estratti. Solo se le verifiche hanno esito positivo e ritieni attendibile la fonte, puoi scegliere Ulteriori informazioni → Esegui comunque, se disponibile e consentito dai criteri del dispositivo. Altrimenti scegli Non eseguire. Non aggirare il rilevamento di malware e non disattivare SmartScreen.",
    "GitHub Release ufficiale",
    "SHA-256 dello ZIP",
    "In PowerShell, apri la cartella contenente lo ZIP scaricato ed esegui:"
  ],
  "es": [
    "Windows SmartScreen",
    "Este EXE no tiene firma digital. Si Windows protected your PC advierte de una aplicación desconocida, comprueba que el ZIP proviene de nuestro GitHub Release oficial, compara su SHA-256 con el valor de abajo y analiza los archivos extraídos. Solo si las comprobaciones son satisfactorias y confías en el origen, puedes elegir Más información → Ejecutar de todas formas, si está disponible y permitido por las directivas del dispositivo. De lo contrario, selecciona No ejecutar. No eludas detecciones de malware ni desactives SmartScreen.",
    "GitHub Release oficial",
    "SHA-256 del ZIP",
    "En PowerShell, abre la carpeta que contiene el ZIP descargado y ejecuta:"
  ]
};
    const keys = ["security-title","security-text","release-link","sha-label","hash-instruction"];
    const panels = Array.from(document.querySelectorAll("[data-ag-portable-security]"));
    function update() {
        const language = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
        const labels = copy[language] || copy.en;
        for (const panel of panels) {
            keys.forEach((key, index) => {
                const value = index === 1 && panel.hasAttribute("data-ag-signature-unconfirmed") ? labels[index].slice(labels[index].indexOf(".") + 1).trim() : labels[index];
                const node = panel.querySelector("#ag-portable-" + key);
                if (node) node.textContent = value;
            });
        }
    }
    update();
    if (panels.length) new MutationObserver(update).observe(document.documentElement, {attributes:true,attributeFilter:["lang"]});
})();
