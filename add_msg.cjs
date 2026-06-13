const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = '        {/* CCTV App */}';
const replacementStr = `        {/* Message App */}
        <AnimatePresence>
          {isMessageOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={\`absolute inset-0 z-20 flex flex-col bg-white text-zinc-900\`}
            >
              {messageView === 'list' && (
                <>
                  <div className="px-5 pt-7 pb-3 flex justify-between items-center border-b border-gray-100 shrink-0">
                    <span className="text-xl font-bold tracking-tight">Messages</span>
                    <button onClick={() => setIsMessageOpen(false)} className="text-blue-500 font-medium text-sm">완료</button>
                  </div>
                  <div className="flex-1 overflow-y-auto scrollbar-none">
                    <button onClick={() => setMessageView('chat')} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 overflow-hidden">
                        <img src="https://i.postimg.cc/9MmbN83J/1-(1).png" alt="박은혁" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-semibold text-base">박은혁</span>
                          <span className="text-xs text-gray-400">오후 2:30</span>
                        </div>
                        <div className="text-sm text-gray-500 truncate">노션 워크스페이스 권한 열어뒀습니다.</div>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {messageView === 'chat' && (
                <>
                  <div className="px-3 pt-6 pb-2 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md z-10 sticky top-0">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setMessageView('list')} className="p-1 flex items-center text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <ChevronLeft className="w-6 h-6 -ml-1" />
                        <span className="font-medium -ml-1">List</span>
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden mb-0.5">
                        <img src="https://i.postimg.cc/9MmbN83J/1-(1).png" alt="박은혁" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-xs font-semibold">박은혁</span>
                    </div>
                    <div className="w-16" /> {/* Spacer */}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none bg-gray-50">
                    <div className="text-center text-xs text-gray-400 my-4 font-medium">오늘</div>
                    
                    <div className="flex gap-2">
                       <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden shrink-0 mt-1">
                          <img src="https://i.postimg.cc/9MmbN83J/1-(1).png" alt="박은혁" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                       </div>
                       <div className="flex flex-col items-start gap-1 max-w-[75%]">
                         <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 text-[15px] shadow-sm">
                           노션 워크스페이스 구축 완료했습니다.
                         </div>
                         <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 text-[15px] shadow-sm">
                           링크 공유할 테니 본인 이름 비밀번호로 치고 들어오세요.
                         </div>
                         <div 
                           onClick={() => setMessageView('notion_auth')}
                           className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm w-full overflow-hidden shadow-sm cursor-pointer hover:bg-gray-50 transition-colors mt-1"
                         >
                            <div className="h-24 bg-gray-100 border-b border-gray-200 relative overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <span className="text-4xl font-extrabold font-serif">N</span>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="font-semibold text-sm mb-1 truncate">7인 공동 생활 관리 프로토콜</div>
                              <div className="text-xs text-gray-500 truncate">Notion Workspace</div>
                            </div>
                         </div>
                         <span className="text-[10px] text-gray-400 mt-1 ml-1">오후 2:30</span>
                       </div>
                    </div>
                  </div>
                </>
              )}

              {messageView === 'notion_auth' && (
                <div className="flex-1 flex items-center justify-center bg-white p-6 relative">
                  <button onClick={() => setMessageView('chat')} className="absolute top-6 left-4 text-gray-500 p-2">
                    <X className="w-5 h-5" />
                  </button>
                  <div className="w-full max-w-[240px] flex flex-col items-center">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center mb-6">
                      <span className="text-3xl font-serif font-bold text-gray-900">N</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Workspace Access</h2>
                    <p className="text-sm text-gray-500 text-center mb-8">안전한 공유를 위해<br/>본인의 이름을 입력해주세요.</p>
                    <input 
                      type="password" 
                      placeholder="Password (Name)" 
                      className="w-full border-b-2 border-gray-200 bg-transparent py-2 text-center text-lg outline-none focus:border-zinc-800 transition-colors mb-8 text-black placeholder:text-gray-300"
                      value={userNameInput}
                      onChange={(e) => setUserNameInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && userNameInput.trim().length > 0) {
                          setMessageView('notion_page');
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                         if (userNameInput.trim().length > 0) {
                           setMessageView('notion_page');
                         }
                      }}
                      className={\`w-full py-3 rounded-lg font-semibold transition-colors \${userNameInput.trim().length > 0 ? 'bg-zinc-900 text-white shadow-md' : 'bg-gray-100 text-gray-400'}\`}
                      disabled={userNameInput.trim().length === 0}
                    >
                      Enter
                    </button>
                  </div>
                </div>
              )}

              {messageView === 'notion_page' && (
                <div className="flex-1 flex flex-col bg-white">
                  <div className="h-14 border-b border-gray-100 flex items-center px-4 shrink-0 justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <span className="font-serif">N</span>
                      <span className="text-gray-300">/</span>
                      <span className="truncate">7인 공동 생활 관리 프로토콜</span>
                    </div>
                    <button onClick={() => setMessageView('list')} className="p-1 text-gray-400 hover:text-gray-700 bg-gray-50 rounded-md">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto scrollbar-none pb-20">
                    <div className="h-32 bg-gray-100/50 w-full mb-6 relative overflow-hidden">
                       <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000")'}} />
                       <div className="absolute -bottom-8 left-6 text-6xl">📋</div>
                    </div>
                    
                    <div className="px-6 relative">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4">7인 공동 생활 관리 프로토콜</h1>
                      
                      <div className="flex gap-1 mb-6 border-b border-gray-100 pb-0.5">
                        <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-md transition-colors">데이트 스케줄러</button>
                        <button className="px-3 py-1.5 text-sm font-medium text-zinc-900 relative">
                          합의된 규칙
                          <motion.div layoutId="notionTab" className="absolute bottom-[-1.5px] left-0 w-full h-[2px] bg-zinc-900" />
                        </button>
                      </div>

                      <div className="space-y-6 text-[15px] leading-relaxed text-gray-800">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="font-semibold mb-2">1항: 독점 금지.</p>
                          <p className="text-gray-600 mb-2">연속 48시간 이상 유저 곁에 머물 수 없음.</p>
                          <div className="flex items-center gap-2 mt-3 inline-flex bg-white px-2 py-1 rounded text-xs text-red-600 border border-red-100">
                            <span>⚠️</span>
                            <span className="font-medium">박은호, 한서우 똑바로 읽을 것.</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="font-semibold mb-2">2항: 절대적 휴식 보장.</p>
                          <p className="text-gray-600">유저의 수면 시간(최소 7시간)은 반드시 보장할 것. 무리하게 굴려서 다음 날 일정에 지장 주면 해당 주간 순번 박탈.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="font-semibold mb-2">3항: 시야 확보 및 사생활.</p>
                          <p className="text-gray-600 mb-2">다른 멤버가 유저와 있을 때 몰래 지켜보는 건 합의 하에만 가능함.</p>
                          <div className="flex items-center gap-2 mt-3 inline-flex bg-white px-2 py-1 rounded text-xs text-amber-600 border border-amber-100">
                            <span>🎥</span>
                            <span className="font-medium">차형원, 함부로 카메라 설치하지 말 것.</span>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CCTV App */}`;
        
content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Ready");
