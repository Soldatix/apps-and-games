/** Fixed black-on-white QR modules, with a four-module quiet zone. */
export const QUIET = 4;
export function toSvg(qr) {
  const n = qr.size + QUIET * 2;
  const path = [];
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      if (qr.isDark(x, y)) path.push(`M${x + QUIET},${y + QUIET}h1v1h-1z`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" role="img" aria-label="QR code"><rect width="${n}" height="${n}" fill="#fff"/><path d="${path.join('')}" fill="#000"/></svg>`;
}
export function toCanvas(qr, pixelSize = 1200) {
  const n = qr.size + QUIET * 2;
  const scale = Math.max(1, Math.floor(pixelSize / n));
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = n * scale;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Canvas unsupported');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      if (qr.isDark(x, y)) ctx.fillRect((x + QUIET) * scale, (y + QUIET) * scale, scale, scale);
    }
  }
  return canvas;
}
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.style.display = 'none';
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
