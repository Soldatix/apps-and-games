/* =====================================================
   APPS & GAMES
===================================================== */

const translations = window.APP_I18N || {};
const cardTranslations = window.APP_CARD_I18N || {};
const supportedLanguages = ["en", "hr", "de", "it", "es"];
const languageSelect = document.getElementById("languageSelect");

function getInitialLanguage() {
    const savedLanguage = localStorage.getItem("appsGamesLanguage");
    if (supportedLanguages.includes(savedLanguage)) return savedLanguage;

    const browserLanguage = (navigator.language || "en").slice(0, 2).toLowerCase();
    return supportedLanguages.includes(browserLanguage) ? browserLanguage : "en";
}

let currentLanguage = getInitialLanguage();

const modernSnakeI18n = {
    en: {
        pageDescription: "Discover free online apps and browser games including Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man and Modern Snake.",
        gamesText: "Choose from puzzle and arcade-style games and start playing directly in your browser. The current collection includes Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man and Modern Snake.",
        aboutText2: "Instead of requiring a separate installation, the projects are designed to run online in a web browser whenever possible. The collection combines practical apps such as Digital Clock, Date Lotto Generator, Emoji Copy & Paste and Unit Converter with browser games such as Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man and Modern Snake.",
        card: ["Play a modern Snake game with three lives, timed bonus food, keyboard and mouse controls, saved progress and a local leaderboard.", ["Arcade", "Snake", "Bonuses"]]
    },
    hr: {
        pageDescription: "Otkrijte besplatne online aplikacije i igre za preglednik, uključujući Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man i Modern Snake.",
        gamesText: "Odaberite slagalice ili arkadne igre i odmah ih pokrenite u pregledniku. Trenutačna kolekcija uključuje Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man i Modern Snake.",
        aboutText2: "Umjesto zasebne instalacije, projekti su napravljeni tako da se, kad god je moguće, pokreću online u web-pregledniku. Kolekcija spaja praktične aplikacije kao što su Digital Clock, Date Lotto Generator, Emoji Copy & Paste i Unit Converter s igrama Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man i Modern Snake.",
        card: ["Igrajte moderni Snake s tri života, vremenski ograničenom bonus hranom, upravljanjem tipkovnicom i mišem, spremanjem i lokalnom rang-listom.", ["Arkadna", "Snake", "Bonusi"]]
    },
    de: {
        pageDescription: "Entdecke kostenlose Online-Apps und Browserspiele wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man und Modern Snake.",
        gamesText: "Wähle Puzzle- oder Arcade-Spiele und spiele direkt im Browser. Die aktuelle Sammlung umfasst Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man und Modern Snake.",
        aboutText2: "Statt einer separaten Installation laufen die Projekte nach Möglichkeit online im Webbrowser. Die Sammlung verbindet praktische Apps wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste und Unit Converter mit Spielen wie Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man und Modern Snake.",
        card: ["Spiele Modern Snake mit drei Leben, zeitlich begrenztem Bonusfutter, Tastatur- und Maussteuerung, Speicherfunktion und lokaler Bestenliste.", ["Arcade", "Snake", "Bonusse"]]
    },
    it: {
        pageDescription: "Scopri applicazioni online e giochi per browser gratuiti come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man e Modern Snake.",
        gamesText: "Scegli tra rompicapi e giochi arcade e gioca direttamente nel browser. La raccolta attuale include Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man e Modern Snake.",
        aboutText2: "Senza richiedere un'installazione separata, i progetti sono pensati per funzionare online in un browser quando possibile. La raccolta unisce app pratiche come Digital Clock, Date Lotto Generator, Emoji Copy & Paste e Unit Converter a giochi come Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man e Modern Snake.",
        card: ["Gioca a Modern Snake con tre vite, cibo bonus a tempo, comandi da tastiera e mouse, salvataggio e classifica locale.", ["Arcade", "Snake", "Bonus"]]
    },
    es: {
        pageDescription: "Descubre aplicaciones online y juegos de navegador gratuitos como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man y Modern Snake.",
        gamesText: "Elige entre puzles y juegos arcade y empieza a jugar directamente en el navegador. La colección actual incluye Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man y Modern Snake.",
        aboutText2: "Sin necesidad de una instalación independiente, los proyectos están diseñados para funcionar online en un navegador siempre que sea posible. La colección combina apps prácticas como Digital Clock, Date Lotto Generator, Emoji Copy & Paste y Unit Converter con juegos como Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man y Modern Snake.",
        card: ["Juega a Modern Snake con tres vidas, comida bonus temporal, controles de teclado y ratón, guardado y clasificación local.", ["Arcade", "Snake", "Bonus"]]
    }
};

