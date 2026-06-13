const fs = require('fs');

let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// Replace w-12 icons (in list)
content = content.replace(
  /<div className="w-12 h-12 rounded-\[18px\] bg-[a-z0-9-]+ flex shrink-0 items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url\("\$\{characterWallpapers\['[^']+'\]\}"\)` }} \/>/g,
  '<div className="w-12 h-12 rounded-[18px] bg-[#c5c8ce] flex shrink-0 items-center justify-center overflow-hidden"><User className="w-9 h-9 text-white mt-2" fill="currentColor" strokeWidth={0} /></div>'
);

content = content.replace(
  /<div className="w-12 h-12 rounded-\[18px\] bg-zinc-200 flex shrink-0 items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url\("\$\{characterWallpapers\['eunho'\]\}"\)` }} \/>/g,
  '<div className="w-12 h-12 rounded-[18px] bg-[#c5c8ce] flex shrink-0 items-center justify-center overflow-hidden"><User className="w-9 h-9 text-white mt-2" fill="currentColor" strokeWidth={0} /></div>'
);


// Replace w-8 icons (in chat details)
content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] [a-zA-Z0-9-\[\] ]* bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url\("\$\{characterWallpapers\['[^']+'\]\}"\)` }} \/>/g,
  function(match) {
    if (match.includes('opacity-0')) {
      return '<div className="w-8 h-8 rounded-[12px] bg-[#c5c8ce] flex shrink-0 items-center justify-center opacity-0 mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-1.5" fill="currentColor" strokeWidth={0} /></div>';
    } else {
      return '<div className="w-8 h-8 rounded-[12px] bg-[#c5c8ce] flex shrink-0 items-center justify-center mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-1.5" fill="currentColor" strokeWidth={0} /></div>';
    }
  }
);

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
