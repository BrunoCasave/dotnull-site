const metadata = {"de": {"home": "Durchschnittsgewicht — Heute eintragen.  Den Verlauf erkennen. ", "privacy": "Datenschutzerklärung | Durchschnittsgewicht", "support": "Support | Durchschnittsgewicht", "description": "Tägliches Gewicht erfassen und mit dem 7-Tage-Durchschnitt den Verlauf erkennen. Durchschnittsgewicht: ohne Konto, mit Einträgen auf deinem Gerät."}, "it": {"home": "Peso medio — Registra oggi.  Osserva l’andamento. ", "privacy": "Informativa sulla privacy | Peso medio", "support": "Assistenza | Peso medio", "description": "Registra il peso ogni giorno e osserva l’andamento con la media di 7 giorni. Peso medio: nessun account, dati sul tuo dispositivo."}, "zh-Hant": {"home": "平均體重 — 記錄今天。  用平均看變化。 ", "privacy": "隱私權政策 | 平均體重", "support": "支援 | 平均體重", "description": "每天記錄體重，用7日平均掌握變化。平均體重：不需帳號，紀錄只存在你的裝置。"}, "pt-BR": {"home": "Peso médio — Registre hoje.  Acompanhe a tendência. ", "privacy": "Política de privacidade | Peso médio", "support": "Suporte | Peso médio", "description": "Registre seu peso todos os dias e acompanhe a tendência com a média de 7 dias. Peso médio: sem conta, com registros no seu dispositivo."}, "ja": {"home": "平均体重 — 今日を記録して、7日平均を見る。", "privacy": "プライバシーポリシー | 平均体重", "support": "サポート | 平均体重", "description": "毎日の体重を記録して、7日平均で変化を確認。アカウント不要、記録は端末内に保存。"}, "en": {"home": "Average Weight — Log today. See the trend.", "privacy": "Privacy policy | Average Weight", "support": "Support | Average Weight", "description": "Log your daily weight and follow your seven-day average. No account needed. Records stay on your device."}};
function resolveWebLanguage(value) {
  const tag = (value || '').replaceAll('_', '-').toLowerCase();
  if (/^zh-(hant|tw|hk|mo)(-|$)/.test(tag)) return 'zh-Hant';
  if (tag === 'pt' || tag.startsWith('pt-')) return 'pt-BR';
  const base = tag.split('-')[0];
  return ['ja', 'en', 'de', 'it'].includes(base) ? base : 'en';
}
const query = new URLSearchParams(location.search).get('lang');
const initial = resolveWebLanguage(query || navigator.language);
function selectLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-lang]').forEach(element => { element.hidden = element.dataset.lang !== language; });
  document.querySelectorAll('a[data-local]').forEach(element => {
    const url = new URL(element.href);
    url.searchParams.set('lang', language);
    element.href = url.href;
  });
  const route = location.pathname.includes('/privacy') ? 'privacy' : location.pathname.includes('/support') ? 'support' : 'home';
  document.title = metadata[language][route];
  document.querySelector('meta[name="description"]').content = metadata[language].description;
  document.querySelector('#language-select').value = language;
}
selectLanguage(initial);
document.querySelector('#language-select').addEventListener('change', event => {
  const language = event.target.value;
  selectLanguage(language);
  const url = new URL(location.href);
  url.searchParams.set('lang', language);
  if (url.hash.startsWith('#how-')) url.hash = '#how-' + language;
  history.replaceState(null, '', url);
});
