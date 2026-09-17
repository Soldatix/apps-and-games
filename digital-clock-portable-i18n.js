(() => {
    const copy = {
        en: {
            button: "Portable ZIP",
            description: "<strong>Portable edition:</strong> the same Digital Clock interface and main Windows app functions in a ZIP package that requires no installation. Extract the ZIP and run <strong>DigitalClock.Windows.exe</strong>. Portable settings are kept in the local <strong>Data</strong> folder. The Windows Screen Saver is not included in the portable edition.",
            info: "<h3>Windows portable edition</h3><p>The portable Windows edition is distributed as a ZIP archive and does not require a traditional installation. After extraction, Digital Clock runs from its own folder and keeps its portable settings and local data in a <strong>Data</strong> subfolder. This lets the portable and installed Windows editions coexist without sharing their application settings.</p><p>The portable edition does not include or register the Windows Screen Saver. Use the regular Windows installer if you want the optional Screen Saver integration.</p>"
        },
        hr: {
            button: "Portable ZIP",
            description: "<strong>Portable izdanje:</strong> isti izgled i glavne funkcije Windows aplikacije u ZIP paketu koji ne zahtijeva instalaciju. Raspakiraj ZIP i pokreni <strong>DigitalClock.Windows.exe</strong>. Portable postavke spremaju se u lokalnu mapu <strong>Data</strong>. Windows Screen Saver nije uključen u portable izdanje.",
            info: "<h3>Windows portable izdanje</h3><p>Portable Windows izdanje distribuira se kao ZIP arhiva i ne zahtijeva klasičnu instalaciju. Nakon raspakiravanja Digital Clock radi iz vlastite mape, a portable postavke i lokalne podatke sprema u podmapu <strong>Data</strong>. Tako portable i instalirana Windows verzija mogu istodobno postojati na istom računalu bez dijeljenja svojih postavki.</p><p>Portable izdanje ne sadrži niti registrira Windows Screen Saver. Ako želiš opcionalnu Screen Saver integraciju, koristi standardni Windows installer.</p>"
        },
        de: {
            button: "Portable ZIP",
            description: "<strong>Portable-Version:</strong> dieselbe Digital-Clock-Oberfläche und die wichtigsten Windows-Funktionen in einem ZIP-Paket ohne Installation. ZIP vollständig entpacken und <strong>DigitalClock.Windows.exe</strong> starten. Portable Einstellungen werden im lokalen Ordner <strong>Data</strong> gespeichert. Der Windows-Bildschirmschoner ist nicht enthalten.",
            info: "<h3>Windows Portable-Version</h3><p>Die Portable-Version für Windows wird als ZIP-Archiv bereitgestellt und benötigt keine klassische Installation. Nach dem Entpacken läuft Digital Clock aus dem eigenen Ordner und speichert portable Einstellungen sowie lokale Daten im Unterordner <strong>Data</strong>. Dadurch können die portable und die installierte Windows-Version nebeneinander verwendet werden, ohne ihre Einstellungen zu teilen.</p><p>Die Portable-Version enthält und registriert keinen Windows-Bildschirmschoner. Für die optionale Bildschirmschoner-Integration verwende den normalen Windows-Installer.</p>"
        },
        it: {
            button: "Portable ZIP",
            description: "<strong>Versione Portable:</strong> la stessa interfaccia di Digital Clock e le principali funzioni Windows in un pacchetto ZIP che non richiede installazione. Estrai lo ZIP e avvia <strong>DigitalClock.Windows.exe</strong>. Le impostazioni Portable vengono salvate nella cartella locale <strong>Data</strong>. Lo screensaver di Windows non è incluso.",
            info: "<h3>Versione Portable per Windows</h3><p>La versione Portable per Windows viene distribuita come archivio ZIP e non richiede un'installazione tradizionale. Dopo l'estrazione, Digital Clock viene eseguito dalla propria cartella e salva le impostazioni Portable e i dati locali nella sottocartella <strong>Data</strong>. In questo modo la versione Portable e quella installata possono coesistere senza condividere le impostazioni.</p><p>La versione Portable non include né registra lo screensaver di Windows. Per l'integrazione opzionale con lo screensaver, usa il normale installer Windows.</p>"
        },
        es: {
            button: "Portable ZIP",
            description: "<strong>Versión Portable:</strong> la misma interfaz de Digital Clock y las principales funciones de Windows en un paquete ZIP que no requiere instalación. Extrae el ZIP y ejecuta <strong>DigitalClock.Windows.exe</strong>. La configuración Portable se guarda en la carpeta local <strong>Data</strong>. El protector de pantalla de Windows no está incluido.",
            info: "<h3>Versión Portable para Windows</h3><p>La versión Portable para Windows se distribuye como un archivo ZIP y no requiere una instalación tradicional. Después de extraerla, Digital Clock se ejecuta desde su propia carpeta y guarda la configuración Portable y los datos locales en la subcarpeta <strong>Data</strong>. Así, la versión Portable y la instalada pueden coexistir sin compartir sus ajustes.</p><p>La versión Portable no incluye ni registra el protector de pantalla de Windows. Para la integración opcional con el protector de pantalla, utiliza el instalador normal de Windows.</p>"
        }
    };

    function currentLanguage() {
        const language = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
        return copy[language] ? language : "en";
    }

    function applyPortableCopy() {
        const text = copy[currentLanguage()];
        const button = document.getElementById("windows-portable-download");
        const description = document.getElementById("windows-portable-description");
        const infoCard = document.querySelector(".info-card");

        if (button) button.textContent = text.button;
        if (description) description.innerHTML = text.description;

        if (infoCard) {
            let block = document.getElementById("portable-info-block");
            if (!block) {
                block = document.createElement("div");
                block.id = "portable-info-block";
                const screenSaverHeading = Array.from(infoCard.querySelectorAll("h3")).find(heading =>
                    /screen saver|čuvar zaslona|bildschirmschoner|screensaver|protector de pantalla/i.test(heading.textContent || "")
                );
                if (screenSaverHeading) infoCard.insertBefore(block, screenSaverHeading);
                else infoCard.appendChild(block);
            }
            block.innerHTML = text.info;
        }
    }

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.addEventListener("change", applyPortableCopy);

    applyPortableCopy();
})();
