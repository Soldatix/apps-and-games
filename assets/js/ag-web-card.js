/* Shared Web/PWA card presentation. Existing product-specific version labels, URLs and Chess translations remain authoritative. */
(function () {
    "use strict";
    const config = {
  "common": {
    "en": [
      "Web App",
      "Open / Install Web App",
      "Runs directly in your browser and does not require a traditional installer. Works on Windows, Mac (macOS), iPhone, iPad and Android devices in supported browsers and can be installed as a web app (PWA).",
      "After the initial online setup, core features can also work without an internet connection.",
      "An internet connection is required to receive updates.",
      "No Apps & Games account is required."
    ],
    "hr": [
      "Web aplikacija",
      "Otvori / instaliraj web aplikaciju",
      "Radi izravno u pregledniku i ne zahtijeva klasični instalacijski program. Radi na Windows i Mac (macOS) računalima te iPhone, iPad i Android uređajima u podržanim preglednicima i može se instalirati kao web aplikacija (PWA).",
      "Nakon početnog postavljanja uz internetsku vezu osnovne funkcije mogu raditi i bez interneta.",
      "Za primanje ažuriranja potrebna je internetska veza.",
      "Apps & Games račun nije potreban."
    ],
    "de": [
      "Web-App",
      "Web-App öffnen / installieren",
      "Läuft direkt im Browser und benötigt kein klassisches Installationsprogramm. Funktioniert unter Windows und macOS sowie auf iPhone, iPad und Android in unterstützten Browsern und kann als Web-App (PWA) installiert werden.",
      "Nach der ersten Einrichtung mit Internetverbindung können die Grundfunktionen auch offline genutzt werden.",
      "Für den Empfang von Updates ist eine Internetverbindung erforderlich.",
      "Ein Apps-&-Games-Konto ist nicht erforderlich."
    ],
    "it": [
      "App web",
      "Apri / installa app web",
      "Funziona direttamente nel browser e non richiede un programma di installazione tradizionale. Funziona su Windows, Mac (macOS), iPhone, iPad e Android nei browser supportati e può essere installata come app web (PWA).",
      "Dopo la configurazione iniziale online, le funzioni principali possono funzionare anche senza connessione Internet.",
      "Per ricevere gli aggiornamenti è necessaria una connessione Internet.",
      "Non è richiesto un account Apps & Games."
    ],
    "es": [
      "Aplicación web",
      "Abrir / instalar aplicación web",
      "Funciona directamente en el navegador y no requiere un instalador tradicional. Funciona en Windows, Mac (macOS), iPhone, iPad y Android con navegadores compatibles y puede instalarse como aplicación web (PWA).",
      "Tras la configuración inicial en línea, las funciones principales también pueden funcionar sin conexión a Internet.",
      "Se necesita una conexión a Internet para recibir actualizaciones.",
      "No se requiere una cuenta de Apps & Games."
    ]
  },
  "specific": {
    "digital-clock": [
      "Some operating-system-specific features available in the Windows or Android versions may not be included. Digital Clock Web does not include the Windows Screen Saver.",
      "Neke funkcije specifične za Windows ili Android verzije možda nisu dostupne. Digital Clock Web ne uključuje Windows čuvar zaslona.",
      "Einige betriebssystemspezifische Funktionen der Windows- oder Android-Versionen sind möglicherweise nicht verfügbar. Digital Clock Web enthält keinen Windows-Bildschirmschoner.",
      "Alcune funzioni specifiche delle versioni Windows o Android potrebbero non essere disponibili. Digital Clock Web non include lo screensaver di Windows.",
      "Es posible que algunas funciones específicas de las versiones de Windows o Android no estén disponibles. Digital Clock Web no incluye el protector de pantalla de Windows."
    ],
    "date-lotto-generator": [
      "Settings and history are stored locally on your device.",
      "Postavke i povijest spremaju se lokalno na uređaju.",
      "Einstellungen und Verlauf werden lokal auf dem Gerät gespeichert.",
      "Le impostazioni e la cronologia vengono salvate localmente sul dispositivo.",
      "Los ajustes y el historial se guardan localmente en el dispositivo."
    ],
    "emoji-copy-paste": [
      "Favorites and recently used emojis are stored locally on your device.",
      "Favoriti i nedavno korišteni emojiji spremaju se lokalno na uređaju.",
      "Favoriten und zuletzt verwendete Emojis werden lokal auf dem Gerät gespeichert.",
      "I preferiti e gli emoji usati di recente vengono salvati localmente sul dispositivo.",
      "Los favoritos y los emojis usados recientemente se guardan localmente en el dispositivo."
    ],
    "unit-converter": [
      "Theme and language preferences are stored locally on your device.",
      "Postavke teme i jezika spremaju se lokalno na uređaju.",
      "Design- und Spracheinstellungen werden lokal auf dem Gerät gespeichert.",
      "Le preferenze di tema e lingua vengono salvate localmente sul dispositivo.",
      "Las preferencias de tema e idioma se guardan localmente en el dispositivo."
    ],
    "crossword": [
      "Crossword creation, solving progress and preferences stay in the browser, while the ready-made puzzle library is loaded when needed.",
      "Izrada križaljki, napredak rješavanja i postavke ostaju u pregledniku, a biblioteka gotovih križaljki učitava se po potrebi.",
      "Erstellung, Spielfortschritt und Einstellungen bleiben im Browser; die fertige Rätselbibliothek wird bei Bedarf geladen.",
      "Creazione, progressi e preferenze restano nel browser, mentre la libreria dei cruciverba pronti viene caricata quando serve.",
      "La creación, el progreso y las preferencias permanecen en el navegador, mientras que la biblioteca de crucigramas preparados se carga cuando hace falta."
    ],
    "habit-tracker": [
      "Habits, tasks, settings and progress stay locally in your browser, and JSON backup tools let you save or move your data when needed.",
      "Navike, zadaci, postavke i napredak ostaju lokalno u pregledniku, a JSON sigurnosne kopije omogućuju spremanje i prijenos podataka.",
      "Gewohnheiten, Aufgaben, Einstellungen und Fortschritt bleiben lokal im Browser. JSON-Backups ermöglichen das Sichern und Übertragen von Daten.",
      "Abitudini, attività, impostazioni e progressi restano nel browser. I backup JSON consentono di salvare e trasferire i dati.",
      "Los hábitos, tareas, ajustes y progreso permanecen localmente en el navegador. Las copias JSON permiten guardar y transferir los datos."
    ],
    "qr-code-generator": [
      "QR codes are generated locally on your device. Your QR content is not uploaded to a server.",
      "QR kodovi generiraju se lokalno na uređaju. Sadržaj QR koda ne šalje se na poslužitelj.",
      "QR-Codes werden lokal auf dem Gerät erstellt. Die QR-Inhalte werden nicht auf einen Server hochgeladen.",
      "I codici QR vengono generati localmente sul dispositivo. Il loro contenuto non viene caricato su un server.",
      "Los códigos QR se generan localmente en el dispositivo. Su contenido no se sube a un servidor."
    ],
    "tetris": [
      "",
      "",
      "",
      "",
      ""
    ],
    "ufo-invaders": [
      "",
      "",
      "",
      "",
      ""
    ],
    "phoenix-arcade": [
      "Game progress, language, theme and sound preferences are stored locally in your browser.",
      "Napredak igre te postavke jezika, teme i zvuka spremaju se lokalno u pregledniku.",
      "Spielfortschritt, Sprache, Design und Toneinstellungen werden lokal im Browser gespeichert.",
      "Progressi, lingua, tema e preferenze audio vengono salvati localmente nel browser.",
      "El progreso, el idioma, el tema y las preferencias de sonido se guardan localmente en el navegador."
    ],
    "neon-pacman": [
      "Game progress, language, theme and sound preferences are stored locally in your browser.",
      "Napredak igre te postavke jezika, teme i zvuka spremaju se lokalno u pregledniku.",
      "Spielfortschritt, Sprache, Design und Toneinstellungen werden lokal im Browser gespeichert.",
      "Progressi, lingua, tema e preferenze audio vengono salvati localmente nel browser.",
      "El progreso, el idioma, el tema y las preferencias de sonido se guardan localmente en el navegador."
    ],
    "modern-snake": [
      "Game progress, language, sound, fullscreen and control preferences are stored locally in your browser.",
      "Napredak igre te postavke jezika, zvuka, cijelog zaslona i kontrola spremaju se lokalno u pregledniku.",
      "Spielfortschritt, Sprache, Ton, Vollbild und Steuerungseinstellungen werden lokal im Browser gespeichert.",
      "Progressi, lingua, audio, schermo intero e preferenze dei comandi vengono salvati localmente nel browser.",
      "El progreso, idioma, sonido, pantalla completa y preferencias de control se guardan localmente en el navegador."
    ],
    "memory-game": [
      "Language, theme, saved progress and best scores are stored locally in your browser.",
      "Jezik, tema, spremljeni napredak i najbolji rezultati čuvaju se lokalno u pregledniku.",
      "Sprache, Design, gespeicherter Fortschritt und Bestwerte werden lokal im Browser gespeichert.",
      "Lingua, tema, progressi salvati e migliori risultati vengono memorizzati localmente nel browser.",
      "El idioma, el tema, el progreso guardado y los mejores resultados se almacenan localmente en el navegador."
    ],
    "wizard-chess-3d": null
  },
  "langs": [
    "en",
    "hr",
    "de",
    "it",
    "es"
  ],
  "noOfflineClaim": [
    "crossword",
    "habit-tracker"
  ],
  "noAccountClaim": [
    "digital-clock",
    "wizard-chess-3d"
  ]
};
    const cards = Array.from(document.querySelectorAll("[data-ag-web-card]"));
    if (!cards.length) return;
    function update() {
        const requested = document.documentElement.lang.toLowerCase().split("-")[0];
        const lang = config.langs.includes(requested) ? requested : "en";
        const copy = config.common[lang];
        for (const card of cards) {
            const key = card.dataset.agWebCard;
            if (!Object.prototype.hasOwnProperty.call(config.specific, key)) continue;
            card.querySelector("[data-ag-web-title]").textContent = copy[0];
            card.querySelector("[data-ag-web-open]").textContent = copy[1];
            card.querySelector("[data-ag-web-intro]").textContent = copy[2];
            const second = [!config.noOfflineClaim.includes(key) ? copy[3] : "", copy[4], !config.noAccountClaim.includes(key) ? copy[5] : ""].filter(Boolean).join(" ");
            card.querySelector("[data-ag-web-capabilities]").textContent = second;
            const special = config.specific[key];
            if (special !== null) {
                const node = card.querySelector("[data-ag-web-specific]");
                const value = special[config.langs.indexOf(lang)];
                node.textContent = value;
                node.hidden = !value;
            }
        }
    }
    update();
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
