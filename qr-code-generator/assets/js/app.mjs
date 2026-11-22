import { createQR } from './vendor/qr-engine.mjs';
import { makeWifi, makeUrl, makeText, makeEmail, makePhone, makeVcard, makeLocation, makeSms, makeMapUrl, InputError } from './payload.mjs';
import { toSvg, toCanvas, saveBlob } from './renderer.mjs';
import { exportFileName } from './export-filename.mjs';
import { translate as t, messages } from './i18n.mjs';

const $ = id => document.getElementById(id);
const controls = ['download-png', 'download-svg', 'print', 'copy-qr'];
const types = ['wifi', 'url', 'text', 'email', 'phone', 'vcard', 'sms', 'location'];
const locales = {en:['gb','EN','English'],hr:['hr','HR','Hrvatski'],de:['de','DE','Deutsch'],it:['it','IT','Italiano'],es:['es','ES','Español'],fr:['fr','FR','Français']};
let lang = 'en';
let activeType = 'wifi';
let qr = null;
let statusKey = '';
let geoRequestId = 0;
let geoAccuracy = null;
let geoStatusKey = '';
let copyStatusKey = '';
const storageKey = { language: 'agQrLanguageV1', theme: 'agQrThemeV1' };

function saved(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function saveSetting(key, value) {
  try { localStorage.setItem(key, value); } catch { /* privacy/browser policy */ }
}
function setStatus(key) {
  statusKey = key;
  $('action-status').textContent = key ? t(lang, key) : '';
}
function setGeoStatus(key, extra = '') {
  geoStatusKey = key;
  const output = $('geo-feedback');
  output.textContent = key ? t(lang,key).replace('{meters}',extra) : '';
  output.dataset.status = key.startsWith('geoError') ? 'error' : '';
}
function setCopyStatus(key) {
  copyStatusKey = key;
  $('copy-feedback').textContent = key ? t(lang,key) : '';
  $('copy-feedback').dataset.status = key === 'copyUnsupported' || key === 'copyFailed' ? 'error' : '';
}
function updateMapLink() {
  const link = $('open-map');
  try {
    link.href = makeMapUrl({latitude:$('location-lat').value,longitude:$('location-lon').value});
    link.hidden = false;
  } catch {
    link.removeAttribute('href');link.hidden = true;
  }
}
function requestMyLocation() {
  if (!window.isSecureContext || !navigator.geolocation) { setGeoStatus('geoErrorUnavailable'); return; }
  const ticket = ++geoRequestId;
  $('use-location').disabled = true;
  setGeoStatus('geoSearching');
  navigator.geolocation.getCurrentPosition(position => {
    if (ticket !== geoRequestId) return;  // ignore older callbacks after reset
    $('use-location').disabled = false;
    if (activeType !== 'location') return;
    const {latitude,longitude,accuracy} = position.coords;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {setGeoStatus('geoErrorUnavailable');return;}
    $('location-lat').value = latitude.toFixed(6);
    $('location-lon').value = longitude.toFixed(6);
    geoAccuracy = Number.isFinite(accuracy) ? Math.round(accuracy) : null;
    clearError();invalidate('statusUpdated');updateMapLink();
    setGeoStatus(geoAccuracy !== null ? 'geoLocatedAccuracy' : 'geoLocated',String(geoAccuracy ?? ''));
  }, error => {
    if (ticket !== geoRequestId) return;
    $('use-location').disabled = false;
    const key = error?.code === 1 ? 'geoErrorDenied' : error?.code === 3 ? 'geoErrorTimeout' : 'geoErrorUnavailable';
    setGeoStatus(key);
  }, {enableHighAccuracy:true,timeout:14000,maximumAge:0});
}
function addEmptyPreview() {
  const parent = $('qr-preview');
  parent.replaceChildren();
  const symbol = document.createElement('div'); symbol.className = 'empty-icon'; symbol.setAttribute('aria-hidden','true'); symbol.textContent = '▦';
  const title = document.createElement('h3'); title.textContent = t(lang,'emptyTitle');
  const message = document.createElement('p'); message.textContent = t(lang,'emptyText');
  parent.append(symbol,title,message);
}
function invalidate(key = '') {
  const hadQr = Boolean(qr);
  qr = null;
  addEmptyPreview();
  $('result-meta').hidden = true;
  $('result-kind').textContent = '';
  $('result-summary').textContent = '';
  $('result-state').textContent = t(lang,'waiting');
  $('result-state').classList.remove('is-ready');
  for (const id of controls) $(id).disabled = true;
  setCopyStatus('');
  if (key && hadQr) setStatus(key);
}
function clearError() { $('input-error').hidden = true; $('input-error').textContent = ''; }
function showError(key) { $('input-error').textContent = t(lang,key); $('input-error').hidden = false; }
function setLanguage(value) {
  lang = Object.hasOwn(messages, value) ? value : 'en';
  document.documentElement.lang = lang;
  $('language').value = lang;
  const [flag,code,name] = locales[lang];
  $('current-flag').src = `assets/images/flags/${flag}.svg`;
  $('current-code').textContent = code;
  $('current-name').textContent = name;
  document.querySelectorAll('#language-options [data-lang]').forEach(item => {
    item.setAttribute('aria-checked',String(item.dataset.lang === lang));
    item.classList.toggle('selected',item.dataset.lang === lang);
  });
  saveSetting(storageKey.language,lang);
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(lang,el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(lang,el.dataset.i18nPlaceholder)); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => { el.setAttribute('aria-label', t(lang,el.dataset.i18nAriaLabel)); });
  $('language').setAttribute('aria-label', t(lang,'languageLabel'));
  $('theme').setAttribute('aria-label', t(lang,'themeLabel'));
  document.title = `${t(lang,'createTitle')} | Apps & Games`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = t(lang,'heroSub');
  updateSecurityHint(); updatePasswordButton();
  if (qr) {
    $('qr-preview').querySelector('svg')?.setAttribute('aria-label',t(lang,'qrAccessible'));
    $('result-state').textContent = t(lang,'ready');
    $('result-kind').textContent = t(lang, `summary${activeType[0].toUpperCase()}${activeType.slice(1)}`);
    if (activeType === 'wifi' && $('security').value === 'open') $('result-kind').textContent = t(lang,'summaryOpen');
    if (activeType === 'text') $('result-summary').textContent = summaryFor('text', $('plain-text').value);
  } else addEmptyPreview();
  if (!$('input-error').hidden && $('input-error').dataset.errorKey) showError($('input-error').dataset.errorKey);
  if (statusKey) setStatus(statusKey);
  if (geoStatusKey) setGeoStatus(geoStatusKey,String(geoAccuracy ?? ''));
  if (copyStatusKey) setCopyStatus(copyStatusKey);
}
function setTheme(value) {
  const theme = ['light','dark','system'].includes(value) ? value : 'system';
  document.documentElement.dataset.theme = theme;
  $('theme').value = theme;
  saveSetting(storageKey.theme,theme);
}
function updateSecurityHint() {
  const k = ({wpa:'wpaHint',mixed:'mixedHint',wpa3:'wpa3Hint',wep:'wepHint',open:'openHint'})[$('security').value] || 'wpaHint';
  $('security-hint').textContent = t(lang,k);
  const open = $('security').value === 'open';
  $('password-field').hidden = open;
  $('wifi-password').disabled = open;
}
function updatePasswordButton() {
  const shown = $('wifi-password').type === 'text';
  $('toggle-password').setAttribute('aria-pressed',String(shown));
  $('toggle-password').setAttribute('aria-label',t(lang,shown?'hidePassword':'showPassword'));
  $('password-eye').textContent = shown ? '◌' : '◉';
}
function activateType(type, focusTab = false) {
  if (!types.includes(type)) return;
  const changed = activeType !== type;
  activeType = type;
  for (const item of types) {
    const active = item === type;
    const tab = $(`tab-${item}`);
    tab.classList.toggle('active',active); tab.setAttribute('aria-selected',String(active)); tab.tabIndex = active ? 0 : -1;
    $(`panel-${item}`).hidden = !active;
  }
  if (changed) {
    if (activeType !== 'location') { ++geoRequestId; $('use-location').disabled = false; geoAccuracy = null; setGeoStatus(''); }
    clearError(); invalidate();
  }
  if (focusTab) $(`tab-${type}`).focus();
}
function buildPayload() {
  if (activeType === 'wifi') return makeWifi({ssid:$('ssid').value,password:$('wifi-password').value,security:$('security').value,hidden:$('hidden').checked});
  if (activeType === 'url') return makeUrl($('target-url').value);
  if (activeType === 'text') return makeText($('plain-text').value);
  if (activeType === 'email') return makeEmail({email:$('email-address').value,subject:$('email-subject').value,body:$('email-body').value});
  if (activeType === 'phone') return makePhone($('phone-number').value);
  if (activeType === 'vcard') return makeVcard(Object.fromEntries(['given','family','org','title','phone','email','website','street','city','postal','country'].map(key=>[key,$(`contact-${key}`).value])));
  if (activeType === 'sms') return makeSms({phone:$('sms-number').value,body:$('sms-body').value});
  if (activeType === 'location') return makeLocation({latitude:$('location-lat').value,longitude:$('location-lon').value});
  throw new InputError('errorQRCode');
}
function summaryFor(type, payload) {
  if (type === 'wifi') return $('ssid').value;
  if (type === 'url') return payload;
  if (type === 'email') return $('email-address').value.trim();
  if (type === 'phone') return $('phone-number').value.trim();
  if (type === 'vcard') return [$('contact-given').value.trim(),$('contact-family').value.trim()].filter(Boolean).join(' ');
  if (type === 'location') return payload.substring(4);
  if (type === 'sms') return $('sms-number').value.trim();
  return `${[...payload].length} ${lang === 'hr' ? 'znakova' : lang === 'de' ? 'Zeichen' : lang === 'fr' ? 'caractères' : lang === 'es' ? 'caracteres' : lang === 'it' ? 'caratteri' : 'characters'}`;
}
function focusError(errCode) {
  const ids = {
    errorSSIDRequired:'ssid',errorSSIDLength:'ssid',errorSecurity:'security',errorPasswordRequired:'wifi-password',
    errorWpaLength:'wifi-password',errorWpa3Length:'wifi-password',errorWepLength:'wifi-password',
    errorUrlRequired:'target-url',errorUrlInvalid:'target-url',errorTextRequired:'plain-text',
    errorEmailRequired:'email-address',errorEmailInvalid:'email-address',
    errorPhoneRequired:activeType === 'sms' ? 'sms-number' : 'phone-number',errorPhoneInvalid:activeType === 'sms' ? 'sms-number' : 'phone-number',
    errorSmsLength:'sms-body',
    errorContactName:'contact-given',errorContactEmailInvalid:'contact-email',errorContactWebsiteInvalid:'contact-website',errorContactPhoneInvalid:'contact-phone',
    errorCoordinatesRequired:'location-lat',errorCoordinatesInvalid:'location-lat',
  };
  if (errCode === 'errorCoordinatesInvalid' || errCode === 'errorCoordinatesRequired') {
    try { makeLocation({latitude:$('location-lat').value, longitude:'0'}); }
    catch { $('location-lat').focus(); return; }
    $('location-lon').focus(); return;
  }
  if (ids[errCode]) $(ids[errCode]).focus();
}
function handleGenerate(event) {
  event.preventDefault(); clearError(); $('input-error').dataset.errorKey = '';
  try {
    const payload = buildPayload();
    // QR version 40/M has less than 2331 byte-mode data bytes including headers.
    if (new TextEncoder().encode(payload).length > 2300) throw new InputError('errorTooLong');
    const next = createQR(payload,'M');
    qr = next;
    $('qr-preview').innerHTML = toSvg(next); // SVG contains only static markup and numeric module coordinates, no user content.
    $('qr-preview').querySelector('svg')?.setAttribute('aria-label',t(lang,'qrAccessible'));
    $('result-state').textContent = t(lang,'ready');
    $('result-state').classList.add('is-ready');
    $('result-kind').textContent = t(lang,activeType === 'wifi' && $('security').value === 'open' ? 'summaryOpen' : `summary${activeType[0].toUpperCase()}${activeType.slice(1)}`);
    $('result-summary').textContent = summaryFor(activeType,payload);
    $('result-meta').hidden = false;
    for (const id of controls) $(id).disabled = false;
    setStatus('statusGenerated');
  } catch (e) {
    invalidate();
    const key = e instanceof InputError ? e.code : e instanceof RangeError ? 'errorTooLong' : 'errorQRCode';
    $('input-error').dataset.errorKey = key;
    showError(key);
    focusError(key);
    if (!(e instanceof InputError) && !(e instanceof RangeError)) console.error('QR code generation failed.');
  }
}
function resetAll() {
  ++geoRequestId; $('use-location').disabled = false;geoAccuracy=null;setGeoStatus('');
  HTMLFormElement.prototype.reset.call($('generator-form')); // avoids collision with the reset button's id
  $('wifi-password').value = '';
  $('wifi-password').type = 'password';
  activateType('wifi');
  updateSecurityHint(); updatePasswordButton(); clearError(); $('input-error').dataset.errorKey = '';
  $('export-filename').value = '';
  invalidate(); setStatus('statusReset');updateMapLink(); $('ssid').focus();
}

