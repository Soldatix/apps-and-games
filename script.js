/* =====================================================
   APPS & GAMES
   Application catalog and functions
===================================================== */


/* =====================================================
   APPLICATION CATALOG
===================================================== */

const apps = [

    {
        category: "utility",

        name: "Digital Clock",

        description:
            "A multifunctional online digital clock with alarms, stopwatch, timer and world clock.",

        icon: "🕐",

        button:
            "OPEN APP →",

        url:
            "https://soldatix.github.io/Digital-Clock/"
    },


    {
        category: "game",

        name: "Tetris",

        description:
            "Classic Tetris browser game. Play instantly without installing anything.",

        icon: "🧱",

        button:
            "PLAY GAME →",

        url:
            "https://tetris.elvis-soldatic.workers.dev/"
    }

];


/* =====================================================
   RENDER APPLICATIONS
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


    utilitiesGrid.innerHTML = "";

    gamesGrid.innerHTML = "";


    apps.forEach(app => {


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "app-card";


        card.innerHTML = `

            <div class="app-icon">
                ${app.icon}
            </div>

            <h3>
                ${app.name}
            </h3>

            <p>
                ${app.description}
            </p>

            <a
                class="app-button"
                href="${app.url}"
                target="_blank"
                rel="noopener noreferrer">

                ${app.button}

            </a>

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

}


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme ===
    "dark"
) {

    document.documentElement
        .setAttribute(
            "data-theme",
            "dark"
        );


    themeToggle.textContent =
        "☀️";

}


/* =====================================================
   THEME BUTTON
===================================================== */

themeToggle.addEventListener(
    "click",
    () => {


        const dark =
            document.documentElement
                .getAttribute(
                    "data-theme"
                ) ===
            "dark";


        if (dark) {


            document.documentElement
                .removeAttribute(
                    "data-theme"
                );


            localStorage.setItem(
                "theme",
                "light"
            );


            themeToggle.textContent =
                "🌙";


        } else {


            document.documentElement
                .setAttribute(
                    "data-theme",
                    "dark"
                );


            localStorage.setItem(
                "theme",
                "dark"
            );


            themeToggle.textContent =
                "☀️";

        }

    }
);


/* =====================================================
   COPY CRYPTO ADDRESSES
===================================================== */

document
    .querySelectorAll(
        ".copy-button"
    )
    .forEach(button => {


        button.addEventListener(
            "click",
            async () => {


                const address =
                    button.dataset.copy;


                try {


                    await navigator
                        .clipboard
                        .writeText(
                            address
                        );


                    showCopied(
                        button
                    );


                } catch (error) {


                    copyFallback(
                        address,
                        button
                    );

                }

            }
        );

    });


/* =====================================================
   SHOW COPIED
===================================================== */

function showCopied(button) {


    const originalText =
        button.textContent;


    button.textContent =
        "Copied!";


    button.classList.add(
        "copied"
    );


    setTimeout(
        () => {

            button.textContent =
                originalText;

            button.classList.remove(
                "copied"
            );

        },
        1800
    );

}


/* =====================================================
   CLIPBOARD FALLBACK
===================================================== */

function copyFallback(
    text,
    button
) {


    const textArea =
        document.createElement(
            "textarea"
        );


    textArea.value =
        text;


    textArea.style.position =
        "fixed";


    textArea.style.opacity =
        "0";


    document.body.appendChild(
        textArea
    );


    textArea.focus();

    textArea.select();


    try {

        document.execCommand(
            "copy"
        );

        showCopied(
            button
        );

    } catch (error) {

        button.textContent =
            "Copy failed";

    }


    document.body.removeChild(
        textArea
    );

}


/* =====================================================
   FOOTER YEAR
===================================================== */

document.getElementById(
    "currentYear"
).textContent =
    new Date().getFullYear();


/* =====================================================
   INITIALIZE
===================================================== */

renderApps();
