(() => {
    const SUPPORTED = ["en", "hr", "de", "it", "es"];
    const STORAGE_KEY = "appsGamesLanguage";
    const slug = location.pathname.replace(/^\/+|\/+$/g, "").replace(/\.html$/i, "");

    const common = {
        en: { navApps:"Apps", navGames:"Games", navInfo:"Info", selectLanguage:"Select language", theme:"Toggle theme", home:"Home", privacy:"Privacy Policy", aboutApp:"ABOUT THE APP", aboutGame:"ABOUT THE GAME" },
        hr: { navApps:"Aplikacije", navGames:"Igre", navInfo:"Info", selectLanguage:"Odaberi jezik", theme:"Promijeni temu", home:"Početna", privacy:"Pravila privatnosti", aboutApp:"O APLIKACIJI", aboutGame:"O IGRI" },
        de: { navApps:"Apps", navGames:"Spiele", navInfo:"Info", selectLanguage:"Sprache auswählen", theme:"Design wechseln", home:"Startseite", privacy:"Datenschutzerklärung", aboutApp:"ÜBER DIE APP", aboutGame:"ÜBER DAS SPIEL" },
        it: { navApps:"App", navGames:"Giochi", navInfo:"Info", selectLanguage:"Seleziona lingua", theme:"Cambia tema", home:"Home", privacy:"Informativa sulla privacy", aboutApp:"INFORMAZIONI SULL'APP", aboutGame:"INFORMAZIONI SUL GIOCO" },
        es: { navApps:"Apps", navGames:"Juegos", navInfo:"Info", selectLanguage:"Seleccionar idioma", theme:"Cambiar tema", home:"Inicio", privacy:"Política de privacidad", aboutApp:"ACERCA DE LA APP", aboutGame:"ACERCA DEL JUEGO" }
    };

    const pages = {
        "digital-clock": {
            kind: "app",
            name: "Digital Clock",
            hr: {
                title: "Digital Clock — Windows, Android i Web | Apps & Games",
                description: "Besplatan prilagodljiv Digital Clock za Windows, Android i web s alarmima, timerom, svjetskim satom, štopericom i opcionalnim OLED-friendly čuvarom zaslona.",
                badge: "APP • SAT • WINDOWS • ANDROID • WEB",
                subtitle: "Prilagodljiv digitalni sat za svaki zaslon",
                text: "Digital Clock je besplatan višenamjenski sat za Windows, Android i web. Veliki prilagodljivi prikaz kombinira s alarmima, mjeračem vremena, štopericom, svjetskim satom, noćnim načinom i drugim praktičnim funkcijama.",
                primary: "Otvori Digital Clock →",
                back: "Natrag na aplikacije",
                info: `<h2>O aplikaciji Digital Clock</h2><p>Digital Clock je besplatan i prilagodljiv digitalni sat za računala, tablete i mobilne telefone. Napravljen je za situacije u kojima želite jasno vidjeti vrijeme iz daljine ili koristiti uređaj kao noćni sat pokraj kreveta bez prejake svjetline zaslona.</p><p>Osim osnovnog prikaza vremena, Digital Clock sadrži praktične alate za upravljanje vremenom i mogućnosti prilagodbe izgleda. Isti projekt dostupan je kao web aplikacija te kao zasebna aplikacija za Windows i Android.</p><h3>Glavne funkcije</h3><ul><li>Velik i prilagodljiv prikaz vremena i datuma.</li><li>Alarm, odbrojavanje vremena i štoperica.</li><li>Svjetski sat za različite gradove i vremenske zone.</li><li>Prikaz preko cijelog zaslona i noćni način rada.</li><li>Spremljeni profili, boje, fontovi i kontrole prikaza.</li><li>Web, Windows i Android verzija.</li><li>Opcionalni Digital Clock čuvar zaslona za Windows.</li></ul><h3>OLED-friendly Windows čuvar zaslona</h3><p>Windows verzija može opcionalno instalirati Digital Clock čuvar zaslona. Dok računalo nije aktivno, prikazuje trenutno vrijeme i polako pomiče položaj sata po zaslonu umjesto da ga trajno zadržava na istom mjestu. Time se smanjuje dugotrajni statični sadržaj pa je čuvar zaslona prikladniji i za OLED zaslone, kao i za klasične LCD zaslone.</p><p>Nijedan softver ne može garantirati potpuno sprječavanje OLED burn-ina, zato i dalje treba slijediti uobičajene preporuke proizvođača zaslona.</p><h3>Kako koristiti Digital Clock</h3><p>Odaberite izgled sata koji najbolje odgovara vašem okruženju i uključite prikaz preko cijelog zaslona kada uređaj želite koristiti prvenstveno kao sat. Noćni način rada smanjuje svjetlinu za korištenje pokraj kreveta ili u tamnoj prostoriji. Alarm, Timer, Štoperica i Svjetski sat dostupni su izravno iz aplikacije.</p><h3>Dostupne platforme</h3><p>Web verziju možete odmah koristiti u pregledniku, Windows verzija donosi nativne desktop funkcije i opcionalni čuvar zaslona, a Android verzija namijenjena je kompatibilnim mobitelima i tabletima.</p><h3>Česta pitanja</h3><p><strong>Je li Digital Clock besplatan?</strong><br>Da. Digital Clock može se koristiti besplatno.</p><p><strong>Mogu li ga koristiti kao noćni sat pokraj kreveta?</strong><br>Da. To je jedan od glavnih razloga zbog kojih je Digital Clock napravljen. Fullscreen i noćni način posebno su korisni u tamnoj prostoriji.</p><p><strong>Ima li Digital Clock alarm i timer?</strong><br>Da. Uključuje alarme, odbrojavanje vremena i štopericu.</p><p><strong>Postoji li čuvar zaslona za Windows?</strong><br>Da. Windows installer može opcionalno instalirati Digital Clock čuvar zaslona.</p><p><strong>Je li čuvar zaslona pogodan za OLED zaslone?</strong><br>Koristi sporo pomicanje položaja sata kako bi smanjio dugotrajni statični sadržaj. To je OLED-friendly ponašanje, ali ne može garantirati potpuno sprječavanje burn-ina.</p><h3>Privatnost i dostupnost</h3><p>Za korištenje aplikacije nije potreban Apps & Games račun. Postavke i profili spremaju se lokalno na uređaju gdje je to podržano. Informacije o analitici, oglašavanju i privatnosti nalaze se u dokumentu <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Digital Clock — Windows, Android & Web | Apps & Games",
                description: "Kostenlose anpassbare Digitaluhr für Windows, Android und Web mit Weckern, Timer, Weltzeituhr, Stoppuhr und optionalem OLED-freundlichem Bildschirmschoner.",
                badge: "APP • UHR • WINDOWS • ANDROID • WEB",
                subtitle: "Eine anpassbare Digitaluhr für jeden Bildschirm",
                text: "Digital Clock ist eine kostenlose multifunktionale Uhr für Windows, Android und das Web. Sie kombiniert eine grosse anpassbare Anzeige mit Weckern, Timer, Stoppuhr, Weltzeituhr, Nachttischmodus und weiteren praktischen Funktionen.",
                primary: "Digital Clock öffnen →",
                back: "Zurück zu den Apps",
                info: `<h2>Über Digital Clock</h2><p>Digital Clock ist eine kostenlose und anpassbare Digitaluhr für Computer, Tablets und Smartphones. Sie ist für Situationen gedacht, in denen die Uhrzeit auch aus grösserer Entfernung gut sichtbar sein soll oder ein Gerät als Nachttischuhr genutzt wird, ohne dass das Display nachts zu hell ist.</p><p>Neben der Uhranzeige bietet Digital Clock praktische Zeitwerkzeuge und zahlreiche Darstellungsoptionen. Dasselbe Projekt ist als Web-App sowie als eigenständige Windows- und Android-Anwendung verfügbar.</p><h3>Hauptfunktionen</h3><ul><li>Grosse und anpassbare Zeit- und Datumsanzeige.</li><li>Wecker, Countdown-Timer und Stoppuhr.</li><li>Weltzeituhr für verschiedene Städte und Zeitzonen.</li><li>Vollbild- und Nachtmodus für dunkle Umgebungen.</li><li>Gespeicherte Profile, Farben, Schriftarten und Anzeigeoptionen.</li><li>Web-, Windows- und Android-Version.</li><li>Optionaler Digital Clock Bildschirmschoner für Windows.</li></ul><h3>OLED-freundlicher Windows-Bildschirmschoner</h3><p>Die Windows-Version kann optional den Digital Clock Bildschirmschoner installieren. Während der Computer inaktiv ist, zeigt er die aktuelle Uhrzeit an und verschiebt die Position der Uhr langsam über den Bildschirm, anstatt sie dauerhaft an derselben Stelle zu lassen. Dadurch werden länger anhaltende statische Bildinhalte reduziert und der Bildschirmschoner eignet sich besser für OLED- sowie klassische LCD-Displays.</p><p>Keine Software kann einen OLED-Burn-in vollständig verhindern. Die üblichen Pflegehinweise des Display-Herstellers sollten deshalb weiterhin beachtet werden.</p><h3>So verwendest du Digital Clock</h3><p>Wähle die Darstellung, die zu deiner Umgebung passt, und aktiviere den Vollbildmodus, wenn das Gerät hauptsächlich als Uhr dienen soll. Der Nachtmodus reduziert die Helligkeit für die Nutzung am Bett oder in dunklen Räumen. Wecker, Timer, Stoppuhr und Weltzeituhr sind direkt in der Anwendung verfügbar.</p><h3>Verfügbare Plattformen</h3><p>Die Web-Version läuft direkt im Browser, die Windows-Version bietet native Desktop-Funktionen und optionalen Bildschirmschoner-Support, und die Android-Version kann auf kompatiblen Smartphones und Tablets installiert werden.</p><h3>Häufige Fragen</h3><p><strong>Ist Digital Clock kostenlos?</strong><br>Ja. Digital Clock kann kostenlos verwendet werden.</p><p><strong>Kann ich die App als Nachttischuhr verwenden?</strong><br>Ja. Das ist einer der Hauptgründe, warum Digital Clock entwickelt wurde. Vollbild- und Nachtmodus sind dafür besonders praktisch.</p><p><strong>Gibt es Wecker und Timer?</strong><br>Ja. Digital Clock enthält Wecker, Countdown-Timer und Stoppuhr.</p><p><strong>Gibt es einen Windows-Bildschirmschoner?</strong><br>Ja. Der Windows-Installer kann optional den Digital Clock Bildschirmschoner installieren.</p><p><strong>Ist der Bildschirmschoner für OLED-Displays geeignet?</strong><br>Die Uhrposition wird langsam verschoben, um länger anhaltende statische Inhalte zu reduzieren. Dieses OLED-freundliche Verhalten kann einen Burn-in jedoch nicht vollständig ausschliessen.</p><h3>Datenschutz und Verfügbarkeit</h3><p>Ein Apps-&-Games-Konto ist nicht erforderlich. Einstellungen und Profile werden, soweit unterstützt, lokal auf dem Gerät gespeichert. Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Digital Clock — Windows, Android e Web | Apps & Games",
                description: "Digital Clock gratuito e personalizzabile per Windows, Android e web con sveglie, timer, orologio mondiale, cronometro e salvaschermo OLED-friendly opzionale.",
                badge: "APP • OROLOGIO • WINDOWS • ANDROID • WEB",
                subtitle: "Un orologio digitale personalizzabile per ogni schermo",
                text: "Digital Clock è un orologio multifunzione gratuito per Windows, Android e web. Combina un ampio display personalizzabile con sveglie, timer, cronometro, orologio mondiale, modalità comodino e altre funzioni pratiche.",
                primary: "Apri Digital Clock →",
                back: "Torna alle app",
                info: `<h2>Informazioni su Digital Clock</h2><p>Digital Clock è un orologio digitale gratuito e personalizzabile per computer, tablet e smartphone. È pensato per vedere chiaramente l'ora anche a distanza oppure per utilizzare un dispositivo come orologio da comodino senza una luminosità eccessiva durante la notte.</p><p>Oltre alla visualizzazione principale, Digital Clock include strumenti pratici per la gestione del tempo e diverse opzioni di personalizzazione. Lo stesso progetto è disponibile come app web e come applicazione dedicata per Windows e Android.</p><h3>Funzioni principali</h3><ul><li>Ampio display personalizzabile per ora e data.</li><li>Sveglia, timer con conto alla rovescia e cronometro.</li><li>Orologio mondiale per città e fusi orari diversi.</li><li>Modalità a schermo intero e modalità notturna.</li><li>Profili salvati, colori, font e controlli di visualizzazione.</li><li>Versioni Web, Windows e Android.</li><li>Salvaschermo Digital Clock opzionale per Windows.</li></ul><h3>Salvaschermo Windows OLED-friendly</h3><p>La versione Windows può installare opzionalmente il salvaschermo Digital Clock. Quando il computer è inattivo, mostra l'ora corrente e sposta lentamente la posizione dell'orologio sullo schermo invece di mantenerla sempre nello stesso punto. Questo riduce la presenza prolungata di contenuti statici e rende il salvaschermo più adatto anche ai display OLED oltre che agli LCD tradizionali.</p><p>Nessun software può garantire la completa prevenzione del burn-in OLED, quindi è comunque consigliabile seguire le indicazioni del produttore del display.</p><h3>Come utilizzare Digital Clock</h3><p>Scegli l'aspetto più adatto all'ambiente e usa la modalità a schermo intero quando vuoi utilizzare il dispositivo principalmente come orologio. La modalità notturna riduce la luminosità per l'uso accanto al letto o in ambienti bui. Sveglia, Timer, Cronometro e Orologio mondiale sono disponibili direttamente nell'applicazione.</p><h3>Piattaforme disponibili</h3><p>La versione web funziona direttamente nel browser, la versione Windows offre funzioni desktop native e il salvaschermo opzionale, mentre la versione Android può essere installata su telefoni e tablet compatibili.</p><h3>Domande frequenti</h3><p><strong>Digital Clock è gratuito?</strong><br>Sì. Digital Clock è gratuito.</p><p><strong>Posso usarlo come orologio da comodino?</strong><br>Sì. È uno degli utilizzi principali per cui è stato creato. Le modalità a schermo intero e notturna sono particolarmente utili in una stanza buia.</p><p><strong>Include sveglia e timer?</strong><br>Sì. Include sveglie, timer con conto alla rovescia e cronometro.</p><p><strong>Esiste un salvaschermo per Windows?</strong><br>Sì. Il programma di installazione Windows può installare opzionalmente il salvaschermo Digital Clock.</p><p><strong>Il salvaschermo è adatto ai display OLED?</strong><br>Utilizza un lento spostamento della posizione dell'orologio per ridurre i contenuti statici prolungati. È un comportamento OLED-friendly, ma non può garantire la completa prevenzione del burn-in.</p><h3>Privacy e disponibilità</h3><p>Non è necessario un account Apps & Games. Impostazioni e profili vengono salvati localmente sul dispositivo dove supportato. Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Digital Clock — Windows, Android y Web | Apps & Games",
                description: "Digital Clock gratuito y personalizable para Windows, Android y web con alarmas, temporizador, reloj mundial, cronómetro y protector de pantalla OLED-friendly opcional.",
                badge: "APP • RELOJ • WINDOWS • ANDROID • WEB",
                subtitle: "Un reloj digital personalizable para cada pantalla",
                text: "Digital Clock es un reloj multifunción gratuito para Windows, Android y web. Combina una gran pantalla personalizable con alarmas, temporizador, cronómetro, reloj mundial, modo de mesita y otras funciones prácticas.",
                primary: "Abrir Digital Clock →",
                back: "Volver a las apps",
                info: `<h2>Acerca de Digital Clock</h2><p>Digital Clock es un reloj digital gratuito y personalizable para ordenadores, tabletas y teléfonos móviles. Está pensado para ver claramente la hora a distancia o utilizar un dispositivo como reloj de noche sin que la pantalla resulte demasiado brillante.</p><p>Además de la pantalla principal del reloj, Digital Clock incluye herramientas prácticas de tiempo y distintas opciones de personalización. El mismo proyecto está disponible como aplicación web y como aplicación dedicada para Windows y Android.</p><h3>Funciones principales</h3><ul><li>Pantalla grande y personalizable de hora y fecha.</li><li>Alarma, temporizador de cuenta atrás y cronómetro.</li><li>Reloj mundial para diferentes ciudades y zonas horarias.</li><li>Modo de pantalla completa y modo nocturno.</li><li>Perfiles guardados, colores, fuentes y controles de visualización.</li><li>Versiones Web, Windows y Android.</li><li>Protector de pantalla Digital Clock opcional para Windows.</li></ul><h3>Protector de pantalla Windows OLED-friendly</h3><p>La versión para Windows puede instalar opcionalmente el protector de pantalla Digital Clock. Mientras el ordenador está inactivo, muestra la hora actual y desplaza lentamente la posición del reloj por la pantalla en lugar de mantenerlo siempre en el mismo lugar. Esto reduce la presencia prolongada de contenido estático y hace que el protector sea más adecuado tanto para pantallas OLED como para pantallas LCD tradicionales.</p><p>Ningún software puede garantizar por completo la prevención del burn-in OLED, por lo que siguen siendo recomendables las indicaciones habituales del fabricante de la pantalla.</p><h3>Cómo utilizar Digital Clock</h3><p>Elige el aspecto del reloj más cómodo para tu entorno y utiliza el modo de pantalla completa cuando quieras usar el dispositivo principalmente como reloj. El modo nocturno reduce el brillo para usarlo junto a la cama o en habitaciones oscuras. Alarma, Temporizador, Cronómetro y Reloj mundial están disponibles directamente desde la aplicación.</p><h3>Plataformas disponibles</h3><p>La versión web funciona directamente en el navegador, la versión Windows ofrece funciones nativas de escritorio y protector de pantalla opcional, y la versión Android puede instalarse en teléfonos y tabletas compatibles.</p><h3>Preguntas frecuentes</h3><p><strong>¿Digital Clock es gratuito?</strong><br>Sí. Digital Clock se puede utilizar gratuitamente.</p><p><strong>¿Puedo usarlo como reloj de noche?</strong><br>Sí. Es uno de los principales usos para los que fue creado. Los modos de pantalla completa y nocturno son especialmente útiles en habitaciones oscuras.</p><p><strong>¿Incluye alarma y temporizador?</strong><br>Sí. Incluye alarmas, temporizador de cuenta atrás y cronómetro.</p><p><strong>¿Existe un protector de pantalla para Windows?</strong><br>Sí. El instalador de Windows puede instalar opcionalmente el protector de pantalla Digital Clock.</p><p><strong>¿Es adecuado para pantallas OLED?</strong><br>Utiliza un desplazamiento lento de la posición del reloj para reducir el contenido estático prolongado. Es un comportamiento OLED-friendly, pero no puede garantizar la prevención completa del burn-in.</p><h3>Privacidad y disponibilidad</h3><p>No necesitas una cuenta de Apps & Games. Los ajustes y perfiles se guardan localmente en el dispositivo cuando es compatible. Para información sobre analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "date-lotto-generator": {
            kind: "app",
            name: "Date Lotto Generator",
            en: {
                webTitle: "Web App",
                webOpen: "Install Web App",
                webDescription: "Runs directly in your browser and does not require a traditional installer. In supported browsers, it can be installed as a web app (PWA) and launched like a regular application. After the first successful load, the core generator also works offline. Your settings and history are stored locally on your device, and no Apps & Games account is required.",
                title: "Date Lotto Generator — Repeatable Lotto Combinations | Apps & Games",
                description: "Create repeatable lotto combinations from a date with six presets, custom formats and an optional Personal Key. Free multilingual PWA with local storage.",
                badge: "APP • NUMBERS • GENERATOR",
                subtitle: "Create repeatable number combinations from a date",
                text: "Date Lotto Generator is a free multilingual browser app that creates deterministic, repeatable combinations from a selected date, one of six preset formats or a Custom setup, and an optional Personal Key.",
                primary: "Open Lotto Generator →",
                back: "Back to Apps",
                info: `<h2>How the generator works</h2><p>Select a date, choose a lotto format and optionally enter a Personal Key. The app deterministically derives a combination from those inputs: the same date, format, ranges and Personal Key produce the same result, so a combination can be recreated later.</p><p>The generator is intended for entertainment and convenient number selection. It does not use future draw data or a prediction method, and it cannot guarantee a result.</p><h3>Preset and custom formats</h3><p>Six preset formats cover common lottery structures, including formats with main and additional numbers. Custom mode lets you define the number counts and ranges for a different game.</p><h3>Features and controls</h3><ul><li>Deterministic, repeatable combinations based on the selected date and settings.</li><li>Six preset lotto formats plus Custom number counts and ranges.</li><li>An optional Personal Key for an additional personal input.</li><li>History for up to 30 saved combinations, with Copy for quick reuse.</li><li>English, Croatian, German, Italian and Spanish interfaces.</li><li>Light, Dark and System themes.</li><li>Backup and Restore for local app data, plus Reset stored data.</li><li>Installable PWA support and offline use after the first successful load.</li></ul><h3>Privacy and local data</h3><p>Settings, the Personal Key and saved History stay in the browser's localStorage. No account is required, and user combinations are not stored on an Apps & Games server. Backup, Restore and Reset give you control of the data saved in that browser.</p><h3>Important lottery note</h3><p>Date Lotto Generator does not predict future lottery draws and does not improve the mathematical odds of winning. Every valid combination in a fair lottery has the same chance of being drawn.</p><h3>Using the app</h3><p>Choose a date and one of the six presets or a Custom format, optionally add a Personal Key, and generate the combination. Copy it directly or keep it in History. After the first successful load, the PWA can also run offline on a supported browser.</p><p>For information about analytics, advertising and privacy choices on Apps & Games, see the <a href="privacy-policy"><u>Privacy Policy</u></a>.</p>`
            },
            hr: {
                webTitle: "Web App",
                webOpen: "Instaliraj web aplikaciju",
                webDescription: "Radi izravno u pregledniku i ne zahtijeva klasičnu instalaciju. U podržanim preglednicima može se instalirati kao web aplikacija (PWA) i pokretati poput obične aplikacije. Nakon prvog uspješnog učitavanja osnovni generator radi i bez internetske veze. Postavke i povijest spremaju se lokalno na uređaju i nije potreban Apps & Games račun.",
                title: "Date Lotto Generator — ponovljive loto kombinacije | Apps & Games",
                description: "Stvorite ponovljive loto kombinacije iz datuma uz šest predložaka, prilagođene formate i opcionalni Personal Key. Besplatna višejezična PWA aplikacija s lokalnom pohranom.",
                badge: "APP • BROJEVI • GENERATOR",
                subtitle: "Stvorite ponovljive kombinacije brojeva iz datuma",
                text: "Date Lotto Generator je besplatna višejezična aplikacija za preglednik koja stvara determinističke, ponovljive kombinacije iz odabranog datuma, jednog od šest zadanih formata ili prilagođenih postavki te opcionalnog Personal Keya.",
                primary: "Otvori Lotto Generator →",
                back: "Natrag na aplikacije",
                info: `<h2>Kako generator radi</h2><p>Odaberite datum, loto format i po želji unesite Personal Key. Aplikacija deterministički izvodi kombinaciju iz tih podataka: isti datum, format, rasponi i Personal Key daju isti rezultat pa kombinaciju možete ponovno dobiti.</p><p>Generator služi zabavi i praktičnom odabiru brojeva. Ne koristi buduće podatke o izvlačenjima ni metodu predviđanja i ne može jamčiti rezultat.</p><h3>Zadani i prilagođeni formati</h3><p>Šest zadanih formata pokriva uobičajene strukture lota, uključujući igre s glavnim i dodatnim brojevima. Prilagođeni format omogućuje određivanje broja i raspona brojeva za druge igre.</p><h3>Funkcije i postavke</h3><ul><li>Determinističke, ponovljive kombinacije prema datumu i postavkama.</li><li>Šest zadanih loto formata i prilagođeni format.</li><li>Opcionalni Personal Key kao dodatni osobni unos.</li><li>Povijest do 30 spremljenih kombinacija i funkcija Kopiraj.</li><li>Sučelje na engleskom, hrvatskom, njemačkom, talijanskom i španjolskom.</li><li>Svijetla, tamna i sistemska tema.</li><li>Sigurnosna kopija i vraćanje lokalnih podataka te poništavanje spremljenih podataka.</li><li>PWA instalacija i offline rad nakon prvog uspješnog učitavanja.</li></ul><h3>Privatnost i lokalni podaci</h3><p>Postavke, Personal Key i spremljena povijest ostaju u localStorage pohrani preglednika. Račun nije potreban, a korisničke kombinacije ne spremaju se na Apps & Games poslužitelj. Sigurnosna kopija, vraćanje i poništavanje daju vam nadzor nad podacima u tom pregledniku.</p><h3>Važna loto napomena</h3><p>Date Lotto Generator ne predviđa buduće dobitne brojeve i ne povećava matematičke izglede za dobitak. Svaka valjana kombinacija u poštenoj lutriji ima jednaku vjerojatnost izvlačenja.</p><h3>Korištenje aplikacije</h3><p>Odaberite datum i jedan od šest formata ili prilagođene postavke, po želji dodajte Personal Key i generirajte kombinaciju. Kopirajte je ili spremite u Povijest. Nakon prvog uspješnog učitavanja PWA može raditi i offline u podržanom pregledniku.</p><p>Za informacije o analitici, oglašavanju i privatnosti pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                webTitle: "Web-App",
                webOpen: "Web-App installieren",
                webDescription: "Läuft direkt im Browser und benötigt kein klassisches Installationsprogramm. In unterstützten Browsern lässt sie sich als Web-App (PWA) installieren und wie eine normale Anwendung starten. Nach dem ersten erfolgreichen Laden funktioniert der eigentliche Generator auch offline. Deine Einstellungen und dein Verlauf werden lokal auf deinem Gerät gespeichert. Ein Konto bei Apps & Games ist nicht erforderlich.",
                title: "Date Lotto Generator — wiederholbare Lotto-Kombinationen | Apps & Games",
                description: "Erstelle wiederholbare Lotto-Kombinationen aus einem Datum mit sechs Vorlagen, eigenen Formaten und optionalem Personal Key. Kostenlose mehrsprachige PWA mit lokaler Speicherung.",
                badge: "APP • ZAHLEN • GENERATOR",
                subtitle: "Wiederholbare Zahlenkombinationen aus einem Datum erstellen",
                text: "Date Lotto Generator ist eine kostenlose mehrsprachige Browser-App, die aus einem Datum, einer von sechs Vorlagen oder einem eigenen Format und einem optionalen Personal Key deterministische, wiederholbare Kombinationen erstellt.",
                primary: "Lotto Generator öffnen →",
                back: "Zurück zu den Apps",
                info: `<h2>So funktioniert der Generator</h2><p>Wähle ein Datum, ein Lottoformat und optional einen Personal Key. Die App leitet daraus deterministisch eine Kombination ab: Dasselbe Datum, Format, dieselben Bereiche und derselbe Personal Key liefern dasselbe Ergebnis.</p><p>Der Generator dient der Unterhaltung und der praktischen Zahlenauswahl. Er verwendet keine zukünftigen Ziehungsdaten oder Vorhersagemethode und kann kein Ergebnis garantieren.</p><h3>Vorlagen und eigene Formate</h3><p>Sechs Vorlagen decken gängige Lotto-Strukturen mit Haupt- und Zusatzzahlen ab. Im eigenen Format kannst du Anzahl und Bereiche für ein anderes Spiel selbst festlegen.</p><h3>Funktionen und Einstellungen</h3><ul><li>Deterministische, wiederholbare Kombinationen aus Datum und Einstellungen.</li><li>Sechs Lotto-Vorlagen plus eigenes Format.</li><li>Optionaler Personal Key als zusätzliche persönliche Eingabe.</li><li>Verlauf mit bis zu 30 gespeicherten Kombinationen und Kopierfunktion.</li><li>Oberfläche auf Englisch, Kroatisch, Deutsch, Italienisch und Spanisch.</li><li>Helles, dunkles und System-Design.</li><li>Backup und Wiederherstellung lokaler Daten sowie Zurücksetzen gespeicherter Daten.</li><li>Installierbare PWA und Offline-Nutzung nach dem ersten erfolgreichen Laden.</li></ul><h3>Datenschutz und lokale Daten</h3><p>Einstellungen, Personal Key und Verlauf bleiben im localStorage des Browsers. Ein Konto ist nicht erforderlich und Benutzerkombinationen werden nicht auf einem Apps-&-Games-Server gespeichert. Backup, Wiederherstellung und Zurücksetzen geben dir die Kontrolle über die Daten in diesem Browser.</p><h3>Wichtiger Lotto-Hinweis</h3><p>Date Lotto Generator sagt keine zukünftigen Gewinnzahlen voraus und verbessert die mathematische Gewinnchance nicht. Jede gültige Kombination hat bei einer fairen Ziehung dieselbe Chance.</p><h3>App verwenden</h3><p>Wähle ein Datum und eine der sechs Vorlagen oder ein eigenes Format, füge optional einen Personal Key hinzu und erzeuge die Kombination. Kopiere sie oder speichere sie im Verlauf. Nach dem ersten erfolgreichen Laden kann die PWA in einem unterstützten Browser auch offline funktionieren.</p><p>Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                webTitle: "App web",
                webOpen: "Installa app web",
                webDescription: "Funziona direttamente nel browser e non richiede un programma di installazione tradizionale. Nei browser supportati può essere installata come app web (PWA) e avviata come una normale applicazione. Dopo il primo caricamento riuscito, le funzioni principali del generatore sono disponibili anche offline. Le impostazioni e la cronologia vengono salvate localmente sul dispositivo e non è necessario un account Apps & Games.",
                title: "Date Lotto Generator — combinazioni del lotto ripetibili | Apps & Games",
                description: "Crea combinazioni del lotto ripetibili da una data con sei formati predefiniti, formati personalizzati e una Chiave personale opzionale. PWA gratuita e multilingue con dati locali.",
                badge: "APP • NUMERI • GENERATORE",
                subtitle: "Crea combinazioni ripetibili a partire da una data",
                text: "Date Lotto Generator è un'app gratuita e multilingue per browser che crea combinazioni deterministiche e ripetibili da una data, uno dei sei formati predefiniti o un formato personalizzato e una Chiave personale opzionale.",
                primary: "Apri Lotto Generator →",
                back: "Torna alle app",
                info: `<h2>Come funziona il generatore</h2><p>Seleziona una data, un formato del lotto e, se vuoi, una Chiave personale. L'app ricava la combinazione in modo deterministico: la stessa data, lo stesso formato, gli stessi intervalli e la stessa chiave producono lo stesso risultato.</p><p>Il generatore è pensato per l'intrattenimento e la selezione pratica dei numeri. Non usa dati di estrazioni future o metodi di previsione e non può garantire un risultato.</p><h3>Formati predefiniti e personalizzati</h3><p>Sei formati predefiniti coprono strutture comuni con numeri principali e aggiuntivi. Il formato personalizzato permette di definire quantità e intervalli per un gioco diverso.</p><h3>Funzioni e impostazioni</h3><ul><li>Combinazioni deterministiche e ripetibili basate su data e impostazioni.</li><li>Sei formati del lotto predefiniti più un formato personalizzato.</li><li>Chiave personale opzionale come ulteriore dato personale.</li><li>Cronologia fino a 30 combinazioni salvate e funzione Copia.</li><li>Interfaccia in inglese, croato, tedesco, italiano e spagnolo.</li><li>Tema chiaro, scuro e di sistema.</li><li>Backup e ripristino dei dati locali, oltre alla reimpostazione dei dati salvati.</li><li>PWA installabile e uso offline dopo il primo caricamento riuscito.</li></ul><h3>Privacy e dati locali</h3><p>Impostazioni, Chiave personale e Cronologia restano nel localStorage del browser. Non serve un account e le combinazioni dell'utente non vengono salvate su un server di Apps & Games. Backup, ripristino e reimpostazione consentono di controllare i dati memorizzati nel browser.</p><h3>Nota importante sul lotto</h3><p>Date Lotto Generator non prevede i numeri vincenti futuri e non aumenta le probabilità matematiche di vincita. Ogni combinazione valida ha la stessa probabilità in una lotteria corretta.</p><h3>Uso dell'app</h3><p>Scegli una data e uno dei sei formati o un formato personalizzato, aggiungi eventualmente una Chiave personale e genera la combinazione. Copiala o conservala nella Cronologia. Dopo il primo caricamento riuscito, la PWA può funzionare anche offline in un browser supportato.</p><p>Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                webTitle: "Aplicación web",
                webOpen: "Instalar aplicación web",
                webDescription: "Funciona directamente en el navegador y no requiere un instalador tradicional. En los navegadores compatibles se puede instalar como aplicación web (PWA) y abrir como una aplicación normal. Después de la primera carga correcta, las funciones principales del generador también están disponibles sin conexión. Los ajustes y el historial se guardan localmente en tu dispositivo y no necesitas una cuenta de Apps & Games.",
                title: "Date Lotto Generator — combinaciones de lotería repetibles | Apps & Games",
                description: "Crea combinaciones de lotería repetibles desde una fecha con seis formatos predefinidos, formatos personalizados y una Clave personal opcional. PWA gratuita y multilingüe con datos locales.",
                badge: "APP • NÚMEROS • GENERADOR",
                subtitle: "Crea combinaciones repetibles a partir de una fecha",
                text: "Date Lotto Generator es una aplicación gratuita y multilingüe para navegador que crea combinaciones deterministas y repetibles desde una fecha, uno de seis formatos predefinidos o un formato personalizado y una Clave personal opcional.",
                primary: "Abrir Lotto Generator →",
                back: "Volver a las apps",
                info: `<h2>Cómo funciona el generador</h2><p>Selecciona una fecha, un formato de lotería y, si quieres, una Clave personal. La aplicación obtiene la combinación de forma determinista: la misma fecha, el mismo formato, los mismos rangos y la misma clave producen el mismo resultado.</p><p>El generador está pensado para el entretenimiento y la selección práctica de números. No usa datos de sorteos futuros ni métodos de predicción y no puede garantizar un resultado.</p><h3>Formatos predefinidos y personalizados</h3><p>Seis formatos predefinidos cubren estructuras habituales con números principales y adicionales. El formato personalizado permite definir cantidades y rangos para otro juego.</p><h3>Funciones y ajustes</h3><ul><li>Combinaciones deterministas y repetibles basadas en la fecha y los ajustes.</li><li>Seis formatos de lotería predefinidos más un formato personalizado.</li><li>Clave personal opcional como dato personal adicional.</li><li>Historial de hasta 30 combinaciones guardadas y función Copiar.</li><li>Interfaz en inglés, croata, alemán, italiano y español.</li><li>Tema claro, oscuro y del sistema.</li><li>Copia de seguridad y restauración de datos locales, además del restablecimiento de los datos guardados.</li><li>PWA instalable y uso sin conexión después de la primera carga correcta.</li></ul><h3>Privacidad y datos locales</h3><p>Los ajustes, la Clave personal y el Historial permanecen en el localStorage del navegador. No se necesita una cuenta y las combinaciones del usuario no se guardan en un servidor de Apps & Games. La copia de seguridad, la restauración y el restablecimiento permiten controlar los datos de ese navegador.</p><h3>Nota importante sobre la lotería</h3><p>Date Lotto Generator no predice futuros números ganadores ni aumenta las probabilidades matemáticas de ganar. Cada combinación válida tiene la misma probabilidad en una lotería justa.</p><h3>Uso de la app</h3><p>Elige una fecha y uno de los seis formatos o un formato personalizado, añade opcionalmente una Clave personal y genera la combinación. Cópiala o guárdala en el Historial. Después de la primera carga correcta, la PWA también puede funcionar sin conexión en un navegador compatible.</p><p>Para información sobre analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "emoji-copy-paste": {
            kind: "app",
            name: "Emoji Copy & Paste",
            hr: {
                title: "Emoji Copy & Paste — besplatna online aplikacija | Apps & Games",
                description: "Pregledajte značenja emojija, kopirajte ih jednim klikom, sastavljajte kombinacije i kopirajte zastave kao slike za Word.",
                badge: "APP • EMOJI • KOPIRAJ I ZALIJEPI",
                subtitle: "Pronađite pravi emoji i odmah ga kopirajte",
                text: "Emoji Copy & Paste je besplatna višejezična aplikacija za preglednik s popularnim emojijima razvrstanima u jasne kategorije. Svaki emoji ima kratko objašnjenje, a jednim klikom možete ga kopirati u dokument, poruku ili online obrazac.",
                primary: "Otvori Emoji aplikaciju →",
                back: "Natrag na aplikacije",
                info: `<h2>Emojiji s jasnim značenjima</h2><p>Pregledajte smajliće, ljude, životinje, hranu, aktivnosti, putovanja, predmete, simbole i zastave država. Svaki element ima kratki opis kako biste prije kopiranja razumjeli njegovo uobičajeno značenje.</p><p>Aplikacija je korisna kada znate što želite izraziti, ali niste sigurni koji emoji najbolje odgovara. Pregled po kategorijama i pretraživanje pomažu brzo suziti izbor prije kopiranja.</p><h3>Kopiranje i kombiniranje</h3><p>Kliknite emoji da ga odmah kopirate ili dodajte više emojija u zbirku i kopirajte cijelu kombinaciju odjednom. Omiljeni i nedavno korišteni emojiji spremaju se na uređaju radi bržeg pristupa.</p><h3>Gdje je Emoji Copy & Paste koristan</h3><p>Kopirane emojije možete koristiti u porukama, objavama na društvenim mrežama, komentarima, dokumentima, bilješkama i online obrascima. Alat za kombiniranje koristan je kada želite pripremiti više simbola zajedno prije lijepljenja u drugu aplikaciju.</p><p>Favoriti olakšavaju pristup simbolima koje često koristite, a popis nedavno korištenih omogućuje ponovno kopiranje bez novog pretraživanja.</p><h3>Zastave država u Microsoft Wordu</h3><p>Neki Windows programi prikazuju Unicode zastave kao dvoslovne oznake država. Zato kartice zastava mogu kopirati stvarnu PNG sliku za lijepljenje u Word, dok je zasebno dostupno i kopiranje standardnog Unicode emojija zastave.</p><p>Tako možete odabrati standardnu Unicode zastavu kada je odredišna aplikacija pravilno prikazuje ili PNG verziju kada želite da se zastava pojavi kao slika.</p><h3>Pet jezika sučelja</h3><ul><li>Engleski</li><li>Hrvatski</li><li>Njemački</li><li>Talijanski</li><li>Španjolski</li></ul><h3>Prilagođeno svakom zaslonu</h3><p>Responzivno sučelje radi na računalima, tabletima i mobitelima. Uključuje svijetlu i tamnu temu, navigaciju po kategorijama, pretraživanje, favorite i nedavno korištene emojije.</p><h3>Besplatno korištenje</h3><p>Apps & Games račun nije potreban. Otvorite aplikaciju i odmah počnite kopirati emojije. Za analitiku, oglašavanje i privatnost pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Emoji Copy & Paste — kostenlose Online-App | Apps & Games",
                description: "Emoji-Bedeutungen durchsuchen, Emojis sofort kopieren, Kombinationen erstellen und Länderflaggen als Bilder für Word kopieren.",
                badge: "APP • EMOJI • KOPIEREN & EINFÜGEN",
                subtitle: "Das passende Emoji finden und sofort kopieren",
                text: "Emoji Copy & Paste ist eine kostenlose mehrsprachige Browser-App mit beliebten Emojis in übersichtlichen Kategorien. Jedes Emoji enthält eine kurze Bedeutung und lässt sich mit einem Klick für Dokumente, Nachrichten oder Online-Formulare kopieren.",
                primary: "Emoji-App öffnen →",
                back: "Zurück zu den Apps",
                info: `<h2>Emojis mit klaren Bedeutungen</h2><p>Durchsuche Smileys, Personen, Tiere, Essen, Aktivitäten, Reisen, Gegenstände, Symbole und Länderflaggen. Jeder Eintrag enthält eine kurze Beschreibung, damit du die übliche Bedeutung vor dem Kopieren kennst.</p><p>Die App ist praktisch, wenn du weisst, was du ausdrücken möchtest, aber noch nicht sicher bist, welches Emoji am besten passt. Kategorien und Suche helfen dabei, die Auswahl schnell einzugrenzen.</p><h3>Kopieren und kombinieren</h3><p>Klicke auf ein Emoji, um es sofort zu kopieren, oder sammle mehrere Emojis und kopiere die komplette Kombination auf einmal. Favoriten und zuletzt verwendete Emojis werden auf deinem Gerät gespeichert.</p><h3>Wofür Emoji Copy & Paste nützlich ist</h3><p>Kopierte Emojis kannst du in Nachrichten, Social-Media-Beiträgen, Kommentaren, Dokumenten, Notizen und Online-Formularen verwenden. Die Kombinationsfunktion ist hilfreich, wenn du mehrere Symbole vorbereiten und anschliessend gemeinsam in eine andere App einfügen möchtest.</p><p>Favoriten erleichtern den Zugriff auf häufig verwendete Symbole, während die Liste der zuletzt verwendeten Emojis schnelles Wiederverwenden ohne erneute Suche ermöglicht.</p><h3>Länderflaggen in Microsoft Word</h3><p>Einige Windows-Programme zeigen Unicode-Länderflaggen als zweibuchstabige Ländercodes. Deshalb können Flaggenkarten ein echtes PNG-Bild für Word kopieren; zusätzlich bleibt die Standard-Unicode-Flagge separat verfügbar.</p><p>So kannst du die normale Unicode-Flagge verwenden, wenn das Zielprogramm sie korrekt darstellt, oder die PNG-Version wählen, wenn die Flagge als Bild erscheinen soll.</p><h3>Fünf Oberflächensprachen</h3><ul><li>Englisch</li><li>Kroatisch</li><li>Deutsch</li><li>Italienisch</li><li>Spanisch</li></ul><h3>Für jeden Bildschirm</h3><p>Die responsive Oberfläche funktioniert auf Desktop, Tablet und Smartphone. Sie bietet helle und dunkle Darstellung, Kategorienavigation, Suche, Favoriten und zuletzt verwendete Emojis.</p><h3>Kostenlos nutzbar</h3><p>Ein Apps-&-Games-Konto ist nicht erforderlich. Öffne die App und beginne sofort mit dem Kopieren. Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Emoji Copy & Paste — app online gratuita | Apps & Games",
                description: "Sfoglia i significati degli emoji, copiali subito, crea combinazioni e copia le bandiere come immagini per Word.",
                badge: "APP • EMOJI • COPIA E INCOLLA",
                subtitle: "Trova l'emoji giusto e copialo subito",
                text: "Emoji Copy & Paste è un'app gratuita e multilingue per browser con emoji popolari organizzati in categorie chiare. Ogni emoji include una breve spiegazione e può essere copiato con un clic in documenti, messaggi e moduli online.",
                primary: "Apri l'app Emoji →",
                back: "Torna alle app",
                info: `<h2>Emoji con significati chiari</h2><p>Sfoglia faccine, persone, animali, cibo, attività, viaggi, oggetti, simboli e bandiere. Ogni elemento contiene una descrizione breve per aiutarti a capire il significato più comune prima di copiarlo.</p><p>L'app è utile quando sai cosa vuoi esprimere ma non sei sicuro di quale emoji scegliere. Le categorie e la ricerca aiutano a restringere rapidamente la scelta prima di copiare.</p><h3>Copia e combina</h3><p>Fai clic su un emoji per copiarlo subito oppure aggiungine diversi alla raccolta e copia l'intera combinazione in una volta. Preferiti ed emoji recenti vengono salvati sul dispositivo.</p><h3>Dove può essere utile Emoji Copy & Paste</h3><p>Puoi usare gli emoji copiati in messaggi, post sui social, commenti, documenti, note e moduli online. Lo strumento di combinazione è utile quando vuoi preparare più simboli insieme prima di incollarli in un'altra app.</p><p>I preferiti velocizzano l'accesso ai simboli che usi spesso, mentre l'elenco dei recenti permette di riutilizzare rapidamente ciò che hai appena copiato senza effettuare una nuova ricerca.</p><h3>Bandiere in Microsoft Word</h3><p>Alcuni programmi Windows mostrano le bandiere Unicode come codici paese di due lettere. Per questo le schede delle bandiere possono copiare una vera immagine PNG da incollare in Word, mantenendo anche l'opzione separata per l'emoji Unicode standard.</p><p>Puoi quindi usare la bandiera Unicode quando l'app di destinazione la visualizza correttamente oppure scegliere la versione PNG quando vuoi che appaia come immagine.</p><h3>Cinque lingue dell'interfaccia</h3><ul><li>Inglese</li><li>Croato</li><li>Tedesco</li><li>Italiano</li><li>Spagnolo</li></ul><h3>Progettata per ogni schermo</h3><p>L'interfaccia responsiva funziona su computer, tablet e telefoni e include tema chiaro/scuro, categorie, ricerca, preferiti ed emoji usati di recente.</p><h3>Gratuita</h3><p>Non serve un account Apps & Games. Apri l'app e inizia subito a copiare emoji. Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Emoji Copy & Paste — aplicación online gratuita | Apps & Games",
                description: "Consulta significados de emojis, cópialos al instante, crea combinaciones y copia banderas como imágenes para Word.",
                badge: "APP • EMOJI • COPIAR Y PEGAR",
                subtitle: "Encuentra el emoji adecuado y cópialo al instante",
                text: "Emoji Copy & Paste es una aplicación gratuita y multilingüe para navegador con emojis populares organizados en categorías claras. Cada emoji incluye una explicación breve y puede copiarse con un clic para documentos, mensajes y formularios online.",
                primary: "Abrir la app Emoji →",
                back: "Volver a las apps",
                info: `<h2>Emojis con significados claros</h2><p>Explora caras, personas, animales, comida, actividades, viajes, objetos, símbolos y banderas. Cada elemento incluye una descripción breve para comprender su significado habitual antes de copiarlo.</p><p>La aplicación resulta útil cuando sabes qué quieres expresar pero no tienes claro qué emoji encaja mejor. Las categorías y la búsqueda ayudan a reducir rápidamente las opciones antes de copiar.</p><h3>Copiar y combinar</h3><p>Haz clic en un emoji para copiarlo inmediatamente o añade varios a tu colección y copia toda la combinación de una vez. Los favoritos y los emojis recientes se guardan en tu dispositivo.</p><h3>Dónde resulta útil Emoji Copy & Paste</h3><p>Puedes usar los emojis copiados en mensajes, publicaciones sociales, comentarios, documentos, notas y formularios online. La herramienta de combinaciones resulta práctica cuando quieres preparar varios símbolos juntos antes de pegarlos en otra aplicación.</p><p>Los favoritos facilitan el acceso a los símbolos que utilizas con frecuencia, mientras que la lista de recientes permite reutilizar rápidamente algo que acabas de copiar sin volver a buscarlo.</p><h3>Banderas en Microsoft Word</h3><p>Algunos programas de Windows muestran las banderas Unicode como códigos de país de dos letras. Por eso las tarjetas de banderas pueden copiar una imagen PNG real para pegarla en Word, mientras sigue disponible la opción del emoji Unicode estándar.</p><p>Así puedes usar la bandera Unicode normal cuando la aplicación de destino la muestre correctamente o elegir la versión PNG cuando necesites que la bandera aparezca como imagen.</p><h3>Cinco idiomas de interfaz</h3><ul><li>Inglés</li><li>Croata</li><li>Alemán</li><li>Italiano</li><li>Español</li></ul><h3>Diseñada para cualquier pantalla</h3><p>La interfaz adaptable funciona en ordenador, tableta y móvil e incluye temas claro y oscuro, navegación por categorías, búsqueda, favoritos y emojis usados recientemente.</p><h3>Uso gratuito</h3><p>No necesitas una cuenta de Apps & Games. Abre la app y empieza a copiar emojis inmediatamente. Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "unit-converter": {
            kind: "app",
            name: "Unit Converter",
            hr: {
                title: "Unit Converter — besplatna aplikacija za pretvorbu | Apps & Games",
                description: "Pretvarajte duljinu, masu, volumen, površinu, vrijeme, brzinu, energiju, snagu, podatke i druge mjerne jedinice u višejezičnoj aplikaciji.",
                badge: "APP • KONVERTER • PREGLEDNIK",
                subtitle: "Brze pretvorbe svakodnevnih i tehničkih mjernih jedinica",
                text: "Unit Converter je besplatna aplikacija za preglednik za brze pretvorbe u 17 korisnih kategorija i 115 mjernih jedinica. Na jednom mjestu kombinira svakodnevne, tehničke, energetske i digitalne jedinice u preglednom višejezičnom sučelju.",
                primary: "Otvori Unit Converter →",
                back: "Natrag na aplikacije",
                info: `<h2>Što radi Unit Converter</h2><p>Unesite broj, odaberite početnu i ciljnu jedinicu i pretvorena vrijednost prikazuje se odmah. Oba polja možete uređivati, pa lako računate u oba smjera bez ponovnog postavljanja pretvorbe.</p><p>Aplikacija uključuje duljinu, vrijeme, volumen, površinu, masu, temperaturu, brzinu, energiju, snagu, tlak, kut, frekvenciju, potrošnju goriva, silu, okretni moment, digitalnu pohranu i brzinu prijenosa podataka.</p><h3>Glavne prednosti</h3><ul><li>17 praktičnih kategorija i 115 mjernih jedinica.</li><li>Nazivi jedinica prevedeni su na odabrani jezik sučelja.</li><li>Hrvatski, engleski, njemački, talijanski i španjolski.</li><li>Metričke, imperijalne, tehničke i digitalne pretvorbe.</li><li>Prilagodljiv prikaz za računalo, tablet i mobitel.</li><li>Besplatno bez Apps & Games računa.</li></ul><h3>Primjeri korisnih pretvorbi</h3><p>Možete pretvarati kilometre i milje, kilograme i funte, litre i galone, kvadratne metre i acre, kilovate i KS, bitove i bajtove, joule i kWh, newtone, okretni moment i brzine prijenosa podataka.</p><h3>Kako koristiti aplikaciju</h3><p>Otvorite aplikaciju, odaberite kategoriju i dvije jedinice te unesite vrijednost u bilo koje polje. Jezik sučelja možete promijeniti u bilo kojem trenutku.</p><h3>Privatnost i dostupnost</h3><p>Za Unit Converter nije potreban Apps & Games račun. Izračuni se izvršavaju izravno u pregledniku. Više o analitici, oglašavanju i privatnosti nalazi se u dokumentu <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Unit Converter — kostenlose Umrechner-App | Apps & Games",
                description: "Länge, Masse, Volumen, Fläche, Zeit, Geschwindigkeit, Energie, Leistung, Daten und weitere Einheiten kostenlos umrechnen.",
                badge: "APP • UMRECHNER • BROWSER",
                subtitle: "Schnelle Umrechnungen für Alltags- und Technikeinheiten",
                text: "Unit Converter ist eine kostenlose Browser-App für schnelle Umrechnungen in 17 Kategorien mit 115 Einheiten. Sie verbindet Alltags-, Technik-, Energie- und Dateneinheiten in einer übersichtlichen mehrsprachigen Oberfläche.",
                primary: "Unit Converter öffnen →",
                back: "Zurück zu den Apps",
                info: `<h2>Was Unit Converter macht</h2><p>Gib einen Wert ein, wähle Ausgangs- und Zieleinheit und das umgerechnete Ergebnis erscheint sofort. Beide Wertefelder können bearbeitet werden, sodass du ohne neue Einrichtung in beide Richtungen rechnen kannst.</p><p>Enthalten sind Länge, Zeit, Volumen, Fläche, Masse, Temperatur, Geschwindigkeit, Energie, Leistung, Druck, Winkel, Frequenz, Kraftstoffverbrauch, Kraft, Drehmoment, Datenspeicher und Datenübertragungsrate.</p><h3>Die wichtigsten Vorteile</h3><ul><li>17 praktische Kategorien mit 115 Einheiten.</li><li>Alle Einheitsnamen werden mit der gewählten Sprache übersetzt.</li><li>Englisch, Kroatisch, Deutsch, Italienisch und Spanisch.</li><li>Metrische, imperiale, technische und digitale Umrechnungen.</li><li>Responsive Darstellung für Desktop, Tablet und Smartphone.</li><li>Kostenlos ohne Apps-&-Games-Konto.</li></ul><h3>Nützliche Beispiele</h3><p>Rechne Kilometer und Meilen, Kilogramm und Pfund, Liter und Gallonen, Quadratmeter und Acres, Kilowatt und metrische PS, Bits und Bytes, Joule und Kilowattstunden, Newton, Drehmoment sowie Datenraten um.</p><h3>So verwendest du die App</h3><p>Öffne die App, wähle eine Kategorie und zwei Einheiten und gib einen Wert in eines der Felder ein. Die Sprache lässt sich jederzeit ändern.</p><h3>Datenschutz und Verfügbarkeit</h3><p>Für Unit Converter ist kein Apps-&-Games-Konto nötig. Die Berechnungen laufen direkt im Browser. Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Unit Converter — convertitore online gratuito | Apps & Games",
                description: "Converti lunghezza, massa, volume, area, tempo, velocità, energia, potenza, dati e altre unità in un'app multilingue gratuita.",
                badge: "APP • CONVERTITORE • BROWSER",
                subtitle: "Conversioni rapide per unità quotidiane e tecniche",
                text: "Unit Converter è un'app gratuita per browser che offre conversioni rapide in 17 categorie e 115 unità. Riunisce unità quotidiane, tecniche, energetiche e digitali in un'interfaccia chiara e multilingue.",
                primary: "Apri Unit Converter →",
                back: "Torna alle app",
                info: `<h2>Cosa fa Unit Converter</h2><p>Inserisci un numero, scegli l'unità di partenza e quella di destinazione e il valore convertito appare subito. Entrambi i campi sono modificabili, quindi puoi calcolare facilmente in entrambe le direzioni.</p><p>L'app include lunghezza, tempo, volume, area, massa, temperatura, velocità, energia, potenza, pressione, angolo, frequenza, consumo carburante, forza, coppia, memoria digitale e velocità di trasferimento dati.</p><h3>Vantaggi principali</h3><ul><li>17 categorie pratiche con 115 unità.</li><li>Tutti i nomi delle unità seguono la lingua selezionata.</li><li>Inglese, croato, tedesco, italiano e spagnolo.</li><li>Conversioni metriche, imperiali, tecniche e digitali.</li><li>Layout adattabile a desktop, tablet e mobile.</li><li>Gratuito senza account Apps & Games.</li></ul><h3>Esempi utili</h3><p>Converti chilometri e miglia, chilogrammi e libbre, litri e galloni, metri quadrati e acri, kilowatt e cavalli metrici, bit e byte, joule e kilowattora, newton, coppia e velocità dati.</p><h3>Come usarla</h3><p>Apri l'app, scegli una categoria e due unità, poi inserisci un valore in uno dei campi. Puoi cambiare lingua in qualsiasi momento.</p><h3>Privacy e disponibilità</h3><p>Unit Converter non richiede un account Apps & Games. I calcoli avvengono direttamente nel browser. Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Unit Converter — conversor online gratuito | Apps & Games",
                description: "Convierte longitud, masa, volumen, área, tiempo, velocidad, energía, potencia, datos y otras unidades en una app multilingüe gratuita.",
                badge: "APP • CONVERSOR • NAVEGADOR",
                subtitle: "Conversiones rápidas para unidades cotidianas y técnicas",
                text: "Unit Converter es una aplicación gratuita para navegador con conversiones rápidas en 17 categorías y 115 unidades. Reúne unidades cotidianas, técnicas, energéticas y digitales en una interfaz clara y multilingüe.",
                primary: "Abrir Unit Converter →",
                back: "Volver a las apps",
                info: `<h2>Qué hace Unit Converter</h2><p>Introduce un número, selecciona la unidad de origen y la de destino y el valor convertido aparece inmediatamente. Ambos campos se pueden editar, por lo que puedes calcular fácilmente en cualquier dirección.</p><p>La app incluye longitud, tiempo, volumen, área, masa, temperatura, velocidad, energía, potencia, presión, ángulo, frecuencia, consumo de combustible, fuerza, par, almacenamiento digital y velocidad de transferencia de datos.</p><h3>Ventajas principales</h3><ul><li>17 categorías prácticas con 115 unidades.</li><li>Los nombres de las unidades se traducen con el idioma seleccionado.</li><li>Inglés, croata, alemán, italiano y español.</li><li>Conversiones métricas, imperiales, técnicas y digitales.</li><li>Diseño adaptable para ordenador, tableta y móvil.</li><li>Uso gratuito sin cuenta de Apps & Games.</li></ul><h3>Ejemplos útiles</h3><p>Convierte kilómetros y millas, kilogramos y libras, litros y galones, metros cuadrados y acres, kilovatios y caballos métricos, bits y bytes, julios y kilovatios-hora, newtons, par y velocidades de datos.</p><h3>Cómo usarla</h3><p>Abre la app, elige una categoría y dos unidades e introduce un valor en cualquiera de los campos. Puedes cambiar el idioma en cualquier momento.</p><h3>Privacidad y disponibilidad</h3><p>Unit Converter no requiere una cuenta de Apps & Games. Los cálculos se realizan directamente en el navegador. Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "tetris": {
            kind: "game",
            name: "Tetris",
            hr: {
                title: "Tetris — besplatna igra za preglednik | Apps & Games",
                description: "Saznajte više o besplatnoj Tetris igri za preglednik s modernim neonskim sučeljem i klasičnim slaganjem padajućih blokova.",
                badge: "IGRA • SLAGALICA • PREGLEDNIK",
                subtitle: "Klasično slaganje padajućih blokova u modernom sučelju",
                text: "Ova verzija Tetrisa za preglednik zadržava poznatu ideju: pomičite i rotirajte padajuće figure, popunjavajte vodoravne redove i spriječite da se polje napuni. Moderna neonska izvedba prilagođena je brzom igranju na računalu i mobilnim uređajima.",
                primary: "Igraj Tetris →",
                back: "Natrag na igre",
                info: `<h2>Kako igrati</h2><p>Različiti oblici blokova padaju jedan po jedan. Cilj je pomicati i rotirati svaki komad tako da nastanu potpuni vodoravni redovi. Popunjeni red nestaje i oslobađa prostor. Igra završava kada naslagani blokovi dosegnu vrh.</p><p>Izazov raste dok planirate nekoliko poteza unaprijed, izbjegavate rupe i održavate polje urednim.</p><h3>Što sučelje nudi</h3><ul><li>Jasno glavno polje s modernim neonskim izgledom.</li><li>Rezultat i informacije o igri uz polje.</li><li>Pregled sljedeće figure.</li><li>Prilagodljiv raspored za manje zaslone.</li><li>Kontrole na zaslonu na podržanim mobilnim uređajima.</li></ul><h3>Igranje na računalu i mobitelu</h3><p>Na računalu se igra oslanja na tipkovnicu radi brzog pomicanja i rotacije. Na uređajima na dodir mogu se koristiti kontrole na zaslonu. Točan raspored može ovisiti o veličini zaslona.</p><h3>Savjeti za strategiju</h3><p>Pokušajte održavati naslagane blokove što ravnijima, izbjegavajte zatvorene rupe i ostavite prostor za duge figure. Pregled sljedećeg komada može biti presudan kada se polje počne puniti.</p><h3>Odmah u pregledniku</h3><p>Igra radi izravno u pregledniku i ne zahtijeva Apps & Games račun. Otvorite je gumbom iznad i započnite novu partiju kad god želite.</p><p>Za analitiku, oglase i privatnost pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Tetris — kostenloses Browserspiel | Apps & Games",
                description: "Mehr über das kostenlose Tetris-Browserspiel mit moderner Neonoberfläche und klassischem Falling-Block-Spielprinzip erfahren.",
                badge: "SPIEL • PUZZLE • BROWSER",
                subtitle: "Klassisches Falling-Block-Spiel mit moderner Browseroberfläche",
                text: "Diese Browser-Version von Tetris behält das bekannte Prinzip bei: fallende Steine bewegen und drehen, horizontale Reihen vervollständigen und verhindern, dass sich das Spielfeld bis oben füllt. Die moderne Neonoberfläche ist für schnelles Spielen auf Desktop und Mobilgeräten ausgelegt.",
                primary: "Tetris spielen →",
                back: "Zurück zu den Spielen",
                info: `<h2>So wird gespielt</h2><p>Verschiedene Blockformen fallen nacheinander ins Spielfeld. Du bewegst und drehst sie so, dass vollständige horizontale Reihen entstehen. Eine volle Reihe verschwindet und schafft Platz. Das Spiel endet, wenn der Stapel den oberen Rand erreicht.</p><p>Die Herausforderung steigt, wenn du mehrere Züge vorausplanst, schwierige Lücken vermeidest und das Feld übersichtlich hältst.</p><h3>Was die Oberfläche bietet</h3><ul><li>Übersichtliches Hauptspielfeld im modernen Neonstil.</li><li>Punkte und Spielinformationen neben dem Feld.</li><li>Vorschau auf den nächsten Stein.</li><li>Responsive Anpassung für kleinere Bildschirme.</li><li>Bildschirmsteuerung auf unterstützten Mobilgeräten.</li></ul><h3>Desktop und Mobil</h3><p>Auf Desktop und Laptop erfolgt die schnelle Steuerung über die Tastatur. Auf Touch-Geräten stehen je nach Layout Bildschirmtasten zur Verfügung. Die genaue Position kann je nach Bildschirmgrösse variieren.</p><h3>Strategietipps</h3><p>Halte den Stapel möglichst flach, vermeide eingeschlossene Löcher und lasse Platz für lange Steine. Ein Blick auf die Vorschau hilft besonders, wenn das Feld voller wird.</p><h3>Sofort im Browser spielen</h3><p>Das Spiel läuft direkt im Browser und benötigt kein Apps-&-Games-Konto. Öffne es mit der Schaltfläche oben und starte jederzeit eine neue Runde.</p><p>Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Tetris — gioco gratuito per browser | Apps & Games",
                description: "Scopri il Tetris gratuito per browser con interfaccia neon moderna e classico gameplay a blocchi cadenti.",
                badge: "GIOCO • PUZZLE • BROWSER",
                subtitle: "Blocchi cadenti classici con una moderna interfaccia browser",
                text: "Questa versione di Tetris per browser mantiene l'idea classica: sposta e ruota i pezzi, completa le righe orizzontali e impedisci che il campo si riempia. La presentazione neon moderna è pensata per partite rapide su desktop e dispositivi mobili.",
                primary: "Gioca a Tetris →",
                back: "Torna ai giochi",
                info: `<h2>Come si gioca</h2><p>Forme diverse cadono nel campo una alla volta. Devi spostarle e ruotarle per creare righe orizzontali complete. Una riga completa scompare e libera spazio. La partita finisce quando i blocchi raggiungono la parte alta del campo.</p><p>La difficoltà cresce quando devi pianificare più mosse, evitare buchi e mantenere l'area ordinata.</p><h3>Cosa offre l'interfaccia</h3><ul><li>Campo di gioco chiaro con stile neon moderno.</li><li>Punteggio e informazioni accanto all'area di gioco.</li><li>Anteprima del pezzo successivo.</li><li>Layout adattabile agli schermi piccoli.</li><li>Controlli su schermo sui dispositivi supportati.</li></ul><h3>Desktop e mobile</h3><p>Su desktop e laptop il gioco usa la tastiera per movimenti e rotazioni veloci. Sui dispositivi touch sono disponibili controlli a schermo quando supportati.</p><h3>Consigli di strategia</h3><p>Mantieni la pila il più possibile piatta, evita buchi chiusi e lascia spazio ai pezzi lunghi. Controllare il pezzo successivo può fare la differenza quando il campo si riempie.</p><h3>Gioca subito nel browser</h3><p>Il gioco funziona direttamente nel browser e non richiede un account Apps & Games. Aprilo con il pulsante in alto e inizia una nuova partita.</p><p>Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Tetris — juego gratuito para navegador | Apps & Games",
                description: "Descubre el Tetris gratuito para navegador con interfaz de neón moderna y el clásico juego de bloques que caen.",
                badge: "JUEGO • PUZLE • NAVEGADOR",
                subtitle: "Bloques clásicos con una moderna interfaz para navegador",
                text: "Esta versión de Tetris para navegador mantiene la idea conocida: mueve y gira las piezas, completa líneas horizontales y evita que el tablero se llene. La presentación de neón está diseñada para partidas rápidas en ordenador y dispositivos móviles.",
                primary: "Jugar a Tetris →",
                back: "Volver a los juegos",
                info: `<h2>Cómo jugar</h2><p>Diferentes formas caen al tablero una por una. Tu objetivo es mover y girar cada pieza para completar líneas horizontales. Una línea completa desaparece y crea más espacio. La partida termina cuando los bloques alcanzan la parte superior.</p><p>El reto aumenta al planificar varios movimientos, evitar huecos difíciles y mantener el tablero ordenado.</p><h3>Qué ofrece la interfaz</h3><ul><li>Tablero claro con estilo de neón moderno.</li><li>Puntuación e información junto al área de juego.</li><li>Vista previa de la siguiente pieza.</li><li>Diseño adaptable para pantallas pequeñas.</li><li>Controles en pantalla en dispositivos compatibles.</li></ul><h3>Ordenador y móvil</h3><p>En ordenador se usa el teclado para mover y girar rápidamente. En dispositivos táctiles pueden aparecer controles en pantalla. La posición exacta depende del tamaño del dispositivo.</p><h3>Consejos de estrategia</h3><p>Intenta mantener la pila plana, evita huecos cerrados y deja espacio para las piezas largas. Mirar la siguiente pieza ayuda mucho cuando el tablero empieza a llenarse.</p><h3>Juega directamente en el navegador</h3><p>El juego funciona en el navegador y no requiere una cuenta de Apps & Games. Ábrelo con el botón superior y empieza una nueva partida cuando quieras.</p><p>Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "ufo-invaders": {
            kind: "game",
            name: "UFO Invaders: Neon Defense",
            hr: {
                title: "UFO Invaders: Neon Defense — besplatna igra | Apps & Games",
                description: "Saznajte više o UFO Invaders: Neon Defense, besplatnoj neonskoj arkadnoj pucačini s valovima neprijatelja, bunkerima i bonusima.",
                badge: "IGRA • ARKADNA • PUCAČINA",
                subtitle: "Obranite Zemlju od sve opasnijih valova neprijatelja",
                text: "UFO Invaders: Neon Defense je moderna arkadna pucačina za preglednik nadahnuta klasičnim igrama obrane od svemirskih napadača. Upravljate obrambenim brodom, gađate neprijatelje koji se spuštaju, koristite bunkere kao zaklon i skupljate bonuse dok borba postaje sve intenzivnija.",
                primary: "Igraj UFO Invaders →",
                back: "Natrag na igre",
                info: `<h2>Arkadna obrana u modernom neonskom stilu</h2><p>Glavni cilj je jednostavan: preživite svaki val i spriječite napadače da preplave vaš položaj. Neprijatelji se kreću u formaciji, ali postaju opasniji kako val napreduje, pa treba kombinirati napad i pažljivo kretanje.</p><p>Tamna svemirska pozadina i svijetli neonski efekti pomažu da projektili, neprijatelji, obrambeni objekti i status budu jasno vidljivi.</p><h3>Elementi igre</h3><ul><li>Više valova neprijateljskih UFO i alien jedinica.</li><li>Kretanje igrača i brzo arkadno pucanje.</li><li>Bunkeri za privremenu zaštitu.</li><li>Bonusi koji mogu promijeniti tijek vala.</li><li>Prikaz rezultata, života i ostalih podataka.</li><li>Tipkovnica na računalu i dodirne kontrole na podržanim mobilnim uređajima.</li></ul><h3>Korištenje bunkera</h3><p>Bunkeri pomažu kada je neprijateljsku vatru teško izbjeći, ali nisu trajna zaštita. Pametno korištenje može kupiti dovoljno vremena za čišćenje opasnog dijela formacije.</p><h3>Bonusi i preživljavanje</h3><p>Bonusi mogu privremeno pojačati napad ili obranu. Najbolji trenutak ovisi o trenutnom valu, količini neprijateljske vatre i prostoru za manevar.</p><h3>Kontrole i uređaji</h3><p>Igra je prilagođena tipkovnici na računalu i vidljivim dodirnim kontrolama na podržanim telefonima i tabletima. Dostupne su i funkcije poput pauze.</p><h3>Igrajte izravno u pregledniku</h3><p>Apps & Games račun nije potreban. Otvorite igru gumbom iznad i odmah započnite.</p><p>Za analitiku, oglase i privatnost pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "UFO Invaders: Neon Defense — kostenloses Browserspiel | Apps & Games",
                description: "Mehr über UFO Invaders: Neon Defense erfahren, einen kostenlosen Neon-Arcade-Shooter mit Gegnerwellen, Bunkern und Power-ups.",
                badge: "SPIEL • ARCADE • SHOOTER",
                subtitle: "Verteidige die Erde gegen immer gefährlichere Gegnerwellen",
                text: "UFO Invaders: Neon Defense ist ein moderner Browser-Arcade-Shooter, inspiriert von klassischen Alien-Verteidigungsspielen. Du steuerst ein Verteidigungsfahrzeug, schiesst auf herabkommende Gegner, nutzt Bunker als Deckung und sammelst Power-ups, während die Schlacht immer intensiver wird.",
                primary: "UFO Invaders spielen →",
                back: "Zurück zu den Spielen",
                info: `<h2>Arcade-Verteidigung im modernen Neonstil</h2><p>Das Ziel ist leicht zu verstehen: Überstehe jede Welle und verhindere, dass die Invasoren deine Position überwältigen. Die Gegner bewegen sich als Formation und werden im Verlauf einer Welle gefährlicher.</p><p>Dunkler Weltraum und helle Neon-Effekte sorgen dafür, dass Geschosse, Gegner, Schutzobjekte und Statusanzeigen gut zu erkennen bleiben.</p><h3>Spielelemente</h3><ul><li>Mehrere Wellen feindlicher UFO- und Alien-Gegner.</li><li>Schnelle Bewegung und Arcade-Schüsse.</li><li>Bunker als vorübergehender Schutz.</li><li>Sammelbare Power-ups und Boni.</li><li>Punkte, Leben und weitere Informationen im Interface.</li><li>Tastatur am Desktop und Touch-Steuerung auf unterstützten Mobilgeräten.</li></ul><h3>Bunker richtig nutzen</h3><p>Bunker helfen bei dichtem Gegnerfeuer, sind aber kein dauerhafter Schutz. Kluge Nutzung kann genug Zeit schaffen, um einen gefährlichen Teil der Formation auszuschalten.</p><h3>Power-ups und Überleben</h3><p>Power-ups können Angriff oder Verteidigung vorübergehend verbessern. Der beste Zeitpunkt hängt von Welle, Gegnerfeuer und verfügbarem Bewegungsraum ab.</p><h3>Steuerung und Geräte</h3><p>Das Spiel unterstützt Tastatursteuerung am Desktop und sichtbare Touch-Steuerung auf geeigneten Smartphones und Tablets. Eine Pausefunktion erleichtert längere Runden.</p><h3>Direkt im Browser spielen</h3><p>Ein Apps-&-Games-Konto ist nicht erforderlich. Öffne das Spiel mit der Schaltfläche oben und starte sofort.</p><p>Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "UFO Invaders: Neon Defense — gioco gratuito | Apps & Games",
                description: "Scopri UFO Invaders: Neon Defense, uno sparatutto arcade neon gratuito con ondate di nemici, bunker e potenziamenti.",
                badge: "GIOCO • ARCADE • SPARATUTTO",
                subtitle: "Difendi la Terra da ondate di nemici sempre più pericolose",
                text: "UFO Invaders: Neon Defense è un moderno sparatutto arcade per browser ispirato ai classici giochi di difesa dagli alieni. Controlli un mezzo difensivo, spari ai nemici in discesa, usi i bunker come copertura e raccogli potenziamenti mentre la battaglia diventa più intensa.",
                primary: "Gioca a UFO Invaders →",
                back: "Torna ai giochi",
                info: `<h2>Difesa arcade con stile neon moderno</h2><p>L'obiettivo è semplice: sopravvivere a ogni ondata e impedire agli invasori di sopraffare la posizione difensiva. I nemici si muovono in formazione e diventano più minacciosi durante l'ondata.</p><p>Lo sfondo spaziale scuro e gli effetti neon aiutano a distinguere proiettili, nemici, difese e informazioni di stato.</p><h3>Elementi di gioco</h3><ul><li>Più ondate di UFO e nemici alieni.</li><li>Movimento rapido e tiro arcade.</li><li>Bunker per protezione temporanea.</li><li>Potenziamenti e bonus raccoglibili.</li><li>Punteggio, vite e altre informazioni nell'interfaccia.</li><li>Tastiera su desktop e controlli touch sui dispositivi supportati.</li></ul><h3>Uso dei bunker</h3><p>I bunker sono utili quando il fuoco nemico è difficile da evitare, ma non offrono protezione permanente. Usarli bene può dare il tempo necessario per eliminare una zona pericolosa.</p><h3>Potenziamenti e sopravvivenza</h3><p>I bonus possono migliorare temporaneamente attacco o difesa. Il momento migliore dipende dall'ondata, dal fuoco nemico e dallo spazio per muoversi.</p><h3>Controlli e dispositivi</h3><p>Il gioco supporta la tastiera su desktop e controlli touch visibili su telefoni e tablet compatibili, oltre alla pausa.</p><h3>Gioca nel browser</h3><p>Non serve un account Apps & Games. Apri il gioco con il pulsante qui sopra e inizia subito.</p><p>Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "UFO Invaders: Neon Defense — juego gratuito | Apps & Games",
                description: "Descubre UFO Invaders: Neon Defense, un shooter arcade de neón gratuito con oleadas, búnkeres y potenciadores.",
                badge: "JUEGO • ARCADE • DISPAROS",
                subtitle: "Defiende la Tierra de oleadas de enemigos cada vez más peligrosas",
                text: "UFO Invaders: Neon Defense es un shooter arcade moderno para navegador inspirado en los clásicos juegos de defensa contra alienígenas. Controlas una nave defensiva, disparas a los enemigos que descienden, utilizas búnkeres como cobertura y recoges potenciadores mientras la batalla se intensifica.",
                primary: "Jugar a UFO Invaders →",
                back: "Volver a los juegos",
                info: `<h2>Defensa arcade con un aspecto de neón moderno</h2><p>El objetivo es sencillo: sobrevivir a cada oleada y evitar que los invasores superen tu posición defensiva. Los enemigos se mueven en formación y se vuelven más peligrosos a medida que avanza la oleada.</p><p>El fondo espacial oscuro y los efectos de neón ayudan a distinguir proyectiles, enemigos, defensas e información de estado.</p><h3>Elementos del juego</h3><ul><li>Varias oleadas de UFO y enemigos alienígenas.</li><li>Movimiento rápido y disparos arcade.</li><li>Búnkeres para protección temporal.</li><li>Potenciadores y bonificaciones.</li><li>Puntuación, vidas y otra información visible.</li><li>Teclado en ordenador y controles táctiles en dispositivos compatibles.</li></ul><h3>Uso de los búnkeres</h3><p>Los búnkeres ayudan cuando el fuego enemigo es difícil de evitar, pero no son una protección permanente. Usarlos bien puede darte el tiempo necesario para limpiar una zona peligrosa.</p><h3>Potenciadores y supervivencia</h3><p>Los potenciadores pueden mejorar temporalmente el ataque o la defensa. El mejor momento depende de la oleada, el fuego enemigo y el espacio disponible para maniobrar.</p><h3>Controles y dispositivos</h3><p>El juego admite teclado en ordenador y controles táctiles visibles en móviles y tabletas compatibles, además de funciones como pausa.</p><h3>Juega directamente en el navegador</h3><p>No necesitas una cuenta de Apps & Games. Abre el juego con el botón superior y empieza inmediatamente.</p><p>Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "phoenix-arcade": {
            kind: "game",
            name: "Phoenix Arcade",
            hr: {
                title: "Phoenix Arcade — besplatna igra za preglednik | Apps & Games",
                description: "Saznajte više o Phoenix Arcade, besplatnoj pucačini s Phoenix neprijateljima, bonusima, valovima i modernim arkadnim izgledom.",
                badge: "IGRA • ARKADNA • BONUSI",
                subtitle: "Obranite posljednja zvjezdana vrata od Phoenix neprijatelja",
                text: "Phoenix Arcade je brza pucačina za preglednik zasnovana na valovima, pokretnim neprijateljskim formacijama i iznenadnim napadima obrušavanjem. Cilj je zadržati obrambeni položaj, uništavati Phoenix neprijatelje i koristiti prikupljene bonuse za preživljavanje sve težih razina.",
                primary: "Igraj Phoenix Arcade →",
                back: "Natrag na igre",
                info: `<h2>Svemirska borba u valovima</h2><p>Phoenix Arcade spaja klasično pucanje na fiksnom ekranu s dinamičnijim kretanjem neprijatelja. Neki ostaju u formaciji, dok se drugi odvajaju i obrušavaju prema igraču.</p><p>Moderan neonski izgled zadržava jasne kontrole i jednostavan cilj: preživjeti val, uništiti što više neprijatelja i iskoristiti bonuse prije sljedećeg težeg napada.</p><h3>Glavne značajke</h3><ul><li>Phoenix neprijatelji koji se obrušavaju i mijenjaju obrasce napada.</li><li>Napredovanje kroz valove s rastućim pritiskom.</li><li>Bonusi koji mogu ojačati napad ili obranu.</li><li>Brzo vodoravno kretanje i arkadno pucanje.</li><li>Rezultat i status prikazani tijekom igre.</li><li>Igranje u pregledniku bez Apps & Games računa.</li></ul><h3>Bonusi</h3><p>Bonusi mogu privremeno promijeniti način igre. Jače oružje pomaže pri čišćenju guste formacije, a obrambeni bonus pruža zaštitu tijekom težih napada.</p><h3>Kako dulje preživjeti</h3><p>Pratite neprijatelje koji napuštaju formaciju, ne ostajte predugo na istom mjestu i prvo uklanjajte opasne napadače. Održavanje prostora za kretanje često je važnije od svakog mogućeg pogotka.</p><h3>Kontrole i prikaz</h3><p>Igra je prilagođena izravnom igranju u pregledniku, s tipkovnicom na računalu i responzivnim rasporedom na manjim zaslonima. Zvuk, pauza i puni zaslon pomažu prilagoditi iskustvo uređaju.</p><h3>Počnite igrati</h3><p>Otvorite Phoenix Arcade gumbom iznad. Igra radi online u kompatibilnom pregledniku bez zasebne instalacije.</p><p>Za analitiku, oglase i privatnost pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Phoenix Arcade — kostenloses Browserspiel | Apps & Games",
                description: "Mehr über Phoenix Arcade erfahren, einen kostenlosen Browser-Shooter mit tauchenden Phoenix-Gegnern, Power-ups und Wellen.",
                badge: "SPIEL • ARCADE • POWER-UPS",
                subtitle: "Verteidige das letzte Sternentor gegen tauchende Phoenix-Gegner",
                text: "Phoenix Arcade ist ein schneller Browser-Shooter mit Wellenkämpfen, beweglichen Gegnerformationen und plötzlichen Sturzangriffen. Deine Aufgabe ist es, die Verteidigung zu halten, Phoenix-Gegner zu zerstören und gesammelte Boni zu nutzen, um immer schwierigere Abschnitte zu überstehen.",
                primary: "Phoenix Arcade spielen →",
                back: "Zurück zu den Spielen",
                info: `<h2>Weltraumkampf in Wellen</h2><p>Phoenix Arcade verbindet klassisches Fixed-Screen-Shooting mit dynamischeren Gegnerbewegungen. Einige Gegner bleiben in Formation, andere lösen sich und stürzen auf den Spieler zu.</p><p>Die moderne Neonoptik hält Steuerung und Ziel übersichtlich: Welle überstehen, möglichst viele Gegner zerstören und Boni nutzen, bevor das nächste Angriffsmuster schwieriger wird.</p><h3>Wichtige Spielelemente</h3><ul><li>Tauchende Phoenix-Gegner mit wechselnden Angriffsmustern.</li><li>Wellenfortschritt mit zunehmendem Druck.</li><li>Power-ups für Angriff oder Verteidigung.</li><li>Schnelle horizontale Bewegung und Arcade-Schüsse.</li><li>Punkte und Status während des Spiels.</li><li>Browserspiel ohne Apps-&-Games-Konto.</li></ul><h3>Power-ups</h3><p>Boni können deine Spielweise vorübergehend verändern. Stärkere Waffen helfen gegen dichte Formationen, defensive Boni schützen in schwierigen Angriffen.</p><h3>Länger überleben</h3><p>Achte auf Gegner, die die Formation verlassen, bleibe nicht zu lange an derselben Position und beseitige gefährliche Angreifer zuerst. Freier Bewegungsraum ist oft wichtiger als jeder mögliche Treffer.</p><h3>Steuerung und Darstellung</h3><p>Das Spiel ist für direkte Browsersteuerung mit Tastatur am Desktop und responsive Layouts auf kleineren Bildschirmen ausgelegt. Sound, Pause und Vollbild helfen bei der Anpassung.</p><h3>Jetzt spielen</h3><p>Öffne Phoenix Arcade mit der Schaltfläche oben. Das Spiel läuft online in einem kompatiblen Browser ohne separate Installation.</p><p>Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Phoenix Arcade — gioco gratuito per browser | Apps & Games",
                description: "Scopri Phoenix Arcade, uno sparatutto gratuito con nemici Phoenix in picchiata, potenziamenti, ondate e stile arcade moderno.",
                badge: "GIOCO • ARCADE • POTENZIAMENTI",
                subtitle: "Difendi l'ultimo portale stellare dai Phoenix in picchiata",
                text: "Phoenix Arcade è uno sparatutto veloce per browser basato su combattimenti a ondate, formazioni nemiche in movimento e improvvisi attacchi in picchiata. Devi mantenere la posizione, distruggere i nemici Phoenix e usare i bonus raccolti per superare livelli sempre più difficili.",
                primary: "Gioca a Phoenix Arcade →",
                back: "Torna ai giochi",
                info: `<h2>Combattimento spaziale a ondate</h2><p>Phoenix Arcade unisce il classico tiro a schermo fisso con movimenti nemici più dinamici. Alcuni avversari restano in formazione, mentre altri si staccano e si lanciano verso il giocatore.</p><p>Lo stile neon moderno mantiene controlli e obiettivo semplici: sopravvivi all'ondata, distruggi più nemici possibile e sfrutta i bonus prima del prossimo attacco.</p><h3>Caratteristiche principali</h3><ul><li>Nemici Phoenix in picchiata con schemi variabili.</li><li>Progressione a ondate sempre più intensa.</li><li>Potenziamenti offensivi e difensivi.</li><li>Movimento orizzontale rapido e tiro arcade.</li><li>Punteggio e stato visibili durante la partita.</li><li>Gioco nel browser senza account Apps & Games.</li></ul><h3>Potenziamenti</h3><p>I bonus possono cambiare temporaneamente il modo di giocare. Armi più forti aiutano a eliminare formazioni dense, mentre i bonus difensivi proteggono durante gli attacchi più difficili.</p><h3>Come sopravvivere più a lungo</h3><p>Osserva i nemici che lasciano la formazione, non restare troppo a lungo nello stesso punto e elimina prima gli attaccanti più pericolosi. Mantenere spazio per muoversi è spesso più importante di inseguire ogni colpo.</p><h3>Controlli e presentazione</h3><p>Il gioco usa la tastiera su desktop e layout responsivi sugli schermi piccoli. Audio, pausa e schermo intero permettono di adattare l'esperienza.</p><h3>Inizia a giocare</h3><p>Apri Phoenix Arcade con il pulsante qui sopra. Il gioco funziona online in un browser compatibile senza installazione separata.</p><p>Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Phoenix Arcade — juego gratuito para navegador | Apps & Games",
                description: "Descubre Phoenix Arcade, un shooter gratuito con enemigos Phoenix en picado, potenciadores, oleadas y estilo arcade moderno.",
                badge: "JUEGO • ARCADE • POTENCIADORES",
                subtitle: "Defiende la última puerta estelar de los Phoenix en picado",
                text: "Phoenix Arcade es un shooter rápido para navegador basado en combates por oleadas, formaciones enemigas móviles y ataques repentinos en picado. Debes mantener la defensa, destruir enemigos Phoenix y usar los bonus recogidos para sobrevivir a fases cada vez más difíciles.",
                primary: "Jugar a Phoenix Arcade →",
                back: "Volver a los juegos",
                info: `<h2>Combate espacial por oleadas</h2><p>Phoenix Arcade combina los disparos clásicos de pantalla fija con movimientos enemigos más dinámicos. Algunos permanecen en formación y otros se separan para lanzarse contra el jugador.</p><p>El estilo de neón mantiene controles y objetivo claros: sobrevive a la oleada, destruye tantos enemigos como puedas y aprovecha los bonus antes del siguiente patrón de ataque.</p><h3>Características principales</h3><ul><li>Enemigos Phoenix en picado con patrones cambiantes.</li><li>Oleadas que aumentan la presión.</li><li>Potenciadores ofensivos y defensivos.</li><li>Movimiento horizontal rápido y disparos arcade.</li><li>Puntuación y estado visibles durante el juego.</li><li>Juego en navegador sin cuenta de Apps & Games.</li></ul><h3>Potenciadores</h3><p>Los bonus pueden cambiar temporalmente tu forma de jugar. Un arma más fuerte ayuda contra formaciones densas y las mejoras defensivas protegen durante ataques difíciles.</p><h3>Cómo sobrevivir más tiempo</h3><p>Vigila a los enemigos que abandonan la formación, evita permanecer demasiado tiempo en el mismo lugar y elimina primero a los atacantes más peligrosos. Mantener espacio para moverte suele ser más importante que buscar cada disparo posible.</p><h3>Controles y presentación</h3><p>El juego utiliza teclado en ordenador y diseños adaptables en pantallas pequeñas. Sonido, pausa y pantalla completa ayudan a ajustar la experiencia.</p><h3>Empieza a jugar</h3><p>Abre Phoenix Arcade con el botón superior. Funciona online en un navegador compatible sin instalación independiente.</p><p>Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "neon-pacman": {
            kind: "game",
            name: "Neon Pac-Man",
            hr: {
                title: "Neon Pac-Man — besplatna igra labirinta | Apps & Games",
                description: "Igrajte Neon Pac-Man, modernu besplatnu igru labirinta s neonskim 3D izgledom, energetskim kuglama, spremanjem i lokalnom rang-listom.",
                badge: "IGRA • ARKADNA • LABIRINT",
                subtitle: "Očistite svjetleći labirint i nadmudrite duhove",
                text: "Neon Pac-Man donosi klasično igranje kroz labirint u modernom neonskom izdanju s 3D izgledom likova, animiranim bonusima, višejezičnim kontrolama i trajnom lokalnom rang-listom.",
                primary: "Igraj Neon Pac-Man →",
                back: "Natrag na igre",
                info: `<h2>Moderan neonski lov kroz labirint</h2><p>Pojedite sve točkice da završite razinu i pritom izbjegavajte duhove. Velike energetske kugle privremeno okreću situaciju i omogućuju vam lov na duhove za bonus bodove. Brzina se postupno povećava kroz razine, pa kasnije treba brže reagirati i pažljivije planirati put kroz labirint.</p><p>Neonski prikaz daje klasičnoj igri moderniji izgled s 3D stilom likova, svijetlim zidovima labirinta i animiranim bonus efektima, dok cilj igre ostaje jednostavan i odmah razumljiv.</p><h3>Glavne značajke</h3><ul><li>Moderan 3D izgled Pac-Mana, duhova, zidova i animiranih bonusa.</li><li>Tipkovnica, WASD, dodirne kontrole i puni zaslon.</li><li>Hrvatski, engleski, njemački, talijanski i španjolski.</li><li>Odvojene kontrole zvučnih efekata i retro pozadinske glazbe.</li><li>Spremi i izađi, izlaz bez spremanja i Play Again.</li><li>Spremljene postavke i lokalna Top 10 rang-lista na uređaju.</li></ul><h3>Bodovi, razine i rang-lista</h3><p>Bodove skupljate dok čistite labirint, a energetske kugle privremeno pretvaraju duhove u priliku za dodatne bodove. Nakon završene razine igra prelazi u bržu rundu, pa dobar rezultat ovisi o sigurnom kretanju i pravom trenutku za korištenje energetskih kugli.</p><p>Lokalna Top 10 rang-lista sprema najbolje rezultate na trenutačnom uređaju. Tako uvijek imate jasan rezultat koji možete pokušati nadmašiti bez online računa ili javnog profila.</p><h3>Spremanje i nastavak kasnije</h3><p>Ako želite prekinuti igru, opcija Spremi i izađi čuva trenutačni napredak kako biste kasnije mogli nastaviti na istom uređaju i u istom pregledniku. Možete i izaći bez spremanja ako ne želite da trenutačna igra zamijeni postojeću spremljenu poziciju.</p><h3>Kako igrati</h3><p>Držite strelice ili W, A, S i D za kretanje, a otpustite ih za zaustavljanje. Na mobitelu koristite smjerove ili povucite prstom preko labirinta. Pratite kretanje duhova prije ulaska u uske prolaze i energetske kugle koristite kada je više duhova dovoljno blizu za dodatne bodove.</p><h3>Igranje na računalu i mobitelu</h3><p>Na računalu ili laptopu tipkovnica omogućuje najbržu kontrolu. Na mobitelima i tabletima možete koristiti dodirni smjerni pad ili povlačenje prstom bez fizičke tipkovnice. Puni zaslon može dati više prostora za igru na manjim ekranima.</p><h3>Počnite igrati</h3><p>Otvorite Neon Pac-Man gumbom iznad u modernom kompatibilnom pregledniku. Nije potreban Apps & Games račun niti posebna instalacija.</p><p>Za analitiku, oglase i privatnost pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Neon Pac-Man — kostenloses Labyrinthspiel | Apps & Games",
                description: "Spiele Neon Pac-Man, ein modernes kostenloses Labyrinthspiel mit Neon-3D-Optik, Power-Pellets, Speicherfunktion und lokaler Bestenliste.",
                badge: "SPIEL • ARCADE • LABYRINTH",
                subtitle: "Leere das leuchtende Labyrinth und überliste die Geister",
                text: "Neon Pac-Man bringt das klassische Maze-Chase-Spielprinzip in eine moderne Neonwelt mit 3D-artigen Figuren, animierten Boni, mehrsprachigen Steuerelementen und einer dauerhaft gespeicherten lokalen Bestenliste.",
                primary: "Neon Pac-Man spielen →",
                back: "Zurück zu den Spielen",
                info: `<h2>Moderne Neon-Labyrinthjagd</h2><p>Sammle alle Punkte, um das Level zu beenden, und weiche dabei den Geistern aus. Grosse Power-Pellets drehen die Rollen vorübergehend um und lassen dich die Geister für Bonuspunkte jagen. Die Geschwindigkeit steigt mit dem Fortschritt, sodass spätere Level schnellere Entscheidungen und bessere Routenplanung verlangen.</p><p>Die Neon-Darstellung gibt dem klassischen Maze-Chase-Prinzip einen modernen Look mit 3D-artigen Figuren, leuchtenden Wänden und animierten Bonus-Effekten, während das Spielziel leicht verständlich bleibt.</p><h3>Wichtige Funktionen</h3><ul><li>Moderne 3D-Optik für Pac-Man, Geister, Mauern und animierte Boni.</li><li>Tastatur, WASD, Touch-Steuerung und Vollbild.</li><li>Englisch, Kroatisch, Deutsch, Italienisch und Spanisch.</li><li>Getrennte Regler für Soundeffekte und Retro-Hintergrundmusik.</li><li>Speichern &amp; Beenden, ohne Speichern beenden und erneut spielen.</li><li>Gespeicherte Einstellungen und lokale Top-10-Bestenliste.</li></ul><h3>Punkte, Level und Bestenliste</h3><p>Deine Punktzahl steigt, während du das Labyrinth leerst und Power-Pellets nutzt, um Geister vorübergehend in zusätzliche Punkte zu verwandeln. Nach jedem abgeschlossenen Level folgt eine schnellere Runde; ein gutes Ergebnis hängt deshalb von sicheren Wegen und dem richtigen Zeitpunkt für die Power-Pellets ab.</p><p>Die lokale Top-10-Bestenliste speichert die besten Ergebnisse auf dem aktuellen Gerät. So hast du ein klares Ziel, das du ohne Online-Konto oder öffentliches Profil verbessern kannst.</p><h3>Speichern und später weiterspielen</h3><p>Mit Speichern &amp; Beenden sicherst du deinen aktuellen Fortschritt und kannst später auf demselben Gerät und im selben Browser weiterspielen. Wenn der aktuelle Lauf den gespeicherten Spielstand nicht ersetzen soll, kannst du auch ohne Speichern beenden.</p><h3>So wird gespielt</h3><p>Halte die Pfeiltasten oder W, A, S und D zum Bewegen gedrückt und lasse sie zum Stoppen los. Auf Mobilgeräten nutzt du das Steuerkreuz oder Wischgesten. Beobachte die Geister vor engen Passagen und setze Power-Pellets ein, wenn mehrere Geister nahe genug für zusätzliche Punkte sind.</p><h3>Desktop und Mobilgeräte</h3><p>Auf Desktop und Laptop bietet die Tastatur die schnellste Steuerung. Auf Smartphones und Tablets funktionieren Steuerkreuz und Wischgesten ohne physische Tastatur. Der Vollbildmodus kann auf kleineren Displays mehr Platz für das Spielfeld schaffen.</p><h3>Jetzt spielen</h3><p>Öffne Neon Pac-Man mit der Schaltfläche oben in einem kompatiblen modernen Browser. Ein Apps-&-Games-Konto oder eine separate Installation ist nicht nötig.</p><p>Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Neon Pac-Man — gioco labirinto gratuito | Apps & Games",
                description: "Gioca a Neon Pac-Man, un moderno gioco gratuito con grafica neon 3D, power pellet, salvataggio e classifica locale.",
                badge: "GIOCO • ARCADE • LABIRINTO",
                subtitle: "Completa il labirinto luminoso e supera in astuzia i fantasmi",
                text: "Neon Pac-Man porta il classico gameplay da labirinto in una moderna presentazione neon con personaggi in stile 3D, bonus animati, controlli multilingue e una classifica locale persistente.",
                primary: "Gioca a Neon Pac-Man →",
                back: "Torna ai giochi",
                info: `<h2>Un moderno inseguimento neon nel labirinto</h2><p>Mangia tutti i puntini per completare il livello evitando i fantasmi. I grandi power pellet ribaltano temporaneamente la situazione e ti permettono di inseguire i fantasmi per punti bonus. La velocità aumenta gradualmente, quindi i livelli successivi richiedono decisioni più rapide e una migliore pianificazione del percorso.</p><p>La presentazione neon rinnova il classico gameplay da labirinto con personaggi in stile 3D, pareti luminose ed effetti bonus animati, mantenendo un obiettivo semplice da capire.</p><h3>Caratteristiche principali</h3><ul><li>Pac-Man, fantasmi, pareti e bonus animati in moderno stile 3D.</li><li>Tastiera, WASD, touch e schermo intero.</li><li>Inglese, croato, tedesco, italiano e spagnolo.</li><li>Controlli separati per effetti sonori e musica retro.</li><li>Salva ed esci, esci senza salvare e gioca di nuovo.</li><li>Impostazioni salvate e classifica locale Top 10.</li></ul><h3>Punteggio, livelli e classifica</h3><p>Il punteggio cresce mentre pulisci il labirinto e usi i power pellet per trasformare temporaneamente i fantasmi in occasioni di punti extra. Dopo ogni livello completato arriva un round più veloce, quindi un buon risultato dipende sia da movimenti sicuri sia dal momento giusto per usare i power pellet.</p><p>La classifica locale Top 10 conserva i migliori risultati sul dispositivo corrente. Hai così un obiettivo chiaro da superare senza account online o profilo pubblico.</p><h3>Salva e continua più tardi</h3><p>Con Salva ed esci puoi conservare i progressi della partita e riprendere più tardi sullo stesso dispositivo e browser. Puoi anche uscire senza salvare quando non vuoi sostituire la partita già memorizzata.</p><h3>Come si gioca</h3><p>Tieni premuti i tasti freccia o W, A, S e D per muoverti e rilasciali per fermarti. Su mobile usa i pulsanti direzionali o scorri sul labirinto. Osserva i fantasmi prima di entrare nei passaggi stretti e usa i power pellet quando più fantasmi sono abbastanza vicini da creare un'opportunità di punteggio.</p><h3>Desktop e dispositivi mobili</h3><p>Su desktop e laptop la tastiera offre il controllo più rapido. Su telefoni e tablet puoi usare il pad direzionale o i gesti di scorrimento senza una tastiera fisica. La modalità a schermo intero può offrire più spazio sui display piccoli.</p><h3>Inizia a giocare</h3><p>Apri Neon Pac-Man con il pulsante qui sopra in un browser moderno compatibile. Non serve un account Apps & Games né un'installazione separata.</p><p>Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Neon Pac-Man — juego de laberinto gratuito | Apps & Games",
                description: "Juega a Neon Pac-Man, un moderno juego gratuito con estilo 3D de neón, bolas de poder, guardado y clasificación local.",
                badge: "JUEGO • ARCADE • LABERINTO",
                subtitle: "Limpia el laberinto brillante y burla a los fantasmas",
                text: "Neon Pac-Man lleva el clásico juego de persecución por laberintos a una presentación moderna de neón con personajes de estilo 3D, bonus animados, controles multilingües y una clasificación local persistente.",
                primary: "Jugar a Neon Pac-Man →",
                back: "Volver a los juegos",
                info: `<h2>Una persecución moderna de neón</h2><p>Come todos los puntos para completar el nivel mientras evitas a los fantasmas. Las grandes bolas de poder cambian temporalmente la situación y te permiten perseguir a los fantasmas para conseguir puntos extra. La velocidad aumenta poco a poco, por lo que los niveles posteriores requieren decisiones más rápidas y una mejor planificación de la ruta.</p><p>La presentación de neón moderniza el clásico juego de laberintos con personajes de estilo 3D, paredes brillantes y efectos de bonus animados, manteniendo un objetivo sencillo de entender.</p><h3>Características principales</h3><ul><li>Pac-Man, fantasmas, paredes y bonus animados con estilo 3D moderno.</li><li>Teclado, WASD, controles táctiles y pantalla completa.</li><li>Inglés, croata, alemán, italiano y español.</li><li>Controles separados para efectos de sonido y música retro.</li><li>Guardar y salir, salir sin guardar y volver a jugar.</li><li>Ajustes guardados y clasificación local Top 10.</li></ul><h3>Puntuación, niveles y clasificación</h3><p>Tu puntuación aumenta mientras limpias el laberinto y utilizas las bolas de poder para convertir temporalmente a los fantasmas en oportunidades de puntos extra. Al completar un nivel comienza una ronda más rápida, así que un buen resultado depende de moverse con seguridad y elegir bien cuándo usar cada bola de poder.</p><p>La clasificación local Top 10 guarda los mejores resultados en el dispositivo actual. Así tienes un objetivo claro que superar sin una cuenta online ni un perfil público.</p><h3>Guardar y continuar más tarde</h3><p>Con Guardar y salir puedes conservar el progreso actual y continuar más tarde en el mismo dispositivo y navegador. También puedes salir sin guardar cuando no quieras sustituir la partida ya almacenada.</p><h3>Cómo jugar</h3><p>Mantén pulsadas las flechas o W, A, S y D para moverte y suéltalas para detenerte. En móvil utiliza el pad direccional o desliza sobre el laberinto. Observa a los fantasmas antes de entrar en pasillos estrechos y usa las bolas de poder cuando varios fantasmas estén suficientemente cerca para crear una oportunidad de puntuación.</p><h3>Juego en ordenador y móvil</h3><p>En ordenador o portátil, el teclado ofrece el control más rápido. En teléfonos y tabletas puedes usar el pad táctil o los gestos de deslizamiento sin teclado físico. El modo de pantalla completa puede ofrecer más espacio en pantallas pequeñas.</p><h3>Empieza a jugar</h3><p>Abre Neon Pac-Man con el botón superior en un navegador moderno compatible. No necesitas una cuenta de Apps & Games ni una instalación independiente.</p><p>Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        },

        "modern-snake": {
            kind: "game",
            name: "Modern Snake",
            hr: {
                title: "Modern Snake — besplatna Snake igra | Apps & Games",
                description: "Igrajte Modern Snake, besplatnu igru s tri života, vremenskim bonusima, tipkovnicom i mišem, spremanjem i lokalnom rang-listom.",
                badge: "IGRA • ARKADNA • SNAKE",
                subtitle: "Rastite, preživite i lovite novi najbolji rezultat",
                text: "Modern Snake osvježava klasičnu Snake formulu s tri života, vremenski ograničenom bonus hranom, postupnim ubrzavanjem, kontrolom mišem i tipkovnicom, mobilnim povlačenjem prsta i trajnom lokalnom rang-listom.",
                primary: "Igraj Modern Snake →",
                back: "Natrag na igre",
                info: `<h2>Moderna verzija klasične igre Snake</h2><p>Jedite zlatnu hranu kako bi zmija rasla i skupljajte bodove, pritom izbjegavajući zidove i vlastito tijelo. Počinjete s tri života, pa jedan sudar ne završava cijelu igru. Brzina raste s razinom.</p><h3>Glavne značajke</h3><ul><li>Tri života uz očuvanje rezultata i razine nakon izgubljenog života.</li><li>Vremenski bonusi: srca vraćaju život, a zvijezde daju dodatne bodove.</li><li>Tipkovnica: strelice ili WASD.</li><li>Kontrola mišem uz Pointer Lock: jednom kliknite polje pa upravljajte pomicanjem miša; Esc vraća kursor.</li><li>Povlačenje prstom i tipke smjera za mobitele i tablete.</li><li>Hrvatski, engleski, njemački, talijanski i španjolski.</li><li>Puni zaslon, zvuk, Save & Exit, Exit without Save i Play Again.</li><li>Spremljene postavke, napredak i lokalna Top 10 rang-lista.</li></ul><h3>Kako igrati mišem</h3><p>Odaberite Mouse ili Keyboard + Mouse. Kliknite jednom na polje da uključite Pointer Lock. Uobičajeni kursor nestaje, a označena glava zmije postaje vizualna referenca. Pomaknite miš lijevo, desno, gore ili dolje za skretanje. Pritisnite Esc za oslobađanje kursora.</p><h3>Počnite igrati</h3><p>Otvorite Modern Snake gumbom iznad u kompatibilnom modernom pregledniku. Apps & Games račun i zasebna instalacija nisu potrebni.</p><p>Za analitiku, oglase i privatnost pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
            },
            de: {
                title: "Modern Snake — kostenloses Snake-Browserspiel | Apps & Games",
                description: "Spiele Modern Snake mit drei Leben, zeitlich begrenzten Boni, Tastatur- und Maussteuerung, Speicherfunktion und lokaler Bestenliste.",
                badge: "SPIEL • ARCADE • SNAKE",
                subtitle: "Wachse, überlebe und jage einen neuen Highscore",
                text: "Modern Snake modernisiert das klassische Snake-Prinzip mit drei Leben, zeitlich begrenztem Bonusfutter, steigender Geschwindigkeit, Maus- und Tastatursteuerung, Wischsteuerung auf Mobilgeräten und einer dauerhaft gespeicherten lokalen Bestenliste.",
                primary: "Modern Snake spielen →",
                back: "Zurück zu den Spielen",
                info: `<h2>Eine moderne Version des klassischen Snake-Spiels</h2><p>Friss das goldene Futter, damit die Schlange wächst, und sammle Punkte, ohne Wände oder den eigenen Körper zu berühren. Du startest mit drei Leben, sodass eine Kollision nicht sofort das ganze Spiel beendet. Die Geschwindigkeit steigt mit dem Level.</p><h3>Wichtige Funktionen</h3><ul><li>Drei Leben; Punkte und Level bleiben nach einem verlorenen Leben erhalten.</li><li>Zeitboni: Herzen können ein Leben zurückgeben, Sterne bringen Bonuspunkte.</li><li>Tastatursteuerung mit Pfeiltasten oder WASD.</li><li>Maussteuerung mit Pointer Lock: Spielfeld einmal anklicken, dann durch Mausbewegung steuern; Esc gibt den Cursor frei.</li><li>Wischgesten und Bildschirmtasten auf Smartphones und Tablets.</li><li>Englisch, Kroatisch, Deutsch, Italienisch und Spanisch.</li><li>Vollbild, Sound, Save & Exit, Exit without Save und Play Again.</li><li>Gespeicherte Einstellungen, Spielstand und lokale Top-10-Bestenliste.</li></ul><h3>Mit der Maus spielen</h3><p>Wähle Mouse oder Keyboard + Mouse und klicke einmal auf das Spielfeld, um Pointer Lock zu aktivieren. Der normale Cursor verschwindet und der markierte Schlangenkopf dient als visuelle Referenz. Bewege die Maus nach links, rechts, oben oder unten zum Abbiegen. Mit Esc wird der Cursor wieder freigegeben.</p><h3>Jetzt spielen</h3><p>Öffne Modern Snake mit der Schaltfläche oben in einem kompatiblen modernen Browser. Ein Apps-&-Games-Konto oder eine separate Installation ist nicht nötig.</p><p>Informationen zu Analyse, Werbung und Datenschutz findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
            },
            it: {
                title: "Modern Snake — gioco Snake gratuito | Apps & Games",
                description: "Gioca a Modern Snake con tre vite, bonus a tempo, tastiera e mouse, salvataggio e classifica locale.",
                badge: "GIOCO • ARCADE • SNAKE",
                subtitle: "Cresci, sopravvivi e insegui un nuovo record",
                text: "Modern Snake rinnova la formula classica con tre vite, cibo bonus a tempo, velocità progressiva, controlli con mouse e tastiera, swipe su mobile e una classifica locale persistente.",
                primary: "Gioca a Modern Snake →",
                back: "Torna ai giochi",
                info: `<h2>Una versione moderna del classico Snake</h2><p>Mangia il cibo dorato per far crescere il serpente e raccogli punti evitando pareti e corpo. Inizi con tre vite, quindi una collisione non termina subito l'intera partita. La velocità aumenta con il livello.</p><h3>Caratteristiche principali</h3><ul><li>Tre vite con punteggio e livello mantenuti dopo una vita persa.</li><li>Bonus a tempo: i cuori possono ripristinare una vita e le stelle danno punti extra.</li><li>Controlli da tastiera con frecce o WASD.</li><li>Controllo mouse con Pointer Lock: clicca una volta sul campo e guida muovendo il mouse; Esc libera il cursore.</li><li>Swipe e pulsanti direzionali su telefoni e tablet.</li><li>Inglese, croato, tedesco, italiano e spagnolo.</li><li>Schermo intero, audio, Save & Exit, Exit without Save e Play Again.</li><li>Impostazioni, partita e classifica locale Top 10 salvate.</li></ul><h3>Come giocare con il mouse</h3><p>Seleziona Mouse o Keyboard + Mouse e fai clic una volta sul campo per attivare Pointer Lock. Il cursore normale scompare e la testa evidenziata del serpente diventa il riferimento visivo. Muovi il mouse a sinistra, destra, in alto o in basso per girare. Premi Esc per liberare il cursore.</p><h3>Inizia a giocare</h3><p>Apri Modern Snake con il pulsante qui sopra in un browser moderno compatibile. Non serve un account Apps & Games né un'installazione separata.</p><p>Per analisi, pubblicità e privacy consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
            },
            es: {
                title: "Modern Snake — juego Snake gratuito | Apps & Games",
                description: "Juega a Modern Snake con tres vidas, bonus temporales, teclado y ratón, guardado y clasificación local.",
                badge: "JUEGO • ARCADE • SNAKE",
                subtitle: "Crece, sobrevive y busca una nueva puntuación máxima",
                text: "Modern Snake renueva la fórmula clásica con tres vidas, comida bonus temporal, velocidad progresiva, controles con ratón y teclado, gestos en móvil y una clasificación local persistente.",
                primary: "Jugar a Modern Snake →",
                back: "Volver a los juegos",
                info: `<h2>Una versión moderna del clásico Snake</h2><p>Come la comida dorada para hacer crecer la serpiente y conseguir puntos evitando las paredes y tu propio cuerpo. Empiezas con tres vidas, así que una colisión no termina toda la partida. La velocidad aumenta con el nivel.</p><h3>Características principales</h3><ul><li>Tres vidas con puntuación y nivel conservados después de perder una vida.</li><li>Bonus temporales: los corazones pueden recuperar una vida y las estrellas dan puntos extra.</li><li>Controles de teclado con flechas o WASD.</li><li>Control con ratón usando Pointer Lock: haz clic una vez en el tablero y dirige moviendo el ratón; Esc libera el cursor.</li><li>Gestos y controles de dirección en móviles y tabletas.</li><li>Inglés, croata, alemán, italiano y español.</li><li>Pantalla completa, sonido, Save & Exit, Exit without Save y Play Again.</li><li>Ajustes, progreso y clasificación local Top 10 guardados.</li></ul><h3>Cómo jugar con el ratón</h3><p>Selecciona Mouse o Keyboard + Mouse y haz clic una vez en el tablero para activar Pointer Lock. El cursor normal desaparece y la cabeza resaltada de la serpiente se convierte en la referencia visual. Mueve el ratón a izquierda, derecha, arriba o abajo para girar. Pulsa Esc para liberar el cursor.</p><h3>Empieza a jugar</h3><p>Abre Modern Snake con el botón superior en un navegador moderno compatible. No necesitas una cuenta de Apps & Games ni una instalación independiente.</p><p>Para analítica, publicidad y privacidad consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
            }
        }
    };

    const page = pages[slug];
    if (!page) return;

    const qLang = new URLSearchParams(location.search).get("lang");
    const saved = localStorage.getItem(STORAGE_KEY);
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    let language = SUPPORTED.includes(qLang) ? qLang : (SUPPORTED.includes(saved) ? saved : (SUPPORTED.includes(browser) ? browser : "en"));

    const header = document.querySelector(".header-content");
    const themeToggle = document.getElementById("themeToggle");
    if (header && themeToggle && !document.getElementById("languageSelect")) {
        const actions = document.createElement("div");
        actions.className = "header-actions";
        const label = document.createElement("label");
        label.className = "sr-only";
        label.htmlFor = "languageSelect";
        const select = document.createElement("select");
        select.id = "languageSelect";
        select.className = "language-select";
        select.innerHTML = '<option value="en">EN</option><option value="hr">HR</option><option value="de">DE</option><option value="it">IT</option><option value="es">ES</option>';
        themeToggle.replaceWith(actions);
        actions.append(label, select, themeToggle);
    }

    const select = document.getElementById("languageSelect");
    const label = document.querySelector('label[for="languageSelect"]');
    const heroBadge = document.querySelector(".hero-badge");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroText = document.querySelector(".hero-text");
    const primary = document.querySelector(".hero-buttons .primary-button");
    const secondary = document.querySelector(".hero-buttons .secondary-button");
    const infoCard = document.querySelector(".info-card");
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    const original = {
        title: document.title,
        description: descriptionMeta?.content || "",
        badge: heroBadge?.textContent || "",
        subtitle: heroSubtitle?.textContent || "",
        text: heroText?.textContent || "",
        primary: primary?.textContent || "",
        back: secondary?.textContent || "",
        info: infoCard?.innerHTML || ""
    };

    function setCommon(lang) {
        const c = common[lang] || common.en;
        const navSpans = document.querySelectorAll(".main-nav a span");
        if (navSpans[0]) navSpans[0].textContent = c.navApps;
        if (navSpans[1]) navSpans[1].textContent = c.navGames;
        if (navSpans[2]) navSpans[2].textContent = c.navInfo;
        const logo = document.querySelector(".logo");
        if (logo) logo.setAttribute("aria-label", "Apps & Games " + c.home);
        const nav = document.querySelector(".main-nav");
        if (nav) nav.setAttribute("aria-label", c.navApps + " / " + c.navGames + " / " + c.navInfo);
        if (label) label.textContent = c.selectLanguage;
        if (select) select.setAttribute("aria-label", c.selectLanguage);
        if (themeToggle) themeToggle.setAttribute("aria-label", c.theme);
        const footerLinks = document.querySelectorAll(".footer-links a");
        if (footerLinks[0]) footerLinks[0].textContent = c.home;
        if (footerLinks[1]) footerLinks[1].textContent = c.navApps;
        if (footerLinks[2]) footerLinks[2].textContent = c.navGames;
        if (footerLinks[3]) footerLinks[3].textContent = c.privacy;
    }

    function applyLanguage(lang, updateUrl = false) {
        language = SUPPORTED.includes(lang) ? lang : "en";
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.lang = language;
        if (select) select.value = language;
        setCommon(language);

        if (language === "en" && !page.en) {
            document.title = original.title;
            if (descriptionMeta) descriptionMeta.content = original.description;
            if (heroBadge) heroBadge.textContent = original.badge;
            if (heroSubtitle) heroSubtitle.textContent = original.subtitle;
            if (heroText) heroText.textContent = original.text;
            if (primary) primary.textContent = original.primary;
            if (secondary) secondary.textContent = original.back;
            if (infoCard) infoCard.innerHTML = original.info;
        } else {
            const d = page[language] || page.en || page.hr;
            document.title = d.title;
            if (descriptionMeta) descriptionMeta.content = d.description;
            if (heroBadge) heroBadge.textContent = d.badge;
            if (heroSubtitle) heroSubtitle.textContent = d.subtitle;
            if (heroText) heroText.textContent = d.text;
            if (primary) primary.textContent = d.primary;
            if (secondary) secondary.textContent = d.back;
            if (infoCard) infoCard.innerHTML = `<span class="section-label">${common[language][page.kind === "game" ? "aboutGame" : "aboutApp"]}</span>${d.info}`;
        }

        if (slug === "date-lotto-generator") {
            const d = page[language] || page.en;
            document.getElementById("web-platform-title").textContent = d.webTitle;
            document.getElementById("web-app-open").textContent = d.webOpen;
            document.getElementById("web-app-description").textContent = d.webDescription;
        }

        if (slug === "digital-clock") {
            const downloads = {
                en: {
                    windowsDownload: "Download for Windows",
                    windowsHelp: "Installation instructions",
                    windowsDescription: "Windows 10/11 x64 · Version 2.0.5 · Free installer. Includes Bedside mode, full screen, alarms, timer, world clock, stopwatch and an optional OLED-friendly Digital Clock Screen Saver.",
                    webOpen: "Open / Install Web App",
                    webDescription: "Runs directly in your browser and does not require a traditional installer. Works on Windows, Mac (macOS), iPhone, iPad and Android devices in supported browsers and can be installed as a web app (PWA). After the first load, core features can also work without an internet connection. An internet connection is required for updates. Some operating-system-specific features available in the Windows or Android versions may not be included. Digital Clock Web does not include the Windows Screen Saver.",
                    androidDownload: "Download for Android",
                    androidHelp: "Installation instructions",
                    androidDescription: "Android 7.0+ · Version 1.1 · Free APK. Night mode with OLED-friendly display behavior, full screen, alarms and timer. Manual update checks are available in Info."
                },
                hr: {
                    windowsDownload: "Preuzmi za Windows",
                    windowsHelp: "Upute za instalaciju",
                    windowsDescription: "Windows 10/11 x64 · Verzija 2.0.5 · Besplatan instalacijski program. Uključuje noćni način uz krevet, cijeli zaslon, alarme, mjerač vremena, svjetski sat, štopericu i opcionalni OLED-friendly Digital Clock čuvar zaslona.",
                    webOpen: "Otvori / instaliraj Web App",
                    webDescription: "Radi izravno u pregledniku i ne zahtijeva klasični instalacijski program. Radi na Windows i Mac (macOS) računalima te iPhone, iPad i Android uređajima u podržanim preglednicima i može se instalirati kao web aplikacija (PWA). Nakon prvog učitavanja osnovne funkcije mogu raditi i bez internetske veze. Za ažuriranja je potrebna internetska veza. Neke funkcije specifične za Windows ili Android verziju nisu dostupne. Digital Clock Web ne uključuje Windows Screen Saver.",
                    androidDownload: "Preuzmi za Android",
                    androidHelp: "Upute za instalaciju",
                    androidDescription: "Android 7.0+ · Verzija 1.1 · Besplatan APK. Noćni način s OLED-friendly ponašanjem zaslona, cijeli zaslon, alarmi i mjerač vremena. Ručna provjera nadogradnji dostupna je u Info."
                },
                de: {
                    windowsDownload: "Für Windows herunterladen",
                    windowsHelp: "Installationsanleitung",
                    windowsDescription: "Windows 10/11 x64 · Version 2.0.5 · Kostenloser Installer. Mit Nachttischmodus, Vollbild, Wecker, Timer, Weltzeituhr, Stoppuhr und optionalem OLED-freundlichem Digital Clock-Bildschirmschoner.",
                    webOpen: "Web-App öffnen / installieren",
                    webDescription: "Läuft direkt im Browser und benötigt kein klassisches Installationsprogramm. Funktioniert auf Windows- und Mac-Computern (macOS) sowie auf iPhone-, iPad- und Android-Geräten in unterstützten Browsern und kann als Web-App (PWA) installiert werden. Nach dem ersten Laden können die Grundfunktionen auch ohne Internetverbindung funktionieren. Für Updates ist eine Internetverbindung erforderlich. Einige betriebssystemspezifische Funktionen der Windows- oder Android-Version sind möglicherweise nicht verfügbar. Digital Clock Web enthält keinen Windows-Bildschirmschoner.",
                    androidDownload: "Für Android herunterladen",
                    androidHelp: "Installationsanleitung",
                    androidDescription: "Android 7.0+ · Version 1.1 · Kostenlose APK. Nachtmodus mit OLED-freundlichem Anzeigeverhalten, Vollbild, Wecker und Timer. Manuelle Update-Prüfung unter Info."
                },
                it: {
                    windowsDownload: "Scarica per Windows",
                    windowsHelp: "Istruzioni di installazione",
                    windowsDescription: "Windows 10/11 x64 · Versione 2.0.5 · Installer gratuito. Include modalità comodino, schermo intero, sveglie, timer, orologio mondiale, cronometro e screensaver Digital Clock OLED-friendly opzionale.",
                    webOpen: "Apri / installa Web App",
                    webDescription: "Funziona direttamente nel browser e non richiede un programma di installazione tradizionale. Funziona su computer Windows e Mac (macOS) e su dispositivi iPhone, iPad e Android nei browser supportati e può essere installata come app web (PWA). Dopo il primo caricamento, le funzioni principali possono funzionare anche senza connessione Internet. Per gli aggiornamenti è necessaria una connessione Internet. Alcune funzioni specifiche delle versioni Windows o Android potrebbero non essere disponibili. Digital Clock Web non include lo screensaver di Windows.",
                    androidDownload: "Scarica per Android",
                    androidHelp: "Istruzioni di installazione",
                    androidDescription: "Android 7.0+ · Versione 1.1 · APK gratuito. Modalità notte con comportamento OLED-friendly del display, schermo intero, sveglie e timer. Verifica manuale degli aggiornamenti in Info."
                },
                es: {
                    windowsDownload: "Descargar para Windows",
                    windowsHelp: "Instrucciones de instalación",
                    windowsDescription: "Windows 10/11 x64 · Versión 2.0.5 · Instalador gratuito. Incluye modo de mesita, pantalla completa, alarmas, temporizador, reloj mundial, cronómetro y protector de pantalla Digital Clock OLED-friendly opcional.",
                    webOpen: "Abrir / instalar Web App",
                    webDescription: "Se ejecuta directamente en el navegador y no requiere un instalador tradicional. Funciona en ordenadores Windows y Mac (macOS), así como en dispositivos iPhone, iPad y Android con navegadores compatibles, y se puede instalar como aplicación web (PWA). Después de la primera carga, las funciones principales también pueden funcionar sin conexión a Internet. Se requiere conexión a Internet para las actualizaciones. Es posible que algunas funciones específicas de las versiones de Windows o Android no estén disponibles. Digital Clock Web no incluye el protector de pantalla de Windows.",
                    androidDownload: "Descargar para Android",
                    androidHelp: "Instrucciones de instalación",
                    androidDescription: "Android 7.0+ · Versión 1.1 · APK gratuito. Modo nocturno con comportamiento OLED-friendly de la pantalla, pantalla completa, alarmas y temporizador. Búsqueda manual de actualizaciones en Info."
                }
            }[language];

            const webAppOpen = document.getElementById("web-app-open");
            const webAppDescription = document.getElementById("web-app-description");
            const windowsDownload = document.getElementById("windows-download");
            const windowsHelp = document.getElementById("windows-help");
            const windowsDescription = document.getElementById("windows-description");
            const androidDownload = document.getElementById("android-download");
            const androidHelp = document.getElementById("android-help");
            const androidDescription = document.getElementById("android-description");

            if (webAppOpen) webAppOpen.textContent = downloads.webOpen;
            if (webAppDescription) webAppDescription.textContent = downloads.webDescription;

            if (windowsDownload) windowsDownload.textContent = downloads.windowsDownload;
            if (windowsHelp) {
                windowsHelp.textContent = downloads.windowsHelp;
                windowsHelp.href = "/downloads/digital-clock/Installation.html#" + language + "-windows";
            }
            if (windowsDescription) windowsDescription.textContent = downloads.windowsDescription;

            if (androidDownload) androidDownload.textContent = downloads.androidDownload;
            if (androidHelp) {
                androidHelp.textContent = downloads.androidHelp;
                androidHelp.href = "/downloads/digital-clock/Installation.html#" + language + "-android";
            }
            if (androidDescription) androidDescription.textContent = downloads.androidDescription;
        }

        if (ogTitle) ogTitle.content = document.title;
        if (ogDescription) ogDescription.content = descriptionMeta?.content || "";
        if (twitterTitle) twitterTitle.content = document.title;
        if (twitterDescription) twitterDescription.content = descriptionMeta?.content || "";

        if (updateUrl) {
            const url = new URL(location.href);
            if (language === "en") url.searchParams.delete("lang");
            else url.searchParams.set("lang", language);
            history.replaceState({}, "", url);
        }
    }

    if (select) select.addEventListener("change", e => applyLanguage(e.target.value, true));

    function applyTheme(theme) {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            if (themeToggle) themeToggle.textContent = "🌙";
        } else {
            document.documentElement.removeAttribute("data-theme");
            if (themeToggle) themeToggle.textContent = "☀️";
        }
    }

    applyTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
            applyTheme(next);
            localStorage.setItem("theme", next);
        });
    }

    const year = document.getElementById("currentYear");
    if (year) year.textContent = new Date().getFullYear();

    applyLanguage(language, false);
})();
