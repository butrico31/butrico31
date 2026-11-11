const fs=require('node:fs');
module.exports=function buildBanner(){
 const result={};
 for(const [theme,ink,muted,line,cyan,pink,violet] of [['dark','#ecedf7','#98a4b8','#3b435b','#41dce4','#ee76ac','#b69aff'],['light','#222b3c','#606d81','#c9cfde','#087f90','#b83c76','#7951bd']]){
 const t=(x,y,size,color,s,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${s}</text>`;
 let branches='';
 const labels=['JS','React','Vue','Java','C++','Git'];
 labels.forEach((label,i)=>{const x=698+i*90,up=i%2===0,y=up?212:395,c=i%2?pink:cyan,d=`M${x-32} 300Q${x} 300 ${x} ${up?268:332}V${y}`;
 branches+=`<path d="${d}" fill="none" stroke="${line}" stroke-width="1.3"/><path class="signal" d="${d}" fill="none" stroke="${c}" stroke-width="1.8" stroke-dasharray="20 170" style="animation-delay:${i*.32}s"/><circle cx="${x}" cy="${y}" r="3.2" fill="${c}"/><path d="M${x-22} ${up?167:417}h44" stroke="${line}"/>${t(x,up?192:447,18,ink,label,'text-anchor="middle" font-weight="600"')}`;
 });
 const body=`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="550" viewBox="0 0 1280 550" role="img" aria-labelledby="title"><title id="title">Vinicius Butrico — butrico31. Desenvolvimento web, produtos digitais e tecnologias conectadas.</title><style>.name-glitch{animation:nameglitch 4.8s infinite}.name-echo{opacity:0;animation:echo 4.8s infinite;clip-path:url(#glitch-slices)}@keyframes nameglitch{0%,78%,90%,100%{transform:translate(0);opacity:1}79%,83%{transform:translate(-3px,0)}80%,85%{transform:translate(3px,0)}81%,87%{transform:translate(-1px,1px)}82%,88%{transform:translate(1px,-1px)}}@keyframes echo{0%,78%,90%,100%{opacity:0;transform:translate(0)}79%,83%,87%{opacity:.9;transform:translate(7px,0)}80%,84%,88%{opacity:.75;transform:translate(-6px,0)}}.signal{animation:flow 5s linear infinite}@keyframes flow{from{stroke-dashoffset:190}to{stroke-dashoffset:0}}@media(prefers-reduced-motion:reduce){.signal,.name-glitch,.name-echo{animation:none}.name-echo{opacity:0}}</style><g font-family="Arial, Helvetica, sans-serif">
 <path d="M8 88V30L30 8h158M1092 542h158l22-22v-58" fill="none" stroke="${line}"/>
 <path d="M8 52V30L30 8h57M1194 542h56l22-22v-20" fill="none" stroke="${cyan}" stroke-width="1.7"/>
 <path d="M38 8h25M1241 542h9l22-22" fill="none" stroke="${pink}" stroke-width="2"/>
 ${t(56,66,12,cyan,'BUTRICO31 / PERSONAL INTERFACE','letter-spacing="2.8"')}
 ${require('./name-lettering.cjs')(cyan,pink)}
 ${t(57,212,25,muted,'Desenvolvimento web &amp; produtos digitais')}
 ${t(57,251,16,muted,'Ideias em construção. Experiências em evolução.')}
 ${t(1050,66,11,muted,'TOOLCHAIN / CONNECTED','letter-spacing="2" text-anchor="middle"')}
 <path d="M30 300h1218" fill="none" stroke="${line}" stroke-width="1.3"/>
 ${[57,153,249,345,441,537].map(x=>`<circle cx="${x}" cy="300" r="3" fill="none" stroke="${violet}"/>`).join('')}
 ${t(57,285,10,muted,'main','font-family="monospace" letter-spacing="2"')}${branches}
 ${t(56,405,47,ink,'WEB','font-weight="700" letter-spacing="-1"')}
 ${t(298,405,47,violet,'LAB','font-weight="700" letter-spacing="-1"')}
 ${t(58,441,15,muted,'produtos digitais')}${t(300,441,15,muted,'experimentos / modding')}
 <path d="M57 479h500l10-10h24" fill="none" stroke="${line}"/>
 ${t(57,515,11,cyan,'BRASIL / CODE / BUILD / REPEAT','letter-spacing="2"')}
 ${t(1218,515,11,muted,'VB — SYSTEM 01','text-anchor="end" letter-spacing="2"')}
 </g></svg>`;
 fs.writeFileSync(`assets/modern-profile-${theme}.svg`,body);result[theme]=body;
 }return result;
};
