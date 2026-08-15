const apps = [
    {
        category: "utility",
        badge: "UTILITY",
        name: "Digital Clock",
        description:
            "A multifunctional online digital clock with large display, clean design and useful everyday functionality.",
        image: "assets/images/digital-clock.png",
        button: "OPEN APP →",
        url: "https://soldatix.github.io/Digital-Clock/",
        tags: ["Clock", "Utility", "Online"],
        status: "LIVE"
    },

    {
        category: "game",
        badge: "GAME",
        name: "Tetris",
        description:
            "Modern Tetris browser game with stylish neon interface, smooth gameplay and instant play in your browser.",
        image: "assets/images/tetris.png",
        button: "PLAY GAME →",
        url: "https://tetris.elvis-soldatic.workers.dev/",
        tags: ["Arcade", "Puzzle", "Browser"],
        status: "LIVE"
    }
];


/* =====================================================
   RENDER APPS
===================================================== */

function renderApps() {

    const utilitiesGrid =
        document.getElementById("utilitiesGrid");

    const gamesGrid =
        document.getElementById("gamesGrid");

    utilitiesGrid.innerHTML = "";
    gamesGrid.innerHTML = "";

    apps.forEach(app => {

        const card =
            document.createElement("article");

        card.className = "app-card";

        const tagsHTML =
            app.tags
                .map(tag =>
                    `<span class="meta-pill">${tag}</span>`
                )
                .join("");

        card.innerHTML = `
            <div class="app-image-wrap">

                <img
                    src="${app.image}"
                    alt="${app.name}"
                    class="app-image"
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
                >
                    ${app.button}
                </a>

            </div>
        `;

        if (app.category === "utility") {
            utilitiesGrid.appendChild(card);
        }

        if (app.category === "game") {
            gamesGrid.appendChild(card);
        }

    });

}


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme");


function setTheme(theme) {

    if (theme === "light") {

        document.documentElement
            .setAttribute(
                "data-theme",
                "light"
            );

        themeToggle.textContent = "🌙";

    } else {

        document.documentElement
            .removeAttribute(
                "data-theme"
            );

        themeToggle.textContent = "☀️";

    }

}


if (savedTheme === "light") {

    setTheme("light");

} else {

    setTheme("dark");

}


themeToggle.addEventListener(
    "click",
    () => {

        const isLight =
            document.documentElement
                .getAttribute("data-theme")
            === "light";

        if (isLight) {

            setTheme("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            setTheme("light");

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


/* =====================================================
   COPY CRYPTO ADDRESSES
===================================================== */

document
    .querySelectorAll(".copy-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const address =
                    button.dataset.copy;

                try {

                    await navigator
                        .clipboard
                        .writeText(address);

                    showCopied(button);

                } catch (error) {

                    fallbackCopy(
                        address,
                        button
                    );

                }

            }
        );

    });


function showCopied(button) {

    const oldText =
        button.textContent;

    button.textContent =
        "Copied!";

    button.classList.add(
        "copied"
    );

    setTimeout(
        () => {

            button.textContent =
                oldText;

            button.classList.remove(
                "copied"
            );

        },
        1700
    );

}


function fallbackCopy(
    text,
    button
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

        showCopied(button);

    } catch (error) {

        button.textContent =
            "Copy failed";

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
        new Date().getFullYear();

}


/* =====================================================
   INITIALIZE
===================================================== */

renderApps();