supportedLanguages.forEach(language => {
    const snakeText = modernSnakeI18n[language];
    if (!snakeText) return;

    if (translations[language]) {
        Object.assign(translations[language], {
            pageDescription: snakeText.pageDescription,
            gamesText: snakeText.gamesText,
            aboutText2: snakeText.aboutText2
        });
    }

    if (!Array.isArray(cardTranslations[language])) cardTranslations[language] = [];
    cardTranslations[language][8] = snakeText.card;
});

const crosswordPortalI18n = {
    en: {
        pageDescription: "Discover free online apps and browser games including Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man and Modern Snake.",
        appsText: "Open practical browser apps for everyday use. Current projects include Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter and Crossword, with more apps planned as the collection grows.",
        aboutText2: "Instead of requiring a separate installation, the projects are designed to run online in a web browser whenever possible. The collection combines practical apps such as Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter and Crossword with browser games such as Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man and Modern Snake.",
        card: ["Create your own crosswords or solve 500 ready-made puzzles across five languages and ten categories, then print or share them online.", ["Crossword", "Puzzle", "Creator"]]
    },
    hr: {
        pageDescription: "Otkrijte besplatne online aplikacije i igre za preglednik, uključujući Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man i Modern Snake.",
        appsText: "Otvorite praktične aplikacije za svakodnevnu upotrebu. Trenutačna kolekcija uključuje Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter i Crossword, a nove aplikacije dodavat ćemo i dalje.",
        aboutText2: "Umjesto zasebne instalacije, projekti su napravljeni tako da se, kad god je moguće, pokreću online u web-pregledniku. Kolekcija spaja praktične aplikacije kao što su Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter i Crossword s igrama Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man i Modern Snake.",
        card: ["Izradite vlastite križaljke ili rješavajte 500 gotovih križaljki na pet jezika i u deset kategorija, zatim ih ispišite ili podijelite online.", ["Križaljke", "Slagalica", "Kreator"]]
    },
    de: {
        pageDescription: "Entdecke kostenlose Online-Apps und Browserspiele wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man und Modern Snake.",
        appsText: "Öffne praktische Browser-Apps für den Alltag. Zur aktuellen Sammlung gehören Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter und Crossword; weitere Apps sind geplant.",
        aboutText2: "Statt einer separaten Installation laufen die Projekte nach Möglichkeit online im Webbrowser. Die Sammlung verbindet praktische Apps wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter und Crossword mit Spielen wie Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man und Modern Snake.",
        card: ["Erstelle eigene Kreuzworträtsel oder löse 500 fertige Rätsel in fünf Sprachen und zehn Kategorien und drucke oder teile sie online.", ["Kreuzworträtsel", "Puzzle", "Editor"]]
    },
    it: {
        pageDescription: "Scopri applicazioni online e giochi per browser gratuiti come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man e Modern Snake.",
        appsText: "Apri app pratiche direttamente nel browser. La raccolta attuale include Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter e Crossword, con altre app in arrivo.",
        aboutText2: "Senza richiedere un'installazione separata, i progetti sono pensati per funzionare online in un browser quando possibile. La raccolta unisce app pratiche come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter e Crossword a giochi come Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man e Modern Snake.",
        card: ["Crea i tuoi cruciverba o risolvi 500 puzzle pronti in cinque lingue e dieci categorie, poi stampali o condividili online.", ["Cruciverba", "Puzzle", "Creatore"]]
    },
    es: {
        pageDescription: "Descubre aplicaciones online y juegos de navegador gratuitos como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man y Modern Snake.",
        appsText: "Abre aplicaciones prácticas directamente en el navegador. La colección actual incluye Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter y Crossword, y seguirá creciendo.",
        aboutText2: "Sin necesidad de una instalación independiente, los proyectos están diseñados para funcionar online en un navegador siempre que sea posible. La colección combina apps prácticas como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter y Crossword con juegos como Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man y Modern Snake.",
        card: ["Crea tus propios crucigramas o resuelve 500 crucigramas preparados en cinco idiomas y diez categorías, y después imprímelos o compártelos online.", ["Crucigrama", "Puzzle", "Creador"]]
    }
};

supportedLanguages.forEach(language => {
    const crosswordText = crosswordPortalI18n[language];
    if (!crosswordText) return;

    if (translations[language]) {
        Object.assign(translations[language], {
            pageDescription: crosswordText.pageDescription,
            appsText: crosswordText.appsText,
            aboutText2: crosswordText.aboutText2
        });
    }

    if (!Array.isArray(cardTranslations[language])) cardTranslations[language] = [];
    cardTranslations[language][10] = crosswordText.card;
});

