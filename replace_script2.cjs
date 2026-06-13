const fs = require('fs');

let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// Replace w-12 icons (in list)
content = content.replace(
  /<div className="w-12 h-12 rounded-\[18px\] bg-[a-z0-9-]+ flex shrink-0 items-center justify-center overflow-hidden bg-cover bg-center" style=\{\{ backgroundImage: `url\("\\\$\\{characterWallpapers\['[^']+'\]\\\}\"\)` \}\} \/>/g,
  '<div className="w-[46px] h-[46px] rounded-[18px] bg-[#c5c8ce] flex shrink-0 items-center justify-center overflow-hidden"><User className="w-9 h-9 text-white mt-3" fill="currentColor" strokeWidth={0} /></div>'
);

content = content.replace(
  /<div className="w-12 h-12 rounded-\[18px\] bg-[a-z0-9A-Z-]+ flex shrink-0 items-center justify-center overflow-hidden bg-cover bg-center" style=\{\{ backgroundImage: `url\("\$\{characterWallpapers\[\'[a-z]+\'\]\}"\)` \}\} \/>/g,
  '<div className="w-[46px] h-[46px] rounded-[18px] bg-[#c5c8ce] flex shrink-0 items-center justify-center overflow-hidden"><User className="w-9 h-9 text-white mt-3" fill="currentColor" strokeWidth={0} /></div>'
);

content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-[a-z0-9A-Z-]+ flex shrink-0 items-center justify-center (opacity-0 )?mt-1 bg-cover bg-center overflow-hidden" style=\{\{ backgroundImage: `url\("\$\{characterWallpapers\[\'[a-z]+\'\]\}"\)` \}\} \/>/g,
  function(match, p1) {
    const opacityClass = p1 ? "opacity-0 " : "";
    return `<div className="w-8 h-8 rounded-[12px] bg-[#c5c8ce] flex shrink-0 items-center justify-center ${opacityClass}mt-1 overflow-hidden"><User className="w-6 h-6 text-white mt-1.5" fill="currentColor" strokeWidth={0} /></div>`;
  }
);


fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Done");
