import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../adsterra-pilot.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../adsterra-pilot.css", import.meta.url), "utf8");

test("preview only; no DOM interaction without ?adPreview=1", () => {
  assert.match(js, /get\("adPreview"\) !== "1"\) return/);
  assert.match(css, /\.adsterra-pilot-region\[hidden\] \{ display: none !important/);
  assert.equal((html.match(/id="adsterra-pilot-top"/g) || []).length, 1);
  assert.equal((html.match(/id="adsterra-pilot-secondary"/g) || []).length, 1);
});

test("separate pilot-only choice storage; no automatic acceptance", () => {
  assert.match(js, /appsGamesAdsterraPilotChoiceV1/);
  assert.match(js, /window\.sessionStorage\.getItem\(KEY\)/);
  assert.match(js, /window\.sessionStorage\.setItem\(KEY, choice\)/);
  assert.doesNotMatch(js, /localStorage/);
  assert.match(js, /readChoice\(\)/);
  assert.match(js, /saveChoice\("allow"\)/);
  assert.match(js, /saveChoice\("reject"\)/);
  assert.match(js, /adsterra-withdraw/);
});

test("original three banner dimensions preserved but second slot disabled", () => {
  assert.match(js, /desktop: Object\.freeze\(\{ width: 728, height: 90 \}\)/);
  assert.match(js, /mobile: Object\.freeze\(\{ width: 320, height: 50 \}\)/);
  assert.match(js, /optional: Object\.freeze\(\{ width: 300, height: 250 \}\)/);
  assert.match(js, /secondary\.hidden = true/);
  assert.match(js, /min-width: 768px/);
});

test("strict absence of Adsterra execution or custom iframe", () => {
  const executable = js.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.doesNotMatch(executable, /iframe|srcdoc|bauval|atOptions|createElement\("script"\)|fetch\(/i);
  assert.doesNotMatch(html, /bauval\.org/);
  assert.match(html, /src="adsterra-pilot\.js"/);
  assert.match(html, /href="adsterra-pilot\.css"/);
});

test("five language consent choices; provider and site privacy links", () => {
  for (const lang of ["en", "hr", "de", "it", "es"]) {
    assert.match(js, new RegExp("\\b" + lang + ": \\{"));
  }
  assert.match(js, /privacy-policy\.html/);
  assert.match(js, /https:\/\/adsterra\.com\/privacy-policy-managed/);
  assert.match(js, /adsterra-consent-actions/);
  assert.match(css, /\.adsterra-action:focus-visible/);
});