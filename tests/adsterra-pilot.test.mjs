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

test("native banner candidate is wired directly into body but hard-disabled", () => {
  const candidate = readFileSync(new URL("../adsterra-consent-candidate.js", import.meta.url), "utf8");
  assert.match(html, /<section id="adsterra-pilot-top"[\s\S]*?<script src="adsterra-consent-candidate\.js"><\/script>[\s\S]*?<\/section>/);
  assert.match(candidate, /const APPROVED_FOR_LIVE_ADS = false/);
  assert.match(candidate, /if \(!APPROVED_FOR_LIVE_ADS\) return/);
  assert.doesNotMatch(candidate, /\bsrcdoc\b|createElement\("iframe"\)/);
  assert.match(candidate, /document\.write\(unit\)/);
  assert.match(candidate, /document\.readyState === "loading"/);
  for (const adKey of ["3e88187807f72645af6b39e90957f6a8", "fc02ce1675aa14021ad3dee29c123264"]) {
    assert.match(candidate, new RegExp(adKey));
  }
});

test("native candidate versioned, reject-first, reversible, one ad per view", () => {
  const candidate = readFileSync(new URL("../adsterra-consent-candidate.js", import.meta.url), "utf8");
  assert.match(candidate, /appsGamesAdsterraExplicitConsentV1/);
  assert.match(candidate, /180 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(candidate, /window\.localStorage\.setItem\(STORE_KEY/);
  assert.match(candidate, /readChoice\(\) === choice/);
  assert.match(candidate, /button\(t.reject, \(\) => navigateAfterChoice\("reject"\)\)/);
  assert.match(candidate, /button\(t.accept, \(\) => navigateAfterChoice\("allow"\)\)/);
  assert.match(candidate, /button\(language\(\)\.withdraw, \(\) => navigateAfterChoice\("reject"\)\)/);
  assert.match(candidate, /window\.matchMedia\(DESKTOP\)\.matches \? desktopCode : mobileCode/);
});
