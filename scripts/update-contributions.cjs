const fs=require('node:fs');
module.exports=async function(){
 const token=process.env.PROFILE_TOKEN;
 if(token){
  const response=await fetch('https://api.github.com/graphql',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json','User-Agent':'butrico31-profile'},body:JSON.stringify({query:'query { user(login: "butrico31") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }'})});
  if(!response.ok)throw Error('Calend?rio autenticado: '+response.status);
  const result=await response.json();if(result.errors?.length)throw Error('Falha no calend?rio autenticado; dados anteriores preservados.');
  const calendar=result.data?.user?.contributionsCollection?.contributionCalendar;
  const levels=['NONE','FIRST_QUARTILE','SECOND_QUARTILE','THIRD_QUARTILE','FOURTH_QUARTILE'];
  const days=calendar?.weeks.flatMap(w=>w.contributionDays.map(d=>({date:d.date,count:d.contributionCount,level:levels.indexOf(d.contributionLevel)}))).sort((a,b)=>a.date.localeCompare(b.date));
  if(!days||days.length<300||days.some(d=>d.level<0||!Number.isInteger(d.count)))throw Error('Calend?rio autenticado incompleto; dados anteriores preservados.');
  fs.writeFileSync('assets/profile/contributions.json',JSON.stringify({username:'butrico31',updatedAt:new Date().toISOString(),source:'authenticated',totalContributions:calendar.totalContributions,days},null,2)+'\n');
  return;
 }
 const r=await fetch('https://github.com/users/butrico31/contributions', {headers:{'User-Agent':'butrico31-profile'}});if(!r.ok)throw Error(`Calendário GitHub: ${r.status}`);
 const html=await r.text();const days=[];const totalContributions=Number(/([\d,]+)\s+contributions\s+in the last year/.exec(html)?.[1]?.replaceAll(',',''));if(!Number.isFinite(totalContributions))throw Error('Total de contribui??es ausente.');
 for(const m of html.matchAll(/<td\b[^>]*data-date="[^"]+"[^>]*>/g)){const tag=m[0],date=/data-date="([^"]+)"/.exec(tag)?.[1],level=/data-level="(\d)"/.exec(tag)?.[1];if(date&&level)days.push({date,level:Number(level)});}
 days.sort((a,b)=>a.date.localeCompare(b.date));if(days.length<300)throw Error('Calendário incompleto; dados anteriores preservados.');
 fs.writeFileSync('assets/profile/contributions.json',JSON.stringify({username:'butrico31',updatedAt:new Date().toISOString(),source:'public',totalContributions,days},null,2)+'\n');
};
