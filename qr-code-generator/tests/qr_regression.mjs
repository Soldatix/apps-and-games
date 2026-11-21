/** Targeted functional regression against the pinned original engine.
 * Run from the committed app path with Node 18+; no npm packages needed. */
import assert from 'node:assert/strict';
const base = '../assets/js/';
const payload = await import(base + 'payload.mjs');
const { createQR } = await import(base + 'vendor/qr-engine.mjs');
const { toSvg } = await import(base + 'renderer.mjs');
const samples = [
  ['Wi-Fi', payload.makeWifi({ssid:'Test;WiFi',password:'SecurePass123!',security:'wpa'}), 'WIFI:T:WPA;S:Test\\;WiFi;P:SecurePass123!;;'],
  ['URL', payload.makeUrl('https://example.com/a?b=1'), 'https://example.com/a?b=1'],
  ['Text', payload.makeText('Hrvatski ✓ 😀'), 'Hrvatski ✓ 😀'],
  ['Email', payload.makeEmail({email:'test@example.com',subject:'Pozdrav'}), 'mailto:test@example.com?subject=Pozdrav'],
  ['Phone', payload.makePhone('+41791234567'), 'tel:+41791234567'],
  ['SMS', payload.makeSms({phone:'+41791234567',body:'Pozdrav!'}), 'sms:+41791234567?body=Pozdrav%21'],
  ['vCard', payload.makeVcard({given:'Ana',family:'Horvat',email:'ana@example.com'}), 'BEGIN:VCARD'],
  ['Location', payload.makeLocation({latitude:'45.315',longitude:'13.558'}), 'geo:45.315,13.558'],
];
let count=0;
for (const [name, data, expected] of samples) {
  if (name==='vCard') assert.ok(data.startsWith(expected)); else assert.equal(data,expected,name);
  const qr=createQR(data,'M');
  assert.ok(qr.size>=21&&qr.size<=177,name);
  assert.match(toSvg(qr),/<svg[^>]+>/);
  count++;
  console.log('PASS',name);
}
assert.throws(()=>payload.makeWifi({ssid:'Test',password:'short',security:'wpa'}),e=>e.code==='errorWpaLength'); count++;
assert.throws(()=>payload.makeUrl('javascript:alert(1)'),e=>e.code==='errorUrlInvalid');count++;
assert.throws(()=>payload.makeLocation({latitude:'95',longitude:'2'}),e=>e.code==='errorCoordinatesInvalid');count++;
console.log(`REGRESSION=${count}/${count} PASS`);
