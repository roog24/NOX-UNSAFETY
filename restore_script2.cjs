const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const chatTarget1 = '<div className="w-8 h-8 rounded-[12px] bg-[#c5c8ce] flex shrink-0 items-center justify-center mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-1.5" fill="currentColor" strokeWidth={0} /></div>';
const chatTarget2 = '<div className="w-8 h-8 rounded-[12px] bg-[#c5c8ce] flex shrink-0 items-center justify-center opacity-0 mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-1.5" fill="currentColor" strokeWidth={0} /></div>';

const blocks = content.split('currentChat ===');
for (let i = 1; i < blocks.length; i++) {
  let bg = '';
  let text = '';
  let char = '';
  
  if (blocks[i].startsWith(" '꼬ㅊ미남 사장님'")) { bg = 'bg-amber-100'; text = 'text-amber-600'; char = '꼬'; }
  else if (blocks[i].startsWith(" '한서우'")) { bg = 'bg-rose-100'; text = 'text-rose-600'; char = '한'; }
  else if (blocks[i].startsWith(" '또라이'")) { bg = 'bg-indigo-100'; text = 'text-indigo-600'; char = '또'; }
  else if (blocks[i].startsWith(" '형'")) { bg = 'bg-sky-100'; text = 'text-sky-600'; char = '형'; }
  else if (blocks[i].startsWith(" '07 응애'")) { bg = 'bg-emerald-100'; text = 'text-emerald-600'; char = '07'; }
  
  if (bg) {
    blocks[i] = blocks[i].replaceAll(chatTarget1, `<div className="w-8 h-8 rounded-[12px] ${bg} flex shrink-0 items-center justify-center font-bold ${text} mt-1">${char}</div>`);
    blocks[i] = blocks[i].replaceAll(chatTarget2, `<div className="w-8 h-8 rounded-[12px] ${bg} flex shrink-0 items-center justify-center font-bold ${text} opacity-0 mt-1">${char}</div>`);
  }
}

content = blocks.join('currentChat ===');

content = content.replace("User, ", "");
content = content.replace(", User", "");
content = content.replace("User }", "}");

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Done");
