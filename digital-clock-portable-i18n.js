(() => {
    "use strict";
    const translations = {
    "en": {
        "btn": "Download Windows Portable ZIP",
        "help": "Portable instructions",
        "desc": "Windows 10/11 x64 · v0.3.8. No installation or WebView2 needed. Extract all files and run digital-clock-rust-portable.exe. Keep the DLL and NOTICES folder. Settings and backups are in Data. The in-app screensaver is not a Windows .scr screensaver.",
        "store": "Separate Microsoft Store edition (version 2.0.6). Installation and automatic updates are handled by Microsoft Store. This is not the Windows Portable download."
    },
    "hr": {
        "btn": "Preuzmi Windows Portable ZIP",
        "help": "Upute za Portable verziju",
        "desc": "Windows 10/11 x64 · v0.3.8. Bez instalacije i WebView2. Raspakiraj sve datoteke i pokreni digital-clock-rust-portable.exe. Zadrži DLL i mapu NOTICES. Postavke i sigurnosne kopije su u mapi Data. Ugrađeni čuvar zaslona nije Windows .scr čuvar zaslona.",
        "store": "Zasebno izdanje u Microsoft Storeu (verzija 2.0.6). Instalaciju i automatska ažuriranja obavlja Microsoft Store. To nije Windows Portable preuzimanje."
    },
    "de": {
        "btn": "Windows Portable ZIP herunterladen",
        "help": "Portable-Anleitung",
        "desc": "Windows 10/11 x64 · v0.3.8. Keine Installation und kein WebView2. Alle Dateien entpacken und digital-clock-rust-portable.exe starten. DLL und NOTICES-Ordner behalten. Einstellungen und Backups liegen in Data. Der integrierte Bildschirmschoner ist kein Windows-.scr-Bildschirmschoner.",
        "store": "Separate Microsoft-Store-Version (2.0.6). Installation und automatische Updates erfolgen über Microsoft Store. Dies ist nicht der Windows-Portable-Download."
    },
    "it": {
        "btn": "Scarica Windows Portable ZIP",
        "help": "Istruzioni Portable",
        "desc": "Windows 10/11 x64 · v0.3.8. Nessuna installazione o WebView2. Estrai tutti i file e avvia digital-clock-rust-portable.exe. Conserva DLL e cartella NOTICES. Impostazioni e backup sono in Data. Lo screensaver integrato non è uno screensaver Windows .scr.",
        "store": "Versione separata di Microsoft Store (2.0.6). Installazione e aggiornamenti automatici sono gestiti da Microsoft Store. Non è il download Windows Portable."
    },
    "es": {
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
