const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

const targetStr = `              {currentMemo === null ? (
                <div className="flex-1 overflow-y-auto bg-[#f4f4f4] p-4 scrollbar-none">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    <button onClick={() => setCurrentMemo(1)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">별 먼지 - draft_1</div>
                      <div className="text-gray-500 text-sm truncate">어두운 밤하늘에 잠시 빛났던...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 6. 12.</div>
                    </button>
                    <button onClick={() => setCurrentMemo(2)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">무제_작곡중</div>
                      <div className="text-gray-500 text-sm truncate">차가운 비가 내리던 날, 너의 우산이...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 6. 10.</div>
                    </button>
                    <button onClick={() => setCurrentMemo(3)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">혼란스러운 밤</div>
                      <div className="text-gray-500 text-sm truncate">불규칙한 박자처럼 흔들리는 내 마음...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 6. 9.</div>
                    </button>
                    <button onClick={() => setCurrentMemo(4)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">(제목 미정 - 록 발라드)</div>
                      <div className="text-gray-500 text-sm truncate">깨져버린 거울 속에 비친 내 모습...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 5. 28.</div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-5 scrollbar-none pb-12 relative" style={{ backgroundImage: 'linear-gradient(transparent 95%, #fcd34d 95%)', backgroundSize: '100% 28px', lineHeight: '28px' }}>
                  {currentMemo === 1 && (
                    <>
                      <div className="font-bold text-xl mb-4 pt-1 text-zinc-800">별 먼지 - draft_1</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap">
\`어두운 밤하늘에 잠시 빛났던
너라는 별을 잡으려 했지만
손끝에 닿은 건 
서늘한 바람뿐이었지

아직도 내 귓가엔
네가 부르던 멜로디가 맴돌아
우리가 함께 그렸던 
그 시간들은 어디로 갔을까

(Chorus)
떨어지는 유성처럼 잠시 벅차올랐다
재가 되어 사라진 우리의 밤
너를 지우려 아무리 애를 써도
내 마음속엔 자꾸 네가 피어나...

--
하, 가사 왜 이러냐. 
너무 유치해. 다시 쓰자.\`
                      </div>
                    </>
                  )}
                  {currentMemo === 2 && (
                    <>
                      <div className="font-bold text-xl mb-4 pt-1 text-zinc-800">무제_작곡중</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap">
\`차가운 비가 내리던 날,
너의 우산이 되어주고 싶었어

하지만 나는 너무 작아서
내 어깨만 흠뻑 젖어버렸지

Bpm 85 정도로 잔잔하게.
코드는 Am - F - C - G
브릿지에서 터지는 느낌으로 갈 것.\`
                      </div>
                    </>
                  )}
                  {currentMemo === 3 && (
                    <>
                      <div className="font-bold text-xl mb-4 pt-1 text-zinc-800">혼란스러운 밤</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap">
\`불규칙한 박자처럼 흔들리는 내 마음
정해진 리듬을 벗어나 자꾸만 엇갈려
우연히 마주친 시선에 코드가 뒤엉켜버리고
머릿속은 온통 해결되지 않은 불협화음뿐이야

대체 왜 이러는 걸까, 나.
원래 음악 작업할 땐 아무 생각도 안 나야 정상인데
요즘 들어 자꾸 집중이 안 돼.
이 감정의 정체가 대체 뭔지 모르겠어.

기타 줄을 갈아봐도 소용이 없네.
오늘은 여기까지. 맥주나 한 캔 마셔야겠다.\`
                      </div>
                    </>
                  )}
                  {currentMemo === 4 && (
                    <>
                      <div className="font-bold text-xl mb-4 pt-1 text-zinc-800">(제목 미정 - 록 발라드)</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap">
\`깨져버린 거울 속에 비친 내 모습
어디로 가야 할지 길을 잃었어
소리 질러봐도 메아리만 돌아올 뿐

일렉 기타 솔로 들어갈 자리 비워둘 것.
여기는 좀 강렬하게 디스토션 걸고 러프한 느낌 살려서.\`
                      </div>
                    </>
                  )}
                </div>
              )}`;