const memoryGamePortalI18n = {
    en: {
        pageDescription: "Discover free online apps and browser games including Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake and Memory Game.",
        gamesText: "Choose from puzzle and arcade-style games and start playing directly in your browser. The current collection includes Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake and Memory Game.",
        aboutText2: "Instead of requiring a separate installation, the projects are designed to run online in a web browser whenever possible. The collection combines practical apps such as Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter and Crossword with browser games such as Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake and Memory Game.",
        card: ["Train your memory with themed matching pairs across Brain, Daily, Kids, Animals, Food and Travel, with four difficulty levels and saved progress.", ["Memory", "Puzzle", "Brain"]]
    },
    hr: {
        pageDescription: "Otkrijte besplatne online aplikacije i igre za preglednik, uključujući Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake i Memory Game.",
        gamesText: "Odaberite slagalice ili arkadne igre i odmah ih pokrenite u pregledniku. Trenutačna kolekcija uključuje Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake i Memory Game.",
        aboutText2: "Umjesto zasebne instalacije, projekti su napravljeni tako da se, kad god je moguće, pokreću online u web-pregledniku. Kolekcija spaja praktične aplikacije kao što su Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter i Crossword s igrama Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake i Memory Game.",
        card: ["Vježbajte pamćenje spajanjem tematskih parova u sekcijama Mozak, Svakodnevno, Djeca, Životinje, Hrana i Putovanja, uz četiri razine težine i spremanje napretka.", ["Memorija", "Slagalica", "Mozak"]]
    },
    de: {
        pageDescription: "Entdecke kostenlose Online-Apps und Browserspiele wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake und Memory Game.",
        gamesText: "Wähle Puzzle- oder Arcade-Spiele und spiele direkt im Browser. Die aktuelle Sammlung umfasst Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake und Memory Game.",
        aboutText2: "Statt einer separaten Installation laufen die Projekte nach Möglichkeit online im Webbrowser. Die Sammlung verbindet praktische Apps wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter und Crossword mit Spielen wie Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake und Memory Game.",
        card: ["Trainiere dein Gedächtnis mit thematischen Kartenpaaren aus Gehirn, Alltag, Kinder, Tiere, Essen und Reisen, vier Schwierigkeitsstufen und gespeichertem Fortschritt.", ["Gedächtnis", "Puzzle", "Gehirn"]]
    },
    it: {
        pageDescription: "Scopri applicazioni online e giochi per browser gratuiti come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake e Memory Game.",
        gamesText: "Scegli tra rompicapi e giochi arcade e gioca direttamente nel browser. La raccolta attuale include Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake e Memory Game.",
        aboutText2: "Senza richiedere un'installazione separata, i progetti sono pensati per funzionare online in un browser quando possibile. La raccolta unisce app pratiche come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter e Crossword a giochi come Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake e Memory Game.",
        card: ["Allena la memoria abbinando coppie a tema nelle sezioni Cervello, Quotidiano, Bambini, Animali, Cibo e Viaggi, con quattro livelli di difficoltà e salvataggio dei progressi.", ["Memoria", "Puzzle", "Cervello"]]
    },
    es: {
        pageDescription: "Descubre aplicaciones online y juegos de navegador gratuitos como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake y Memory Game.",
        gamesText: "Elige entre puzles y juegos arcade y empieza a jugar directamente en el navegador. La colección actual incluye Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake y Memory Game.",
        aboutText2: "Sin necesidad de una instalación independiente, los proyectos están diseñados para funcionar online en un navegador siempre que sea posible. La colección combina apps prácticas como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter y Crossword con juegos como Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake y Memory Game.",
        card: ["Entrena la memoria emparejando cartas temáticas de Cerebro, Diario, Niños, Animales, Comida y Viajes, con cuatro niveles de dificultad y progreso guardado.", ["Memoria", "Puzle", "Cerebro"]]
    }
};

supportedLanguages.forEach(language => {
    const memoryText = memoryGamePortalI18n[language];
    if (!memoryText) return;

    if (translations[language]) {
        Object.assign(translations[language], {
            pageDescription: memoryText.pageDescription,
            gamesText: memoryText.gamesText,
            aboutText2: memoryText.aboutText2
        });
    }

    if (!Array.isArray(cardTranslations[language])) cardTranslations[language] = [];
    cardTranslations[language][9] = memoryText.card;
});

