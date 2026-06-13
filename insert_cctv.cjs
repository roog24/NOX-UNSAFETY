const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = '      {/* Home Bar */}';
const replacementStr = `        {/* CCTV App */}
        <AnimatePresence>
          {isCctvOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={\`absolute inset-0 z-20 flex flex-col bg-zinc-950 text-zinc-200\`}
            >
              {/* App Header */}
              <div className="px-5 pt-7 pb-3 flex justify-between items-center border-b border-zinc-900 bg-zinc-950 z-10 sticky top-0">
                <span className="text-xl font-bold text-white tracking-tight">CCTV</span>
                <button onClick={() => setIsCctvOpen(false)} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">완료</button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-12">
                
                {/* CAM 1 */}
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                  <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm font-medium text-zinc-300">CAM 1 - 휴게실</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-zinc-950 relative flex items-center justify-center">
                    {(affinities['eunhyuk'] || 0) >= 100 && (affinities['seowoo'] || 0) >= 100 ? (
                      <img src="https://i.postimg.cc/hPh2bxsf/46.gif" alt="CCTV Feed 1" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-600">
                        <Lock className="w-8 h-8" />
                        <span className="text-xs font-medium">ACCESS DENIED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CAM 2 */}
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                  <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm font-medium text-zinc-300">CAM 2 - 복도</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-zinc-950 relative flex items-center justify-center">
                    {(affinities['eunho'] || 0) >= 100 && (affinities['hyungwon'] || 0) >= 100 ? (
                      <img src="https://i.postimg.cc/zfMhNbWy/47.gif" alt="CCTV Feed 2" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-600">
                        <Lock className="w-8 h-8" />
                        <span className="text-xs font-medium">ACCESS DENIED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CAM 3 */}
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                  <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm font-medium text-zinc-300">CAM 3 - 비상구</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-zinc-950 relative flex items-center justify-center">
                    {(affinities['eunho'] || 0) >= 100 && (affinities['seowoo'] || 0) >= 100 ? (
                      <img src="https://i.postimg.cc/TPyytdSK/48.gif" alt="CCTV Feed 3" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-600">
                        <Lock className="w-8 h-8" />
                        <span className="text-xs font-medium">ACCESS DENIED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CAM 4 */}
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                  <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm font-medium text-zinc-300">CAM 4 - 주차장</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-zinc-950 relative flex items-center justify-center">
                    {(affinities['eunhyuk'] || 0) >= 100 && (affinities['hyungwon'] || 0) >= 100 ? (
                      <img src="https://i.postimg.cc/BnRZQxYn/49.gif" alt="CCTV Feed 4" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-zinc-600">
                        <Lock className="w-8 h-8" />
                        <span className="text-xs font-medium">ACCESS DENIED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Bar */}`;
content = content.replace(targetStr, replacementStr);

const homeBarTarget = `          } else if (isChatOpen) {
            setIsChatOpen(false);
          } else {
            onClose();
          }`;
const homeBarReplace = `          } else if (isChatOpen) {
            setIsChatOpen(false);
          } else if (isCctvOpen) {
            setIsCctvOpen(false);
          } else {
            onClose();
          }`;
          
content = content.replace(homeBarTarget, homeBarReplace);
fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Done");
