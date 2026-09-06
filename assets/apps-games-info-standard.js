(() => {
  'use strict';

  const VERSION = 'apps-games-standard-info-v1';
  const PAYPAL = 'https://www.paypal.com/ncp/payment/RU2CWCNVQ7XD6';
  const STRIPE = 'https://buy.stripe.com/7sYeVd7Blfe89cm0k02kw00';
  const BTC = 'bc1qwlrxrh64peukga0fp59m9yg7gpf0yj8q7fxnsc';
  const wallets = [
    ['BTC', BTC],
    ['ETH', '0xA99A52085c6725854daa46bb302041569c8bA4E3'],
    ['XRP', 'rP43SsrkhPkxTsFohMAm32sAQg7vqwmDpr'],
    ['SOL', '8xkdVTEaDGuWu4aE3HpEx8r9Aux98JZbdsMiDQvJWBWR'],
    ['DOGE', 'DGAT32ku8WmFaTDxCgVuRuVpUFmfdmD5Jb'],
    ['XLM', 'GCYH4OD4I2GNRKFFOYROE3N3S2HCT5RXIML3TZV5DP3TLTLXPXQXIJZ3'],
    ['LTC', 'LWtaFniqdYpv2xJtqo9WqDwCsQ2cW6PYWi'],
    ['RVN', 'RAtXzKZyB3awfq2u2cK8YppC9kJamU5tPQ']
  ];

  const i18n = {
    en: {
      support: 'Support the project',
      intro: 'The app or game is free to use, but voluntary donations are welcome.',
      paypal: 'Pay securely with PayPal or other payment options offered by PayPal Checkout.',
      stripe: 'Pay securely by card or with payment methods available through Stripe Checkout.',
      cards: 'Debit / Credit Card', wallets: 'Digital wallets',
      paypalBtn: 'Donate with PayPal ↗', stripeBtn: 'Donate with Stripe ↗',
      note: 'Available payment methods can vary by country, device and payment provider.',
      crypto: 'Crypto Wallets', copy: 'Copy', copied: 'Copied'
    },
    hr: {
      support: 'Podržite projekt',
      intro: 'Aplikacija ili igra besplatna je za korištenje, ali dobrovoljne donacije su dobrodošle.',
      paypal: 'Platite sigurno putem PayPala ili drugim načinima plaćanja koje nudi PayPal Checkout.',
      stripe: 'Platite sigurno karticom ili načinima plaćanja dostupnima putem Stripe Checkouta.',
      cards: 'Debitna / kreditna kartica', wallets: 'Digitalni novčanici',
      paypalBtn: 'Doniraj putem PayPala ↗', stripeBtn: 'Doniraj putem Stripea ↗',
      note: 'Dostupni načini plaćanja mogu se razlikovati ovisno o državi, uređaju i pružatelju plaćanja.',
      crypto: 'Kripto novčanici', copy: 'Kopiraj', copied: 'Kopirano'
    },
    de: {
      support: 'Projekt unterstützen',
      intro: 'Die App oder das Spiel kann kostenlos genutzt werden, freiwillige Spenden sind jedoch willkommen.',
      paypal: 'Sicher mit PayPal oder weiteren von PayPal Checkout angebotenen Zahlungsmethoden bezahlen.',
      stripe: 'Sicher per Karte oder mit den über Stripe Checkout verfügbaren Zahlungsmethoden bezahlen.',
      cards: 'Debit- / Kreditkarte', wallets: 'Digitale Wallets',
      paypalBtn: 'Mit PayPal spenden ↗', stripeBtn: 'Mit Stripe spenden ↗',
      note: 'Verfügbare Zahlungsmethoden können je nach Land, Gerät und Zahlungsanbieter variieren.',
      crypto: 'Krypto-Wallets', copy: 'Kopieren', copied: 'Kopiert'
    },
    it: {
      support: 'Sostieni il progetto',
      intro: "L'app o il gioco è gratuito, ma le donazioni volontarie sono benvenute.",
      paypal: 'Paga in modo sicuro con PayPal o con gli altri metodi disponibili tramite PayPal Checkout.',
      stripe: 'Paga in modo sicuro con carta o con i metodi disponibili tramite Stripe Checkout.',
      cards: 'Carta di debito / credito', wallets: 'Portafogli digitali',
      paypalBtn: 'Dona con PayPal ↗', stripeBtn: 'Dona con Stripe ↗',
      note: 'I metodi di pagamento disponibili possono variare in base al Paese, al dispositivo e al fornitore di pagamento.',
      crypto: 'Portafogli crypto', copy: 'Copia', copied: 'Copiato'
    },
    es: {
      support: 'Apoya el proyecto',
      intro: 'La aplicación o el juego es gratuito, pero las donaciones voluntarias son bienvenidas.',
      paypal: 'Paga de forma segura con PayPal u otros métodos disponibles mediante PayPal Checkout.',
      stripe: 'Paga de forma segura con tarjeta o con los métodos disponibles mediante Stripe Checkout.',
      cards: 'Tarjeta de débito / crédito', wallets: 'Carteras digitales',
      paypalBtn: 'Donar con PayPal ↗', stripeBtn: 'Donar con Stripe ↗',
      note: 'Los métodos de pago disponibles pueden variar según el país, el dispositivo y el proveedor de pago.',
      crypto: 'Carteras de criptomonedas', copy: 'Copiar', copied: 'Copiado'
    }
  };

  function getLanguage() {
    const raw = String(
      document.querySelector('#languageSelect, #language, #langSelect, select[id*="lang" i], select[name*="lang" i]')?.value ||
      document.documentElement.lang || navigator.language || 'en'
    ).toLowerCase();
    if (raw.startsWith('hr') || raw.includes('hrvat')) return 'hr';
    if (raw.startsWith('de') || raw.includes('deutsch')) return 'de';
    if (raw.startsWith('it') || raw.includes('ital')) return 'it';
    if (raw.startsWith('es') || raw.includes('espa')) return 'es';
    return 'en';
  }

  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function closestSmallBlock(el, maxText = 1200) {
    let cur = el;
    while (cur && cur !== document.body) {
      if (/^(P|LI|DIV|SECTION|ARTICLE)$/i.test(cur.tagName) && (cur.textContent || '').length <= maxText) return cur;
      cur = cur.parentElement;
    }
    return null;
  }

  function findInfoRoot(anchor) {
    let cur = anchor;
    while (cur && cur !== document.body) {
      const idClass = `${cur.id || ''} ${typeof cur.className === 'string' ? cur.className : ''}`.toLowerCase();
      if (cur.matches?.('dialog,[role="dialog"]') || /modal|dialog|info|about/.test(idClass)) {
        if (isVisible(cur)) return cur;
      }
      cur = cur.parentElement;
    }
    return null;
  }

  function hideOldPayments(root) {
    root.querySelectorAll(`a[href*="paypal.com/ncp/payment/RU2CWCNVQ7XD6"],a[href*="buy.stripe.com/7sYeVd7Blfe89cm0k02kw00"]`).forEach(a => {
      const block = closestSmallBlock(a, 1800);
      if (block && block !== root) block.style.display = 'none';
      else a.style.display = 'none';
    });

    const all = [...root.querySelectorAll('div,section,p,pre')];
    const walletBlock = all
      .filter(el => (el.textContent || '').includes(BTC))
      .sort((a,b) => (a.textContent || '').length - (b.textContent || '').length)[0];
    if (walletBlock && walletBlock !== root && (walletBlock.textContent || '').length < 5000) walletBlock.style.display = 'none';

    const headers = [...root.querySelectorAll('h2,h3,h4,strong,p')];
    const patterns = [
      /you can make donations to/i,/donirati možete putem/i,/spenden sind möglich/i,
      /puoi effettuare una donazione/i,/puedes realizar una donación/i,
      /^crypto wallet/i,/^kripto novčan/i,/^krypto-wallet/i,/^portafogli crypto/i,/^carteras de cripto/i
    ];
    headers.forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt.length < 100 && patterns.some(re => re.test(txt))) el.style.display = 'none';
    });
  }

  function markup(lang) {
    const t = i18n[lang] || i18n.en;
    const walletRows = wallets.map(([name, address]) => `
      <div class="ag-wallet-row">
        <strong>${name}</strong><code>${address}</code>
        <button type="button" class="ag-copy" data-copy="${address}">${t.copy}</button>
      </div>`).join('');
    return `
      <section class="ag-support-standard ${VERSION}" data-ag-lang="${lang}">
        <h3 class="ag-support-title">🤝 ${t.support}</h3>
        <p class="ag-support-intro">${t.intro}</p>
        <div class="ag-payment-grid">
          <article class="ag-payment-card">
            <div class="ag-brand"><span class="ag-brand-icon">P</span><strong>PayPal</strong></div>
            <p>${t.paypal}</p>
            <div class="ag-badges"><span>PayPal</span><span>${t.cards}</span><span>Apple Pay</span></div>
            <a class="ag-payment-action" href="${PAYPAL}" target="_blank" rel="noopener noreferrer">${t.paypalBtn}</a>
          </article>
          <article class="ag-payment-card ag-stripe">
            <div class="ag-brand"><span class="ag-brand-icon">S</span><strong>Stripe</strong></div>
            <p>${t.stripe}</p>
            <div class="ag-badges"><span>${t.cards}</span><span>Link</span><span>${t.wallets}</span></div>
            <a class="ag-payment-action" href="${STRIPE}" target="_blank" rel="noopener noreferrer">${t.stripeBtn}</a>
          </article>
        </div>
        <p class="ag-payment-note">${t.note}</p>
        <details class="ag-crypto">
          <summary>₿ ${t.crypto}</summary>
          <div class="ag-wallet-list">${walletRows}</div>
        </details>
      </section>`;
  }

  function installStyles() {
    if (document.getElementById('ag-standard-info-style')) return;
    const style = document.createElement('style');
    style.id = 'ag-standard-info-style';
    style.textContent = `
      .ag-support-standard{margin-top:20px;padding-top:18px;border-top:1px solid var(--line,rgba(120,160,220,.22));color:var(--text,#f4f7ff)}
      .ag-support-title{margin:0 0 8px!important;color:var(--text,#f4f7ff)!important;font-size:1.08rem!important}
      .ag-support-intro{margin:0 0 14px!important;color:var(--muted,var(--text-secondary,#a7b8d2))!important;line-height:1.5!important}
      .ag-payment-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:12px 0}
      .ag-payment-card{display:flex;flex-direction:column;min-width:0;padding:16px;border:1px solid var(--line,rgba(120,160,220,.22));border-radius:16px;background:linear-gradient(145deg,var(--panel2,var(--surface,#111a35)),rgba(5,12,28,.82));box-shadow:0 10px 28px rgba(0,0,0,.16)}
      .ag-payment-card p{margin:0!important;color:var(--muted,var(--text-secondary,#a7b8d2))!important;font-size:.9rem!important;line-height:1.45!important}
      .ag-brand{display:flex;align-items:center;gap:9px;margin-bottom:8px}.ag-brand strong{color:var(--text,#f4f7ff)!important;font-size:1rem}
      .ag-brand-icon{display:grid;place-items:center;width:36px;height:36px;flex:0 0 36px;border-radius:11px;border:1px solid var(--line,rgba(120,160,220,.22));background:rgba(84,232,255,.08);color:var(--cyan,var(--accent2,#54e8ff));font-weight:900}
      .ag-badges{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}.ag-badges span{padding:5px 8px;border-radius:999px;border:1px solid var(--line,rgba(120,160,220,.22));background:rgba(255,255,255,.045);color:var(--muted,var(--text-secondary,#b9c8ee));font-size:.72rem;font-weight:750}
      .ag-payment-action{display:flex!important;align-items:center;justify-content:center;min-height:43px;margin-top:auto;padding:9px 11px;border-radius:11px;text-decoration:none!important;background:linear-gradient(90deg,var(--cyan,var(--accent2,#54e8ff)),var(--blue,#4da3ff));color:#061018!important;font-weight:900!important;text-align:center}
      .ag-stripe .ag-payment-action{background:linear-gradient(90deg,var(--yellow,var(--gold,#ffe457)),#ffb84d)}
      .ag-payment-note{margin:0 0 14px!important;color:var(--muted,var(--text-secondary,#94a3c7))!important;font-size:.78rem!important}
      .ag-crypto{border:1px solid var(--line,rgba(120,160,220,.22));border-radius:14px;background:rgba(0,0,0,.12);overflow:hidden}.ag-crypto summary{cursor:pointer;padding:12px 14px;font-weight:850;color:var(--text,#f4f7ff)}
      .ag-wallet-list{display:grid;gap:7px;padding:0 12px 12px}.ag-wallet-row{display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px;border-radius:10px;background:rgba(255,255,255,.035)}.ag-wallet-row strong{color:var(--cyan,var(--accent2,#54e8ff))}.ag-wallet-row code{min-width:0;overflow-wrap:anywhere;word-break:break-all;color:var(--muted,var(--text-secondary,#b9c8ee));font-size:.72rem}.ag-copy{border:1px solid var(--line,rgba(120,160,220,.22));border-radius:9px;padding:6px 8px;background:rgba(255,255,255,.07);color:var(--text,#f4f7ff);cursor:pointer;font:inherit;font-size:.72rem;font-weight:800}
      @media(max-width:620px){.ag-payment-grid{grid-template-columns:1fr}.ag-wallet-row{grid-template-columns:42px 1fr}.ag-copy{grid-column:2;justify-self:start}.ag-payment-card{padding:14px}}
    `;
    document.head.appendChild(style);
  }

  function upgrade() {
    installStyles();
    const paypal = [...document.querySelectorAll(`a[href*="paypal.com/ncp/payment/RU2CWCNVQ7XD6"]`)].find(isVisible);
    const stripe = [...document.querySelectorAll(`a[href*="buy.stripe.com/7sYeVd7Blfe89cm0k02kw00"]`)].find(isVisible);
    const anchor = paypal || stripe;
    if (!anchor) return;
    const root = findInfoRoot(anchor);
    if (!root) return;

    const lang = getLanguage(root);
    const existing = root.querySelector(`.${VERSION}`);
    if (existing && existing.dataset.agLang === lang) return;
    if (existing) existing.remove();

    hideOldPayments(root);
    let host = anchor.closest('[id*="content" i],[class*="content" i],.info-text,.modal-body');
    if (!host || !root.contains(host)) {
      host = root.querySelector?.('[id*="content" i],[class*="content" i],.info-text,.modal-body,.modal-card') || root;
    }
    if (/payment-options|payment-grid|donation-options|donation-methods/.test(String(host.className || ''))) host = root;
    host.insertAdjacentHTML('beforeend', markup(lang));
  }

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('button,a,[role="button"]');
    if (!btn) return;
    const idClass = `${btn.id || ''} ${typeof btn.className === 'string' ? btn.className : ''} ${btn.getAttribute('aria-label') || ''} ${btn.title || ''} ${btn.textContent || ''}`.toLowerCase();
    if (/\binfo\b|information|donation|ⓘ|ℹ/.test(idClass)) setTimeout(upgrade, 0);
  }, true);

  document.addEventListener('change', (event) => {
    if (event.target.matches?.('select') && /lang|language/i.test(`${event.target.id} ${event.target.name} ${event.target.getAttribute('aria-label') || ''}`)) setTimeout(upgrade, 0);
  });

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.ag-copy');
    if (!button) return;
    const value = button.dataset.copy || '';
    const lang = getLanguage(button.closest('.ag-support-standard') || document), t = i18n[lang] || i18n.en;
    try { await navigator.clipboard.writeText(value); }
    catch {
      const ta = document.createElement('textarea'); ta.value = value; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    const old = button.textContent; button.textContent = t.copied; setTimeout(() => button.textContent = old || t.copy, 1300);
  });

  const observer = new MutationObserver(() => { clearTimeout(observer._t); observer._t = setTimeout(upgrade, 30); });
  observer.observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:['class','style','open']});
  window.addEventListener('load', () => setTimeout(upgrade, 80));
})();