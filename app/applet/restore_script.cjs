const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const listPattern = '<div className="w-[46px] h-[46px] rounded-[18px] bg-[#c5c8ce] flex shrink-0 items-center justify-center overflow-hidden ml-0.5"><User className="w-[34px] h-[34px] text-white mt-[12px]" fill="currentColor" strokeWidth={0} /></div>';

content = content.replace(
  `setCurrentChat('나')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      ` + listPattern,
  `setCurrentChat('나')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      <div className="w-12 h-12 rounded-2xl bg-zinc-200 flex shrink-0 items-center justify-center font-bold text-zinc-500">나</div>`
);

content = content.replace(
  `setCurrentChat('꼬ㅊ미남 사장님')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      ` + listPattern,
  `setCurrentChat('꼬ㅊ미남 사장님')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      <div className="w-12 h-12 rounded-2xl bg-amber-100 flex shrink-0 items-center justify-center font-bold text-amber-600">꼬</div>`
);

content = content.replace(
  `setCurrentChat('한서우')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      ` + listPattern,
  `setCurrentChat('한서우')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      <div className="w-12 h-12 rounded-2xl bg-rose-100 flex shrink-0 items-center justify-center font-bold text-rose-600">한</div>`
);

content = content.replace(
  `setCurrentChat('또라이')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      ` + listPattern,
  `setCurrentChat('또라이')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex shrink-0 items-center justify-center font-bold text-indigo-600">또</div>`
);

content = content.replace(
  `setCurrentChat('형')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      ` + listPattern,
  `setCurrentChat('형')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      <div className="w-12 h-12 rounded-2xl bg-sky-100 flex shrink-0 items-center justify-center font-bold text-sky-600">형</div>`
);

content = content.replace(
  `setCurrentChat('07 응애')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      ` + listPattern,
  `setCurrentChat('07 응애')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">\n                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex shrink-0 items-center justify-center font-bold text-emerald-600">07</div>`
);


const chatTarget1 = '<div className="w-8 h-8 rounded-[14px] bg-[#c5c8ce] flex shrink-0 items-center justify-center mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-2" fill="currentColor" strokeWidth={0} /></div>';
const chatTarget2 = '<div className="w-8 h-8 rounded-[14px] bg-[#c5c8ce] flex shrink-0 items-center justify-center opacity-0 mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-2" fill="currentColor" strokeWidth={0} /></div>';

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

// Remove import User just in case it's easy:
content = content.replace("User }", "}"); 
content = content.replace(", User }", "}"); 

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Done");
