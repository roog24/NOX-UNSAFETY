const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = `              ) : (
                <div className="flex-1 overflow-y-auto p-5 scrollbar-none pb-12 relative" style={{ backgroundImage: 'linear-gradient(transparent 95%, #fcd34d 95%)', backgroundSize: '100% 28px', lineHeight: '28px' }}>
                  {currentMemo === 1 && (
                    <>
                      <div className="font-bold text-xl mb-4 pt-1 text-zinc-800">별 먼지 - draft_1</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap">`;

const newStr = `              ) : (
                <div className="flex-1 overflow-y-auto scrollbar-none relative">
                  <div className="min-h-full min-w-full pt-[28px] px-5 pb-12" style={{ backgroundImage: 'linear-gradient(transparent 27px, #fcd34d 27px)', backgroundSize: '100% 28px', backgroundPosition: '0 0', backgroundRepeat: 'repeat-y', lineHeight: '28px' }}>
                  {currentMemo === 1 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">별 먼지 - draft_1</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">`;

content = content.replace(targetStr, newStr);

content = content.replace(
  '                </div>\\n              )}\\n            </motion.div>',
  '                  </div>\\n                </div>\\n              )}\\n            </motion.div>'
);

content = content.replace(
  /<div className="font-bold text-xl mb-4 pt-1 text-zinc-800">/g,
  '<div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">'
);

content = content.replace(
  /<div className="text-zinc-700 italic font-\[400\] whitespace-pre-wrap">/g,
  '<div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">'
);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