const habitTrackerPortalI18n = {
    en: {
        pageDescription: "Discover free online apps and browser games including Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Habit Tracker / Daily Planner, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake and Memory Game.",
        appsText: "Open practical browser apps for everyday use. Current projects include Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword and Habit Tracker / Daily Planner, with more apps planned as the collection grows.",
        aboutText2: "Instead of requiring a separate installation, the projects are designed to run online in a web browser whenever possible. The collection combines practical apps such as Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword and Habit Tracker / Daily Planner with browser games such as Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake and Memory Game.",
        card: ["Build recurring habits, plan daily tasks, track streaks and seven-day progress, and keep your data locally in the browser.", ["Habits", "Planner", "Productivity"]]
    },
    hr: {
        pageDescription: "Otkrijte besplatne online aplikacije i igre za preglednik, uključujući Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Habit Tracker / Daily Planner, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake i Memory Game.",
        appsText: "Otvorite praktične aplikacije za svakodnevnu upotrebu. Trenutačna kolekcija uključuje Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword i Habit Tracker / Daily Planner, a nove aplikacije dodavat ćemo i dalje.",
        aboutText2: "Umjesto zasebne instalacije, projekti su napravljeni tako da se, kad god je moguće, pokreću online u web-pregledniku. Kolekcija spaja praktične aplikacije kao što su Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword i Habit Tracker / Daily Planner s igrama Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake i Memory Game.",
        card: ["Gradite ponavljajuće navike, planirajte dnevne zadatke, pratite nizove i napredak zadnjih sedam dana te podatke čuvajte lokalno u pregledniku.", ["Navike", "Planer", "Produktivnost"]]
    },
    de: {
        pageDescription: "Entdecke kostenlose Online-Apps und Browserspiele wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Habit Tracker / Daily Planner, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake und Memory Game.",
        appsText: "Öffne praktische Browser-Apps für den Alltag. Zur aktuellen Sammlung gehören Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword und Habit Tracker / Daily Planner; weitere Apps sind geplant.",
        aboutText2: "Statt einer separaten Installation laufen die Projekte nach Möglichkeit online im Webbrowser. Die Sammlung verbindet praktische Apps wie Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword und Habit Tracker / Daily Planner mit Spielen wie Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake und Memory Game.",
        card: ["Baue wiederkehrende Gewohnheiten auf, plane tägliche Aufgaben, verfolge Serien und den Sieben-Tage-Fortschritt und speichere Daten lokal im Browser.", ["Gewohnheiten", "Planer", "Produktivität"]]
    },
    it: {
        pageDescription: "Scopri applicazioni online e giochi per browser gratuiti come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Habit Tracker / Daily Planner, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake e Memory Game.",
        appsText: "Apri app pratiche direttamente nel browser. La raccolta attuale include Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword e Habit Tracker / Daily Planner, con altre app in arrivo.",
        aboutText2: "Senza richiedere un'installazione separata, i progetti sono pensati per funzionare online in un browser quando possibile. La raccolta unisce app pratiche come Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword e Habit Tracker / Daily Planner a giochi come Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake e Memory Game.",
        card: ["Crea abitudini ricorrenti, pianifica attività quotidiane, segui serie e progressi di sette giorni e conserva i dati localmente nel browser.", ["Abitudini", "Planner", "Produttività"]]
    },
    es: {
        pageDescription: "Descubre aplicaciones online y juegos de navegador gratuitos como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword, Habit Tracker / Daily Planner, Tetris, UFO Invaders, Phoenix Arcade, Neon Pac-Man, Modern Snake y Memory Game.",
        appsText: "Abre aplicaciones prácticas directamente en el navegador. La colección actual incluye Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword y Habit Tracker / Daily Planner, y seguirá creciendo.",
        aboutText2: "Sin necesidad de una instalación independiente, los proyectos están diseñados para funcionar online en un navegador siempre que sea posible. La colección combina apps prácticas como Digital Clock, Date Lotto Generator, Emoji Copy & Paste, Unit Converter, Crossword y Habit Tracker / Daily Planner con juegos como Tetris, UFO Invaders: Neon Defense, Phoenix Arcade, Neon Pac-Man, Modern Snake y Memory Game.",
        card: ["Crea hábitos recurrentes, planifica tareas diarias, sigue rachas y progreso de siete días y conserva los datos localmente en el navegador.", ["Hábitos", "Planificador", "Productividad"]]
    }
};

