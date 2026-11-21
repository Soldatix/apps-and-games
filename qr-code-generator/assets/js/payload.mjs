/** Pure validation and Wi-Fi serialization. Never sends or persists payloads. */
export class InputError extends Error {
  constructor(code) { super(code); this.name = 'InputError'; this.code = code; }
}
const bytes = text => new TextEncoder().encode(text).length;
const codePoints = text => [...text].length;
const forbiddenControls = /[\u0000-\u001F\u007F]/u;

export function escapeWifi(text) {
  return text.replace(/[\\;,:\"]/g, '\\$&');
}

export function makeWifi({ ssid, password = '', security = 'wpa', hidden = false }) {
  if (typeof ssid !== 'string' || !ssid.length) throw new InputError('errorSSIDRequired');
  if (forbiddenControls.test(ssid)) throw new InputError('errorControlChars');
  if (bytes(ssid) > 32) throw new InputError('errorSSIDLength');
  const types = { wpa: 'WPA', wpa3: 'SAE', mixed: 'WPA', wep: 'WEP', open: 'nopass' };
  if (!Object.hasOwn(types, security)) throw new InputError('errorSecurity');
  if (typeof password !== 'string') throw new InputError('errorPasswordRequired');
  if (security !== 'open') {
    if (!password) throw new InputError('errorPasswordRequired');
    if (forbiddenControls.test(password)) throw new InputError('errorControlChars');
    if (security === 'wep') {
      const asciiLength = codePoints(password);
      const isHex = /^(?:[a-fA-F0-9]{10}|[a-fA-F0-9]{26})$/.test(password);
      if (!((asciiLength === 5 || asciiLength === 13) && [...password].every(c => c.charCodeAt(0) <= 127)) && !isHex) {
        throw new InputError('errorWepLength');
      }
    } else if (security === 'wpa3') {
      if (codePoints(password) < 1 || codePoints(password) > 63) throw new InputError('errorWpa3Length');
    } else {
      // WPA/WPA2 PSK passphrase: 8–63 UTF-8 bytes (not code points),
      // or an exact raw 64-digit hexadecimal PSK.
      const n = bytes(password);
      if (!(n >= 8 && n <= 63) && !/^[a-fA-F0-9]{64}$/.test(password)) {
        throw new InputError('errorWpaLength');
      }
    }
  }
  // Use one terminal semicolon for the last field and a second to close the record.
  const parts = [`WIFI:T:${types[security]}`, `S:${escapeWifi(ssid)}`];
  if (security !== 'open') parts.push(`P:${escapeWifi(password)}`);
  if (hidden) parts.push('H:true');
  return `${parts.join(';')};;`;
}

export function makeUrl(input) {
  if (typeof input !== 'string' || !input.trim()) throw new InputError('errorUrlRequired');
  const raw = input.trim();
  if (forbiddenControls.test(raw)) throw new InputError('errorControlChars');
  let target;
  try { target = new URL(raw); } catch { throw new InputError('errorUrlInvalid'); }
  if (!['http:', 'https:'].includes(target.protocol) || !target.hostname || target.username || target.password) {
    throw new InputError('errorUrlInvalid');
  }
  return target.href;
}

export function makeText(input) {
  if (typeof input !== 'string' || !input.trim()) throw new InputError('errorTextRequired');
  if (input.length > 12000) throw new InputError('errorTooLong');
  return input;
}

/** RFC 6068 mailto, RFC 3966 tel, vCard 3.0, RFC 5870 geo. */
const normalText = value => typeof value === 'string' ? value.trim() : '';
const fieldControls = /[\u0000-\u001F\u007F]/u;
const multiControls = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u;

export function checkEmail(value, mandatory = true) {
  const address = normalText(value);
  if (!address && !mandatory) return '';
  if (!address) throw new InputError('errorEmailRequired');
  // Support ordinary international business addresses without accepting URI delimiters as structure.
  const match = /^([A-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+)$/i.exec(address);
  if (!match || address.length > 254 || match[1].length > 64 || (match[1].includes('..') || match[1].startsWith('.') || match[1].endsWith('.'))) throw new InputError('errorEmailInvalid');
  return address;
}

export function makeEmail({ email, subject = '', body = '' }) {
  const address = checkEmail(email);
  if (typeof subject !== 'string' || typeof body !== 'string' || fieldControls.test(subject)) throw new InputError('errorControlChars');
  if (subject.length > 200 || body.length > 1800 || multiControls.test(body)) throw new InputError('errorTooLong');
  // Encoded local part prevents ?/# and other URI delimiter confusion.
  const [local,domain] = address.split('@');
  const fields = [];
  if (subject) fields.push(`subject=${encodeURIComponent(subject)}`);
  if (body) fields.push(`body=${encodeURIComponent(body.replace(/\r?\n/g,'\r\n'))}`);
  return `mailto:${encodeURIComponent(local)}@${domain}${fields.length ? '?' + fields.join('&') : ''}`;
}

// For standalone tel:/sms: URIs require an international +country code.
// vCard TEL is a TEXT value, so preserve its separate legacy local-number support.
function cleanPhone(value, requireGlobal = true) {
  if (typeof value !== 'string' || !value.trim()) throw new InputError('errorPhoneRequired');
  const raw = value.trim();
  if (!/^\+?[\d\s().-]+$/.test(raw)) throw new InputError('errorPhoneInvalid');
  const clean = raw.replace(/[\s().-]/g,'');
  const pattern = requireGlobal ? /^\+[1-9]\d{5,14}$/ : /^\+?\d{6,15}$/;
  if (!pattern.test(clean)) throw new InputError('errorPhoneInvalid');
  return clean;
}
export function makePhone(value) { return `tel:${cleanPhone(value, true)}`; }

/** Escape vCard TEXT values rather than the structural separators of N / ADR. */
export function escapeVcard(value) {
  return String(value).replace(/\r\n?|\n/g,'\n').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
}

export function makeVcard(fields) {
  const get = key => normalText(fields?.[key]);
  const given = get('given'), family = get('family');
  if (!given && !family) throw new InputError('errorContactName');
  const parts = [
    'BEGIN:VCARD', 'VERSION:3.0',
    `N:${escapeVcard(family)};${escapeVcard(given)};;;`,
    `FN:${escapeVcard([given,family].filter(Boolean).join(' '))}`
  ];
  for (const [k,field] of [['org','ORG'],['title','TITLE']]) {
    const value = get(k);
    if (value) parts.push(`${field}:${escapeVcard(value)}`);
  }
  if (get('phone')) {
    try { parts.push(`TEL;TYPE=CELL:${cleanPhone(get('phone'), false)}`); }
    catch { throw new InputError('errorContactPhoneInvalid'); }
  }
  if (get('email')) {
    try { parts.push(`EMAIL;TYPE=INTERNET:${checkEmail(get('email'))}`); }
    catch { throw new InputError('errorContactEmailInvalid'); }
  }
  if (get('website')) {
    try { parts.push(`URL:${makeUrl(get('website'))}`); }
    catch { throw new InputError('errorContactWebsiteInvalid'); }
  }
  const [street,city,postal,country] = ['street','city','postal','country'].map(get);
  if ([street,city,postal,country].some(Boolean)) {
    parts.push(`ADR;TYPE=HOME:;;${escapeVcard(street)};${escapeVcard(city)};;${escapeVcard(postal)};${escapeVcard(country)}`);
  }
  // Reject actual control bytes (not escaped newlines) and bound content length.
  if (Object.values(fields ?? {}).some(value => typeof value !== 'string' || multiControls.test(value)) || parts.join('').length > 6000) throw new InputError('errorTooLong');
  return parts.concat('END:VCARD').join('\r\n') + '\r\n';
}

export function makeLocation({ latitude, longitude }) {
  const parse = (value,limit) => {
    const raw = normalText(value);
    if (!raw) throw new InputError('errorCoordinatesRequired');
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)) throw new InputError('errorCoordinatesInvalid');
    const n = Number(raw);
    if (!Number.isFinite(n) || Math.abs(n) > limit) throw new InputError('errorCoordinatesInvalid');
    // Serialize the checked lexical decimal, not Number#toString(): tiny
    // coordinates must never become exponential forms (e.g. 1e-7).
    let decimal = raw.replace(/^\+/, '');
    if (decimal.startsWith('.')) decimal = `0${decimal}`;
    if (decimal.startsWith('-.')) decimal = `-0${decimal.slice(1)}`;
    if (decimal.endsWith('.')) decimal = decimal.slice(0, -1);
    return decimal;
  };
  return `geo:${parse(latitude,90)},${parse(longitude,180)}`;
}

// encodeURIComponent does not encode ! ' ( ) *; RFC 5724 requires percent encoding
// of these characters in an SMS URI query value.
const encodeSmsBody = value => encodeURIComponent(value).replace(/[!'()*]/g,
  ch => '%' + ch.charCodeAt(0).toString(16).toUpperCase());

/** RFC 5724 SMS URI; creates a draft on supported scanners, never sends. */
export function makeSms({ phone, body = '' }) {
  const recipient = makePhone(phone).slice(4);
  if (typeof body !== 'string' || body.length > 1000) throw new InputError('errorSmsLength');
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(body)) throw new InputError('errorControlChars');
  const text = body.replace(/\r\n?|\n/g, '\r\n');
  return `sms:${recipient}${text ? '?body=' + encodeSmsBody(text) : ''}`;
}

/** Validated map link. Coordinates leave the app only when the user opens this link. */
export function makeMapUrl(coords) {
  const {latitude, longitude} = coords;
  const geo = makeLocation({latitude,longitude}).slice(4);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(geo)}`;
}
