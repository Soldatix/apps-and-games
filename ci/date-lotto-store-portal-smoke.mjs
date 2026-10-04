import assert from "node:assert/strict";
import { chromium } from "playwright";

const root = "http://127.0.0.1:4173/";
const store = "https://apps.microsoft.com/detail/9p2k682g9ths";
const portable = "https://github.com/Soldatix/lotto-date-generator/releases/download/v1.0.2-portable/Date-Lotto-Generator-Windows-Portable-1.0.2-x64.zip";
const checksum = portable + ".sha256";
const expected = {
  en: "Download from Microsoft Store",
  hr: "Preuzmi iz Microsoft Storea",
  de: "Im Microsoft Store herunterladen",
  it: "Scarica da Microsoft Store",
  es: "Descargar desde Microsoft Store"
};
const portableLabels = {
  en: "Download Portable ZIP", hr: "Preuzmi Portable ZIP",
  de: "Portable-ZIP herunterladen", it: "Scarica ZIP portatile",
  es: "Descargar ZIP portátil"
};

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext();
  await context.route(/googletagmanager\.com|googlesyndication\.com|google-analytics\.com/, route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", err => errors.push(err.message));

  await page.goto(root, { waitUntil: "domcontentloaded" });
  const card = page.locator(".app-card").filter({ has: page.locator("h3", { hasText: "Date Lotto Generator" }) });
  assert.equal(await card.count(), 1, "Date Lotto catalog card is missing or duplicated");
  assert.ok((await card.locator(".app-platforms strong").innerText()).includes("Windows"));
  assert.ok((await card.locator(".app-platforms strong").innerText()).includes("PWA"));
  assert.equal(await card.locator('a[href="date-lotto-generator"]').count(), 1);
  console.log("PASS: rendered homepage card includes Web/PWA and Windows");

  await page.goto(root + "date-lotto-generator.html?lang=en", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#languageSelect");
  assert.equal(await page.locator(".platform-download-card").count(), 3);
  assert.equal(await page.locator("#web-app-open").getAttribute("href"), "https://lotto.appsandgames.org/?install=web");
  assert.equal(await page.locator("#windows-store-download").getAttribute("href"), store);
  assert.equal(await page.locator("#windows-store-download").getAttribute("target"), "_blank");
  assert.equal(await page.locator("#windows-portable-download").getAttribute("href"), portable);
  assert.equal(await page.locator("#windows-portable-checksum").getAttribute("href"), checksum);

  for (const [lang, label] of Object.entries(expected)) {
    await page.locator("#languageSelect").evaluate((el, language) => {
      el.value = language;
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, lang);
    await page.waitForFunction(text => document.getElementById("windows-store-download").textContent === text, label);
    assert.equal(await page.locator("#windows-store-download").innerText(), label);
    assert.equal(await page.locator("#windows-portable-download").innerText(), portableLabels[lang]);
    assert.equal(await page.locator("#windows-store-download").getAttribute("href"), store);
    assert.equal(await page.locator("#windows-portable-download").getAttribute("href"), portable);
    assert.equal(await page.locator("#windows-portable-checksum").getAttribute("href"), checksum);
    assert.equal(await page.locator("#web-app-open").getAttribute("href"), "https://lotto.appsandgames.org/?install=web");
    assert.ok((await page.locator("#windows-store-description").innerText()).includes("1.0.2.0"));
  }
  console.log("PASS: Windows Store button and Web App URL in all 5 languages");

  await page.setViewportSize({ width: 375, height: 812 });
  const cards = await page.locator(".platform-download-card").evaluateAll(nodes =>
    nodes.map(el => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, width: r.width };
    })
  );
  assert.equal(cards.length, 3);
  for (const card of cards) {
    assert.ok(card.left >= -1 && card.right <= 376, "Download card overflows mobile viewport");
    assert.ok(card.width > 100, "Download card collapsed");
  }
  assert.deepEqual(errors, []);
  console.log("PASS: responsive mobile cards, no uncaught browser errors");
  await context.close();
} finally {
  await browser.close();
}
