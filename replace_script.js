const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// 꼬
content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-amber-100 flex shrink-0 items-center justify-center font-bold text-amber-600 mt-1">꼬<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-amber-100 flex shrink-0 items-center justify-center mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'hyungwon'" + ']}")` }} />'
);

content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-amber-100 flex shrink-0 items-center justify-center font-bold text-amber-600 opacity-0 mt-1">꼬<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-amber-100 flex shrink-0 items-center justify-center opacity-0 mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'hyungwon'" + ']}")` }} />'
);

// 한
content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-rose-100 flex shrink-0 items-center justify-center font-bold text-rose-600 mt-1">한<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-rose-100 flex shrink-0 items-center justify-center mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'seowoo'" + ']}")` }} />'
);

content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-rose-100 flex shrink-0 items-center justify-center font-bold text-rose-600 opacity-0 mt-1">한<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-rose-100 flex shrink-0 items-center justify-center opacity-0 mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'seowoo'" + ']}")` }} />'
);

// 또
content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-indigo-100 flex shrink-0 items-center justify-center font-bold text-indigo-600 mt-1">또<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-indigo-100 flex shrink-0 items-center justify-center mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'jaehyun'" + ']}")` }} />'
);

content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-indigo-100 flex shrink-0 items-center justify-center font-bold text-indigo-600 opacity-0 mt-1">또<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-indigo-100 flex shrink-0 items-center justify-center opacity-0 mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'jaehyun'" + ']}")` }} />'
);

// 형
content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-sky-100 flex shrink-0 items-center justify-center font-bold text-sky-600 mt-1">형<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-sky-100 flex shrink-0 items-center justify-center mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'eunhyuk'" + ']}")` }} />'
);

content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-sky-100 flex shrink-0 items-center justify-center font-bold text-sky-600 opacity-0 mt-1">형<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-sky-100 flex shrink-0 items-center justify-center opacity-0 mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'eunhyuk'" + ']}")` }} />'
);

// 07
content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-emerald-100 flex shrink-0 items-center justify-center font-bold text-emerald-600 mt-1">07<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-emerald-100 flex shrink-0 items-center justify-center mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'jiho'" + ']}")` }} />'
);

content = content.replace(
  /<div className="w-8 h-8 rounded-\[12px\] bg-emerald-100 flex shrink-0 items-center justify-center font-bold text-emerald-600 opacity-0 mt-1">07<\/div>/g,
  '<div className="w-8 h-8 rounded-[12px] bg-emerald-100 flex shrink-0 items-center justify-center opacity-0 mt-1 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${characterWallpapers['+ "'jiho'" + ']}")` }} />'
);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
