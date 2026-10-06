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
const portable = "https://github.com/Soldatix/lotto-date-generator/releases/download/v1.0.2-portable/Date-Lotto-Generator-Windows-Portable-1.0.2-x64.zip";
const portableSha256 = portable + ".sha256";
const androidRepo = "https://github.com/Soldatix/lotto-date-generator-android";
const android = "https://github.com/Soldatix/lotto-date-generator-android/releases/download/v1.0.1/Date-Lotto-Generator-Android-v1.0.1.apk";
const androidSha256 = "https://github.com/Soldatix/lotto-date-generator-android/releases/download/v1.0.1/SHA256SUMS.txt";
const idCount = id => (detail.match(new RegExp('id="' + id + '"', "g")) || []).length;

test("Date Lotto static and dynamic catalog advertise Web/PWA, Windows and Android", () => {
  const staticCard = index.split("<h3>Date Lotto Generator</h3>")[1].split("</article>")[0];
  const dynamicCard = catalog.split('name: "Date Lotto Generator",')[1].split("\n    },")[0];
  assert.ok(staticCard.includes("<strong>Web / PWA · Windows · Android</strong>"));
  assert.ok(staticCard.includes('href="date-lotto-generator"'));
  assert.ok(dynamicCard.includes('platforms: ["Web / PWA", "Windows", "Android"]'));
  assert.ok(dynamicCard.includes('detailsUrl: "date-lotto-generator"'));
  assert.ok(dynamicCard.includes('url: "https://lotto.appsandgames.org/"'));
});

test("Web/PWA, Android and Windows cards exist exactly once with correct links", () => {
  for (const id of ["web-platform-title", "web-app-open", "web-app-description",
    "android-platform-title", "android-download", "android-description", "android-checksum",
    "windows-platform-title", "windows-store-download", "windows-store-description",
    "windows-portable-title", "windows-portable-download", "windows-portable-description",
    "windows-portable-checksum"]) {
    assert.equal(idCount(id), 1, id);
  }
  assert.ok(detail.includes('href="' + web + '"'));
  const androidButton = detail.match(/<a id="android-download"[^>]*>/)?.[0] || "";
  assert.ok(androidButton.includes('href="' + android + '"'));
  assert.ok(androidButton.includes('target="_blank"'));
  assert.ok(androidButton.includes('rel="noopener noreferrer"'));
  assert.ok(detail.includes('href="' + androidSha256 + '"'));
  assert.ok(detail.includes("Version 1.0.1 · APK"));
  assert.ok(detail.includes("Android 7.0+"));
  const anchor = detail.match(/<a id="windows-store-download"[^>]*>/)?.[0] || "";
  assert.ok(anchor.includes('href="' + store + '"'));
  assert.ok(anchor.includes('target="_blank"'));
  assert.ok(anchor.includes('rel="noopener noreferrer"'));
  assert.ok(detail.includes("Version 1.0.2.0 · x64"));
  assert.ok(detail.includes("Windows 10/11 (x64)"));
  const portableButton = detail.match(/<a id="windows-portable-download"[^>]*>/)?.[0] || "";
  assert.ok(portableButton.includes('href="' + portable + '"'));
  assert.ok(portableButton.includes('target="_blank"'));
  assert.ok(portableButton.includes('rel="noopener noreferrer"'));
  assert.ok(detail.includes('href="' + portableSha256 + '"'));
  assert.ok(detail.includes("Version 1.0.2 · x64 · ZIP"));
  assert.ok(detail.includes('<div class="platform-download-grid">'));
  assert.ok(css.includes(".platform-download-grid"));
});

test("structured data retains Web/PWA and advertises Windows and Android identities", () => {
  const block = detail.match(/<script type="application\/ld\+json">\s*([\s\S]*?)<\/script>/)?.[1];
  assert.ok(block, "Missing detail JSON-LD");
  const json = JSON.parse(block);
  assert.ok(json.sameAs.includes(store));
  assert.ok(json.sameAs.includes("https://lotto.appsandgames.org/"));
  assert.ok(json.sameAs.includes(androidRepo));
  assert.equal(json.downloadUrl, android);
  assert.equal(json.installUrl, "https://lotto.appsandgames.org/");
  assert.ok(json.operatingSystem.includes("Windows 11"));
  assert.ok(json.operatingSystem.includes("Android 7.0+"));
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
  for (const text of ["Download for Android", "Preuzmi za Android",
    "Für Android herunterladen", "Scarica per Android",
    "Descargar para Android"]) assert.ok(section.includes(text), text);
  for (const text of ["Download Portable ZIP", "Preuzmi Portable ZIP", "Portable-ZIP herunterladen",
    "Scarica ZIP portatile", "Descargar ZIP portátil"]) assert.ok(section.includes(text), text);
  for (const key of ["androidTitle", "androidDownload", "androidDescription", "androidChecksum",
    "windowsStoreTitle", "windowsStoreDownload", "windowsStoreDescription",
    "windowsPortableTitle", "windowsPortableDownload", "windowsPortableDescription",
    "windowsPortableChecksum"]) {
    assert.equal(section.split(key + ":").length - 1, 5, key);
  }
  for (const [key, id] of [["androidTitle", "android-platform-title"],
    ["androidDownload", "android-download"],
    ["androidDescription", "android-description"],
    ["androidChecksum", "android-checksum"],
    ["windowsStoreTitle", "windows-platform-title"],
    ["windowsStoreDownload", "windows-store-download"],
    ["windowsStoreDescription", "windows-store-description"],
    ["windowsPortableTitle", "windows-portable-title"],
    ["windowsPortableDownload", "windows-portable-download"],
    ["windowsPortableDescription", "windows-portable-description"],
    ["windowsPortableChecksum", "windows-portable-checksum"]]) {
    assert.ok(i18n.includes('document.getElementById("' + id + '").textContent = d.' + key));
  }
});
