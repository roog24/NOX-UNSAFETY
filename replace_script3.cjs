const fs = require('fs');

let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const people = ['eunho', 'hyungwon', 'seowoo', 'jaehyun', 'eunhyuk', 'jiho'];
const bgColors = ['bg-zinc-200', 'bg-amber-100', 'bg-rose-100', 'bg-indigo-100', 'bg-sky-100', 'bg-emerald-100'];

people.forEach((person, i) => {
  const bg = bgColors[i];
  const listTarget = `<div className="w-12 h-12 rounded-[18px] ${bg} flex shrink-0 items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: \`url("\${characterWallpapers['${person}']}")\` }} />`;
  const listReplacement = `<div className="w-[46px] h-[46px] rounded-[18px] bg-[#c5c8ce] flex shrink-0 items-center justify-center overflow-hidden ml-0.5"><User className="w-[34px] h-[34px] text-white mt-[12px]" fill="currentColor" strokeWidth={0} /></div>`;
  content = content.replaceAll(listTarget, listReplacement);

  const chatTarget1 = `<div className="w-8 h-8 rounded-[12px] ${bg} flex shrink-0 items-center justify-center mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: \`url("\${characterWallpapers['${person}']}")\` }} />`;
  const chatReplacement1 = `<div className="w-8 h-8 rounded-[14px] bg-[#c5c8ce] flex shrink-0 items-center justify-center mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-2" fill="currentColor" strokeWidth={0} /></div>`;
  content = content.replaceAll(chatTarget1, chatReplacement1);

  const chatTarget2 = `<div className="w-8 h-8 rounded-[12px] ${bg} flex shrink-0 items-center justify-center opacity-0 mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: \`url("\${characterWallpapers['${person}']}")\` }} />`;
  const chatReplacement2 = `<div className="w-8 h-8 rounded-[14px] bg-[#c5c8ce] flex shrink-0 items-center justify-center opacity-0 mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-2" fill="currentColor" strokeWidth={0} /></div>`;
  content = content.replaceAll(chatTarget2, chatReplacement2);
});

content = content.replace(
  /나 지금 혼자 있는데\. 네로\(고양이\)도 너 보고 싶대\./g,
  "나 지금 혼자 있는데. 네로도 너 보고 싶대."
);

content = content.replace(
  /살려주십쇼 형수님\(은혜 누나\)한테 형님 고딩 때 밴드부 흑역사 영상 풉니다/g,
  "살려주십쇼 형수님한테 형님 고딩 때 밴드부 흑역사 영상 풉니다"
);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Done");
