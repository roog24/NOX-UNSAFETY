const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = `              {messageView === 'notion_page' && (
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
                          <p className="font-semibold mb-2">1항: 독점 금지. 연속 48시간 이상 유저 곁에 머물 수 없음.</p>
                          <div className="flex items-center gap-2 mt-3 inline-flex bg-white px-2 py-1 rounded text-xs text-red-600 border border-red-100">
                            <span>⚠️</span>
                            <span className="font-medium">박은호, 한서우 똑바로 읽을 것.</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="font-semibold">2항: 유저의 수면 시간(최소 7시간)은 반드시 보장할 것. 무리하게 굴려서 다음 날 일정에 지장 주면 해당 주간 순번 박탈.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                          <p className="font-semibold mb-2">3항: 다른 멤버가 유저와 있을 때 몰래 지켜보는 건 합의 하에만 가능함.</p>
                          <div className="flex items-center gap-2 mt-3 inline-flex bg-white px-2 py-1 rounded text-xs text-amber-600 border border-amber-100">
                            <span>🎥</span>
                            <span className="font-medium">차형원, 함부로 카메라 설치하지 말 것.</span>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}`;

const newStr = `              {messageView === 'notion_page' && (
                <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
                  <div className="h-14 border-b border-gray-100 flex items-center px-4 shrink-0 justify-between bg-white z-10">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <span className="font-serif">N</span>
                      <span className="text-gray-300">/</span>
                      <span className="truncate">7인 공동 생활 관리 프로토콜</span>
                    </div>
                    <button onClick={() => {
                        setMessageView('list');
                        setUserNameInput('');
                        setNotionTab('rules');
                      }} className="p-1 text-gray-400 hover:text-gray-700 bg-gray-50 rounded-md">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto scrollbar-none pointer-events-auto">
                    <div className="h-32 bg-gray-100/50 w-full mb-6 relative overflow-hidden shrink-0">
                       <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000")'}} />
                       <div className="absolute -bottom-8 left-6 text-6xl">📋</div>
                    </div>
                    
                    <div className="px-6 pb-20 relative">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4 break-words">7인 공동 생활 관리 프로토콜</h1>
                      
                      <div className="flex gap-1 mb-6 border-b border-gray-100 pb-0.5 shrink-0">
                        <button 
                          onClick={() => setNotionTab('schedule')}
                          className={\`px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative \${notionTab === 'schedule' ? 'text-zinc-900' : 'text-gray-500 hover:bg-gray-50'}\`}
                        >
                          데이트 스케줄러
                          {notionTab === 'schedule' && <motion.div layoutId="notionTab" className="absolute bottom-[-1.5px] left-0 w-full h-[2px] bg-zinc-900" />}
                        </button>
                        <button 
                          onClick={() => setNotionTab('rules')}
                          className={\`px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative \${notionTab === 'rules' ? 'text-zinc-900' : 'text-gray-500 hover:bg-gray-50'}\`}
                        >
                          합의된 규칙
                          {notionTab === 'rules' && <motion.div layoutId="notionTab" className="absolute bottom-[-1.5px] left-0 w-full h-[2px] bg-zinc-900" />}
                        </button>
                      </div>

                      {notionTab === 'schedule' && (
                        <div className="space-y-4">
                          <div className="bg-white border border-gray-200 flex items-center justify-between p-3 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                               <div className="flex flex-col items-center justify-center bg-gray-50 rounded-md w-11 h-11 border border-gray-200">
                                 <span className="text-[10px] text-gray-500 font-medium">Sat</span>
                                 <span className="text-sm font-bold">13</span>
                               </div>
                               <div>
                                 <p className="font-semibold text-sm text-gray-900">도예 공방 체험</p>
                                 <p className="text-xs text-gray-500">with 서지호</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded">D-1</span>
                          </div>
                          
                          <div className="bg-white border border-gray-200 flex items-center justify-between p-3 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                               <div className="flex flex-col items-center justify-center bg-gray-50 rounded-md w-11 h-11 border border-gray-200">
                                 <span className="text-[10px] text-gray-500 font-medium">Sun</span>
                                 <span className="text-sm font-bold">14</span>
                               </div>
                               <div>
                                 <p className="font-semibold text-sm text-gray-900">심야 드라이브</p>
                                 <p className="text-xs text-gray-500">with 차형원</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded">Upcoming</span>
                          </div>

                          <div className="bg-gray-50 border flex items-center justify-between p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                               <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md w-11 h-11 border">
                                 <span className="text-[10px] text-gray-400 font-medium">Wed</span>
                                 <span className="text-sm font-bold text-gray-400">10</span>
                               </div>
                               <div>
                                 <p className="font-semibold text-sm text-gray-500">휴식</p>
                                 <p className="text-xs text-gray-400">No Schedule</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-1 bg-gray-100 text-gray-400 border rounded">Done</span>
                          </div>
                        </div>
                      )}

                      {notionTab === 'rules' && (
                        <div className="space-y-6 text-[15px] leading-relaxed text-gray-800">
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <p className="font-semibold mb-2">1항: 독점 금지. 연속 48시간 이상 {userNameInput} 곁에 머물 수 없음.</p>
                            <div className="flex items-center gap-2 mt-3 inline-flex bg-white px-2 py-1 rounded text-xs text-red-600 border border-red-100">
                              <span>⚠️</span>
                              <span className="font-medium">박은호, 한서우 똑바로 읽을 것.</span>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <p className="font-semibold">2항: {userNameInput}의 수면 시간(최소 7시간)은 반드시 보장할 것. 무리하게 굴려서 다음 날 일정에 지장 주면 해당 주간 순번 박탈.</p>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <p className="font-semibold mb-2">3항: 다른 멤버가 {userNameInput}와(과) 있을 때 몰래 지켜보는 건 합의 하에만 가능함.</p>
                            <div className="flex items-center gap-2 mt-3 inline-flex bg-white px-2 py-1 rounded text-xs text-amber-600 border border-amber-100">
                              <span>🎥</span>
                              <span className="font-medium">차형원, 함부로 카메라 설치하지 말 것.</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => {
                              setIsMessageOpen(false);
                              setMessageView('list');
                              setUserNameInput('');
                              setNotionTab('rules');
                            }}
                            className="w-full py-4 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors shadow-md mt-6"
                          >
                            내용을 숙지하였으며 동의합니다
                          </button>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              )}`;

