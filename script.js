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
    }
];

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
