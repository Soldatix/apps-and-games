(() => {
    "use strict";
    const translations = {
    "en": {
        "installerTitle": "Digital Clock Windows Installer",
        "installerHelp": "Installer instructions",
        "installerStatus": "Installer download is temporarily paused while the Rust replacement completes final release checks.",
        "installerDesc": "Windows 10/11 x64 · Separate standard installation with optional Windows .scr Screen Saver integration. Unlike Portable, this edition can register the Screen Saver for your Windows account. Screen Saver activation is optional and off by default.",
        "btn": "Download Windows Portable ZIP",
        "help": "Portable instructions",
        "desc": "Windows 10/11 x64 · v0.3.8. No installation or WebView2 needed. Extract all files and run digital-clock-rust-portable.exe. Keep the DLL and NOTICES folder. Settings and backups are in Data. The in-app screensaver is not a Windows .scr screensaver.",
        "store": "Separate Microsoft Store edition (version 2.0.6). Installation and automatic updates are handled by Microsoft Store. This is not the Windows Portable download."
    },
    "hr": {
        "installerTitle": "Digital Clock Windows Installer",
        "installerHelp": "Upute za Installer",
        "installerStatus": "Preuzimanje Installera privremeno je pauzirano dok Rust zamjena ne prođe završne provjere.",
        "installerDesc": "Windows 10/11 x64 · Zasebna standardna instalacija s opcionalnom integracijom Windows .scr čuvara zaslona. Za razliku od Portable verzije, čuvar se može registrirati za Windows korisnika. Aktivacija je opcionalna i početno isključena.",
        "btn": "Preuzmi Windows Portable ZIP",
        "help": "Upute za Portable verziju",
        "desc": "Windows 10/11 x64 · v0.3.8. Bez instalacije i WebView2. Raspakiraj sve datoteke i pokreni digital-clock-rust-portable.exe. Zadrži DLL i mapu NOTICES. Postavke i sigurnosne kopije su u mapi Data. Ugrađeni čuvar zaslona nije Windows .scr čuvar zaslona.",
        "store": "Zasebno izdanje u Microsoft Storeu (verzija 2.0.6). Instalaciju i automatska ažuriranja obavlja Microsoft Store. To nije Windows Portable preuzimanje."
    },
    "de": {
        "installerTitle": "Digital Clock Windows-Installer",
        "installerHelp": "Installer-Anleitung",
        "installerStatus": "Der Installer-Download ist pausiert, bis die neue Rust-Version die abschließenden Freigabeprüfungen bestanden hat.",
        "installerDesc": "Windows 10/11 x64 · Separate Standardinstallation mit optionaler Windows-.scr-Bildschirmschoner-Integration. Anders als Portable kann diese Edition den Bildschirmschoner für das Windows-Benutzerkonto registrieren. Die Aktivierung ist standardmäßig ausgeschaltet.",
        "btn": "Windows Portable ZIP herunterladen",
        "help": "Portable-Anleitung",
        "desc": "Windows 10/11 x64 · v0.3.8. Keine Installation und kein WebView2. Alle Dateien entpacken und digital-clock-rust-portable.exe starten. DLL und NOTICES-Ordner behalten. Einstellungen und Backups liegen in Data. Der integrierte Bildschirmschoner ist kein Windows-.scr-Bildschirmschoner.",
        "store": "Separate Microsoft-Store-Version (2.0.6). Installation und automatische Updates erfolgen über Microsoft Store. Dies ist nicht der Windows-Portable-Download."
    },
    "it": {
        "installerTitle": "Digital Clock Installer Windows",
        "installerHelp": "Istruzioni Installer",
        "installerStatus": "Il download dell'Installer è temporaneamente sospeso finché la nuova versione Rust non supera le verifiche finali.",
        "installerDesc": "Windows 10/11 x64 · Installazione standard separata con integrazione facoltativa dello screensaver Windows .scr. A differenza della versione Portable, può registrare lo screensaver per l'utente Windows. L'attivazione è disattivata per impostazione predefinita.",
        "btn": "Scarica Windows Portable ZIP",
        "help": "Istruzioni Portable",
        "desc": "Windows 10/11 x64 · v0.3.8. Nessuna installazione o WebView2. Estrai tutti i file e avvia digital-clock-rust-portable.exe. Conserva DLL e cartella NOTICES. Impostazioni e backup sono in Data. Lo screensaver integrato non è uno screensaver Windows .scr.",
        "store": "Versione separata di Microsoft Store (2.0.6). Installazione e aggiornamenti automatici sono gestiti da Microsoft Store. Non è il download Windows Portable."
    },
    "es": {
        "installerTitle": "Digital Clock Instalador Windows",
        "installerHelp": "Instrucciones del instalador",
        "installerStatus": "La descarga del instalador está pausada hasta que la nueva versión Rust supere las comprobaciones finales.",
        "installerDesc": "Windows 10/11 x64 · Instalación estándar independiente con integración opcional del protector Windows .scr. A diferencia de Portable, puede registrar el protector para el usuario de Windows. Su activación está desmarcada de forma predeterminada.",
        "btn": "Descargar Windows Portable ZIP",
        "help": "Instrucciones Portable",
        "desc": "Windows 10/11 x64 · v0.3.8. No necesita instalación ni WebView2. Extrae todos los archivos y ejecuta digital-clock-rust-portable.exe. Conserva la DLL y la carpeta NOTICES. La configuración y las copias están en Data. El protector integrado no es un protector Windows .scr.",
        "store": "Edición independiente de Microsoft Store (versión 2.0.6). La instalación y las actualizaciones automáticas se gestionan en Microsoft Store. No es la descarga Windows Portable."
    }
};

    function currentLanguage() {
        const language = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
        return translations[language] ? language : "en";
    }

    function ensureGridStyle() {
        if (document.getElementById("digital-clock-platform-grid-layout")) return;
        const style = document.createElement("style");
        style.id = "digital-clock-platform-grid-layout";
        style.textContent = ".platform-download-grid{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:760px){.platform-download-grid{grid-template-columns:1fr}}";
        document.head.appendChild(style);
    }

    function applyWindowsPortableTranslations() {
        const language = currentLanguage();
        const copy = translations[language];
        const title = document.getElementById("windows-portable-title");
        const download = document.getElementById("windows-portable-download");
        const help = document.getElementById("windows-portable-help");
        const description = document.getElementById("windows-portable-description");
        const storeDescription = document.getElementById("windows-store-description");
        const installerTitle = document.getElementById("windows-installer-title");
        const installerHelp = document.getElementById("windows-installer-help");
        const installerStatus = document.getElementById("windows-installer-status");
        const installerDescription = document.getElementById("windows-installer-description");

        if (installerTitle) installerTitle.textContent = copy.installerTitle;
        if (installerHelp) {
            installerHelp.textContent = copy.installerHelp;
            installerHelp.href = "/downloads/digital-clock/Installation.html?platform=windows#" + language + "-windows-installer";
        }
        if (installerStatus) installerStatus.textContent = copy.installerStatus;
        if (installerDescription) installerDescription.textContent = copy.installerDesc;
        if (title) title.textContent = "Digital Clock Windows Portable";
        if (download) download.textContent = copy.btn;
        if (help) {
            help.textContent = copy.help;
            help.href = "/downloads/digital-clock/Installation.html?platform=windows#" + language + "-windows-portable";
        }
        if (description) description.textContent = copy.desc;
        if (storeDescription) storeDescription.textContent = copy.store;
    }

    ensureGridStyle();
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.addEventListener("change", applyWindowsPortableTranslations);
    applyWindowsPortableTranslations();
})();