if (content.indexOf("1항: 독점 금지. 연속 48시간 이상 유저 곁에 머물 수 없음.") !== -1) {
  content = content.replace("1항: 독점 금지. 연속 48시간 이상 유저 곁에 머물 수 없음.", "1항: 독점 금지. 연속 48시간 이상 {userNameInput} 곁에 머물 수 없음.");
}
if (content.indexOf("2항: 유저의 수면 시간(최소 7시간)은 반드시 보장할 것. 무리하게 굴려서 다음 날 일정에 지장 주면 해당 주간 순번 박탈.") !== -1) {
  content = content.replace("2항: 유저의 수면 시간(최소 7시간)은 반드시 보장할 것. 무리하게 굴려서 다음 날 일정에 지장 주면 해당 주간 순번 박탈.", "2항: {userNameInput}의 수면 시간(최소 7시간)은 반드시 보장할 것. 무리하게 굴려서 다음 날 일정에 지장 주면 해당 주간 순번 박탈.");
}
if (content.indexOf("3항: 다른 멤버가 유저와 있을 때 몰래 지켜보는 건 합의 하에만 가능함.") !== -1) {
  content = content.replace("3항: 다른 멤버가 유저와 있을 때 몰래 지켜보는 건 합의 하에만 가능함.", "3항: 다른 멤버가 {userNameInput}와(과) 있을 때 몰래 지켜보는 건 합의 하에만 가능함.");
}

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Replaced successfully!");