supportedLanguages.forEach(language => {
    const habitText = habitTrackerPortalI18n[language];
    if (!habitText) return;

    if (translations[language]) {
        Object.assign(translations[language], {
            pageDescription: habitText.pageDescription,
            appsText: habitText.appsText,
            aboutText2: habitText.aboutText2
        });
    }

    if (!Array.isArray(cardTranslations[language])) cardTranslations[language] = [];
    cardTranslations[language][11] = habitText.card;
});

function t(key) {
    return translations[currentLanguage]?.[key] ?? translations.en?.[key] ?? key;
}

function applyLanguage(language, shouldTrack = false) {
    currentLanguage = supportedLanguages.includes(language) ? language : "en";
    document.documentElement.lang = currentLanguage;

    if (languageSelect) languageSelect.value = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        if (translations[currentLanguage]?.[key]) {
            element.textContent = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
        element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
    });

    document.title = t("pageTitle");
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.setAttribute("content", t("pageDescription"));

    localStorage.setItem("appsGamesLanguage", currentLanguage);
    renderApps();

    if (shouldTrack) trackEvent("language_change", { language: currentLanguage });
}

if (languageSelect) {
    languageSelect.addEventListener("change", event => {
        applyLanguage(event.target.value, true);
    });
}

const apps = [
    {
        category: "utility",
        badge: "APP",
        name: "Digital Clock",
        description: "A multifunctional online digital clock with a large display, clean design and useful everyday functionality.",
        image: "assets/images/digital-clock.png",
        button: "OPEN APP →",
        url: "https://digitalclock.appsandgames.org/",
        detailsUrl: "digital-clock",
        tags: ["Clock", "App", "Online"],
        status: "LIVE",
        analyticsEvent: "open_app"
    },
    {
        category: "utility",
        badge: "APP",
        name: "Date Lotto Generator",
        description: "Generate repeatable lotto number combinations from any selected date with customizable lotto formats and number ranges.",
        image: "assets/images/lotto-date-generator.png",
        button: "OPEN APP →",
        url: "https://lotto.appsandgames.org/",
        detailsUrl: "date-lotto-generator",
        tags: ["Lotto", "Numbers", "Generator"],
        status: "LIVE",
        analyticsEvent: "open_app"
    },
    {
        category: "utility",
        badge: "APP",
        name: "Emoji Copy & Paste",
        description: "Find emoji meanings by category, copy emojis instantly and paste country flags into Word as real images.",
        image: "assets/images/emoji-copy-paste.svg",
        button: "OPEN APP →",
        url: "https://emoji.appsandgames.org/",
        detailsUrl: "emoji-copy-paste",
        tags: ["Emoji", "Copy & Paste", "Symbols"],
        status: "LIVE",
        analyticsEvent: "open_app"
    },
    {
        category: "utility",
        badge: "APP",
        name: "Unit Converter",
        description: "Convert everyday, technical and digital measurement units quickly across 17 categories and 115 units.",
        image: "assets/images/unit-converter.svg",
        button: "OPEN APP →",
        url: "https://unitconverter.appsandgames.org/",
        detailsUrl: "unit-converter",
        tags: ["Converter", "Measurements", "Tools"],
        status: "LIVE",
        analyticsEvent: "open_app"
    },
    {
        category: "game",
        badge: "GAME",
        name: "Tetris",
        description: "Modern Tetris browser game with a stylish neon interface, smooth gameplay and instant play in your browser.",
        image: "assets/images/tetris.png",
        button: "PLAY GAME →",
        url: "https://tetris.appsandgames.org/",
        detailsUrl: "tetris",
        tags: ["Arcade", "Puzzle", "Browser"],
        status: "LIVE",
        analyticsEvent: "play_game"
    },
    {
        category: "game",
        badge: "GAME",
        name: "UFO Invaders: Neon Defense",
        description: "Defend Earth in a modern neon arcade battle with challenging waves, power-ups, bunkers and instant browser gameplay.",
        image: "assets/images/ufo-invaders.png",
        button: "PLAY GAME →",
        url: "https://ufo-invaders.appsandgames.org/",
        detailsUrl: "ufo-invaders",
        tags: ["Arcade", "Shooter", "Browser"],
        status: "LIVE",
        analyticsEvent: "play_game"
    },
    {
        category: "game",
        badge: "GAME",
        name: "Phoenix Arcade",
        description: "Defend the last star gate in a modern neon arcade shooter with diving Phoenix enemies, collectible power-ups and instant browser play.",
        image: "assets/images/phoenix-arcade-cover.png",
        button: "PLAY GAME →",
        url: "https://phoenix-arcade.appsandgames.org/",
        detailsUrl: "phoenix-arcade",
        tags: ["Arcade", "Shooter", "Power-ups"],
        status: "LIVE",
        analyticsEvent: "play_game"
    },
    {
        category: "game",
        badge: "GAME",
        name: "Neon Pac-Man",
        description: "Guide Neon Pac-Man through a glowing maze, collect every dot, use power pellets and chase a place on the local leaderboard.",
        image: "assets/images/neon-pacman-cover.svg",
        button: "PLAY GAME →",
        url: "https://neonpacman.appsandgames.org/",
        detailsUrl: "neon-pacman",
        tags: ["Arcade", "Maze", "Retro"],
        status: "LIVE",
        analyticsEvent: "play_game"
    },
    {
        category: "game",
        badge: "GAME",
        name: "Modern Snake",
        description: "Play a modern Snake game with three lives, timed bonus food, keyboard and mouse controls, saved progress and a local leaderboard.",
        image: "assets/images/modern-snake-cover.svg",
        button: "PLAY GAME →",
        url: "https://snake.appsandgames.org/",
        detailsUrl: "modern-snake",
        tags: ["Arcade", "Snake", "Bonuses"],
        status: "LIVE",
        analyticsEvent: "play_game"
    },
    {
        category: "game",
        badge: "GAME",
        name: "Memory Game",
        description: "Train your memory with themed matching pairs, four difficulty levels, saved progress and a multilingual interface.",
        image: "assets/images/memory-game-cover.svg",
        button: "PLAY GAME →",
        url: "https://memory.appsandgames.org/",
        detailsUrl: "memory-game",
        tags: ["Memory", "Puzzle", "Brain"],
        status: "LIVE",
        analyticsEvent: "play_game"
    },
    {
        category: "utility",
        badge: "APP",
        name: "Crossword",
        description: "Create, solve, print and share custom crosswords, or play from a multilingual library of 500 ready-made puzzles.",
        image: "assets/images/crossword-cover.svg",
        button: "OPEN APP →",
        url: "https://crossword.appsandgames.org/",
        detailsUrl: "crossword",
        tags: ["Crossword", "Puzzle", "Creator"],
        status: "LIVE",
        analyticsEvent: "open_app"
    },
    {
        category: "utility",
        badge: "APP",
        name: "Habit Tracker / Daily Planner",
        description: "Build recurring habits, plan daily tasks, track streaks and seven-day progress, and keep your data locally in the browser.",
        image: "https://habit-tracker.appsandgames.org/icons/icon-512.png",
        button: "OPEN APP →",
        url: "https://habit-tracker.appsandgames.org/",
        detailsUrl: "habit-tracker",
        tags: ["Habits", "Planner", "Productivity"],
        status: "LIVE",
        analyticsEvent: "open_app"
    }
];

