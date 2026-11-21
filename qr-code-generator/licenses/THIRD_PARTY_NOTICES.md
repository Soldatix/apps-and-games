# Third-party notices

The QR engine in `qr-code-generator/assets/js/vendor/qr-engine.mjs` bundles the local QR encoder files from `qrcode-terminal` **0.12.0**, included with the local Node/npm distribution for this build. `qrcode-terminal` is available under the **Apache License 2.0**; full text provided in `APACHE-2.0.txt`. The files in `vendor/QRCode` originate from **Kazuhiko Arase's QRCode for JavaScript**, copyright (c) 2009 Kazuhiko Arase, distributed under the **MIT License**; full license is provided in `MIT-QRCode-Kazuhiko-Arase.txt`.

Upstream attribution in bundled original code is retained. Changes to the vendored code for this project: (1) combined the CommonJS modules in one ES module without npm runtime dependencies, (2) changed `QR8bitByte` to encode Unicode text as UTF-8 bytes with `TextEncoder` rather than truncating UTF-16 code units, and (3) added a QR input-overflow guard and corrected the final automatic version-40 capacity check. The app's own renderer produces SVG and PNG images from the QR module grid.

QR Code is a registered trademark of DENSO WAVE INCORPORATED; this utility is not affiliated with DENSO WAVE.
