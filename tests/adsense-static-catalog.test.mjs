import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const script = readFileSync(join(root, "script.js"), "utf8");
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const robots = readFileSync(join(root, "robots.txt"), "utf8");

// The current apps registry uses JSON-compatible object literals.
// Fail loudly if it changes shape so static and localized catalogs never drift silently.
const arrayMatch = script.match(/const apps = \[([\s\S]*?)\n\];/);
assert.ok(arrayMatch, "Cannot find the app registry in script.js");
const apps = [...arrayMatch[1].matchAll(/\{([\s\S]*?)\n    \}/g)].map(match =>
    JSON.parse("{" + match[1].replace(/^\s*([A-Za-z]\w*):/gm, '"$1":') + "\n}")
);
const escapeHtml = value => String(value).replace(/&/g, "&amp;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function gridCards(gridId) {
    const open = '<div id="' + gridId + '" class="apps-grid">';
    assert.equal(html.split(open).length, 2, "Missing or duplicate " + gridId);
    const section = html.split(open)[1].split("\n        </div>")[0];
    return [...section.matchAll(/<article class="app-card" data-static-catalog>([\s\S]*?)<\/article>/g)]
        .map(match => match[1]);
}

test("all catalog entries are in the HTML response, without running JavaScript", () => {
    const utilities = gridCards("utilitiesGrid");
    const games = gridCards("gamesGrid");
    assert.equal(utilities.length, apps.filter(app => app.category === "utility").length);
    assert.equal(games.length, apps.filter(app => app.category === "game").length);
    assert.equal(utilities.length + games.length, apps.length);
    assert.equal((html.match(/data-static-catalog>/g) || []).length, apps.length);

    for (const app of apps) {
        const cards = app.category === "utility" ? utilities : games;
        const title = "<h3>" + escapeHtml(app.name) + "</h3>";
        const matching = cards.filter(card => card.includes(title));
        assert.equal(matching.length, 1, app.name + " must have exactly one pre-rendered card");
        const card = matching[0];
        assert.ok(card.includes(escapeHtml(app.description)), app.name + " description is missing");
        assert.ok(card.includes('src="' + escapeHtml(app.image) + '"'), app.name + " image is missing");
        assert.ok(card.includes('href="' + escapeHtml(app.detailsUrl) + '"'), app.name + " detail link is missing");
        assert.ok(card.includes('href="' + escapeHtml(app.url) + '"'), app.name + " app link is missing");
    }
});

test("existing JavaScript language enhancement, analytics and AdSense loading remain intact", () => {
    assert.match(html, /<script src="script\.js"><\/script>/);
    assert.match(script, /function renderApps\(\)/);
    assert.match(script, /cardTranslations\[currentLanguage\]/);
    assert.match(script, /setupAppTracking\(\)/);
    assert.match(html, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
    assert.match(html, /href="privacy-policy\.html"/);
});

test("detail routes are listed in the sitemap and crawling is allowed", () => {
    for (const app of apps) {
        const location = "<loc>https://appsandgames.org/" + escapeHtml(app.detailsUrl) + "</loc>";
        assert.ok(sitemap.includes(location), app.name + " detail URL absent from sitemap");
    }
    assert.match(robots, /User-agent: \*/);
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap: https:\/\/appsandgames\.org\/sitemap\.xml/);
});
