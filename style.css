:root {
    --bg: #050c1f;
    --bg-secondary: #091634;
    --surface: #0b1730;
    --surface-2: #112045;
    --surface-3: #152856;

    --text: #f4f7ff;
    --text-secondary: #9fb2d9;

    --border: rgba(103, 143, 255, 0.18);

    --primary: #22c7ff;
    --primary-2: #5b5dff;
    --accent: #ffcf33;
    --pink: #ff5bd1;
    --green: #34f5c5;

    --shadow: 0 10px 35px rgba(0, 0, 0, 0.35);
    --radius: 22px;
    --max-width: 1200px;
    --header-bg: rgba(4, 10, 24, 0.82);
}

[data-theme="light"] {
    --bg: #eff5ff;
    --bg-secondary: #dce8ff;
    --surface: #ffffff;
    --surface-2: #eef4ff;
    --surface-3: #e6efff;

    --text: #09162c;
    --text-secondary: #516684;

    --border: rgba(17, 62, 151, 0.12);

    --primary: #0ba8ff;
    --primary-2: #4d57ff;
    --accent: #f0b400;
    --pink: #db43b4;
    --green: #0fcf98;

    --shadow: 0 10px 30px rgba(50, 87, 160, 0.12);
    --header-bg: rgba(255, 255, 255, 0.88);
}

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;

    font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    background:
        radial-gradient(
            circle at top,
            rgba(34, 199, 255, 0.12),
            transparent 30%
        ),
        linear-gradient(
            180deg,
            var(--bg) 0%,
            var(--bg-secondary) 100%
        );

    color: var(--text);
    line-height: 1.6;

    transition:
        background 0.25s ease,
        color 0.25s ease;
}

a {
    color: inherit;
    text-decoration: none;
}


/* =====================================================
   HEADER
===================================================== */

.site-header {
    position: sticky;
    top: 0;
    z-index: 1000;

    background: var(--header-bg);
    backdrop-filter: blur(14px);

    border-bottom: 1px solid var(--border);
}

.header-content {
    max-width: var(--max-width);
    margin: auto;

    padding: 14px 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 18px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;

    font-weight: 800;
    white-space: nowrap;
}

.logo-icon {
    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    background:
        linear-gradient(
            135deg,
            var(--primary),
            var(--primary-2)
        );

    color: white;

    box-shadow:
        0 0 18px rgba(34, 199, 255, 0.35);
}

.logo-text {
    font-size: 1.15rem;
}

.main-nav {
    display: flex;
    align-items: center;
    gap: 6px;
}

.main-nav a {
    padding: 8px 12px;

    border-radius: 12px;

    color: var(--text-secondary);

    font-weight: 600;

    transition: 0.2s ease;
}

.main-nav a:hover {
    color: var(--text);
    background: var(--surface-2);
}

.theme-toggle {
    width: 42px;
    height: 42px;

    border: 1px solid var(--border);
    border-radius: 12px;

    background: var(--surface);
    color: var(--text);

    cursor: pointer;

    font-size: 1.1rem;

    transition: 0.2s ease;
}

.theme-toggle:hover {
    transform: translateY(-1px);

    background: var(--surface-2);
}


/* =====================================================
   HERO
===================================================== */

.hero {
    padding: 90px 24px 75px;
}

.hero-content {
    max-width: 900px;

    margin: auto;

    text-align: center;
}

.hero-badge {
    display: inline-block;

    padding: 8px 14px;

    border:
        1px solid rgba(34, 199, 255, 0.22);

    border-radius: 999px;

    background:
        rgba(34, 199, 255, 0.08);

    color: var(--primary);

    font-size: 0.82rem;

    font-weight: 800;

    letter-spacing: 0.08em;

    margin-bottom: 20px;
}

.hero h1 {
    margin: 0;

    font-size:
        clamp(2.8rem, 7vw, 5.2rem);

    line-height: 1.05;

    letter-spacing: -0.04em;
}

.hero-subtitle {
    margin: 18px 0 10px;

    font-size:
        clamp(1.15rem, 2vw, 1.45rem);

    color: var(--accent);

    font-weight: 700;
}

.hero-text {
    margin: 0 auto 32px;

    max-width: 700px;

    color: var(--text-secondary);

    font-size: 1.05rem;
}

.hero-buttons {
    display: flex;

    justify-content: center;

    gap: 14px;

    flex-wrap: wrap;
}

.primary-button,
.secondary-button {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-width: 170px;

    padding: 13px 22px;

    border-radius: 14px;

    font-weight: 800;

    transition: 0.2s ease;
}

.primary-button {
    background:
        linear-gradient(
            90deg,
            var(--primary),
            var(--primary-2)
        );

    color: #051120;

    box-shadow:
        0 0 24px rgba(34, 199, 255, 0.22);
}

