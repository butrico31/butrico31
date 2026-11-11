const fs=require('node:fs');
module.exports=async function(){
 const r=await fetch('https://github.com/users/butrico31/contributions', {headers:{'User-Agent':'butrico31-profile'}});if(!r.ok)throw Error(`Calendário GitHub: ${r.status}`);
 const html=await r.text();const days=[];
 for(const m of html.matchAll(/<td\b[^>]*data-date="[^"]+"[^>]*>/g)){const tag=m[0],date=/data-date="([^"]+)"/.exec(tag)?.[1],level=/data-level="(\d)"/.exec(tag)?.[1];if(date&&level)days.push({date,level:Number(level)});}
 days.sort((a,b)=>a.date.localeCompare(b.date));if(days.length<300)throw Error('Calendário incompleto; dados anteriores preservados.');
 fs.writeFileSync('assets/profile/contributions.json',JSON.stringify({username:'butrico31',updatedAt:new Date().toISOString(),days},null,2)+'\n');
};
