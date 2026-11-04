import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../adsterra-pilot.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../adsterra-pilot.css", import.meta.url), "utf8");

test("preview gated by adPreview=1, no ad display by default", () => {
  assert.match(js, /get\("adPreview"\) !== "1"\) return/);
  assert.match(css, /\[hidden\] \{ display: none !important/);
  assert.equal((html.match(/id="adsterra-pilot-top"/g) || []).length, 1);
  assert.equal((html.match(/id="adsterra-pilot-secondary"/g) || []).length, 1);
});
test("approved placement sizes: desktop, mobile, optional", () => {
  for (const [name, width, height] of [
    ["desktop", 728, 90], ["mobile", 320, 50], ["optional", 300, 250]
  ]) {
    assert.ok(js.includes(name + ": Object.freeze({width: " + width + ", height: " + height + "})"));
  }
  assert.match(js, /min-width: 768px/);
});
test("no vendor implementation or custom iframe after Adsterra ruling", () => {
  const executable = js.replace(/\/\*[\s\S]*?\*\//g, ""); // ignore safety-only comment text
  assert.doesNotMatch(executable, /iframe|srcdoc|bauval|atOptions|createElement\("script"\)|fetch\(/i);
  assert.doesNotMatch(html, /bauval\.org|adsterra-vendor-frame/);
  assert.match(html, /src="adsterra-pilot\.js"/);
  assert.match(html, /href="adsterra-pilot\.css"/);
});
test("preview retains all five portal languages", () => {
  for (const lang of ["en", "hr", "de", "it", "es"]) {
    assert.match(js, new RegExp("\\b" + lang + ": \\{ ad: "));
  }
});