const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = `                         <span className="text-[10px] text-gray-400 mt-1 ml-1">오후 2:30</span>
                       </div>
                    </div>
                  </div>
                </>`;

const newStr = `                         <span className="text-[10px] text-gray-400 mt-1 ml-1">오후 2:30</span>
                       </div>
                    </div>

                    {isAgreed && (
                       <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden shrink-0 mt-1">
                             <img src="https://i.postimg.cc/9MmbN83J/1-(1).png" alt="박은혁" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex flex-col items-start gap-1 max-w-[75%]">
                            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 text-[15px] shadow-sm leading-relaxed">
                              고생했어.<br/>혹시라도 애들이 규칙 안 지키면 나한테 바로 말해. 알았지?
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 ml-1 cursor-default">방금</span>
                          </div>
                       </div>
                    )}
                    
                    {sentReply && (
                       <div className="flex gap-2 justify-end">
                          <div className="flex flex-col items-end gap-1 max-w-[75%]">
                            <div className="bg-[#FEE500] border border-[#FEE500]/50 rounded-2xl rounded-tr-sm px-4 py-2 text-[15px] shadow-sm text-[#371D1E]">
                              {sentReply}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 mr-1 cursor-default">방금</span>
                          </div>
                       </div>
                    )}
                  </div>

                  <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0 z-10 sticky bottom-0">
                    <input
                      type="text"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 text-[15px] outline-none focus:border-gray-300 transition-colors placeholder:text-gray-400"
                      placeholder="메시지 보내기"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && replyInput.trim().length > 0) {
                          setSentReply(replyInput);
                          setReplyInput('');
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (replyInput.trim().length > 0) {
                          setSentReply(replyInput);
                          setReplyInput('');
                        }
                      }}
                      className={\`w-10 h-10 flex items-center justify-center rounded-full transition-colors shrink-0 \${replyInput.trim().length > 0 ? 'bg-[#FEE500] text-[#371D1E]' : 'bg-gray-100 text-gray-400'}\`}
                      disabled={replyInput.trim().length === 0}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </>`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
console.log("Replaced chat view successfully!");