function patchModernSnakeSeo() {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && !keywordsMeta.content.toLowerCase().includes("modern snake")) {
        keywordsMeta.content += ", Modern Snake, snake game";
    }

    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) return;

    try {
        const data = JSON.parse(structuredData.textContent);
        const graph = Array.isArray(data?.["@graph"]) ? data["@graph"] : [];
        const itemList = graph.find(item => item?.["@type"] === "ItemList");
        if (!itemList || !Array.isArray(itemList.itemListElement)) return;

        const neonPacManEntry = itemList.itemListElement.find(entry => entry?.item?.name === "Neon Pac-Man");
        if (neonPacManEntry?.item) {
            neonPacManEntry.item.url = "https://neonpacman.appsandgames.org/";
        }

        const hasSnake = itemList.itemListElement.some(entry => entry?.item?.name === "Modern Snake");
        if (!hasSnake) {
            itemList.itemListElement.push({
                "@type": "ListItem",
                position: itemList.itemListElement.length + 1,
                item: {
                    "@type": "VideoGame",
                    name: "Modern Snake",
                    url: "https://snake.appsandgames.org/",
                    image: "https://appsandgames.org/assets/images/modern-snake-cover.svg",
                    description: "A modern Snake browser game with three lives, timed bonus food, keyboard and mouse controls, saved progress and a local leaderboard.",
                    gamePlatform: "Web browser",
                    isAccessibleForFree: true
                }
            });
        }

        itemList.numberOfItems = itemList.itemListElement.length;
        structuredData.textContent = JSON.stringify(data);
    } catch {
        // Leave existing structured data unchanged if it cannot be parsed.
    }
}

