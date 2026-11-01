import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../adsterra-pilot.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../adsterra-pilot.css", import.meta.url), "utf8");

test("pilot is OFF by default and preview is non-networked", () => {
  assert.match(js, /adsEnabled:\s*false/);
  assert.match(js, /previewOnly = !config\.adsEnabled/);
  assert.match(js, /if \(!previewOnly && !config\.adsEnabled\) return;/);
  assert.match(js, /if \(previewOnly\) \{/);
});
test("all ad units and dimensions match publisher dashboard", () => {
  for (const [key, width, height] of [
    ["3e88187807f72645af6b39e90957f6a8", 728, 90],
    ["fc02ce1675aa14021ad3dee29c123264", 320, 50],
    ["0f5386e1fbab687b18a7f7686197bec7", 300, 250],
  ]) {
    assert.match(js, new RegExp(key));
    assert.match(js, new RegExp('key: "' + key + '", width: ' + width + ', height: ' + height));
  }
});
test("one responsive primary and one disabled secondary", () => {
  assert.match(js, /secondaryEnabled:\s*false/);
  assert.match(js, /min-width: 768px/);
  assert.equal((html.match(/id="adsterra-pilot-top"/g) || []).length, 1);
  assert.equal((html.match(/id="adsterra-pilot-secondary"/g) || []).length, 1);
  assert.match(css, /\[hidden\] \{ display: none !important/);
});
test("vendor runs only after opt-in and when online", () => {
  assert.match(js, /readConsent\(\) === "yes"/);
  assert.match(js, /if \(consented && navigator\.onLine\)/);
  assert.match(js, /frame\.setAttribute\("sandbox", "allow-scripts allow-popups"\)/);
  assert.match(js, /window\.localStorage\.setItem\(config\.consentKey, choice\)/);
  assert.match(js, /writeConsent\("no"\)/);
});
test("no ad vendor script in the main HTML", () => {
  assert.doesNotMatch(html, /bauval\.org/);
  assert.match(html, /src="adsterra-pilot\.js"/);
  assert.match(html, /href="adsterra-pilot\.css"/);
});