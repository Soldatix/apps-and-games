/* Apps & Games — Mobile Network Coverage. Local UI only; nPerf controls its map. */
(() => {
  'use strict';
  const STORE_LANG = 'appsGamesLanguage';
  const SUPPORTED = ['en','hr','de','it','es'];
  const COUNTRY_CODES = ['CH','HR','DE','IT','AT','FR','ES','GB','US'];
  const FLAGS = {CH:'🇨🇭',HR:'🇭🇷',DE:'🇩🇪',IT:'🇮🇹',AT:'🇦🇹',FR:'🇫🇷',ES:'🇪🇸',GB:'🇬🇧',US:'🇺🇸'};
  const LANG = {
    en:{apps:'Apps',games:'Games',info:'Info',eyebrow:'APPS & GAMES · POWERED BY nPerf',title:'Mobile Network Coverage',intro:'Explore mobile coverage and real-world connection speeds on interactive nPerf maps. Compare available national operators and technology where data is available.',speedMaps:'Speed maps',nineCountries:'9 countries',mapHeading:'Explore the nPerf map',mapIntro:'Choose an available country, operator or map layer using the controls inside the map.',mapNote:'Map data and controls are provided by nPerf and update automatically. Map availability varies by country and operator.',coverageTitle:'Network coverage',coverageBody:'View reported mobile network coverage, including 4G and 5G layers wherever nPerf offers them.',speedsTitle:'Measured speeds',speedsBody:'Explore maps of real-world mobile internet measurements. They provide an indication, not a guaranteed speed at every address.',countriesHeading:'Licensed countries',countriesIntro:'The initial free nPerf license covers these nine requested countries.',aboutTitle:'About these maps',aboutBody:'This page embeds nPerf’s official consultation maps. nPerf reports that these maps update every four hours and do not collect visitor data. The coverage and speed shown are informational and may not reflect your exact location indoors or at a given time.',nperfLink:'Learn more about nPerf',privacy:'Privacy Policy',home:'Home',theme:'Toggle light or dark theme',language:'Select language'},
    hr:{apps:'Aplikacije',games:'Igre',info:'Info',eyebrow:'APPS & GAMES · KARTE nPerf',title:'Pokrivenost mobilnih mreža',intro:'Istraži pokrivenost mobilnim mrežama i izmjerene brzine na interaktivnim kartama nPerfa. Usporedi dostupne operatere i tehnologije tamo gdje postoje podaci.',speedMaps:'Karte brzina',nineCountries:'9 država',mapHeading:'Istraži nPerf kartu',mapIntro:'Odaberi državu, operatera ili sloj putem kontrola unutar karte.',mapNote:'Podatke i kontrole karte pruža nPerf, a karte se automatski ažuriraju. Dostupnost ovisi o državi i operateru.',coverageTitle:'Pokrivenost mrežom',coverageBody:'Pogledaj prikazanu pokrivenost mobilnom mrežom, uključujući 4G i 5G tamo gdje nPerf ima podatke.',speedsTitle:'Izmjerene brzine',speedsBody:'Istraži karte stvarnih mjerenja brzine mobilnog interneta. Rezultati nisu jamstvo brzine na svakoj adresi.',countriesHeading:'Države obuhvaćene licencom',countriesIntro:'Početna besplatna nPerf licenca obuhvaća ovih devet zatraženih država.',aboutTitle:'O ovim kartama',aboutBody:'Stranica prikazuje službene nPerf karte. Prema nPerfu, ažuriraju se svaka četiri sata i ne prikupljaju podatke posjetitelja. Pokrivenost i brzine informativne su i ne moraju odgovarati stanju u zatvorenom prostoru ili u određenom trenutku.',nperfLink:'Više o nPerfu',privacy:'Pravila privatnosti',home:'Početna',theme:'Promijeni svijetlu ili tamnu temu',language:'Odaberi jezik'},
    de:{apps:'Apps',games:'Spiele',info:'Info',eyebrow:'APPS & GAMES · nPerf-KARTEN',title:'Mobilfunk-Netzabdeckung',intro:'Entdecke Netzabdeckung und gemessene mobile Internetgeschwindigkeiten auf interaktiven nPerf-Karten. Vergleiche nationale Anbieter und Technologien, wo Daten verfügbar sind.',speedMaps:'Geschwindigkeitskarten',nineCountries:'9 Länder',mapHeading:'nPerf-Karte erkunden',mapIntro:'Wähle Land, Betreiber oder Kartenebene direkt in der Karte.',mapNote:'Die Kartendaten und Bedienelemente stammen von nPerf und werden automatisch aktualisiert. Verfügbarkeit je nach Land und Anbieter.',coverageTitle:'Netzabdeckung',coverageBody:'Sieh dir die gemeldete Mobilfunkabdeckung einschließlich 4G und 5G an, wo Daten verfügbar sind.',speedsTitle:'Gemessene Geschwindigkeiten',speedsBody:'Erkunde Karten tatsächlicher mobiler Geschwindigkeitsmessungen – keine Garantie für jede Adresse.',countriesHeading:'Lizenzierte Länder',countriesIntro:'Die kostenlose nPerf-Lizenz umfasst zunächst diese neun Länder.',aboutTitle:'Über diese Karten',aboutBody:'Diese Website bindet offizielle nPerf-Karten ein. Laut nPerf werden sie alle vier Stunden aktualisiert und erfassen keine Besucherdaten. Die Werte sind informativ und können vor Ort abweichen.',nperfLink:'Mehr über nPerf',privacy:'Datenschutzerklärung',home:'Startseite',theme:'Helles oder dunkles Design wechseln',language:'Sprache wählen'},
    it:{apps:'App',games:'Giochi',info:'Info',eyebrow:'APPS & GAMES · MAPPE nPerf',title:'Copertura delle reti mobili',intro:'Esplora copertura mobile e velocità misurate sulle mappe interattive nPerf. Confronta operatori e tecnologie dove sono disponibili dati.',speedMaps:'Mappe delle velocità',nineCountries:'9 paesi',mapHeading:'Esplora la mappa nPerf',mapIntro:'Scegli paese, operatore o livello tramite i controlli nella mappa.',mapNote:'Mappe e controlli sono forniti da nPerf e aggiornati automaticamente. La disponibilità varia per paese e operatore.',coverageTitle:'Copertura di rete',coverageBody:'Visualizza la copertura mobile segnalata, comprese le reti 4G e 5G, dove disponibile.',speedsTitle:'Velocità misurate',speedsBody:'Esplora le mappe delle velocità reali; non garantiscono una velocità specifica per ogni indirizzo.',countriesHeading:'Paesi con licenza',countriesIntro:'La licenza gratuita nPerf iniziale copre questi nove paesi.',aboutTitle:'Informazioni sulle mappe',aboutBody:'Questa pagina incorpora le mappe ufficiali nPerf. Secondo nPerf vengono aggiornate ogni quattro ore e non raccolgono dati dei visitatori. I valori sono indicativi e possono variare sul posto.',nperfLink:'Scopri nPerf',privacy:'Informativa sulla privacy',home:'Home',theme:'Cambia tema chiaro o scuro',language:'Scegli la lingua'},
    es:{apps:'Apps',games:'Juegos',info:'Info',eyebrow:'APPS & GAMES · MAPAS nPerf',title:'Cobertura de redes móviles',intro:'Explora la cobertura móvil y las velocidades medidas en mapas interactivos de nPerf. Compara operadores y tecnologías donde haya datos.',speedMaps:'Mapas de velocidad',nineCountries:'9 países',mapHeading:'Explorar mapa nPerf',mapIntro:'Selecciona país, operador o capa con los controles del mapa.',mapNote:'nPerf proporciona y actualiza automáticamente los datos y controles. La disponibilidad varía según el país y operador.',coverageTitle:'Cobertura de red',coverageBody:'Consulta la cobertura móvil indicada, incluidas las capas 4G y 5G donde estén disponibles.',speedsTitle:'Velocidades medidas',speedsBody:'Explora mapas de mediciones reales; no garantizan una velocidad determinada en cada dirección.',countriesHeading:'Países incluidos',countriesIntro:'La licencia gratuita inicial de nPerf incluye estos nueve países.',aboutTitle:'Acerca de estos mapas',aboutBody:'Esta página incorpora los mapas oficiales de nPerf. Según nPerf, se actualizan cada cuatro horas y no recogen datos de los visitantes. Los resultados son orientativos y pueden variar en cada ubicación.',nperfLink:'Más sobre nPerf',privacy:'Política de privacidad',home:'Inicio',theme:'Cambiar tema claro u oscuro',language:'Seleccionar idioma'}
  };
  const picker = document.getElementById('languageSelect');
  const theme = document.getElementById('themeToggle');
  const preferred = (() => {try {return localStorage.getItem(STORE_LANG)} catch (_) {return null}})();
  const browser = (navigator.language || 'en').slice(0,2).toLowerCase();
  let language = SUPPORTED.includes(preferred) ? preferred : (SUPPORTED.includes(browser) ? browser : 'en');
  function setLanguage(next) {
    language = SUPPORTED.includes(next) ? next : 'en';
    const t = LANG[language];
    document.documentElement.lang = language;
    picker.value = language;
    picker.setAttribute('aria-label',t.language);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    let names;
    try {names = new Intl.DisplayNames([language],{type:'region'})} catch (_) {names = new Intl.DisplayNames(['en'],{type:'region'})}
    const countryList = document.getElementById('countryList');
    countryList.replaceChildren();
    for (const code of COUNTRY_CODES) {
      const li = document.createElement('li');
      const flag = document.createElement('span');
      flag.className = 'flag'; flag.textContent = FLAGS[code]; flag.setAttribute('aria-hidden','true');
      li.append(flag,document.createTextNode(names.of(code) || code));
      countryList.appendChild(li);
    }
    theme.title=t.theme;theme.setAttribute('aria-label',t.theme);
    try { localStorage.setItem(STORE_LANG,language) } catch (_) {}
  }
  function setTheme(choice) {
    const light=choice==='light';
    if(light) document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    theme.textContent=light?'🌙':'☀️';
  }
  picker.addEventListener('change',()=>setLanguage(picker.value));
  theme.addEventListener('click',()=>{
    const next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
    setTheme(next);try{localStorage.setItem('theme',next)}catch(_){}
  });
  setTheme(document.documentElement.getAttribute('data-theme')==='light'?'light':'dark');
  setLanguage(language);
  document.getElementById('year').textContent=String(new Date().getFullYear());
})();
