const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// Remove list view profile pictures
content = content.replace(/<div className="w-12 h-12 rounded-2xl[^>]+>[^<]+<\/div>\n\s*/g, '');

// Remove chat view profile pictures
content = content.replace(/<div className="w-8 h-8 rounded-\[12px\] bg-[a-z0-9A-Z-]+ flex shrink-0 items-center justify-center font-bold text-[a-z0-9A-Z-]+ (mt-1|opacity-0 mt-1)">[^<]+<\/div>\n\s*/g, '');

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Done");
