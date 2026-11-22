/* Apps & Games — QR Code Generator PWA v1.3.0.
 * Additive layer: never reads generator form fields, QR contents, network credentials
 * or contacts. Persists no user data. Only reads the current UI language. */
const ROOT_PATH = new URL('../../', import.meta.url).pathname;
const FILE_WORDS = Object.freeze({"en":["File name (optional)","Automatic unique filename","Leave blank for a unique filename. Avoid private details.","Offline content ready."],"hr":["Naziv datoteke (neobavezno)","Automatski jedinstveni naziv","Ostavi prazno za automatski naziv. Ne upisuj osobne podatke.","Spremno za rad bez interneta."],"de":["Dateiname (optional)","Automatischer eindeutiger Name","Leer lassen für einen eindeutigen Namen. Keine privaten Angaben.","Offline-Inhalte sind bereit."],"it":["Nome file (facoltativo)","Nome univoco automatico","Lascia vuoto per un nome univoco. Evita dati personali.","Contenuti offline pronti."],"es":["Nombre de archivo (opcional)","Nombre único automático","Déjalo vacío para un nombre único. Evita datos personales.","Contenido sin conexión listo."],"fr":["Nom du fichier (facultatif)","Nom unique automatique","Laisser vide pour un nom unique. Éviter les données privées.","Contenu hors ligne prêt."]});
const WORDS = Object.freeze({
  en: {
    open:'Install', title:'Install QR Code Generator', intro:'Add this private QR tool to your device. After the first successful visit, the generator works offline.',
    install:'Install Web App', continue:'Continue in browser', close:'Close', instructions:'How to install',
    manualDesktop:'Use your browser menu and select “Install app” or “Install this site as an app”. In Chrome or Edge you can also check the install icon in the address bar.',
    manualAndroid:'Open the browser menu (⋮) and select “Install app” or “Add to Home screen”.',
    manualIos:'In Safari, tap Share and then “Add to Home Screen”. Installation from some other iOS browsers can differ.',
    manualOther:'Use your browser’s menu for “Install app” or “Add to Home screen”. If unavailable, you can continue using the website.',
    installed:'The app is already running in installed mode.',
    unavailable:'Automatic installation is not available here. You can use the browser instructions below.',
    declined:'Installation was not completed. You can try again from the browser menu.',
    update:'A new version is ready. Save any QR image you need before reloading; form content is not saved.',
    reload:'Update app', offline:'Offline mode. The QR tools remain available if the initial app installation completed.',
    offlineUnready:'You are offline. Open the app online once to finish offline setup.',
    info:'PWA v1.3.0: install from a compatible browser and use locally cached app files offline after initial loading. Clipboard, print, GPS and installing depend on browser permissions and platform support.'
  },
  hr: {
    open:'Instaliraj', title:'Instaliraj QR Code Generator', intro:'Dodaj privatni QR alat na svoj uređaj. Nakon prvog uspješnog posjeta generator radi i bez interneta.',
    install:'Instaliraj web-aplikaciju', continue:'Nastavi u pregledniku', close:'Zatvori', instructions:'Upute za instalaciju',
    manualDesktop:'U izborniku preglednika odaberi „Instaliraj aplikaciju” ili „Instaliraj ovu stranicu kao aplikaciju”. U Chromeu ili Edgeu provjeri i ikonu u adresnoj traci.',
    manualAndroid:'Otvori izbornik preglednika (⋮) i odaberi „Instaliraj aplikaciju” ili „Dodaj na početni zaslon”.',
    manualIos:'U Safariju dodirni „Dijeli” i zatim „Dodaj na početni zaslon”. Postupak u drugim iOS preglednicima može se razlikovati.',
    manualOther:'U izborniku preglednika potraži „Instaliraj aplikaciju” ili „Dodaj na početni zaslon”. Ako nema te mogućnosti, nastavi u pregledniku.',
    installed:'Aplikacija se već izvodi u instaliranom načinu.',
    unavailable:'Automatska instalacija ovdje nije dostupna. Slijedi upute preglednika u nastavku.',
    declined:'Instalacija nije dovršena. Možeš ponovno pokušati iz izbornika preglednika.',
    update:'Dostupna je nova verzija. Prije osvježavanja spremi potrebne QR slike; unos u obrasce se ne sprema.',
    reload:'Ažuriraj aplikaciju', offline:'Izvanmrežni način. QR alati dostupni su ako je početna instalacija dovršena.',
    offlineUnready:'Nema interneta. Otvori aplikaciju jednom uz internet kako bi dovršio izvanmrežnu pripremu.',
    info:'PWA v1.3.0: instaliraj iz kompatibilnog preglednika i nakon prvog učitavanja koristi lokalno predmemorirane datoteke bez interneta. Međuspremnik, ispis, GPS i instalacija ovise o dopuštenjima preglednika i platformi.'
  },
  de: {
    open:'Installieren', title:'QR Code Generator installieren', intro:'Füge das private QR-Tool deinem Gerät hinzu. Nach dem ersten erfolgreichen Besuch funktioniert der Generator offline.',
    install:'Web-App installieren', continue:'Im Browser fortfahren', close:'Schließen', instructions:'Installationsanleitung',
    manualDesktop:'Öffne das Browsermenü und wähle „App installieren“ oder „Diese Website als App installieren“. In Chrome oder Edge gibt es eventuell ein Symbol in der Adressleiste.',
    manualAndroid:'Öffne das Browsermenü (⋮) und wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“.',
    manualIos:'Tippe in Safari auf „Teilen“ und dann auf „Zum Home-Bildschirm“. Andere iOS-Browser können abweichen.',
    manualOther:'Suche im Browsermenü nach „App installieren“ oder „Zum Startbildschirm hinzufügen“. Andernfalls nutze die Webseite weiter.',
    installed:'Die App läuft bereits im installierten Modus.',
    unavailable:'Die automatische Installation ist hier nicht verfügbar. Nutze die Browseranleitung unten.',
    declined:'Die Installation wurde nicht abgeschlossen. Versuche es erneut über das Browsermenü.',
    update:'Eine neue Version ist verfügbar. Speichere benötigte QR-Bilder vor dem Neuladen; Formulareingaben werden nicht gespeichert.',
    reload:'App aktualisieren', offline:'Offline-Modus. Die QR-Funktionen bleiben nach erfolgreicher Ersteinrichtung verfügbar.',
    offlineUnready:'Keine Internetverbindung. Öffne die App einmal online, um den Offline-Modus einzurichten.',
    info:'PWA v1.3.0: über einen kompatiblen Browser installieren und nach dem ersten Laden mit lokal zwischengespeicherten Dateien offline nutzen. Zwischenablage, Druck, GPS und Installation hängen von Berechtigungen und Plattform ab.'
  },
  it: {
    open:'Installa', title:'Installa QR Code Generator', intro:'Aggiungi questo strumento QR privato al dispositivo. Dopo il primo accesso riuscito, il generatore funziona offline.',
    install:'Installa app web', continue:'Continua nel browser', close:'Chiudi', instructions:'Come installare',
    manualDesktop:'Apri il menu del browser e scegli “Installa app” o “Installa questo sito come app”. In Chrome o Edge controlla anche l’icona nella barra degli indirizzi.',
    manualAndroid:'Apri il menu del browser (⋮) e scegli “Installa app” o “Aggiungi alla schermata Home”.',
    manualIos:'In Safari tocca Condividi, poi “Aggiungi alla schermata Home”. Altri browser iOS possono funzionare diversamente.',
    manualOther:'Cerca “Installa app” o “Aggiungi alla schermata Home” nel menu del browser. Se non disponibile, continua sul sito.',
    installed:'L’app è già in esecuzione in modalità installata.',
    unavailable:'L’installazione automatica non è disponibile. Segui le istruzioni del browser riportate sotto.',
    declined:'Installazione non completata. Puoi riprovare dal menu del browser.',
    update:'È disponibile una nuova versione. Salva le immagini QR necessarie prima di ricaricare; i dati del modulo non vengono salvati.',
    reload:'Aggiorna app', offline:'Modalità offline. Le funzioni QR rimangono disponibili dopo la prima configurazione.',
    offlineUnready:'Sei offline. Apri l’app una volta online per completare la configurazione offline.',
    info:'PWA v1.3.0: installabile da browser compatibili; dopo il primo caricamento, i file dell’app sono disponibili offline. Appunti, stampa, GPS e installazione dipendono da permessi e piattaforma.'
  },
  es: {
    open:'Instalar', title:'Instalar QR Code Generator', intro:'Añade esta herramienta QR privada a tu dispositivo. Tras la primera visita correcta, el generador funciona sin conexión.',
    install:'Instalar aplicación web', continue:'Continuar en el navegador', close:'Cerrar', instructions:'Cómo instalar',
    manualDesktop:'Abre el menú del navegador y elige “Instalar aplicación” o “Instalar este sitio como aplicación”. En Chrome o Edge también puedes buscar el icono en la barra de direcciones.',
    manualAndroid:'Abre el menú del navegador (⋮) y elige “Instalar aplicación” o “Añadir a la pantalla de inicio”.',
    manualIos:'En Safari, toca Compartir y luego “Añadir a la pantalla de inicio”. Otros navegadores de iOS pueden funcionar de otra manera.',
    manualOther:'Busca “Instalar aplicación” o “Añadir a la pantalla de inicio” en el menú. Si no aparece, sigue utilizando el sitio web.',
    installed:'La aplicación ya se está ejecutando en modo instalado.',
    unavailable:'La instalación automática no está disponible aquí. Sigue las instrucciones del navegador.',
    declined:'No se completó la instalación. Puedes volver a intentarlo desde el menú del navegador.',
    update:'Hay una nueva versión disponible. Guarda antes las imágenes QR necesarias; los datos del formulario no se guardan.',
    reload:'Actualizar app', offline:'Modo sin conexión. Las herramientas QR siguen disponibles tras la configuración inicial.',
    offlineUnready:'No hay conexión. Abre la aplicación una vez con Internet para preparar el modo sin conexión.',
    info:'PWA v1.3.0: instálala desde un navegador compatible y usa los archivos almacenados localmente sin conexión después de la primera carga. Portapapeles, impresión, GPS e instalación dependen de los permisos y la plataforma.'
  },
  fr: {
    open:'Installer', title:'Installer QR Code Generator', intro:'Ajoutez cet outil QR privé à votre appareil. Après une première visite réussie, le générateur fonctionne hors ligne.',
    install:'Installer l’application web', continue:'Continuer dans le navigateur', close:'Fermer', instructions:'Instructions d’installation',
    manualDesktop:'Ouvrez le menu du navigateur et choisissez « Installer l’application » ou « Installer ce site en tant qu’application ». Dans Chrome ou Edge, vérifiez aussi l’icône dans la barre d’adresse.',
    manualAndroid:'Ouvrez le menu du navigateur (⋮) et choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».',
    manualIos:'Dans Safari, touchez Partager puis « Sur l’écran d’accueil ». Les autres navigateurs iOS peuvent différer.',
    manualOther:'Cherchez « Installer l’application » ou « Ajouter à l’écran d’accueil » dans le menu. Sinon, continuez dans le navigateur.',
    installed:'L’application fonctionne déjà en mode installé.',
    unavailable:'L’installation automatique n’est pas disponible ici. Suivez les instructions du navigateur ci-dessous.',
    declined:'L’installation n’a pas été terminée. Vous pouvez réessayer depuis le menu du navigateur.',
    update:'Une nouvelle version est disponible. Enregistrez vos images QR avant de recharger ; les champs du formulaire ne sont pas sauvegardés.',
    reload:'Mettre à jour', offline:'Mode hors ligne. Les fonctions QR restent disponibles après la configuration initiale.',
    offlineUnready:'Vous êtes hors ligne. Ouvrez l’application une fois avec Internet pour préparer le mode hors ligne.',
    info:'PWA v1.3.0 : installation dans un navigateur compatible et utilisation hors ligne des fichiers en cache après le premier chargement. Presse-papiers, impression, GPS et installation dépendent des autorisations et de la plateforme.'
  }
});

