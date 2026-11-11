const fs=require('node:fs');
module.exports=function(files){
 require('./generate-contributions.cjs')();
 const block='<!-- contribution-calendar:start -->\n<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/live-contributions-dark.svg"><img src="./assets/live-contributions-light.svg" width="100%" alt="Calendário real de contribuições de butrico31 no GitHub, em estilo cyberpunk"></picture>\n<!-- contribution-calendar:end -->';
 for(const file of files){let s=fs.readFileSync(file,'utf8').replace(/<!-- contribution-calendar:start -->[\s\S]*?<!-- contribution-calendar:end -->\s*/g,'');const pos=s.indexOf('\n\n');s=s.slice(0,pos)+'\n\n'+block+s.slice(pos);fs.writeFileSync(file,s);}
};
