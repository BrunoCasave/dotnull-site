const allowed = ['ja', 'en'];
const query = new URLSearchParams(location.search).get('lang');
const initial = allowed.includes(query) ? query : (navigator.language.startsWith('ja') ? 'ja' : 'en');
function selectLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-lang]').forEach(element => { element.hidden = element.dataset.lang !== language; });
  document.querySelectorAll('a[data-local]').forEach(element => {
    const url = new URL(element.href);
    url.searchParams.set('lang', language);
    element.href = url.href;
  });
  const route = location.pathname.includes('/privacy') ? 'privacy' : location.pathname.includes('/support') ? 'support' : 'home';
  const titles = {ja: {home:'平均体重 — 今日を記録して、7日平均を見る。', privacy:'プライバシーポリシー | 平均体重', support:'サポート | 平均体重'}, en: {home:'Average Weight — Log today. See the trend.', privacy:'Privacy policy | Average Weight', support:'Support | Average Weight'}};
  document.title = titles[language][route];
  document.querySelector('meta[name="description"]').content = language === 'ja' ? '毎日の体重を記録して、7日平均で変化を確認。アカウント不要、記録は端末内に保存。平均体重の公式サイトです。' : 'Log your daily weight and follow your seven-day average. No account needed. Records stay on your device. The official Average Weight website.';
  document.querySelectorAll('[data-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.select === language)));
}
selectLanguage(initial);
document.querySelectorAll('[data-select]').forEach(button => button.addEventListener('click', () => {
  selectLanguage(button.dataset.select);
  const url = new URL(location.href);
  url.searchParams.set('lang', button.dataset.select);
  if (url.hash === '#how-ja' || url.hash === '#how-en') url.hash = '#how-' + button.dataset.select;
  history.replaceState(null, '', url);
}));