.primary-button:hover {
    transform: translateY(-2px);
}

.secondary-button {
    background: var(--surface);

    border:
        1px solid var(--border);
}

.secondary-button:hover {
    background: var(--surface-2);

    transform: translateY(-2px);
}


/* =====================================================
   SECTIONS
===================================================== */

.app-section,
.info-section {
    max-width: var(--max-width);

    margin: auto;

    padding:
        50px 24px 70px;
}

.section-heading {
    margin-bottom: 30px;
}

.section-label {
    font-size: 0.8rem;

    letter-spacing: 0.12em;

    font-weight: 800;

    color: var(--primary);
}

.section-heading h2 {
    margin: 10px 0 6px;

    font-size:
        clamp(1.9rem, 4vw, 2.6rem);

    letter-spacing: -0.03em;
}

.section-heading p {
    margin: 0;

    color: var(--text-secondary);
}


/* =====================================================
   APP GRID
===================================================== */

.apps-grid {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(320px, 420px)
        );

    gap: 24px;

    justify-content: center;
}


/* =====================================================
   APP CARD
===================================================== */

.app-card {
    width: 100%;
    max-width: 420px;

    overflow: hidden;

    background:
        linear-gradient(
            180deg,
            rgba(15, 29, 62, 0.92),
            rgba(8, 18, 42, 0.98)
        );

    border:
        1px solid var(--border);

    border-radius: 24px;

    box-shadow: var(--shadow);

    transition:
        transform 0.24s ease,
        box-shadow 0.24s ease,
        border-color 0.24s ease;
}

[data-theme="light"] .app-card {
    background:
        linear-gradient(
            180deg,
            #ffffff,
            #f1f6ff
        );
}

.app-card:hover {
    transform: translateY(-6px);

    border-color:
        rgba(34, 199, 255, 0.45);

    box-shadow:
        0 20px 45px rgba(0, 0, 0, 0.28);
}


/* =====================================================
   APP IMAGE
===================================================== */

.app-image-wrap {
    position: relative;

    width: 100%;

    aspect-ratio: 16 / 9;

    overflow: hidden;

    background: #081228;
}

.app-image {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    object-position: center;

    transition:
        transform 0.35s ease;
}

.app-card:hover .app-image {
    transform: scale(1.03);
}

.app-badge {
    position: absolute;

    top: 14px;
    left: 14px;

    padding: 7px 11px;

    border-radius: 999px;

    font-size: 0.72rem;

    font-weight: 800;

    letter-spacing: 0.08em;

    backdrop-filter: blur(10px);

    color: white;

    background:
        rgba(0, 0, 0, 0.35);

    border:
        1px solid rgba(255, 255, 255, 0.18);
}

.app-badge.utility {
    color: #041224;

    background:
        rgba(255, 207, 51, 0.92);
}

.app-badge.game {
    color: white;

    background:
        linear-gradient(
            90deg,
            rgba(34, 199, 255, 0.92),
            rgba(91, 93, 255, 0.92)
        );
}


/* =====================================================
   APP CONTENT
===================================================== */

.app-content {
    padding: 22px;
}

.app-title-row {
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 10px;

    margin-bottom: 8px;
}

.app-title-row h3 {
    margin: 0;

    font-size: 1.35rem;

    letter-spacing: -0.02em;
}

.app-status {
    font-size: 0.74rem;

    font-weight: 800;

    color: var(--green);

    letter-spacing: 0.08em;
}

.app-description {
    margin: 0 0 18px;

    color: var(--text-secondary);

    min-height: 56px;
}

.app-meta {
    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-bottom: 18px;
}

.meta-pill {
    padding: 6px 10px;

    border-radius: 999px;

    background: var(--surface-2);

    color: var(--text-secondary);

    font-size: 0.78rem;

    font-weight: 700;

    border:
        1px solid var(--border);
}

.app-button {
    display: inline-flex;

    width: 100%;

    align-items: center;
    justify-content: center;

    padding: 12px 16px;

    border-radius: 14px;

    background:
        linear-gradient(
            90deg,
            var(--primary),
            var(--primary-2)
        );

    color: #051120;

    font-weight: 800;

    transition: 0.2s ease;
}

.app-button:hover {
    transform: translateY(-1px);
}


/* =====================================================
   INFO
===================================================== */

.info-card {
    padding: 36px;

    border:
        1px solid var(--border);

    border-radius: 24px;

    background:
        linear-gradient(
            180deg,
            rgba(14, 28, 60, 0.96),
            rgba(8, 18, 42, 0.98)
        );

    box-shadow: var(--shadow);
}

