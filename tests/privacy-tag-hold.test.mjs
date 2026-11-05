/* Privacy audit for the Adsterra DRAFT pilot ONLY.
 * The published main branch is NOT altered by these tests or edits.
 * A later approved consent solution must restore analytics where appropriate.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pages = [
  "crossword.html", "date-lotto-generator.html", "digital-clock.html",
  "emoji-copy-paste.html", "habit-tracker.html", "index.html",
  "memory-game.html", "modern-snake.html", "neon-pacman.html",
  "phoenix-arcade.html", "privacy-policy.html", "tetris.html",
  "ufo-invaders.html", "unit-converter.html", "wizard-chess-3d.html"
];
test("all 15 portal pages with Google tags are held until consent is audited", () => {
  assert.equal(pages.length, 15);
  for (const path of pages) {
    const html = readFileSync(new URL("../" + path, import.meta.url), "utf8");
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/(?:www\.googletagmanager\.com\/gtag\/js|pagead2\.googlesyndication\.com\/pagead\/js)/,
      "Unexpected Google external tag in " + path);
    assert.doesNotMatch(html, /gtag\(["']config["'],\s*["']G-8QJLPBJPJ8/,
      "Unexpected GA4 config in " + path);
    assert.match(html, /PR #36 PRIVACY HOLD/,
      "Missing review warning in " + path);
  }
});
test("the optional Adsterra live candidate remains fail-closed", () => {
  const js = readFileSync(new URL("../adsterra-consent-candidate.js", import.meta.url), "utf8");
  assert.match(js, /const APPROVED_FOR_LIVE_ADS = false/);
  assert.match(js, /if \(!APPROVED_FOR_LIVE_ADS\) return/);
});
test("no publisher-made ad iframe or vendor tag in HTML", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /<script[^>]+src="https:\/\/bauval\.org/);
  assert.doesNotMatch(html, /<iframe[^>]+bauval/i);
});