patchModernSnakeSeo();

function patchCrosswordSeo() {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && !keywordsMeta.content.toLowerCase().includes("crossword")) {
        keywordsMeta.content += ", Crossword, crossword maker, crossword generator, križaljke";
    }

    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) return;

    try {
        const data = JSON.parse(structuredData.textContent);
        const graph = Array.isArray(data?.["@graph"]) ? data["@graph"] : [];
        const itemList = graph.find(item => item?.["@type"] === "ItemList");
        if (!itemList || !Array.isArray(itemList.itemListElement)) return;

        const hasCrossword = itemList.itemListElement.some(entry => entry?.item?.name === "Crossword");
        if (!hasCrossword) {
            itemList.itemListElement.push({
                "@type": "ListItem",
                position: itemList.itemListElement.length + 1,
                item: {
                    "@type": "SoftwareApplication",
                    name: "Crossword",
                    url: "https://crossword.appsandgames.org/",
                    image: "https://appsandgames.org/assets/images/crossword-cover.svg",
                    description: "Create, solve, print and share custom crosswords, with 500 ready-made puzzles in five languages and ten categories.",
                    applicationCategory: "EducationalApplication",
                    operatingSystem: "Any",
                    isAccessibleForFree: true,
                    inLanguage: ["en", "hr", "de", "it", "es"]
                }
            });
        }

        itemList.numberOfItems = itemList.itemListElement.length;
        structuredData.textContent = JSON.stringify(data);
    } catch {
        // Leave existing structured data unchanged if it cannot be parsed.
    }
}

patchCrosswordSeo();

function patchMemoryGameSeo() {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && !keywordsMeta.content.toLowerCase().includes("memory game")) {
        keywordsMeta.content += ", Memory Game, matching pairs, memory puzzle, brain game";
    }

    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) return;

    try {
        const data = JSON.parse(structuredData.textContent);
        const graph = Array.isArray(data?.["@graph"]) ? data["@graph"] : [];
        const itemList = graph.find(item => item?.["@type"] === "ItemList");
        if (!itemList || !Array.isArray(itemList.itemListElement)) return;

        const hasMemoryGame = itemList.itemListElement.some(entry => entry?.item?.name === "Memory Game");
        if (!hasMemoryGame) {
            itemList.itemListElement.push({
                "@type": "ListItem",
                position: itemList.itemListElement.length + 1,
                item: {
                    "@type": "VideoGame",
                    name: "Memory Game",
                    url: "https://memory.appsandgames.org/",
                    image: "https://appsandgames.org/assets/images/memory-game-cover.svg",
                    description: "A free multilingual browser memory game with themed matching pairs, four difficulty levels and saved progress.",
                    gamePlatform: "Web browser",
                    isAccessibleForFree: true,
                    inLanguage: ["en", "hr", "de", "it", "es"]
                }
            });
        }

        itemList.numberOfItems = itemList.itemListElement.length;
        structuredData.textContent = JSON.stringify(data);
    } catch {
        // Leave existing structured data unchanged if it cannot be parsed.
    }
}

patchMemoryGameSeo();

function patchHabitTrackerSeo() {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && !keywordsMeta.content.toLowerCase().includes("habit tracker")) {
        keywordsMeta.content += ", Habit Tracker, Daily Planner, habit planner, task planner, productivity app";
    }

    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) return;

    try {
        const data = JSON.parse(structuredData.textContent);
        const graph = Array.isArray(data?.["@graph"]) ? data["@graph"] : [];
        const itemList = graph.find(item => item?.["@type"] === "ItemList");
        if (!itemList || !Array.isArray(itemList.itemListElement)) return;

        const hasHabitTracker = itemList.itemListElement.some(entry => entry?.item?.name === "Habit Tracker / Daily Planner");
        if (!hasHabitTracker) {
            itemList.itemListElement.push({
                "@type": "ListItem",
                position: itemList.itemListElement.length + 1,
                item: {
                    "@type": "WebApplication",
                    name: "Habit Tracker / Daily Planner",
                    url: "https://habit-tracker.appsandgames.org/",
                    image: "https://habit-tracker.appsandgames.org/icons/icon-512.png",
                    description: "A free multilingual habit tracker and daily planner with recurring habits, dated tasks, streaks, seven-day progress and local browser storage.",
                    applicationCategory: "ProductivityApplication",
                    operatingSystem: "Any",
                    isAccessibleForFree: true,
                    inLanguage: ["en", "hr", "de", "it", "es"]
                }
            });
        }

        itemList.numberOfItems = itemList.itemListElement.length;
        structuredData.textContent = JSON.stringify(data);
    } catch {
        // Leave existing structured data unchanged if it cannot be parsed.
    }
}

