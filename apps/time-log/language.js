function resolveTimeLogLanguage(preferred){
 for(const raw of preferred){
  const l=raw.replaceAll('_','-').toLowerCase(), parts=l.split('-'), code=parts[0];
  if(code==='zh'){
   if(parts.includes('hant'))return 'zh-Hant';
   if(parts.includes('hans'))return 'zh';
   return parts.some(x=>['tw','hk','mo'].includes(x))?'zh-Hant':'zh';
  }
  if(code==='pt')return 'pt-BR';
  if(['ja','en','ko','es','fr','de','it'].includes(code))return code;
 }
 return 'en';
}
