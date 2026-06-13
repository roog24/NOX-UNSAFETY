const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = `              {messageView === 'notion_page' && (
                <div className="flex-1 flex flex-col bg-white overflow-hidden pointer-events-auto relative">
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
                  
                  <div className="flex-1 overflow-y-auto scrollbar-none overscroll-contain">
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
                      </div>`;

const newStr = `              {messageView === 'notion_page' && (
                <div className="flex-1 flex flex-col min-h-0 bg-white">
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
                  
                  <div className="flex-1 overflow-y-auto scrollbar-none min-h-0">
                    <div className="h-32 bg-gray-100/50 w-full mb-6 relative overflow-hidden shrink-0">
                       <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000")'}} />
                       <div className="absolute -bottom-8 left-6 text-6xl">📋</div>
                    </div>
                    
                    <div className="px-6 pb-20 relative">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4 break-words">7인 공동 생활 관리 프로토콜</h1>
                      
                      <div className="flex gap-1 mb-6 border-b border-gray-100 pb-0.5 shrink-0">
                        <button 
                          onClick={() => setNotionTab('schedule')}
                          className={\`px-3 py-1.5 text-sm font-medium transition-colors border-b-[2px] \${notionTab === 'schedule' ? 'text-zinc-900 border-zinc-900' : 'text-gray-500 border-transparent hover:bg-gray-50 rounded-md'}\`}
                        >
                          데이트 스케줄러
                        </button>
                        <button 
                          onClick={() => setNotionTab('rules')}
                          className={\`px-3 py-1.5 text-sm font-medium transition-colors border-b-[2px] \${notionTab === 'rules' ? 'text-zinc-900 border-zinc-900' : 'text-gray-500 border-transparent hover:bg-gray-50 rounded-md'}\`}
                        >
                          합의된 규칙
                        </button>
                      </div>`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Replaced successfully!");
