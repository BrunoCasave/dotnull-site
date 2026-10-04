const supported=['ja','en','ko','zh-Hans','zh-Hant','es','fr','de','it','pt-BR'];
function resolveLanguage(tags){for(const tag of tags){const parts=tag.toLowerCase().split('-');if(parts[0]==='zh'){if(parts.includes('hant')||(!parts.includes('hans')&&parts.some(p=>['tw','hk','mo'].includes(p))))return 'zh-Hant';return 'zh-Hans';}if(parts[0]==='pt')return 'pt-BR';if(supported.includes(parts[0]))return parts[0];}return 'en';}
if(typeof navigator!=='undefined'&&typeof location!=='undefined')location.replace(resolveLanguage(navigator.languages||[navigator.language])+'/index.html');