[data-theme="light"] .info-card {
    background:
        linear-gradient(
            180deg,
            #ffffff,
            #f4f8ff
        );
}

.info-card h2 {
    margin: 10px 0 15px;
}

.info-card h3 {
    margin-top: 34px;
    margin-bottom: 14px;

    font-size: 1.15rem;
}

.info-card p {
    color: var(--text-secondary);

    max-width: 900px;
}


/* =====================================================
   DONATIONS
===================================================== */

.donation-options {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 20px;

    margin-top: 22px;
}

.donation-card {
    display: flex;

    align-items: center;

    gap: 18px;

    padding: 22px;

    background: var(--surface-2);

    border:
        1px solid var(--border);

    border-radius: 18px;
}

.donation-icon {
    width: 58px;
    height: 58px;

    min-width: 58px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 16px;

    font-size: 1.5rem;

    font-weight: 800;

    color: white;
}

.paypal-icon {
    background:
        linear-gradient(
            135deg,
            #003087,
            #009cde
        );
}

.stripe-icon {
    background:
        linear-gradient(
            135deg,
            #635bff,
            #8f88ff
        );
}

.donation-content {
    flex: 1;
}

.donation-content h4 {
    margin: 0 0 5px;
}

.donation-content p {
    margin: 0 0 14px;

    font-size: 0.94rem;
}

.donation-button {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    padding: 10px 15px;

    border-radius: 12px;

    background:
        linear-gradient(
            90deg,
            var(--primary),
            var(--primary-2)
        );

    color: #051120;

    font-weight: 800;

    transition: 0.2s ease;
}

.donation-button:hover {
    transform: translateY(-1px);
}


/* =====================================================
   CRYPTO
===================================================== */

.crypto-section {
    margin-top: 44px;
}

.crypto-list {
    display: flex;

    flex-direction: column;

    gap: 12px;

    margin-top: 18px;
}

.crypto-row {
    display: grid;

    grid-template-columns:
        70px
        minmax(0, 1fr)
        auto;

    gap: 12px;

    align-items: center;

    padding: 13px 15px;

    background: var(--surface-2);

    border:
        1px solid var(--border);

    border-radius: 14px;
}

.crypto-name {
    font-size: 0.92rem;
}

.crypto-row code {
    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

    min-width: 0;

    color: var(--text-secondary);

    font-family:
        "SFMono-Regular",
        Consolas,
        "Liberation Mono",
        monospace;

    font-size: 0.8rem;
}

.copy-button {
    padding: 8px 13px;

    border-radius: 10px;

    border:
        1px solid var(--border);

    background: var(--surface-3);

    color: var(--text);

    font-weight: 800;

    cursor: pointer;

    transition: 0.2s ease;
}

.copy-button:hover {
    background:
        linear-gradient(
            90deg,
            var(--primary),
            var(--primary-2)
        );

    color: #041224;
}

.copy-button.copied {
    background:
        linear-gradient(
            90deg,
            var(--primary),
            var(--primary-2)
        );

    color: #041224;
}


/* =====================================================
   FOOTER
===================================================== */

.site-footer {
    border-top:
        1px solid var(--border);

    background:
        rgba(4, 10, 24, 0.38);
}

.footer-content {
    max-width: var(--max-width);

    margin: auto;

    padding: 24px;

    display: flex;

    justify-content: space-between;

    gap: 18px;

    align-items: center;

    color: var(--text-secondary);

    font-size: 0.94rem;
}

.footer-links {
    display: flex;

    gap: 18px;
}

.footer-links a:hover {
    color: var(--text);
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 860px) {

    .donation-options {
        grid-template-columns: 1fr;
    }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 760px) {

    .header-content {
        padding: 12px 16px;
    }

    .main-nav span {
        display: none;
    }

    .main-nav a {
        padding: 8px;

        font-size: 1.15rem;
    }

    .hero {
        padding:
            70px 18px 50px;
    }

    .app-section,
    .info-section {
        padding:
            40px 18px 55px;
    }

    .apps-grid {
        grid-template-columns:
            minmax(0, 420px);

        justify-content: center;
    }

    .app-card {
        max-width: 420px;
    }

    .info-card {
        padding: 26px 20px;
    }

    .footer-content {
        flex-direction: column;

        text-align: center;
    }

}


/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 560px) {

    .apps-grid {
        grid-template-columns: 1fr;
    }

    .app-card {
        max-width: 100%;
    }

    .crypto-row {
        grid-template-columns:
            1fr auto;

        gap: 8px;
    }

    .crypto-name {
        grid-column:
            1 / -1;
    }

    .crypto-row code {
        font-size: 0.68rem;
    }

    .copy-button {
        padding:
            8px 10px;

        font-size: 0.8rem;
    }

    .app-description {
        min-height: auto;
    }

}