function toggleLanguageMenu(open, focusItem = false) {
  const panel = $('language-options');
  panel.hidden = !open;
  $('language-button').setAttribute('aria-expanded',String(open));
  if (open && focusItem) panel.querySelector(`[data-lang="${lang}"]`)?.focus();
}
function setup() {
  // Keep the native select as a hidden compatibility hook; the visual menu matches Apps & Games.
  $('language').addEventListener('change',e => setLanguage(e.target.value));
  $('language-button').addEventListener('click',() => toggleLanguageMenu($('language-options').hidden,true));
  const langItems = Array.from(document.querySelectorAll('#language-options [data-lang]'));
  for (const item of langItems) item.addEventListener('click',() => {
    setLanguage(item.dataset.lang);
    toggleLanguageMenu(false);
    $('language-button').focus();
  });
  $('language-options').addEventListener('keydown',event => {
    if (event.key === 'Escape') { event.preventDefault(); toggleLanguageMenu(false); $('language-button').focus();return; }
    const keys = ['ArrowDown','ArrowUp','Home','End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = langItems.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? langItems.length-1 : event.key === 'ArrowDown' ? (index+1)%langItems.length : (index+langItems.length-1)%langItems.length;
    langItems[next].focus();
  });
  document.addEventListener('pointerdown',event=>{ if (!$('language-menu').contains(event.target)) toggleLanguageMenu(false); });
  document.addEventListener('keydown',event=>{
    if (event.key === 'Escape' && !$('language-options').hidden) {toggleLanguageMenu(false);$('language-button').focus();}
  });
  $('info-button').addEventListener('click',()=>{$('info-dialog').showModal();});
  $('info-close').addEventListener('click',()=>$('info-dialog').close());
  $('info-done').addEventListener('click',()=>$('info-dialog').close());
  $('theme').addEventListener('change',e => setTheme(e.target.value));
  document.querySelectorAll('[role="tab"]').forEach(tab => tab.addEventListener('click',() => activateType(tab.dataset.type)));
  const tablist = document.querySelector('[role="tablist"]');
  tablist.addEventListener('keydown',e => {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
    e.preventDefault(); let i = types.indexOf(activeType);
    if (e.key === 'ArrowRight') i = (i+1)%types.length;
    if (e.key === 'ArrowLeft') i = (i+types.length-1)%types.length;
    if (e.key === 'Home') i = 0;
    if (e.key === 'End') i = types.length-1;
    activateType(types[i],true);
  });
  document.querySelectorAll('#generator-form input, #generator-form textarea, #security').forEach(el => {
    el.addEventListener('input',() => { clearError(); $('input-error').dataset.errorKey=''; invalidate('statusUpdated'); });
    el.addEventListener('change',() => { clearError(); $('input-error').dataset.errorKey=''; invalidate('statusUpdated'); });
  });
  $('security').addEventListener('change', () => {
    if ($('security').value === 'open') $('wifi-password').value = '';
    updateSecurityHint();
  });
  $('toggle-password').addEventListener('click',() => {
    $('wifi-password').type = $('wifi-password').type === 'password' ? 'text' : 'password';
    updatePasswordButton();
  });
  $('use-location').addEventListener('click',requestMyLocation);
  const manualLocationEdit = () => {
    ++geoRequestId; // manual edits win even if an old position request completes later
    $('use-location').disabled = false;
    geoAccuracy = null;
    setGeoStatus('');
    updateMapLink();
  };
  $('location-lat').addEventListener('input',manualLocationEdit);
  $('location-lon').addEventListener('input',manualLocationEdit);
  $('generator-form').addEventListener('submit',handleGenerate);
  $('reset').addEventListener('click',resetAll);
  $('download-svg').addEventListener('click',() => {
    if (!qr) return;
    saveBlob(new Blob([toSvg(qr)],{type:'image/svg+xml;charset=utf-8'}),exportFileName($('export-filename').value,activeType,'svg'));
    setStatus('statusDownloaded');
  });
  $('download-png').addEventListener('click',() => {
    if (!qr) return;
    try {
      const fileName = exportFileName($('export-filename').value,activeType,'png');
      toCanvas(qr).toBlob(blob => {
        if (blob) {saveBlob(blob,fileName);setStatus('statusDownloaded');}
        else { $('input-error').dataset.errorKey = 'errorPng';showError('errorPng'); }
      },'image/png');
    } catch { $('input-error').dataset.errorKey = 'errorPng';showError('errorPng'); }
  });
  $('copy-qr').addEventListener('click',async () => {
    if (!qr) return;
    if (!window.isSecureContext || !navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
      setCopyStatus('copyUnsupported');return;
    }
    try {
      // Promise-based ClipboardItem allows generation without losing click activation.
      const png = new Promise((resolve,reject) => {
        try {toCanvas(qr).toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG')), 'image/png');}
        catch(e) {reject(e);}
      });
      await navigator.clipboard.write([new ClipboardItem({'image/png':png})]);
      setCopyStatus('copySuccess');
    } catch {setCopyStatus('copyFailed');}
  });
  $('print').addEventListener('click',() => { if (qr) window.print(); });
  setTheme(saved(storageKey.theme,'system'));
  setLanguage(saved(storageKey.language,'en'));
  updateSecurityHint(); updatePasswordButton(); invalidate();updateMapLink();
}
setup();