patchHabitTrackerSeo();

/* =====================================================
   GOOGLE ANALYTICS EVENT HELPER
===================================================== */

function trackEvent(eventName, parameters = {}) {
    if (typeof window.gtag === "function") {
        window.gtag("event", eventName, parameters);
    }
}

/* =====================================================
   RENDER APPS & GAMES
===================================================== */

function renderApps() {
    const appsGrid = document.getElementById("utilitiesGrid");
    const gamesGrid = document.getElementById("gamesGrid");

    if (!appsGrid || !gamesGrid) return;

    appsGrid.innerHTML = "";
    gamesGrid.innerHTML = "";

    apps.forEach((app, index) => {
        const localizedCard = cardTranslations[currentLanguage]?.[index]
            || cardTranslations.en?.[index]
            || [app.description, app.tags];
        const localizedDescription = localizedCard[0];
        const localizedTags = localizedCard[1];
        const isGame = app.category === "game";

        const card = document.createElement("article");
        card.className = "app-card";

        const tagsHTML = localizedTags
            .map(tag => `<span class="meta-pill">${tag}</span>`)
            .join("");

        card.innerHTML = `
            <div class="app-image-wrap">
                <img src="${app.image}" alt="${app.name}" class="app-image" loading="lazy">
                <span class="app-badge ${app.category}">${t(isGame ? "gameBadge" : "appBadge")}</span>
            </div>
            <div class="app-content">
                <div class="app-title-row">
                    <h3>${app.name}</h3>
                    <span class="app-status">${t("live")}</span>
                </div>
                <p class="app-description">${localizedDescription}</p>
                <div class="app-meta">${tagsHTML}</div>
                <a
                    class="secondary-button"
                    style="width:100%; margin-bottom:10px;"
                    href="${app.detailsUrl}"
                    aria-label="${t("learnMore")} ${app.name}"
                >${t("learnMore")}</a>
                <a
                    class="app-button"
                    href="${app.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-app-name="${app.name}"
                    data-ga-event="${app.analyticsEvent}"
                >${t(isGame ? "playGame" : "openApp")}</a>
            </div>
        `;

        if (app.category === "utility") {
            appsGrid.appendChild(card);
        } else if (app.category === "game") {
            gamesGrid.appendChild(card);
        }
    });

    setupAppTracking();
}

/* =====================================================
   APP / GAME ANALYTICS
===================================================== */

function setupAppTracking() {
    document.querySelectorAll(".app-button[data-ga-event]").forEach(button => {
        button.addEventListener("click", () => {
            const eventName = button.dataset.gaEvent;
            const appName = button.dataset.appName;

            if (eventName === "play_game") {
                trackEvent("play_game", { game_name: appName });
            } else {
                trackEvent("open_app", { app_name: appName });
            }
        });
    });
}

/* =====================================================
   DONATION ANALYTICS
===================================================== */

document
    .querySelectorAll("[data-ga-event='donation_paypal'], [data-ga-event='donation_stripe']")
    .forEach(link => {
        link.addEventListener("click", () => {
            trackEvent(link.dataset.gaEvent, {
                support_method: link.dataset.gaEvent === "donation_paypal" ? "PayPal" : "Stripe"
            });
        });
    });

/* =====================================================
   THEME
===================================================== */

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

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        trackEvent("theme_change", { theme: newTheme });
    });
}

/* =====================================================
   COPY CRYPTO
===================================================== */

document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", async () => {
        const value = button.dataset.copy;
        const currency = button.dataset.currency || "unknown";

        try {
            await navigator.clipboard.writeText(value);
            showCopied(button);
            trackEvent("crypto_copy", { crypto_currency: currency });
        } catch {
            fallbackCopy(value, button, currency);
        }
    });
});

function showCopied(button) {
    button.textContent = t("copied");
    button.classList.add("copied");

    setTimeout(() => {
        button.textContent = t("copy");
        button.classList.remove("copied");
    }, 1600);
}

function fallbackCopy(text, button, currency) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        document.execCommand("copy");
        showCopied(button);
        trackEvent("crypto_copy", { crypto_currency: currency });
    } catch {
        button.textContent = t("copyFailed");
    }

    document.body.removeChild(textarea);
}

/* =====================================================
   FOOTER YEAR + INITIALIZE
===================================================== */

const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

applyLanguage(currentLanguage);
