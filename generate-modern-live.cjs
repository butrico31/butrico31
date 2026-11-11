const fs=require('node:fs');
require('./generate-contributions.cjs')();
const stats=fs.existsSync('assets/profile/github-stats.json')?JSON.parse(fs.readFileSync('assets/profile/github-stats.json','utf8')):null;
require('./modern-cyber-banner.cjs')();
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const themes={dark:['#ecedf7','#98a4b8','#3b435b','#41dce4','#ee76ac'],light:['#222b3c','#606d81','#c9cfde','#087f90','#b83c76']};
const svg=(name,w,h,body)=>fs.writeFileSync(`assets/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>${name}</title><g font-family="Arial, Helvetica, sans-serif">${body}</g></svg>`);
for(const [theme,[ink,muted,line,cyan,pink]] of Object.entries(themes)){
 const file=`assets/modern-profile-${theme}.svg`;let banner=fs.readFileSync(file,'utf8');banner=banner.replace('>WEB<',`>${stats?stats.commits:'—'}<`).replace('>LAB<',`>${stats?stats.repositories:'—'}<`).replace('>produtos digitais<',`>commits públicos / ${stats?stats.year:new Date().getUTCFullYear()}<`).replace('>experimentos / modding<','>repositórios públicos<');fs.writeFileSync(file,banner);
 for(const [id,n,title] of [['stack','01','TECNOLOGIAS'],['work','02','PROJETOS SELECIONADOS'],['activity','03','ATIVIDADE RECENTE'],['contact','04','ABRIR CONEXÃO']])svg(`live-${id}-${theme}`,1200,74,`<path d="M8 49V26L26 8h28" fill="none" stroke="${cyan}"/><text x="31" y="47" fill="${pink}" font-size="12">${n}</text><text x="77" y="47" fill="${ink}" font-size="16" letter-spacing="3">${title}</text><path d="M470 40h696l26-26" fill="none" stroke="${line}"/><path d="m1180 26 12-12" stroke="${cyan}" stroke-width="2"/>`);
 for(const [key,label] of [['javascript','JavaScript'],['react','React'],['vuejs','Vue'],['java','Java'],['cplusplus','C/C++'],['swift','Swift'],['git','Git']]){
 const png=fs.readFileSync(`assets/logos/${key}.png`).toString('base64');svg(`live-tech-${key}-${theme}`,116,114,`<path d="M18 2h96v94l-16 16H2V18Z" fill="none" stroke="${line}"/><path d="M2 32V18L18 2h17m46 110h17l16-16v-12" fill="none" stroke="${cyan}"/><path d="M98 112l16-16" stroke="${pink}"/><image href="data:image/png;base64,${png}" x="37" y="22" width="42" height="42"/><text x="58" y="92" text-anchor="middle" fill="${muted}" font-size="12">${label}</text>`);
 }
 for(const [key,title,desc] of [['portfolio','Portfolio','Projetos, habilidades e experiências.'],['archive','Archive XL','Cyberpunk 2077 / expansão de recursos / fork'],['tweak','Tweak XL','Cyberpunk 2077 / TweakDB / fork']])svg(`live-card-${key}-${theme}`,1200,160,`<path d="M50 4H1176l20 20v86M1150 156H24L4 136V58" fill="none" stroke="${line}"/><path d="M4 38V24L24 4h32m1094 152h26l20-20v-14" fill="none" stroke="${cyan}" stroke-width="1.5"/><path d="m1176 156 20-20" stroke="${pink}"/><text x="35" y="65" font-size="30" fill="${ink}" font-weight="600">${title}</text><text x="36" y="107" font-size="20" fill="${muted}">${desc}</text><text x="1126" y="86" font-size="31" fill="${cyan}">↗</text>`);
 for(const [key,label] of [['portfolio','PORTFÓLIO'],['linkedin','LINKEDIN'],['email','VAMOS CONVERSAR']])svg(`live-button-${key}-${theme}`,280,62,`<path d="M12 2h266v46l-12 12H2V12Z" fill="${cyan}" fill-opacity=".1" stroke="${cyan}" stroke-opacity=".6"/><path d="M2 22V12L12 2h20m220 58h14l12-12" fill="none" stroke="${pink}"/><text x="22" y="38" fill="${ink}" font-size="13" letter-spacing="1">${label}</text><text x="244" y="39" fill="${cyan}" font-size="21">↗</text>`);
}
const pic=(key,alt,width='100%')=>`<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/${key}-dark.svg"><img src="./assets/${key}-light.svg" width="${width}" alt="${esc(alt)}"></picture>`;
const linked=(key,alt,url,width)=>`<a href="${url}">${pic(key,alt,width)}</a>`;
const dataText=stats?`${stats.commits} commits públicos em ${stats.year} · ${stats.repositories} repositórios públicos · ${stats.stars} estrelas nos repositórios próprios · ${stats.followers} seguidores`:'Métricas aguardando atualização';
const labels={PushEvent:'Commits enviados',PullRequestEvent:'Pull request',CreateEvent:'Criação de referência',ReleaseEvent:'Release'};
const activity=stats&&stats.activity.length?stats.activity.map(e=>`| ${e.date.slice(0,10)} | ${labels[e.type]} | [${e.repo}](https://github.com/${e.repo}) |`).join('\n'):'| — | Sem eventos públicos recentes disponíveis | — |';
const readme=`${pic('modern-profile',`Vinicius Butrico — butrico31. ${dataText}`)}

Desenvolvedor brasileiro. Transformo ideias em experiências web claras e funcionais, com espaço para experimentar, aprender e cuidar dos detalhes.

<p align="center">${linked('live-button-portfolio','Visitar portfólio','https://portfolio-tau-steel-80.vercel.app','210')} ${linked('live-button-linkedin','LinkedIn','https://www.linkedin.com/in/vinicius-butrico-de-freitas-82912a240','210')} ${linked('live-button-email','Vamos conversar','mailto:butrico0@gmail.com','210')}</p>

${pic('live-stack','01 — Tecnologias')}

<p align="center">${[['javascript','JavaScript'],['react','React'],['vuejs','Vue'],['java','Java'],['cplusplus','C/C++'],['swift','Swift'],['git','Git']].map(([key,label])=>pic(`live-tech-${key}`,label,'90')).join(' ')}</p>

${pic('live-work','02 — Projetos selecionados')}

${[['portfolio','Portfolio','portfolio','https://portfolio-tau-steel-80.vercel.app'],['archive','Archive XL','cp2077-archive-xl','https://github.com/butrico31/cp2077-archive-xl'],['tweak','Tweak XL','cp2077-tweak-xl','https://github.com/butrico31/cp2077-tweak-xl']].map(([key,title,repo,url])=>`${linked(`live-card-${key}`,`${title} — visitar projeto`,url)}\n\n<p align="right"><a href="https://github.com/butrico31/${repo}">Código-fonte ↗</a></p>`).join('\n\n')}

${pic('live-activity','03 — Atividade recente')}

**${dataText}**

| Data (UTC) | Atividade pública | Repositório |
| :--- | :--- | :--- |
${activity}

<sub>Atualizado em ${stats?stats.updatedAt.replace('T',' ').slice(0,16)+' UTC':'—'}. Commits públicos indexados pelo GitHub Search desde 1º de janeiro; não inclui atividade privada. A lista de eventos é uma janela recente, não o histórico completo.</sub>

${pic('live-contact','04 — Abrir conexão')}

${linked('live-button-email','Vamos conversar','mailto:butrico0@gmail.com','250')}

[Todos os repositórios ↗](https://github.com/butrico31?tab=repositories) · [GitHub](https://github.com/butrico31)
`;
for(const file of ['README.md'])fs.writeFileSync(file,readme);
if(stats && fs.existsSync('modern-profile.html')){
 let html=fs.readFileSync('modern-profile.html','utf8');
 const metrics=`<div class="live-metrics">${[['commits',`COMMITS / ${stats.year}`],['repositories','REPOSITÓRIOS'],['stars','ESTRELAS'],['followers','SEGUIDORES']].map(([key,label])=>`<div><strong data-stat="${key}">${stats[key]}</strong><span>${label}</span></div>`).join('')}</div><p id="stats-status" class="stats-status" aria-live="polite"></p>`;
 html=html.replace('</head>','<style>h1{color:var(--purple);animation:screenGlitch 19s infinite}@keyframes screenGlitch{0%,97%,99%,100%{transform:none}97.2%,98.2%{transform:translateX(1px);text-shadow:2px 0 var(--cyan),-2px 0 var(--pink)}97.5%,98.5%{transform:translateX(-1px)}}@media(prefers-reduced-motion:reduce){h1{animation:none}}</style></head>');
 html=html.replace('<div class="hero-footer">',metrics+'<div class="hero-footer">').replace('</body>',`<script type="application/json" id="profile-stats">${JSON.stringify(stats).replaceAll('<','\\u003c')}</script><script src="modern-stats.js" defer></script></body>`);
 html=html.replace('<footer>',`<section>${pic('live-contributions','Calend?rio real de contribui??es')}</section><footer>`);
 fs.writeFileSync('modern-profile.html',html);
}
