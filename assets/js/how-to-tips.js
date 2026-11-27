(() => {
  'use strict';
  const root = document.documentElement;
  const read = key => {try{return localStorage.getItem(key)}catch{return null}};
  const write = (key,value) => {try{localStorage.setItem(key,value)}catch{}};
  const supported = ['en','hr','de','it','es'];
  const lang = root.lang;
  if (supported.includes(lang)) write('appsGamesLanguage',lang);
  const menu = document.querySelector('#languageSelect');
  if (menu) menu.addEventListener('change', () => {
    const target = menu.selectedOptions[0]?.dataset.url;
    if (target && /^\/how-to-tips\/(?:[a-z0-9-]+\/)*$/.test(target)) location.assign(target);
  });
  const mode = document.querySelector('#ht-theme');
  const media = matchMedia('(prefers-color-scheme: light)');
  const saved = read('theme');
  let theme = ['light','dark','system'].includes(saved) ? saved : 'system';
  function apply(){const resolved = theme === 'system' ? (media.matches ? 'light' : 'dark') : theme; root.dataset.theme = resolved; if(mode) mode.value=theme;}
  apply();
  if(mode) mode.addEventListener('change',()=>{if(['light','dark','system'].includes(mode.value)){theme=mode.value;write('theme',theme);apply();}});
  media.addEventListener('change',()=>{if(theme==='system')apply()});
  const controls=document.querySelector('.ht-controls'); if(controls)controls.hidden=false;
  // Keep actual links available without JavaScript; the enhanced menu replaces their visual presentation only when available.
  if(menu){
    const label=document.querySelector('label[for="languageSelect"]')?.textContent.trim();
    if(label)menu.setAttribute('aria-label',label);
    if(window.AppsGamesLanguageMenu){
      window.AppsGamesLanguageMenu.enhanceAll();
      const button=document.querySelector('#languageSelectMenuButton');
      function nameMenu(){
        const selected=menu.selectedOptions[0]?.textContent.trim();
        if(button && selected && label)button.setAttribute('aria-label',selected+' — '+label);
      }
      nameMenu();menu.addEventListener('change',nameMenu);
      const links=document.querySelector('.ht-language-links');if(button && links)links.hidden=true;
    }
  }
  const filters=document.querySelector('.ht-filters');
  if(!filters)return;
  const search=document.querySelector('#ht-search'),cat=document.querySelector('#ht-category'),product=document.querySelector('#ht-product'),empty=document.querySelector('#ht-empty');
  const cards=[...document.querySelectorAll('.ht-card')];
  const norm=value=>value.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase(lang).trim();
  function filter(){const words=norm(search.value).split(/\s+/).filter(Boolean);let count=0;for(const card of cards){const visible=(!cat.value||cat.value===card.dataset.category)&&(!product.value||product.value===card.dataset.product)&&words.every(word=>norm(card.textContent).includes(word));card.hidden=!visible;if(visible)count++;}empty.hidden=count!==0;}
  search.addEventListener('input',filter);cat.addEventListener('change',filter);product.addEventListener('change',filter);filters.hidden=false;filter();
})();
