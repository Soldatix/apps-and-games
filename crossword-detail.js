(() => {
  const supported = ["en", "hr", "de", "it", "es"];
  const saved = localStorage.getItem("appsGamesLanguage");
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  const language = supported.includes(saved) ? saved : (supported.includes(browser) ? browser : "en");

  const common = {
    en: { navApps:"Apps", navGames:"Games", navInfo:"Info", home:"Home", privacy:"Privacy Policy", about:"ABOUT THE APP", primary:"Open Crossword →", back:"Back to Apps" },
    hr: { navApps:"Aplikacije", navGames:"Igre", navInfo:"Info", home:"Početna", privacy:"Pravila privatnosti", about:"O APLIKACIJI", primary:"Otvori Crossword →", back:"Natrag na aplikacije" },
    de: { navApps:"Apps", navGames:"Spiele", navInfo:"Info", home:"Startseite", privacy:"Datenschutzerklärung", about:"ÜBER DIE APP", primary:"Crossword öffnen →", back:"Zurück zu den Apps" },
    it: { navApps:"App", navGames:"Giochi", navInfo:"Info", home:"Home", privacy:"Informativa sulla privacy", about:"INFORMAZIONI SULL'APP", primary:"Apri Crossword →", back:"Torna alle app" },
    es: { navApps:"Apps", navGames:"Juegos", navInfo:"Info", home:"Inicio", privacy:"Política de privacidad", about:"ACERCA DE LA APP", primary:"Abrir Crossword →", back:"Volver a las apps" }
  };

  const copy = {
    en: {
      title:"Crossword — Create, Solve and Share Crosswords | Apps & Games",
      description:"Create custom crosswords, solve 500 ready-made multilingual puzzles, print to PDF and share crosswords online with Apps & Games Crossword.",
      badge:"APP • CROSSWORD • CREATOR",
      subtitle:"Create, solve, print and share crosswords",
      text:"Apps & Games Crossword lets you build a crossword from your own answers and clues or solve ready-made puzzles from a multilingual library. Everything runs directly in your browser without an account.",
      info:`<h2>What Crossword does</h2><p>Create a custom crossword by entering answers and clues. The generator automatically tries to connect as many words as possible into a compact crossword layout.</p><p>You can also switch to Play mode and choose from 500 ready-made crosswords across five languages and ten categories.</p><h3>Main features</h3><ul><li>Custom crossword creator with automatic word intersections.</li><li>500 ready-made crosswords: 100 per supported language.</li><li>10 categories including general knowledge, geography, animals, sport, history, nature, film & TV, music, cars and science.</li><li>Croatian, English, German, Italian and Spanish.</li><li>Hints, answer checking, reveal solution and Play Again.</li><li>Print or save as PDF.</li><li>Share custom crosswords with a link.</li><li>Responsive layout for desktop, tablet and mobile browsers.</li></ul><h3>Create your own crossword</h3><p>Enter at least three answers with clues, choose the crossword language and generate the grid. You can rearrange the result, preview the solution, play the generated crossword, print it or share it online.</p><h3>Privacy and availability</h3><p>No Apps & Games account is required. Crossword generation and solving run in the browser, while the ready-made puzzle library is loaded only when needed. For information about analytics, advertising and privacy choices, see the <a href="privacy-policy"><u>Privacy Policy</u></a>.</p>`
    },
    hr: {
      title:"Crossword — izradite i rješavajte križaljke | Apps & Games",
      description:"Izradite vlastite križaljke, rješavajte 500 gotovih križaljki na pet jezika, ispišite ih u PDF ili podijelite poveznicom.",
      badge:"APP • KRIŽALJKE • KREATOR",
      subtitle:"Stvarajte, rješavajte, ispisujte i dijelite križaljke",
      text:"Apps & Games Crossword omogućuje da od vlastitih rješenja i pitanja napravite križaljku ili da rješavate gotove križaljke iz višejezične biblioteke. Sve radi izravno u pregledniku, bez korisničkog računa.",
      info:`<h2>Što radi Crossword</h2><p>Upišite rješenja i pripadajuća pitanja, a generator će pokušati povezati što više riječi u preglednu križaljku.</p><p>U načinu Rješavaj možete birati između 500 gotovih križaljki na pet jezika i u deset kategorija.</p><h3>Glavne mogućnosti</h3><ul><li>Izrada vlastitih križaljki s automatskim povezivanjem riječi.</li><li>500 gotovih križaljki: po 100 za svaki podržani jezik.</li><li>10 kategorija: opće znanje, geografija, životinje, sport, povijest, priroda, film i TV, glazba, automobili i znanost.</li><li>Hrvatski, engleski, njemački, talijanski i španjolski.</li><li>Pomoć, provjera odgovora, prikaz rješenja i Igraj ponovno.</li><li>Ispis ili spremanje u PDF.</li><li>Dijeljenje vlastite križaljke poveznicom.</li><li>Prilagođen prikaz za računalo, tablet i mobitel.</li></ul><h3>Napravite vlastitu križaljku</h3><p>Unesite najmanje tri rješenja s pitanjima, odaberite jezik križaljke i generirajte mrežu. Rezultat možete presložiti, pregledati rješenje, odmah rješavati, ispisati ili podijeliti online.</p><h3>Privatnost i dostupnost</h3><p>Apps & Games račun nije potreban. Izrada i rješavanje odvijaju se u pregledniku, a biblioteka gotovih križaljki učitava se samo kada je potrebna. Za informacije o analitici, oglašavanju i privatnosti pogledajte <a href="privacy-policy"><u>Pravila privatnosti</u></a>.</p>`
    },
    de: {
      title:"Crossword — Kreuzworträtsel erstellen und lösen | Apps & Games",
      description:"Erstelle eigene Kreuzworträtsel, löse 500 fertige Rätsel in fünf Sprachen, drucke sie als PDF oder teile sie per Link.",
      badge:"APP • KREUZWORTRÄTSEL • EDITOR",
      subtitle:"Kreuzworträtsel erstellen, lösen, drucken und teilen",
      text:"Mit Apps & Games Crossword kannst du aus eigenen Antworten und Hinweisen ein Kreuzworträtsel erstellen oder fertige Rätsel aus einer mehrsprachigen Bibliothek lösen. Alles läuft direkt im Browser ohne Konto.",
      info:`<h2>Was Crossword bietet</h2><p>Gib Antworten und Hinweise ein. Der Generator versucht automatisch, möglichst viele Wörter zu einem kompakten Kreuzworträtsel zu verbinden.</p><p>Im Spielmodus stehen 500 fertige Kreuzworträtsel in fünf Sprachen und zehn Kategorien zur Auswahl.</p><h3>Wichtigste Funktionen</h3><ul><li>Eigener Kreuzworträtsel-Editor mit automatischen Wortkreuzungen.</li><li>500 fertige Rätsel: 100 pro unterstützter Sprache.</li><li>10 Kategorien, darunter Allgemeinwissen, Geografie, Tiere, Sport, Geschichte, Natur, Film & TV, Musik, Autos und Wissenschaft.</li><li>Kroatisch, Englisch, Deutsch, Italienisch und Spanisch.</li><li>Hinweise, Antwortprüfung, Lösung anzeigen und Noch einmal spielen.</li><li>Drucken oder als PDF speichern.</li><li>Eigene Kreuzworträtsel per Link teilen.</li><li>Responsive Darstellung für Desktop, Tablet und Mobilgeräte.</li></ul><h3>Eigenes Kreuzworträtsel erstellen</h3><p>Gib mindestens drei Antworten mit Hinweisen ein, wähle die Sprache und generiere das Raster. Danach kannst du es neu anordnen, die Lösung ansehen, direkt spielen, drucken oder online teilen.</p><h3>Datenschutz und Verfügbarkeit</h3><p>Ein Apps-&-Games-Konto ist nicht erforderlich. Erstellung und Lösung laufen im Browser; die Bibliothek wird nur bei Bedarf geladen. Weitere Informationen findest du in der <a href="privacy-policy"><u>Datenschutzerklärung</u></a>.</p>`
    },
    it: {
      title:"Crossword — crea e risolvi cruciverba | Apps & Games",
      description:"Crea cruciverba personalizzati, risolvi 500 cruciverba pronti in cinque lingue, stampa in PDF o condividi con un link.",
      badge:"APP • CRUCIVERBA • CREATORE",
      subtitle:"Crea, risolvi, stampa e condividi cruciverba",
      text:"Apps & Games Crossword ti permette di creare un cruciverba con le tue risposte e definizioni oppure di risolvere puzzle pronti da una libreria multilingue. Tutto funziona direttamente nel browser senza account.",
      info:`<h2>Cosa fa Crossword</h2><p>Inserisci risposte e definizioni: il generatore prova automaticamente a collegare il maggior numero possibile di parole in una griglia compatta.</p><p>In modalità Gioca puoi scegliere tra 500 cruciverba pronti in cinque lingue e dieci categorie.</p><h3>Funzioni principali</h3><ul><li>Creatore di cruciverba con incroci automatici.</li><li>500 cruciverba pronti: 100 per ogni lingua supportata.</li><li>10 categorie: cultura generale, geografia, animali, sport, storia, natura, film e TV, musica, automobili e scienza.</li><li>Croato, inglese, tedesco, italiano e spagnolo.</li><li>Suggerimenti, controllo risposte, soluzione e Gioca di nuovo.</li><li>Stampa o salvataggio in PDF.</li><li>Condivisione dei cruciverba personalizzati tramite link.</li><li>Layout responsive per desktop, tablet e smartphone.</li></ul><h3>Crea il tuo cruciverba</h3><p>Inserisci almeno tre risposte con definizioni, scegli la lingua e genera la griglia. Puoi riorganizzarla, vedere la soluzione, giocarla subito, stamparla o condividerla online.</p><h3>Privacy e disponibilità</h3><p>Non serve un account Apps & Games. Creazione e gioco avvengono nel browser e la libreria viene caricata solo quando necessario. Consulta l'<a href="privacy-policy"><u>Informativa sulla privacy</u></a>.</p>`
    },
    es: {
      title:"Crossword — crea y resuelve crucigramas | Apps & Games",
      description:"Crea crucigramas personalizados, resuelve 500 crucigramas preparados en cinco idiomas, imprime en PDF o comparte mediante enlace.",
      badge:"APP • CRUCIGRAMAS • CREADOR",
      subtitle:"Crea, resuelve, imprime y comparte crucigramas",
      text:"Apps & Games Crossword permite crear un crucigrama con tus propias respuestas y pistas o resolver crucigramas preparados desde una biblioteca multilingüe. Todo funciona directamente en el navegador sin cuenta.",
      info:`<h2>Qué hace Crossword</h2><p>Introduce respuestas y pistas. El generador intenta conectar automáticamente tantas palabras como sea posible en una cuadrícula compacta.</p><p>En el modo Jugar puedes elegir entre 500 crucigramas preparados en cinco idiomas y diez categorías.</p><h3>Funciones principales</h3><ul><li>Creador de crucigramas con cruces automáticos.</li><li>500 crucigramas preparados: 100 por cada idioma compatible.</li><li>10 categorías: cultura general, geografía, animales, deporte, historia, naturaleza, cine y TV, música, automóviles y ciencia.</li><li>Croata, inglés, alemán, italiano y español.</li><li>Pistas, comprobación de respuestas, solución y Jugar de nuevo.</li><li>Imprimir o guardar como PDF.</li><li>Compartir crucigramas personalizados mediante enlace.</li><li>Diseño adaptable a ordenador, tableta y móvil.</li></ul><h3>Crea tu propio crucigrama</h3><p>Introduce al menos tres respuestas con pistas, elige el idioma y genera la cuadrícula. Puedes reorganizarla, ver la solución, jugarla, imprimirla o compartirla online.</p><h3>Privacidad y disponibilidad</h3><p>No necesitas una cuenta de Apps & Games. La creación y resolución funcionan en el navegador y la biblioteca se carga solo cuando hace falta. Consulta la <a href="privacy-policy"><u>Política de privacidad</u></a>.</p>`
    }
  };

  const c = common[language];
  const p = copy[language];
  document.documentElement.lang = language;
  document.title = p.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", p.description);
  document.getElementById("navApps").textContent = c.navApps;
  document.getElementById("navGames").textContent = c.navGames;
  document.getElementById("navInfo").textContent = c.navInfo;
  document.getElementById("detailBadge").textContent = p.badge;
  document.getElementById("detailSubtitle").textContent = p.subtitle;
  document.getElementById("detailText").textContent = p.text;
  document.getElementById("primaryButton").textContent = c.primary;
  document.getElementById("backButton").textContent = c.back;
  document.getElementById("aboutLabel").textContent = c.about;
  document.getElementById("detailInfo").innerHTML = p.info;
  document.getElementById("footerHome").textContent = c.home;
  document.getElementById("footerApps").textContent = c.navApps;
  document.getElementById("footerGames").textContent = c.navGames;
  document.getElementById("footerPrivacy").textContent = c.privacy;

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById("themeToggle");
  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeToggle) themeToggle.textContent = "🌙";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeToggle) themeToggle.textContent = "☀️";
    }
  }
  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");
  themeToggle?.addEventListener("click", () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    const next = light ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
})();