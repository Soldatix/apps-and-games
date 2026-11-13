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

test("existing JavaScript language enhancement stays intact while analytics requires opt-in", () => {
    assert.match(html, /<script src="script\.js"><\/script>/);
    assert.match(script, /function renderApps\(\)/);
    assert.match(script, /cardTranslations\[currentLanguage\]/);
    assert.match(script, /setupAppTracking\(\)/);
    assert.match(html, /src="privacy-choice\.js"/);
    assert.match(html, /href="privacy-choice\.css"/);
    assert.doesNotMatch(html, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
    assert.match(html, /href="privacy-policy\.html"/);
});

test("detail routes are listed in the sitemap and crawling is allowed", () => {
    for (const app of apps) {
        const externalHost = /^https:\/\//.test(app.detailsUrl);
        const location = "<loc>" + (externalHost ? escapeHtml(app.detailsUrl) : "https://appsandgames.org/" + escapeHtml(app.detailsUrl)) + "</loc>";
        if (externalHost) {
            assert.equal(app.name, "Mobile Network Coverage");
            const dedicated = readFileSync(join(root, "mobile-coverage", "sitemap.xml"), "utf8");
            assert.ok(dedicated.includes(location), app.name + " URL absent from dedicated-domain sitemap");
            assert.ok(!sitemap.includes(location), "root-domain sitemap must not contain URLs for another hostname");
        } else {
            assert.ok(sitemap.includes(location), app.name + " detail URL absent from sitemap");
        }
    }
    assert.match(robots, /User-agent: \*/);
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap: https:\/\/appsandgames\.org\/sitemap\.xml/);
});


test("official Mobile Coverage catalog launch is SEO ready and has no Adsterra requests", () => {
    assert.match(html, /<h3>Mobile Network Coverage<\/h3>[\s\S]*?<span class="app-status">LIVE<\/span>/);
    assert.match(html, /src="assets\/images\/mobile-coverage-neon\.webp"/);
    assert.match(html, /href="https:\/\/mobile-coverage\.appsandgames\.org\/"/);
    const neonImage=readFileSync(join(root,"assets","images","mobile-coverage-neon.webp"));
    assert.equal(neonImage.subarray(0,4).toString("ascii"),"RIFF","cover WebP RIFF header");
    assert.equal(neonImage.subarray(8,12).toString("ascii"),"WEBP","cover valid WebP signature");

    const metadata = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(metadata);
    const schema = JSON.parse(metadata[1]);
    const itemList = schema["@graph"].find(item => item["@type"] === "ItemList");
    assert.equal(itemList.numberOfItems, itemList.itemListElement.length);
    assert.ok(itemList.itemListElement.some(entry => entry.item.name === "Mobile Network Coverage"));
    assert.ok(itemList.itemListElement.some(entry => entry.item.name === "Internet Speed Test"));
    const site = readFileSync(join(root, "mobile-coverage", "index.html"), "utf8");
    assert.match(site, /<meta name="robots" content="index,follow">/);
    assert.match(site, /https:\/\/ws\.nperf\.com\/partner\/js-map\?l=026f70f3-da84-43d1-bb18-716133fa9c88&locale=en/);
    assert.match(site, /id="ad-area"[^>]*hidden/);
    assert.doesNotMatch(site,/bauval\.org|adsterra-banner-loader/);
    const subSitemap=readFileSync(join(root, "mobile-coverage", "sitemap.xml"),"utf8");
    assert.ok(subSitemap.includes("<loc>https://mobile-coverage.appsandgames.org/</loc>"));
});


test("Habit Tracker cover is locally hosted, optimized and consistent across cards and SEO", () => {
    const cover = readFileSync(join(root, "assets", "images", "habit-tracker-cover.webp"));
    assert.equal(cover.subarray(0,4).toString("ascii"), "RIFF");
    assert.equal(cover.subarray(8,12).toString("ascii"), "WEBP");
    assert.ok(cover.byteLength < 100_000, "Habit cover should be optimized below 100 KB");
    const expected="assets/images/habit-tracker-cover.webp";
    assert.ok(html.includes('src="' + expected + '"'));
    assert.ok(script.includes('image: "' + expected + '"'));
    const detail=readFileSync(join(root, "habit-tracker.html"), "utf8");
    assert.ok(detail.includes('https://appsandgames.org/' + expected));
    assert.ok(!html.includes("habit-tracker.appsandgames.org/habit-tracker-cover.png"));
    assert.ok(!script.includes("habit-tracker.appsandgames.org/habit-tracker-cover.png"));
    assert.ok(!detail.includes("habit-tracker.appsandgames.org/habit-tracker-cover.png"));
});
