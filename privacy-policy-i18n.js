(() => {
  const supported = ["en", "hr", "de", "it", "es"];
  const storageKey = "appsGamesLanguage";
  const queryLang = new URLSearchParams(location.search).get("lang");
  const saved = localStorage.getItem(storageKey);
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  let language = supported.includes(queryLang)
    ? queryLang
    : (supported.includes(saved) ? saved : (supported.includes(browser) ? browser : "en"));

  const copy = {
    en: {
      navApps: "Apps", navGames: "Games", navInfo: "Info", home: "Home", privacy: "Privacy Policy",
      selectLanguage: "Select language",
      title: "Privacy Policy — Apps & Games",
      description: "Privacy Policy for Apps & Games.",
      html: `
        <span class="section-label">PRIVACY</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: August 26, 2026</p>
        <h2>1. Introduction</h2>
        <p>Apps & Games is a website providing free online apps and browser-based games.</p>
        <p>This Privacy Policy explains what information may be collected when you visit appsandgames.org, how that information may be used, and the choices available to you.</p>
        <h2>2. Information We Collect</h2>
        <p>Apps & Games does not require visitors to create an account or provide personal information in order to use the website.</p>
        <p>However, certain technical and usage information may be collected automatically by third-party services used on this website.</p>
        <h2>3. Google Analytics</h2>
        <p>This website uses Google Analytics 4 to understand how visitors use the website.</p>
        <p>Google Analytics may collect information such as browser type, device type, approximate geographic location, visited pages, session information, interactions with the website, and similar technical information.</p>
        <p>Google Analytics may use cookies, identifiers, or similar technologies to measure website usage and performance.</p>
        <p>Apps & Games does not intentionally send personally identifiable information such as names, email addresses, telephone numbers, or payment details to Google Analytics.</p>
        <h2>4. Google AdSense and Advertising</h2>
        <p>This website may use Google AdSense to display advertising.</p>
        <p>Google and other third-party advertising vendors may use cookies, device identifiers, local storage, or similar technologies to serve, measure, personalize, and report advertisements.</p>
        <p>Third-party vendors, including Google, may use cookies to serve ads based on a visitor's previous visits to this website or other websites.</p>
        <p>Google's use of advertising cookies may enable Google and its partners to serve advertisements based on visits to this website and/or other websites on the Internet.</p>
        <h2>5. Consent Management</h2>
        <p>For visitors in the European Economic Area, the United Kingdom, Switzerland, and other applicable regions, Apps & Games uses a Google-certified Consent Management Platform (CMP).</p>
        <p>Where required, visitors can choose whether to consent to the use of cookies, local storage, personalized advertising, analytics, and related data processing.</p>
        <p>Visitors may also manage or withdraw their consent through the privacy choices made available on the website.</p>
        <h2>6. Cookies and Similar Technologies</h2>
        <p>Cookies and similar technologies may be used for purposes including:</p>
        <ul><li>website functionality;</li><li>analytics and performance measurement;</li><li>advertising and ad measurement;</li><li>fraud prevention and security;</li><li>remembering privacy and consent choices.</li></ul>
        <h2>7. Third-Party Services</h2>
        <p>Apps & Games may contain links to third-party services, including:</p>
        <ul><li>Google Analytics;</li><li>Google AdSense;</li><li>PayPal;</li><li>Stripe;</li><li>external applications and games.</li></ul>
        <p>When you open a third-party website or service, that provider may process your information according to its own privacy policy and terms.</p>
        <h2>8. Donations and Payments</h2>
        <p>Donations made through PayPal or Stripe are processed directly by those payment providers.</p>
        <p>Apps & Games does not receive or store your full credit card information or PayPal login credentials.</p>
        <p>Cryptocurrency donations are sent directly to the wallet addresses displayed on the website.</p>
        <h2>9. External Links</h2>
        <p>Apps & Games contains links to external websites and applications. We are not responsible for the privacy practices, content, security, or availability of external websites.</p>
        <h2>10. Data Retention</h2>
        <p>Data collected by third-party services such as Google Analytics and Google AdSense may be retained according to the retention settings and policies of those services.</p>
        <h2>11. Your Privacy Choices</h2>
        <p>Depending on your country or region, you may have rights relating to access, correction, deletion, restriction, objection, or withdrawal of consent regarding personal data.</p>
        <p>Where a consent message is shown, you can use the available options to accept, reject, or manage your privacy choices.</p>
        <h2>12. Changes to This Privacy Policy</h2>
        <p>This Privacy Policy may be updated from time to time to reflect changes to the website, services, legal requirements, or third-party technologies.</p>
        <p>The latest version will always be published on this page.</p>
        <h2>13. Contact</h2>
        <p>If you have questions regarding this Privacy Policy, please use the contact information made available by Apps & Games.</p>`
    },
    hr: {
      navApps: "Aplikacije", navGames: "Igre", navInfo: "Info", home: "Početna", privacy: "Pravila privatnosti",
      selectLanguage: "Odaberi jezik",
      title: "Pravila privatnosti — Apps & Games",
      description: "Pravila privatnosti za Apps & Games.",
      html: `
        <span class="section-label">PRIVATNOST</span>
        <h1>Pravila privatnosti</h1>
        <p>Zadnje ažuriranje: 26. kolovoza 2026.</p>
        <h2>1. Uvod</h2>
        <p>Apps & Games je web-stranica koja pruža besplatne online aplikacije i igre za preglednik.</p>
        <p>Ova Pravila privatnosti objašnjavaju koji se podaci mogu prikupljati kada posjetite appsandgames.org, kako se ti podaci mogu koristiti i koje su vam mogućnosti dostupne.</p>
        <h2>2. Podaci koje prikupljamo</h2>
        <p>Apps & Games ne zahtijeva od posjetitelja izradu računa niti davanje osobnih podataka za korištenje web-stranice.</p>
        <p>Međutim, određene tehničke informacije i podaci o korištenju mogu se automatski prikupljati putem usluga trećih strana koje se koriste na ovoj web-stranici.</p>
        <h2>3. Google Analytics</h2>
        <p>Ova web-stranica koristi Google Analytics 4 kako bi bolje razumjela način na koji posjetitelji koriste stranicu.</p>
        <p>Google Analytics može prikupljati podatke kao što su vrsta preglednika i uređaja, približna geografska lokacija, posjećene stranice, podaci o sesiji, interakcije s web-stranicom i slične tehničke informacije.</p>
        <p>Google Analytics može koristiti kolačiće, identifikatore ili slične tehnologije za mjerenje korištenja i učinkovitosti web-stranice.</p>
        <p>Apps & Games namjerno ne šalje Google Analyticsu osobne identifikacijske podatke kao što su ime, adresa e-pošte, broj telefona ili podaci o plaćanju.</p>
        <h2>4. Google AdSense i oglašavanje</h2>
        <p>Ova web-stranica može koristiti Google AdSense za prikaz oglasa.</p>
        <p>Google i drugi pružatelji oglasa trećih strana mogu koristiti kolačiće, identifikatore uređaja, lokalnu pohranu ili slične tehnologije za posluživanje, mjerenje, personalizaciju i izvještavanje o oglasima.</p>
        <p>Pružatelji trećih strana, uključujući Google, mogu koristiti kolačiće za prikaz oglasa na temelju prethodnih posjeta ovoj ili drugim web-stranicama.</p>
        <p>Googleova uporaba kolačića za oglašavanje može omogućiti Googleu i njegovim partnerima prikaz oglasa na temelju posjeta ovoj i/ili drugim web-stranicama na internetu.</p>
        <h2>5. Upravljanje privolom</h2>
        <p>Za posjetitelje iz Europskog gospodarskog prostora, Ujedinjene Kraljevine, Švicarske i drugih primjenjivih regija Apps & Games koristi Google-certificiranu platformu za upravljanje privolom (CMP).</p>
        <p>Kada je to potrebno, posjetitelji mogu odlučiti pristaju li na uporabu kolačića, lokalne pohrane, personaliziranog oglašavanja, analitike i povezanih obrada podataka.</p>
        <p>Posjetitelji mogu također upravljati svojom privolom ili je povući putem opcija privatnosti dostupnih na web-stranici.</p>
        <h2>6. Kolačići i slične tehnologije</h2>
        <p>Kolačići i slične tehnologije mogu se koristiti za:</p>
        <ul><li>funkcionalnost web-stranice;</li><li>analitiku i mjerenje učinkovitosti;</li><li>oglašavanje i mjerenje oglasa;</li><li>sprječavanje prijevara i sigurnost;</li><li>pamćenje odabira vezanih uz privatnost i privolu.</li></ul>
        <h2>7. Usluge trećih strana</h2>
        <p>Apps & Games može sadržavati poveznice na usluge trećih strana, uključujući:</p>
        <ul><li>Google Analytics;</li><li>Google AdSense;</li><li>PayPal;</li><li>Stripe;</li><li>vanjske aplikacije i igre.</li></ul>
        <p>Kada otvorite web-stranicu ili uslugu treće strane, taj pružatelj može obrađivati vaše podatke u skladu sa svojim pravilima privatnosti i uvjetima korištenja.</p>
        <h2>8. Donacije i plaćanja</h2>
        <p>Donacije putem PayPala ili Stripea obrađuju izravno ti pružatelji platnih usluga.</p>
        <p>Apps & Games ne prima niti pohranjuje pune podatke vaše kreditne kartice ili podatke za prijavu na PayPal.</p>
        <p>Donacije u kriptovalutama šalju se izravno na adrese novčanika prikazane na web-stranici.</p>
        <h2>9. Vanjske poveznice</h2>
        <p>Apps & Games sadrži poveznice na vanjske web-stranice i aplikacije. Ne odgovaramo za njihove prakse privatnosti, sadržaj, sigurnost ili dostupnost.</p>
        <h2>10. Čuvanje podataka</h2>
        <p>Podaci koje prikupljaju usluge trećih strana poput Google Analyticsa i Google AdSensea mogu se čuvati u skladu s postavkama i pravilima čuvanja tih usluga.</p>
        <h2>11. Vaši izbori i prava u vezi privatnosti</h2>
        <p>Ovisno o vašoj državi ili regiji, možete imati prava na pristup, ispravak, brisanje, ograničenje obrade, prigovor ili povlačenje privole u vezi s osobnim podacima.</p>
        <p>Kada se prikazuje poruka o privoli, možete koristiti ponuđene mogućnosti za prihvaćanje, odbijanje ili upravljanje svojim odabirima privatnosti.</p>
        <h2>12. Izmjene ovih Pravila privatnosti</h2>
        <p>Ova Pravila privatnosti mogu se povremeno ažurirati kako bi odražavala promjene web-stranice, usluga, pravnih zahtjeva ili tehnologija trećih strana.</p>
        <p>Najnovija verzija uvijek će biti objavljena na ovoj stranici.</p>
        <h2>13. Kontakt</h2>
        <p>Ako imate pitanja o ovim Pravilima privatnosti, koristite kontaktne podatke koje Apps & Games stavlja na raspolaganje.</p>`
    },
    de: {
      navApps: "Apps", navGames: "Spiele", navInfo: "Info", home: "Startseite", privacy: "Datenschutzerklärung",
      selectLanguage: "Sprache auswählen",
      title: "Datenschutzerklärung — Apps & Games",
      description: "Datenschutzerklärung für Apps & Games.",
      html: `
        <span class="section-label">DATENSCHUTZ</span>
        <h1>Datenschutzerklärung</h1>
        <p>Zuletzt aktualisiert: 26. August 2026</p>
        <h2>1. Einleitung</h2>
        <p>Apps & Games ist eine Website mit kostenlosen Online-Apps und browserbasierten Spielen.</p>
        <p>Diese Datenschutzerklärung erläutert, welche Informationen beim Besuch von appsandgames.org erhoben werden können, wie diese Informationen verwendet werden können und welche Wahlmöglichkeiten Ihnen zur Verfügung stehen.</p>
        <h2>2. Welche Informationen wir erheben</h2>
        <p>Apps & Games verlangt für die Nutzung der Website weder die Erstellung eines Kontos noch die Angabe persönlicher Daten.</p>
        <p>Bestimmte technische Informationen und Nutzungsdaten können jedoch automatisch durch Drittanbieterdienste erhoben werden, die auf dieser Website eingesetzt werden.</p>
        <h2>3. Google Analytics</h2>
        <p>Diese Website verwendet Google Analytics 4, um besser zu verstehen, wie Besucher die Website nutzen.</p>
        <p>Google Analytics kann Informationen wie Browsertyp, Gerätetyp, ungefähren geografischen Standort, besuchte Seiten, Sitzungsinformationen, Interaktionen mit der Website und ähnliche technische Daten erfassen.</p>
        <p>Google Analytics kann Cookies, Kennungen oder ähnliche Technologien verwenden, um Nutzung und Leistung der Website zu messen.</p>
        <p>Apps & Games übermittelt Google Analytics nicht absichtlich personenbezogene Identifikationsdaten wie Namen, E-Mail-Adressen, Telefonnummern oder Zahlungsdaten.</p>
        <h2>4. Google AdSense und Werbung</h2>
        <p>Diese Website kann Google AdSense verwenden, um Werbung anzuzeigen.</p>
        <p>Google und andere Drittanbieter für Werbung können Cookies, Gerätekennungen, lokale Speicherung oder ähnliche Technologien verwenden, um Werbung bereitzustellen, zu messen, zu personalisieren und darüber zu berichten.</p>
        <p>Drittanbieter, einschliesslich Google, können Cookies verwenden, um Anzeigen auf Grundlage früherer Besuche dieser oder anderer Websites zu schalten.</p>
        <p>Die Verwendung von Werbe-Cookies durch Google kann Google und seinen Partnern ermöglichen, Anzeigen auf Grundlage von Besuchen dieser und/oder anderer Websites im Internet bereitzustellen.</p>
        <h2>5. Einwilligungsverwaltung</h2>
        <p>Für Besucher im Europäischen Wirtschaftsraum, im Vereinigten Königreich, in der Schweiz und in anderen anwendbaren Regionen verwendet Apps & Games eine von Google zertifizierte Consent-Management-Plattform (CMP).</p>
        <p>Soweit erforderlich, können Besucher entscheiden, ob sie der Verwendung von Cookies, lokaler Speicherung, personalisierter Werbung, Analyse und damit verbundener Datenverarbeitung zustimmen.</p>
        <p>Besucher können ihre Einwilligung auch über die auf der Website verfügbaren Datenschutzoptionen verwalten oder widerrufen.</p>
        <h2>6. Cookies und ähnliche Technologien</h2>
        <p>Cookies und ähnliche Technologien können unter anderem verwendet werden für:</p>
        <ul><li>Funktionalität der Website;</li><li>Analyse und Leistungsmessung;</li><li>Werbung und Anzeigenmessung;</li><li>Betrugsprävention und Sicherheit;</li><li>Speicherung von Datenschutz- und Einwilligungsentscheidungen.</li></ul>
        <h2>7. Drittanbieterdienste</h2>
        <p>Apps & Games kann Links zu Drittanbieterdiensten enthalten, darunter:</p>
        <ul><li>Google Analytics;</li><li>Google AdSense;</li><li>PayPal;</li><li>Stripe;</li><li>externe Anwendungen und Spiele.</li></ul>
        <p>Wenn Sie eine Website oder einen Dienst eines Drittanbieters öffnen, kann dieser Anbieter Ihre Informationen gemäss seiner eigenen Datenschutzerklärung und seinen eigenen Bedingungen verarbeiten.</p>
        <h2>8. Spenden und Zahlungen</h2>
        <p>Spenden über PayPal oder Stripe werden direkt von diesen Zahlungsanbietern verarbeitet.</p>
        <p>Apps & Games erhält oder speichert weder vollständige Kreditkartendaten noch PayPal-Anmeldedaten.</p>
        <p>Kryptowährungsspenden werden direkt an die auf der Website angezeigten Wallet-Adressen gesendet.</p>
        <h2>9. Externe Links</h2>
        <p>Apps & Games enthält Links zu externen Websites und Anwendungen. Wir sind nicht verantwortlich für deren Datenschutzpraktiken, Inhalte, Sicherheit oder Verfügbarkeit.</p>
        <h2>10. Aufbewahrung von Daten</h2>
        <p>Daten, die von Drittanbieterdiensten wie Google Analytics und Google AdSense erhoben werden, können gemäss den Aufbewahrungseinstellungen und Richtlinien dieser Dienste gespeichert werden.</p>
        <h2>11. Ihre Datenschutzoptionen</h2>
        <p>Je nach Land oder Region können Ihnen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch oder Widerruf einer Einwilligung in Bezug auf personenbezogene Daten zustehen.</p>
        <p>Wenn eine Einwilligungsnachricht angezeigt wird, können Sie die verfügbaren Optionen verwenden, um Ihre Datenschutzentscheidungen zu akzeptieren, abzulehnen oder zu verwalten.</p>
        <h2>12. Änderungen dieser Datenschutzerklärung</h2>
        <p>Diese Datenschutzerklärung kann von Zeit zu Zeit aktualisiert werden, um Änderungen an der Website, den Diensten, rechtlichen Anforderungen oder Technologien von Drittanbietern zu berücksichtigen.</p>
        <p>Die jeweils aktuelle Version wird immer auf dieser Seite veröffentlicht.</p>
        <h2>13. Kontakt</h2>
        <p>Wenn Sie Fragen zu dieser Datenschutzerklärung haben, verwenden Sie bitte die von Apps & Games bereitgestellten Kontaktinformationen.</p>`
    },
    it: {
      navApps: "App", navGames: "Giochi", navInfo: "Info", home: "Home", privacy: "Informativa sulla privacy",
      selectLanguage: "Seleziona lingua",
      title: "Informativa sulla privacy — Apps & Games",
      description: "Informativa sulla privacy di Apps & Games.",
      html: `
        <span class="section-label">PRIVACY</span>
        <h1>Informativa sulla privacy</h1>
        <p>Ultimo aggiornamento: 26 agosto 2026</p>
        <h2>1. Introduzione</h2>
        <p>Apps & Games è un sito web che offre applicazioni online gratuite e giochi basati sul browser.</p>
        <p>Questa Informativa sulla privacy spiega quali informazioni possono essere raccolte quando visiti appsandgames.org, come possono essere utilizzate e quali opzioni hai a disposizione.</p>
        <h2>2. Informazioni che raccogliamo</h2>
        <p>Apps & Games non richiede ai visitatori di creare un account né di fornire dati personali per utilizzare il sito.</p>
        <p>Tuttavia, alcune informazioni tecniche e di utilizzo possono essere raccolte automaticamente da servizi di terze parti utilizzati su questo sito.</p>
        <h2>3. Google Analytics</h2>
        <p>Questo sito utilizza Google Analytics 4 per comprendere come i visitatori utilizzano il sito.</p>
        <p>Google Analytics può raccogliere informazioni come tipo di browser, tipo di dispositivo, posizione geografica approssimativa, pagine visitate, informazioni sulla sessione, interazioni con il sito e dati tecnici simili.</p>
        <p>Google Analytics può utilizzare cookie, identificatori o tecnologie simili per misurare l'utilizzo e le prestazioni del sito.</p>
        <p>Apps & Games non invia intenzionalmente a Google Analytics informazioni personali identificabili come nomi, indirizzi e-mail, numeri di telefono o dati di pagamento.</p>
        <h2>4. Google AdSense e pubblicità</h2>
        <p>Questo sito può utilizzare Google AdSense per mostrare pubblicità.</p>
        <p>Google e altri fornitori pubblicitari di terze parti possono utilizzare cookie, identificatori del dispositivo, memoria locale o tecnologie simili per mostrare, misurare, personalizzare e rendicontare gli annunci.</p>
        <p>I fornitori di terze parti, incluso Google, possono utilizzare cookie per mostrare annunci basati sulle precedenti visite dell'utente a questo o ad altri siti.</p>
        <p>L'uso dei cookie pubblicitari da parte di Google può consentire a Google e ai suoi partner di mostrare annunci basati sulle visite a questo e/o ad altri siti Internet.</p>
        <h2>5. Gestione del consenso</h2>
        <p>Per i visitatori dello Spazio economico europeo, del Regno Unito, della Svizzera e di altre regioni applicabili, Apps & Games utilizza una piattaforma di gestione del consenso (CMP) certificata da Google.</p>
        <p>Dove richiesto, i visitatori possono scegliere se acconsentire all'uso di cookie, memoria locale, pubblicità personalizzata, analisi e relativo trattamento dei dati.</p>
        <p>I visitatori possono inoltre gestire o revocare il consenso attraverso le opzioni sulla privacy disponibili sul sito.</p>
        <h2>6. Cookie e tecnologie simili</h2>
        <p>I cookie e tecnologie simili possono essere utilizzati, tra l'altro, per:</p>
        <ul><li>funzionalità del sito;</li><li>analisi e misurazione delle prestazioni;</li><li>pubblicità e misurazione degli annunci;</li><li>prevenzione delle frodi e sicurezza;</li><li>memorizzazione delle scelte sulla privacy e sul consenso.</li></ul>
        <h2>7. Servizi di terze parti</h2>
        <p>Apps & Games può contenere collegamenti a servizi di terze parti, tra cui:</p>
        <ul><li>Google Analytics;</li><li>Google AdSense;</li><li>PayPal;</li><li>Stripe;</li><li>applicazioni e giochi esterni.</li></ul>
        <p>Quando apri un sito o un servizio di terze parti, il relativo fornitore può trattare le tue informazioni secondo la propria informativa sulla privacy e i propri termini.</p>
        <h2>8. Donazioni e pagamenti</h2>
        <p>Le donazioni effettuate tramite PayPal o Stripe vengono elaborate direttamente da tali fornitori di pagamento.</p>
        <p>Apps & Games non riceve né memorizza i dati completi della carta di credito o le credenziali di accesso a PayPal.</p>
        <p>Le donazioni in criptovaluta vengono inviate direttamente agli indirizzi wallet visualizzati sul sito.</p>
        <h2>9. Collegamenti esterni</h2>
        <p>Apps & Games contiene collegamenti a siti web e applicazioni esterne. Non siamo responsabili delle loro pratiche sulla privacy, dei contenuti, della sicurezza o della disponibilità.</p>
        <h2>10. Conservazione dei dati</h2>
        <p>I dati raccolti da servizi di terze parti come Google Analytics e Google AdSense possono essere conservati secondo le impostazioni e le politiche di conservazione di tali servizi.</p>
        <h2>11. Le tue scelte sulla privacy</h2>
        <p>A seconda del Paese o della regione, potresti avere diritti relativi ad accesso, rettifica, cancellazione, limitazione, opposizione o revoca del consenso riguardo ai dati personali.</p>
        <p>Quando viene mostrato un messaggio di consenso, puoi utilizzare le opzioni disponibili per accettare, rifiutare o gestire le tue scelte sulla privacy.</p>
        <h2>12. Modifiche a questa Informativa sulla privacy</h2>
        <p>Questa Informativa sulla privacy può essere aggiornata di volta in volta per riflettere modifiche al sito, ai servizi, ai requisiti legali o alle tecnologie di terze parti.</p>
        <p>La versione più recente sarà sempre pubblicata su questa pagina.</p>
        <h2>13. Contatti</h2>
        <p>Per domande relative a questa Informativa sulla privacy, utilizza le informazioni di contatto rese disponibili da Apps & Games.</p>`
    },
    es: {
      navApps: "Apps", navGames: "Juegos", navInfo: "Info", home: "Inicio", privacy: "Política de privacidad",
      selectLanguage: "Seleccionar idioma",
      title: "Política de privacidad — Apps & Games",
      description: "Política de privacidad de Apps & Games.",
      html: `
        <span class="section-label">PRIVACIDAD</span>
        <h1>Política de privacidad</h1>
        <p>Última actualización: 26 de agosto de 2026</p>
        <h2>1. Introducción</h2>
        <p>Apps & Games es un sitio web que ofrece aplicaciones online gratuitas y juegos basados en el navegador.</p>
        <p>Esta Política de privacidad explica qué información puede recopilarse cuando visitas appsandgames.org, cómo puede utilizarse y qué opciones tienes disponibles.</p>
        <h2>2. Información que recopilamos</h2>
        <p>Apps & Games no exige a los visitantes crear una cuenta ni proporcionar información personal para utilizar el sitio.</p>
        <p>Sin embargo, determinados datos técnicos y de uso pueden ser recopilados automáticamente por servicios de terceros utilizados en este sitio.</p>
        <h2>3. Google Analytics</h2>
        <p>Este sitio utiliza Google Analytics 4 para comprender cómo los visitantes utilizan el sitio.</p>
        <p>Google Analytics puede recopilar información como tipo de navegador, tipo de dispositivo, ubicación geográfica aproximada, páginas visitadas, información de sesión, interacciones con el sitio y datos técnicos similares.</p>
        <p>Google Analytics puede utilizar cookies, identificadores o tecnologías similares para medir el uso y el rendimiento del sitio.</p>
        <p>Apps & Games no envía intencionadamente a Google Analytics información de identificación personal como nombres, direcciones de correo electrónico, números de teléfono o datos de pago.</p>
        <h2>4. Google AdSense y publicidad</h2>
        <p>Este sitio puede utilizar Google AdSense para mostrar publicidad.</p>
        <p>Google y otros proveedores publicitarios de terceros pueden utilizar cookies, identificadores de dispositivo, almacenamiento local o tecnologías similares para servir, medir, personalizar y elaborar informes sobre los anuncios.</p>
        <p>Los proveedores de terceros, incluido Google, pueden utilizar cookies para mostrar anuncios basados en visitas anteriores de un usuario a este u otros sitios web.</p>
        <p>El uso de cookies publicitarias por parte de Google puede permitir a Google y a sus socios mostrar anuncios basados en visitas a este sitio y/o a otros sitios de Internet.</p>
        <h2>5. Gestión del consentimiento</h2>
        <p>Para visitantes del Espacio Económico Europeo, Reino Unido, Suiza y otras regiones aplicables, Apps & Games utiliza una plataforma de gestión del consentimiento (CMP) certificada por Google.</p>
        <p>Cuando sea necesario, los visitantes pueden elegir si aceptan el uso de cookies, almacenamiento local, publicidad personalizada, analítica y el tratamiento de datos relacionado.</p>
        <p>Los visitantes también pueden gestionar o retirar su consentimiento mediante las opciones de privacidad disponibles en el sitio.</p>
        <h2>6. Cookies y tecnologías similares</h2>
        <p>Las cookies y tecnologías similares pueden utilizarse, entre otros fines, para:</p>
        <ul><li>funcionalidad del sitio;</li><li>analítica y medición del rendimiento;</li><li>publicidad y medición de anuncios;</li><li>prevención del fraude y seguridad;</li><li>recordar las opciones de privacidad y consentimiento.</li></ul>
        <h2>7. Servicios de terceros</h2>
        <p>Apps & Games puede contener enlaces a servicios de terceros, incluidos:</p>
        <ul><li>Google Analytics;</li><li>Google AdSense;</li><li>PayPal;</li><li>Stripe;</li><li>aplicaciones y juegos externos.</li></ul>
        <p>Cuando abres un sitio web o servicio de un tercero, ese proveedor puede tratar tu información de acuerdo con su propia política de privacidad y sus condiciones.</p>
        <h2>8. Donaciones y pagos</h2>
        <p>Las donaciones realizadas mediante PayPal o Stripe son procesadas directamente por esos proveedores de pago.</p>
        <p>Apps & Games no recibe ni almacena los datos completos de tu tarjeta de crédito ni tus credenciales de inicio de sesión de PayPal.</p>
        <p>Las donaciones en criptomonedas se envían directamente a las direcciones de wallet mostradas en el sitio.</p>
        <h2>9. Enlaces externos</h2>
        <p>Apps & Games contiene enlaces a sitios web y aplicaciones externas. No somos responsables de sus prácticas de privacidad, contenido, seguridad o disponibilidad.</p>
        <h2>10. Conservación de datos</h2>
        <p>Los datos recopilados por servicios de terceros como Google Analytics y Google AdSense pueden conservarse según la configuración y las políticas de retención de dichos servicios.</p>
        <h2>11. Tus opciones de privacidad</h2>
        <p>Según tu país o región, puedes tener derechos relacionados con el acceso, corrección, eliminación, limitación, oposición o retirada del consentimiento respecto a datos personales.</p>
        <p>Cuando se muestre un mensaje de consentimiento, puedes utilizar las opciones disponibles para aceptar, rechazar o gestionar tus preferencias de privacidad.</p>
        <h2>12. Cambios en esta Política de privacidad</h2>
        <p>Esta Política de privacidad puede actualizarse periódicamente para reflejar cambios en el sitio, los servicios, los requisitos legales o las tecnologías de terceros.</p>
        <p>La versión más reciente se publicará siempre en esta página.</p>
        <h2>13. Contacto</h2>
        <p>Si tienes preguntas sobre esta Política de privacidad, utiliza la información de contacto que Apps & Games ponga a disposición.</p>`
    }
  };

  const select = document.getElementById("languageSelect");
  const label = document.querySelector('label[for="languageSelect"]');
  const content = document.getElementById("privacyContent");
  const navSpans = document.querySelectorAll(".main-nav a span");
  const footerLinks = document.querySelectorAll(".footer-links a");
  const descriptionMeta = document.querySelector('meta[name="description"]');

  function applyLanguage(lang, updateUrl = false) {
    language = supported.includes(lang) ? lang : "en";
    localStorage.setItem(storageKey, language);
    const c = copy[language];

    document.documentElement.lang = language;
    document.title = c.title;
    if (descriptionMeta) descriptionMeta.content = c.description;
    if (content) content.innerHTML = c.html;
    if (select) {
      select.value = language;
      select.setAttribute("aria-label", c.selectLanguage);
    }
    if (label) label.textContent = c.selectLanguage;
    if (navSpans[0]) navSpans[0].textContent = c.navApps;
    if (navSpans[1]) navSpans[1].textContent = c.navGames;
    if (navSpans[2]) navSpans[2].textContent = c.navInfo;
    if (footerLinks[0]) footerLinks[0].textContent = c.home;
    if (footerLinks[1]) footerLinks[1].textContent = c.navApps;
    if (footerLinks[2]) footerLinks[2].textContent = c.navGames;
    if (footerLinks[3]) footerLinks[3].textContent = c.privacy;

    const logo = document.querySelector(".logo");
    if (logo) logo.setAttribute("aria-label", `Apps & Games ${c.home}`);

    if (updateUrl) {
      const url = new URL(location.href);
      if (language === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", language);
      history.replaceState({}, "", url);
    }
  }

  if (select) select.addEventListener("change", event => applyLanguage(event.target.value, true));
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
  applyLanguage(language, false);
})();