const byId = id => document.getElementById(id);
const element = (tag, cls, text = '') => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
};
let deferredPrompt = null;
let registration = null;
let reloadOnControllerChange = false;
let statusOverride = '';
let offlinePrepared = false;
const alreadyInstalled = () => window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
const language = () => WORDS[document.documentElement.lang] ? document.documentElement.lang : 'en';
const words = () => WORDS[language()];
const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = () => /Android/i.test(navigator.userAgent);
function helpText() {
  const w = words();
  if (isIos()) return w.manualIos;
  if (isAndroid()) return w.manualAndroid;
  if (/Windows|Macintosh|Linux/i.test(navigator.userAgent)) return w.manualDesktop;
  return w.manualOther;
}

const header = document.querySelector('.site-header');
if (header && document.querySelector('.header-tools')) {
  const openButton = element('button', 'pwa-install-open');
  openButton.id = 'pwa-install-open'; openButton.type = 'button';
  const infoButton = byId('info-button');
  if (infoButton?.parentNode) infoButton.insertAdjacentElement('beforebegin', openButton);
  else document.querySelector('.header-tools').append(openButton);

  const panel = element('section', 'pwa-install-panel');
  panel.id = 'pwa-install-panel'; panel.hidden = true;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', 'pwa-panel-title');
  const head = element('div', 'pwa-panel-head');
  const mark = element('img', 'pwa-panel-icon');
  mark.src = 'assets/images/pwa-192.png'; mark.alt = ''; mark.width = 38; mark.height = 38;
  const headings = element('div', 'pwa-panel-titles');
  const title = element('h2', 'pwa-panel-title'); title.id = 'pwa-panel-title';
  const intro = element('p', 'pwa-panel-text'); intro.id = 'pwa-panel-intro';
  headings.append(title, intro);
  const close = element('button', 'pwa-panel-close', '×'); close.type = 'button'; close.id = 'pwa-panel-close';
  const actions = element('div', 'pwa-panel-actions');
  const install = element('button', 'pwa-choice pwa-choice-primary'); install.id = 'pwa-install-action'; install.type = 'button';
  const browse = element('button', 'pwa-choice'); browse.id = 'pwa-continue-action'; browse.type = 'button';
  actions.append(install, browse);
  const help = element('p','pwa-panel-help'); help.id = 'pwa-panel-help';
  head.append(mark, headings, close);
  panel.append(head, actions, help);
  header.insertAdjacentElement('afterend', panel);

  const banner = element('div', 'pwa-update-banner'); banner.id = 'pwa-update-banner'; banner.hidden = true;
  banner.setAttribute('role','status');
  const updateMessage = element('span','');
  const updateButton = element('button','pwa-update-button'); updateButton.type = 'button';
  banner.append(updateMessage, updateButton);
  panel.insertAdjacentElement('afterend', banner);

  const connection = element('p','pwa-connection-note'); connection.id = 'pwa-connection-note';
  connection.hidden = true; connection.setAttribute('role','status');
  banner.insertAdjacentElement('afterend', connection);

  const compatibility = document.querySelector('#info-dialog [data-i18n="infoCompatibilityBody"]');
  const infoPwa = element('p','pwa-info-text'); infoPwa.id = 'pwa-info-text';
  compatibility?.insertAdjacentElement('afterend', infoPwa);

  const isShowing = () => !panel.hidden;
  function removeInstallParameter() {
    try {
      const address = new URL(window.location.href);
      if (!address.searchParams.has('install')) return;
      address.searchParams.delete('install');
      history.replaceState(history.state, '', address.pathname + address.search + address.hash);
    } catch { /* history is unavailable; harmless */ }
  }
  function showPanel() {
    panel.hidden = false;
    sync();
  }
  function closePanel() {
    panel.hidden = true;
    removeInstallParameter();
    openButton.focus({preventScroll:true});
  }
  function sync() {
    const w = words();
    const installed = alreadyInstalled();
    openButton.textContent = '⊕ ' + w.open;
    openButton.hidden = installed;
    title.textContent = w.title;
    intro.textContent = installed ? w.installed : w.intro;
    close.setAttribute('aria-label', w.close);
    browse.textContent = w.continue;
    install.textContent = deferredPrompt ? w.install : w.instructions;
    install.hidden = installed;
    help.textContent = installed ? '' : (statusOverride ? statusOverride :
      (!deferredPrompt ? `${w.unavailable}\n${helpText()}` : ''));
    updateMessage.textContent = w.update;
    updateButton.textContent = w.reload;
    infoPwa.textContent = w.info;
    const [label,placeholder,hint,readyText] = FILE_WORDS[language()];
    document.getElementById('export-filename-label').textContent = label;
    document.getElementById('export-filename').placeholder = placeholder;
    document.getElementById('export-filename-hint').textContent = hint;
    const disconnected = !navigator.onLine;
    connection.hidden = !disconnected && !offlinePrepared;
    connection.textContent = disconnected ?
      (offlinePrepared ? w.offline : w.offlineUnready) : (offlinePrepared ? readyText : '');
  }
  openButton.addEventListener('click', () => { isShowing() ? closePanel() : showPanel(); });
  close.addEventListener('click',closePanel);
  browse.addEventListener('click',closePanel);
  panel.addEventListener('keydown',e => { if (e.key === 'Escape') {e.preventDefault(); closePanel();} });
  install.addEventListener('click',async () => {
    if (!deferredPrompt) {
      statusOverride = words().unavailable + '\n' + helpText(); sync(); return;
    }
    const prompt = deferredPrompt;
    deferredPrompt = null;
    try {
      await prompt.prompt();
      const result = await prompt.userChoice;
      if (result?.outcome === 'accepted') {panel.hidden = true; removeInstallParameter();}
      else {statusOverride = words().declined + '\n' + helpText();}
    } catch {statusOverride = words().unavailable + '\n' + helpText();}
    sync();
  });
  window.addEventListener('beforeinstallprompt',event => {
    event.preventDefault();
    deferredPrompt = event; statusOverride = ''; sync();
  });
  window.addEventListener('appinstalled',() => {
    deferredPrompt = null; panel.hidden = true; removeInstallParameter(); sync();
  });
  window.addEventListener('online',sync);
  window.addEventListener('offline',sync);
  new MutationObserver(mutations => {
    if (mutations.some(m => m.attributeName === 'lang')) {statusOverride = ''; sync();}
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  updateButton.addEventListener('click', () => {
    if (!registration?.waiting) return;
    reloadOnControllerChange = true;
    registration.waiting.postMessage({type:'SKIP_WAITING'});
  });
  function showUpdateWhenWaiting() {
    banner.hidden = !(registration?.waiting && navigator.serviceWorker?.controller);
  }
  async function checkOfflineFiles() {
    if (!('caches' in window)) return;
    try {
      const names = (await caches.keys()).filter(x => x.startsWith('ag-qr-code-generator-shell-'));
      const paths = ['index.html','assets/css/styles.css','assets/css/pwa.css',
        'assets/js/app.mjs','assets/js/i18n.mjs','assets/js/payload.mjs',
        'assets/js/renderer.mjs','assets/js/vendor/qr-engine.mjs','assets/js/pwa.mjs'];
      const base = new URL(ROOT_PATH, location.origin);
      offlinePrepared = false;
      for (const name of names) {
        const cache = await caches.open(name);
        if ((await Promise.all(paths.map(path => cache.match(new URL(path,base))))).every(Boolean)) {offlinePrepared=true;break;}
      }
      sync();
    } catch { /* Cache API unavailable or disabled. */ }
  }
  async function enablePwa() {
    if (!window.isSecureContext || !('serviceWorker' in navigator) ||
        !window.location.pathname.startsWith(ROOT_PATH)) return;
    try {
      const workerUrl = new URL('../../sw.js',import.meta.url);
      registration = await navigator.serviceWorker.register(workerUrl.href, {
        scope:ROOT_PATH,updateViaCache:'none'
      });
      showUpdateWhenWaiting();
      navigator.serviceWorker.ready.then(checkOfflineFiles).catch(() => {});
      checkOfflineFiles();
      registration.addEventListener('updatefound',() => {
        const worker = registration.installing;
        worker?.addEventListener('statechange',() => {
          if (worker.state === 'installed') {showUpdateWhenWaiting();checkOfflineFiles();}
        });
      });
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloadOnControllerChange) window.location.reload();
        else {sync();checkOfflineFiles();}
      });
      // update() is intentionally limited to normal page loads; no periodic polling.
      registration.update().catch(() => {});
    } catch { /* The ordinary web generator remains usable. */ }
  }
  if (new URL(location.href).searchParams.get('install') === 'web') showPanel();
  sync();
  // Also inspect the existing cache when an installed app starts fully offline.
  checkOfflineFiles();
  enablePwa();
}
