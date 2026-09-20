(() => {
    const copy = {
        en: {
            installerTitle: "Windows Installer",
            installerDownload: "Download Windows Installer",
            installerHelp: "Installation instructions",
            installerDescription: "Windows 10/11 x64 · Version 2.0.5 · Standard installation. Includes Bedside mode, full screen, alarms, timer, world clock, stopwatch and an optional OLED-friendly Digital Clock Screen Saver.",
            storeDescription: "Automatic updates through Microsoft Store. Windows Screen Saver integration is not included. Use the Windows Installer if you want Screen Saver support.",
            portableTitle: "Windows Portable",
            portableDownload: "Download Portable ZIP",
            portableHelp: "Portable instructions",
            portableDescription: "Windows 10/11 x64 · Version 2.0.5 · No installation required. Extract the ZIP and run DigitalClock.Windows.exe. Settings are stored in the local Data folder. The Windows Screen Saver is not included. Windows SmartScreen may show a warning; see the portable instructions for details."
        },
        hr: {
            installerTitle: "Windows Installer",
            installerDownload: "Preuzmi Windows Installer",
            installerHelp: "Upute za instalaciju",
            installerDescription: "Windows 10/11 x64 · Verzija 2.0.5 · Standardna instalacija. Uključuje noćni način uz krevet, cijeli zaslon, alarme, mjerač vremena, svjetski sat, štopericu i opcionalni OLED-friendly Digital Clock Screen Saver.",
            storeDescription: "Automatska ažuriranja putem Microsoft Storea. Windows Screen Saver nije uključen. Koristi Windows Installer ako želiš Screen Saver.",
            portableTitle: "Windows Portable",
            portableDownload: "Preuzmi Portable ZIP",
            portableHelp: "Portable upute",
            portableDescription: "Windows 10/11 x64 · Verzija 2.0.5 · Bez instalacije. Raspakiraj ZIP i pokreni DigitalClock.Windows.exe. Postavke se spremaju u lokalnu mapu Data. Windows Screen Saver nije uključen. Windows SmartScreen može prikazati upozorenje; detalji su u portable uputama."
        },
        de: {
            installerTitle: "Windows-Installer",
            installerDownload: "Windows-Installer herunterladen",
            installerHelp: "Installationsanleitung",
            installerDescription: "Windows 10/11 x64 · Version 2.0.5 · Normale Installation. Mit Nachttischmodus, Vollbild, Wecker, Timer, Weltzeituhr, Stoppuhr und optionalem OLED-freundlichem Digital Clock-Bildschirmschoner.",
            storeDescription: "Automatische Updates über den Microsoft Store. Die Windows-Bildschirmschoner-Integration ist nicht enthalten. Verwende den Windows-Installer, wenn du den Bildschirmschoner möchtest.",
            portableTitle: "Windows Portable",
            portableDownload: "Portable ZIP herunterladen",
            portableHelp: "Portable-Anleitung",
            portableDescription: "Windows 10/11 x64 · Version 2.0.5 · Keine Installation erforderlich. ZIP entpacken und DigitalClock.Windows.exe starten. Einstellungen werden im lokalen Ordner Data gespeichert. Der Windows-Bildschirmschoner ist nicht enthalten. Windows SmartScreen kann eine Warnung anzeigen; Details stehen in der Portable-Anleitung."
        },
        it: {
            installerTitle: "Installer Windows",
            installerDownload: "Scarica installer Windows",
            installerHelp: "Istruzioni di installazione",
            installerDescription: "Windows 10/11 x64 · Versione 2.0.5 · Installazione standard. Include modalità comodino, schermo intero, sveglie, timer, orologio mondiale, cronometro e screensaver Digital Clock OLED-friendly opzionale.",
            storeDescription: "Aggiornamenti automatici tramite Microsoft Store. L'integrazione con lo screensaver di Windows non è inclusa. Usa l'Installer Windows se desideri lo screensaver.",
            portableTitle: "Windows Portable",
            portableDownload: "Scarica Portable ZIP",
            portableHelp: "Istruzioni Portable",
            portableDescription: "Windows 10/11 x64 · Versione 2.0.5 · Nessuna installazione richiesta. Estrai lo ZIP e avvia DigitalClock.Windows.exe. Le impostazioni vengono salvate nella cartella locale Data. Lo screensaver di Windows non è incluso. Windows SmartScreen può mostrare un avviso; consulta le istruzioni Portable per i dettagli."
        },
        es: {
            installerTitle: "Instalador de Windows",
            installerDownload: "Descargar instalador de Windows",
            installerHelp: "Instrucciones de instalación",
            installerDescription: "Windows 10/11 x64 · Versión 2.0.5 · Instalación estándar. Incluye modo de mesita, pantalla completa, alarmas, temporizador, reloj mundial, cronómetro y protector de pantalla Digital Clock OLED-friendly opcional.",
            storeDescription: "Actualizaciones automáticas mediante Microsoft Store. La integración con el protector de pantalla de Windows no está incluida. Usa el instalador de Windows si deseas el protector de pantalla.",
            portableTitle: "Windows Portable",
            portableDownload: "Descargar Portable ZIP",
            portableHelp: "Instrucciones Portable",
            portableDescription: "Windows 10/11 x64 · Versión 2.0.5 · No requiere instalación. Extrae el ZIP y ejecuta DigitalClock.Windows.exe. La configuración se guarda en la carpeta local Data. El protector de pantalla de Windows no está incluido. Windows SmartScreen puede mostrar una advertencia; consulta las instrucciones Portable para obtener más detalles."
        }
    };

    function currentLanguage() {
        const language = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
        return copy[language] ? language : "en";
    }

    function ensureGridStyle() {
        if (document.getElementById("digital-clock-four-platform-grid")) return;
        const style = document.createElement("style");
        style.id = "digital-clock-four-platform-grid";
        style.textContent = `
            .platform-download-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            @media (max-width: 760px) {
                .platform-download-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function ensureSeparateWindowsCards() {
        const installerCard = document.getElementById("windows-installer-card") || document.getElementById("portable-windows");
        if (!installerCard) return null;

        installerCard.id = "windows-installer-card";
        const installerTitle = installerCard.querySelector(".platform-download-heading strong");
        if (installerTitle) installerTitle.id = "windows-installer-title";

        let portableCard = document.getElementById("windows-portable-card");
        const portableButton = document.getElementById("windows-portable-download");
        let portableDescription = document.getElementById("windows-portable-description");

        if (!portableCard) {
            portableCard = document.createElement("article");
            portableCard.className = "platform-download-card";
            portableCard.id = "windows-portable-card";
            portableCard.innerHTML = `
                <div class="platform-download-heading">
                    <span class="platform-download-icon" aria-hidden="true">▤</span>
                    <div>
                        <strong id="windows-portable-title">Windows Portable</strong>
                        <span class="platform-download-version">Version 2.0.5</span>
                    </div>
                </div>
                <div class="hero-buttons" id="windows-portable-buttons"></div>
            `;
            installerCard.insertAdjacentElement("afterend", portableCard);
        }

        const portableButtons = portableCard.querySelector("#windows-portable-buttons") || portableCard.querySelector(".hero-buttons");
        if (portableButton && portableButtons && portableButton.parentElement !== portableButtons) {
            portableButton.className = "primary-button";
            portableButtons.appendChild(portableButton);
        }

        let portableHelp = document.getElementById("windows-portable-help");
        if (!portableHelp && portableButtons) {
            portableHelp = document.createElement("a");
            portableHelp.id = "windows-portable-help";
            portableHelp.className = "secondary-button";
            portableButtons.appendChild(portableHelp);
        }

        if (!portableDescription) {
            portableDescription = document.createElement("p");
            portableDescription.id = "windows-portable-description";
            portableDescription.className = "hero-text";
        }
        if (portableDescription.parentElement !== portableCard) {
            portableCard.appendChild(portableDescription);
        }

        return { installerCard, portableCard };
    }

    function ensureStoreCard() {
        const installerCard = document.getElementById("windows-installer-card");
        const storeButton = document.getElementById("windows-store-download");
        const storeDescription = document.getElementById("windows-store-description");

        if (!installerCard || !storeButton || !storeDescription) return null;

        let storeCard = document.getElementById("windows-store-card");

        if (!storeCard) {
            storeCard = document.createElement("article");
            storeCard.className = "platform-download-card";
            storeCard.id = "windows-store-card";
            storeCard.innerHTML = `
                <div class="platform-download-heading">
                    <span class="platform-download-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 8V6.5C7 3.8 9.2 2 12 2s5 1.8 5 4.5V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <rect x="4" y="8" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/>
                            <rect x="8" y="12" width="3" height="3" rx=".4" fill="currentColor"/>
                            <rect x="13" y="12" width="3" height="3" rx=".4" fill="currentColor"/>
                            <rect x="8" y="16" width="3" height="3" rx=".4" fill="currentColor"/>
                            <rect x="13" y="16" width="3" height="3" rx=".4" fill="currentColor"/>
                        </svg>
                    </span>
                    <div>
                        <strong>Microsoft Store</strong>
                        <span class="platform-download-version">Version 2.0.6</span>
                    </div>
                </div>
                <div class="hero-buttons" id="windows-store-buttons"></div>
            `;

            installerCard.insertAdjacentElement("afterend", storeCard);
        }

        const storeButtons =
            storeCard.querySelector("#windows-store-buttons") ||
            storeCard.querySelector(".hero-buttons");

        if (storeButton.parentElement !== storeButtons) {
            storeButton.className = "primary-button";
            storeButtons.appendChild(storeButton);
        }

        if (storeDescription.parentElement !== storeCard) {
            storeCard.appendChild(storeDescription);
        }

        return storeCard;
    }
    function removePortableInfoBlock() {
        document.getElementById("portable-info-block")?.remove();
    }

    function applyWindowsCards() {
        ensureGridStyle();
        ensureSeparateWindowsCards();
        ensureStoreCard();
        removePortableInfoBlock();

        const language = currentLanguage();
        const text = copy[language];

        const installerTitle = document.getElementById("windows-installer-title");
        const installerDownload = document.getElementById("windows-download");
        const installerHelp = document.getElementById("windows-help");
        const installerDescription = document.getElementById("windows-description");
        const storeDescription = document.getElementById("windows-store-description");
        const portableTitle = document.getElementById("windows-portable-title");
        const portableDownload = document.getElementById("windows-portable-download");
        const portableHelp = document.getElementById("windows-portable-help");
        const portableDescription = document.getElementById("windows-portable-description");

        if (installerTitle) installerTitle.textContent = text.installerTitle;
        if (installerDownload) installerDownload.textContent = text.installerDownload;
        if (installerHelp) {
            installerHelp.textContent = text.installerHelp;
            installerHelp.href = `/downloads/digital-clock/Installation.html#${language}-windows`;
        }
        if (installerDescription) installerDescription.textContent = text.installerDescription;
        if (storeDescription) storeDescription.textContent = text.storeDescription;

        if (portableTitle) portableTitle.textContent = text.portableTitle;
        if (portableDownload) portableDownload.textContent = text.portableDownload;
        if (portableHelp) {
            portableHelp.textContent = text.portableHelp;
            portableHelp.href = `/downloads/digital-clock/Installation.html#${language}-windows-portable`;
        }
        if (portableDescription) portableDescription.textContent = text.portableDescription;
    }

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.addEventListener("change", applyWindowsCards);

    applyWindowsCards();
})();
