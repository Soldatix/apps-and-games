/* =====================================================
   APPS & GAMES
===================================================== */

const apps = [

    {
        category: "utility",
        badge: "UTILITY",

        name: "Digital Clock",

        description:
            "A multifunctional online digital clock with large display, clean design and useful everyday functionality.",

        image:
            "assets/images/digital-clock.png",

        button:
            "OPEN APP →",

        url:
            "https://soldatix.github.io/Digital-Clock/",

        tags:
            ["Clock", "Utility", "Online"],

        status:
            "LIVE",

        analyticsEvent:
            "open_app"
    },

{
    category: "utility",
    badge: "UTILITY",

    name: "Date Lotto Generator",

    description:
        "Generate repeatable lotto number combinations from any selected date with customizable lotto formats and number ranges.",

    image:
        "assets/images/lotto-date-generator.png",

    button:
        "OPEN APP →",

    url:
        "https://lotto.appsandgames.org/",

    tags:
        ["Lotto", "Numbers", "Generator"],

    status:
        "LIVE",

    analyticsEvent:
        "open_app"
},
    {
        category: "game",
        badge: "GAME",

        name: "Tetris",

        description:
            "Modern Tetris browser game with stylish neon interface, smooth gameplay and instant play in your browser.",

        image:
            "assets/images/tetris.png",

        button:
            "PLAY GAME →",

        url:
            "https://tetris.soldatix.workers.dev/",

        tags:
            ["Arcade", "Puzzle", "Browser"],

        status:
            "LIVE",

        analyticsEvent:
            "play_game"
    },


    {
        category: "game",
        badge: "GAME",

        name: "UFO Invaders: Neon Defense",

        description:
            "Defend Earth in a modern neon arcade battle with challenging waves, power-ups, bunkers and instant browser gameplay.",

        image:
            "assets/images/ufo-invaders.png",

        button:
            "PLAY GAME →",

        url:
            "https://ufo-invaders.appsandgames.org/",

        tags:
            ["Arcade", "Shooter", "Browser"],

        status:
            "LIVE",

        analyticsEvent:
            "play_game"
    },

    {
        category: "game",
        badge: "GAME",

        name: "Phoenix Arcade",

        description:
            "Defend the last star gate in a modern neon arcade shooter with diving Phoenix enemies, collectible power-ups and instant browser play.",

        image:
            "assets/images/phoenix-arcade-cover.png",

        button:
            "PLAY GAME →",

        url:
            "https://phoenix-arcade.appsandgames.org/",

        tags:
            ["Arcade", "Shooter", "Power-ups"],

        status:
            "LIVE",

        analyticsEvent:
            "play_game"
    }

];


/* =====================================================
   GOOGLE ANALYTICS EVENT HELPER
===================================================== */

function trackEvent(
    eventName,
    parameters = {}
) {

    if (
        typeof window.gtag ===
        "function"
    ) {

        window.gtag(
            "event",
            eventName,
            parameters
        );

    }

}


/* =====================================================
   RENDER APPS
===================================================== */

function renderApps() {

    const utilitiesGrid =
        document.getElementById(
            "utilitiesGrid"
        );

    const gamesGrid =
        document.getElementById(
            "gamesGrid"
        );


    if (
        !utilitiesGrid ||
        !gamesGrid
    ) {
        return;
    }


    utilitiesGrid.innerHTML =
        "";

    gamesGrid.innerHTML =
        "";


    apps.forEach(app => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "app-card";


        const tagsHTML =
            app.tags
                .map(
                    tag =>
                        `<span class="meta-pill">${tag}</span>`
                )
                .join("");


        card.innerHTML = `

            <div class="app-image-wrap">

                <img
                    src="${app.image}"
                    alt="${app.name}"
                    class="app-image"
                    loading="lazy"
                >

                <span class="app-badge ${app.category}">
                    ${app.badge}
                </span>

            </div>


            <div class="app-content">

                <div class="app-title-row">

                    <h3>
                        ${app.name}
                    </h3>

                    <span class="app-status">
                        ${app.status}
                    </span>

                </div>


                <p class="app-description">
                    ${app.description}
                </p>


                <div class="app-meta">
                    ${tagsHTML}
                </div>


                <a
                    class="app-button"
                    href="${app.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-app-name="${app.name}"
                    data-ga-event="${app.analyticsEvent}"
                >
                    ${app.button}
                </a>

            </div>

        `;


        if (
            app.category ===
            "utility"
        ) {

            utilitiesGrid.appendChild(
                card
            );

        }


        if (
            app.category ===
            "game"
        ) {

            gamesGrid.appendChild(
                card
            );

        }

    });


    setupAppTracking();

}