const newStr = `              {currentMemo === null ? (
                <div className="flex-1 overflow-y-auto bg-[#f4f4f4] p-4 scrollbar-none">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    <button onClick={() => setCurrentMemo(1)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">별 먼지 - draft_1</div>
                      <div className="text-gray-500 text-sm truncate">어두운 밤하늘에 잠시 빛났던...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 6. 12.</div>
                    </button>
                    <button onClick={() => setCurrentMemo(2)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">무제_작곡중</div>
                      <div className="text-gray-500 text-sm truncate">차가운 비가 내리던 날, 너의 우산이...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 6. 10.</div>
                    </button>
                    <button onClick={() => setCurrentMemo(3)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">혼란스러운 밤</div>
                      <div className="text-gray-500 text-sm truncate">불규칙한 박자처럼 흔들리는 내 마음...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 6. 9.</div>
                    </button>
                    <button onClick={() => setCurrentMemo(4)} className="w-full text-left p-4 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-800 text-base mb-1 truncate">(제목 미정 - 록 발라드)</div>
                      <div className="text-gray-500 text-sm truncate">깨져버린 거울 속에 비친 내 모습...</div>
                      <div className="text-gray-400 text-xs mt-1 font-medium">2026. 5. 28.</div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto scrollbar-none relative">
                  <div className="min-h-full pt-[28px] px-5 pb-12" style={{ backgroundImage: 'linear-gradient(transparent 27px, #fcd34d 27px)', backgroundSize: '100% 28px', backgroundPosition: '0 0', lineHeight: '28px' }}>
                  {currentMemo === 1 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">별 먼지 - draft_1</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
\`어두운 밤하늘에 잠시 빛났던
너라는 별을 잡으려 했지만
손끝에 닿은 건 
서늘한 바람뿐이었지

아직도 내 귓가엔
네가 부르던 멜로디가 맴돌아
우리가 함께 그렸던 
그 시간들은 어디로 갔을까

(Chorus)
떨어지는 유성처럼 잠시 벅차올랐다
재가 되어 사라진 우리의 밤
너를 지우려 아무리 애를 써도
내 마음속엔 자꾸 네가 피어나...

--
하, 가사 왜 이러냐. 
너무 유치해. 다시 쓰자.\`
                      </div>
                    </>
                  )}
                  {currentMemo === 2 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">무제_작곡중</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
\`차가운 비가 내리던 날,
너의 우산이 되어주고 싶었어

하지만 나는 너무 작아서
내 어깨만 흠뻑 젖어버렸지

Bpm 85 정도로 잔잔하게.
코드는 Am - F - C - G
브릿지에서 터지는 느낌으로 갈 것.\`
                      </div>
                    </>
                  )}
                  {currentMemo === 3 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">혼란스러운 밤</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
\`불규칙한 박자처럼 흔들리는 내 마음
정해진 리듬을 벗어나 자꾸만 엇갈려
우연히 마주친 시선에 코드가 뒤엉켜버리고
머릿속은 온통 해결되지 않은 불협화음뿐이야

대체 왜 이러는 걸까, 나.
원래 음악 작업할 땐 아무 생각도 안 나야 정상인데
요즘 들어 자꾸 집중이 안 돼.
이 감정의 정체가 대체 뭔지 모르겠어.

기타 줄을 갈아봐도 소용이 없네.
오늘은 여기까지. 맥주나 한 캔 마셔야겠다.\`
                      </div>
                    </>
                  )}
                  {currentMemo === 4 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">(제목 미정 - 록 발라드)</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
\`깨져버린 거울 속에 비친 내 모습
어디로 가야 할지 길을 잃었어
소리 질러봐도 메아리만 돌아올 뿐

일렉 기타 솔로 들어갈 자리 비워둘 것.
여기는 좀 강렬하게 디스토션 걸고 러프한 느낌 살려서.\`
                      </div>
                    </>
                  )}
                  </div>
                </div>
              )}`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
