'use strict';
const languageSelect = document.querySelector('[data-language]');
if (languageSelect) languageSelect.addEventListener('change', event => {
  const target = new URL(event.target.value, location.href);
  if (target.origin === location.origin) location.assign(target.href);
});