/* =====================================================
   APP / GAME ANALYTICS
===================================================== */

function setupAppTracking() {

    document
        .querySelectorAll(
            ".app-button[data-ga-event]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const eventName =
                        button.dataset.gaEvent;

                    const appName =
                        button.dataset.appName;


                    if (
                        eventName ===
                        "play_game"
                    ) {

                        trackEvent(
                            "play_game",
                            {
                                game_name:
                                    appName
                            }
                        );

                    } else {

                        trackEvent(
                            "open_app",
                            {
                                app_name:
                                    appName
                            }
                        );

                    }

                }
            );

        });

}


/* =====================================================
   DONATION ANALYTICS
===================================================== */

document
    .querySelectorAll(
        "[data-ga-event='donation_paypal'], [data-ga-event='donation_stripe']"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                trackEvent(
                    link.dataset.gaEvent,
                    {
                        support_method:
                            link.dataset.gaEvent ===
                            "donation_paypal"
                                ? "PayPal"
                                : "Stripe"
                    }
                );

            }
        );

    });


/* =====================================================
   THEME
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


function applyTheme(theme) {

    if (
        theme ===
        "light"
    ) {

        document.documentElement
            .setAttribute(
                "data-theme",
                "light"
            );

        if (themeToggle) {

            themeToggle.textContent =
                "🌙";

        }

    } else {

        document.documentElement
            .removeAttribute(
                "data-theme"
            );

        if (themeToggle) {

            themeToggle.textContent =
                "☀️";

        }

    }

}


const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme ===
    "light"
) {

    applyTheme(
        "light"
    );

} else {

    applyTheme(
        "dark"
    );

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.documentElement
                    .getAttribute(
                        "data-theme"
                    );


            let newTheme;


            if (
                currentTheme ===
                "light"
            ) {

                newTheme =
                    "dark";

            } else {

                newTheme =
                    "light";

            }


            applyTheme(
                newTheme
            );


            localStorage.setItem(
                "theme",
                newTheme
            );


            trackEvent(
                "theme_change",
                {
                    theme:
                        newTheme
                }
            );

        }
    );

}


/* =====================================================
   COPY CRYPTO
===================================================== */

document
    .querySelectorAll(
        ".copy-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const value =
                    button.dataset.copy;

                const currency =
                    button.dataset.currency ||
                    "unknown";


                try {

                    await navigator
                        .clipboard
                        .writeText(
                            value
                        );


                    showCopied(
                        button
                    );


                    trackEvent(
                        "crypto_copy",
                        {
                            crypto_currency:
                                currency
                        }
                    );

                } catch {

                    fallbackCopy(
                        value,
                        button,
                        currency
                    );

                }

            }
        );

    });


function showCopied(button) {

    button.textContent =
        "Copied!";

    button.classList.add(
        "copied"
    );


    setTimeout(
        () => {

            button.textContent =
                "Copy";

            button.classList.remove(
                "copied"
            );

        },
        1600
    );

}


/* =====================================================
   FALLBACK COPY
===================================================== */

function fallbackCopy(
    text,
    button,
    currency
) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;

    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";


    document.body.appendChild(
        textarea
    );


    textarea.focus();

    textarea.select();


    try {

        document.execCommand(
            "copy"
        );


        showCopied(
            button
        );


        trackEvent(
            "crypto_copy",
            {
                crypto_currency:
                    currency
            }
        );

    } catch {

        button.textContent =
            "Failed";

    }


    document.body.removeChild(
        textarea
    );

}


/* =====================================================
   FOOTER YEAR
===================================================== */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date()
            .getFullYear();

}


/* =====================================================
   INITIALIZE
===================================================== */

renderApps();
