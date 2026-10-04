import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const index = read("index.html");
const catalog = read("script.js");
const detail = read("date-lotto-generator.html");
const i18n = read("detail-i18n.js");
const css = read("style.css");
const store = "https://apps.microsoft.com/detail/9p2k682g9ths";
const web = "https://lotto.appsandgames.org/?install=web";
const idCount = id => (detail.match(new RegExp('id="' + id + '"', "g")) || []).length;

test("Date Lotto static and dynamic catalog advertise Web/PWA and Windows", () => {
  const staticCard = index.split("<h3>Date Lotto Generator</h3>")[1].split("</article>")[0];
  const dynamicCard = catalog.split('name: "Date Lotto Generator",')[1].split("\n    },")[0];
  assert.ok(staticCard.includes("<strong>Web / PWA · Windows</strong>"));
  assert.ok(staticCard.includes('href="date-lotto-generator"'));
  assert.ok(dynamicCard.includes('platforms: ["Web / PWA", "Windows"]'));
  assert.ok(dynamicCard.includes('detailsUrl: "date-lotto-generator"'));
  assert.ok(dynamicCard.includes('url: "https://lotto.appsandgames.org/"'));
});

test("Web/PWA and Windows cards exist exactly once with correct links", () => {
  for (const id of ["web-platform-title", "web-app-open", "web-app-description",
    "windows-platform-title", "windows-store-download", "windows-store-description"]) {
    assert.equal(idCount(id), 1, id);
  }
  assert.ok(detail.includes('href="' + web + '"'));
  const anchor = detail.match(/<a id="windows-store-download"[^>]*>/)?.[0] || "";
  assert.ok(anchor.includes('href="' + store + '"'));
  assert.ok(anchor.includes('target="_blank"'));
  assert.ok(anchor.includes('rel="noopener noreferrer"'));
  assert.ok(detail.includes("Version 1.0.2.0 · x64"));
  assert.ok(detail.includes("Windows 10/11 (x64)"));
  assert.ok(detail.includes('<div class="platform-download-grid">'));
  assert.ok(css.includes(".platform-download-grid"));
});

test("structured data retains web app and adds Microsoft Store identity", () => {
  const block = detail.match(/<script type="application\/ld\+json">\s*([\s\S]*?)<\/script>/)?.[1];
  assert.ok(block, "Missing detail JSON-LD");
  const json = JSON.parse(block);
  assert.ok(json.sameAs.includes(store));
  assert.ok(json.sameAs.includes("https://lotto.appsandgames.org/"));
  assert.equal(json.installUrl, "https://lotto.appsandgames.org/");
  assert.ok(json.operatingSystem.includes("Windows 11"));
});

test("all five detail translations and runtime DOM bindings exist", () => {
  const start = i18n.indexOf('        "date-lotto-generator": {');
  const end = i18n.indexOf('        "emoji-copy-paste": {', start);
  assert.ok(start >= 0 && end > start, "Missing Date Lotto i18n section");
  const section = i18n.slice(start, end);
  const downloads = ["Download from Microsoft Store", "Preuzmi iz Microsoft Storea",
    "Im Microsoft Store herunterladen", "Scarica da Microsoft Store",
    "Descargar desde Microsoft Store"];
  for (const text of downloads) assert.ok(section.includes(text), text);
  for (const key of ["windowsStoreTitle", "windowsStoreDownload", "windowsStoreDescription"]) {
    assert.equal(section.split(key + ":").length - 1, 5, key);
  }
  for (const [key, id] of [["windowsStoreTitle", "windows-platform-title"],
    ["windowsStoreDownload", "windows-store-download"],
    ["windowsStoreDescription", "windows-store-description"]]) {
    assert.ok(i18n.includes('document.getElementById("' + id + '").textContent = d.' + key));
  }
});
