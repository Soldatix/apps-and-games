/** Filename selection only. Never reads or includes QR contents. */
export function exportFileName(customName, qrType, extension, now = new Date()) {
  if (extension !== 'png' && extension !== 'svg') throw new RangeError('Invalid image format');
  let basename = String(customName ?? '').normalize('NFKC')
    .replace(/[^\p{L}\p{M}\p{N} _.()-]+/gu, '-')
    .replace(/\s+/g, ' ').replace(/-{2,}/g, '-')
    .replace(/^[ .-]+|[ .-]+$/g, '');
  basename = Array.from(basename).slice(0, 64).join('').replace(/[ .-]+$/g, '');
  if (/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(basename)) basename = 'qr-' + basename;
  if (!basename) {
    const pad = (num, length = 2) => String(num).padStart(length, '0');
    const type = /^(?:wifi|url|text|email|phone|sms|vcard|location)$/.test(qrType) ? qrType : 'code';
    const stamp = String(now.getFullYear()) + pad(now.getMonth()+1) + pad(now.getDate()) + '-' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds()) + pad(now.getMilliseconds(),3);
    basename = 'apps-games-qr-' + type + '-' + stamp;
  }
  return basename + '.' + extension;
}
