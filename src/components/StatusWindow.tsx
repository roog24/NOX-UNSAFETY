import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, X, BatteryMedium, Wifi, Signal, Heart, ChevronLeft, StickyNote, Mic, Play, Calculator, Timer, Moon, MessageCircle, Cctv, Lock, Unlock, MessageSquare } from 'lucide-react';
import { useAffinity } from '../context/AffinityContext';
import { characters } from '../data';

let globalJihoShattered = false;

export function StatusWindowToggleButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { triggeredEffects } = useAffinity();
  const isAmber = triggeredEffects.includes('eunhyuk');

  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 border rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isAmber 
            ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 hover:text-amber-700' 
            : 'bg-zinc-900 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:text-white'
        } hover:scale-105`}
        aria-label="Toggle Status Window"
      >
        <Smartphone className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && <StatusWindow onClose={() => setIsOpen(false)} isAmber={isAmber} />}
      </AnimatePresence>
    </>
  );
}

const characterWallpapers: Record<string, string> = {
  'eunhyuk': 'https://i.postimg.cc/MGG1WGVj/1-(1).png',
  'eunho': 'https://i.postimg.cc/ZRB3dDw1/1-(4).png',
  'seowoo': 'https://i.postimg.cc/zBshSSMR/1-(3).png',
  'hyungwon': 'https://i.postimg.cc/15cFwFrL/1-(2).png',
  'jiho': 'https://i.postimg.cc/qqcNcfyG/1-(6).png',
  'jaehyun': 'https://i.postimg.cc/c1ftG32P/1-(5).png'
};

function StatusWindow({ onClose, isAmber }: { onClose: () => void, isAmber: boolean }) {
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [homePage, setHomePage] = useState(0);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [currentMemo, setCurrentMemo] = useState<number | null>(null);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);
  const [isHabitOpen, setIsHabitOpen] = useState(false);
  const [isSleepOpen, setIsSleepOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCctvOpen, setIsCctvOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageView, setMessageView] = useState<'list' | 'chat' | 'notion_auth' | 'notion_page'>('list');
  const [notionTab, setNotionTab] = useState<'schedule' | 'rules'>('rules');
  const [userNameInput, setUserNameInput] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [sentReply, setSentReply] = useState<string | null>(null);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [sleepTab, setSleepTab] = useState<'work' | 'personal'>('work');
  const [habitPage, setHabitPage] = useState(0);
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const { affinities, activeEffect } = useAffinity();
  const [time, setTime] = useState('');
  
  const jihoAffinity = affinities['jiho'] || 0;
  const maxAffinityChars = characters.filter(c => (affinities[c.id] || 0) >= 100);
  const [isIceBroken, setIsIceBroken] = useState(globalJihoShattered);
  const [showJihoShatterAnim, setShowJihoShatterAnim] = useState(false);
  const jihoRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (jihoAffinity >= 100 && !globalJihoShattered) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setTimeout(() => {
              setShowJihoShatterAnim(true);
              setIsIceBroken(true);
              globalJihoShattered = true;
            }, 300);

            setTimeout(() => {
              setShowJihoShatterAnim(false);
            }, 1500);

            if (jihoRef.current) observer.unobserve(jihoRef.current);
          }
        },
        { threshold: 0.5 }
      );

      if (jihoRef.current) observer.observe(jihoRef.current);

      return () => observer.disconnect();
    }
  }, [jihoAffinity, isAppOpen]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed bottom-24 right-6 z-[200] w-[320px] h-[600px] max-h-[80vh] rounded-[40px] shadow-2xl border-[8px] overflow-hidden flex flex-col ring-1 ring-white/10 ${
        isAmber ? 'bg-amber-50/95 border-amber-100 backdrop-blur-xl ring-amber-500/10 shadow-amber-900/10' : 'bg-black border-zinc-900'
      }`}
    >
      {/* Phone Header / Status Bar */}
      <div className={`h-7 w-full backdrop-blur-md flex items-center justify-between px-5 py-1 text-[10px] font-medium z-10 shrink-0 ${
        isAmber ? 'bg-amber-50/80 text-amber-900' : 'bg-black/80 text-white'
      }`}>
        <span>{time}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>

      {/* Dynamic Island / Notch */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-xl z-20 flex justify-center items-center ${
        isAmber ? 'bg-amber-100/80 backdrop-blur-md' : 'bg-black'
      }`}>
        <div className={`w-16 h-1 rounded-full mt-2 ${isAmber ? 'bg-amber-900/20' : 'bg-zinc-800'}`} />
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col bg-black">
        {/* Wallpapers */}
        <div className={`absolute inset-0 z-0 overflow-hidden ${isAmber ? 'bg-amber-50/80' : 'bg-zinc-900/80'}`}>
          <div className={`absolute inset-0 ${isAmber ? 'bg-amber-100' : 'bg-zinc-800'} opacity-30`} />
          
          {/* Eunho Kitsch Stickers */}
          {(affinities['eunho'] || 0) >= 100 && (
            <div className="absolute inset-0 pointer-events-none opacity-80 z-0 select-none">
              <motion.div className="absolute top-[10%] left-[10%] text-3xl drop-shadow-md" animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }}>⭐</motion.div>
              <motion.div className="absolute top-[25%] right-[15%] text-4xl drop-shadow-md" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>💖</motion.div>
              <motion.div className="absolute bottom-[30%] left-[20%] text-3xl drop-shadow-md" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🦋</motion.div>
              <motion.div className="absolute bottom-[15%] right-[25%] text-4xl drop-shadow-md" animate={{ rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }}>🍒</motion.div>
              <motion.div className="absolute top-[50%] left-[5%] text-2xl drop-shadow-md" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>🎀</motion.div>
              <motion.div className="absolute top-[60%] right-[5%] text-3xl drop-shadow-md" animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>🌈</motion.div>
              <motion.div className="absolute bottom-[5%] left-[45%] text-3xl drop-shadow-md" animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}>✨</motion.div>
            </div>
          )}

        </div>



        {/* Floating Chibis */}
        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden" ref={constraintsRef}>
          {maxAffinityChars.map((char, index) => (
            <motion.div 
              key={char.id}
              className="absolute w-28 h-28 bg-contain bg-center bg-no-repeat cursor-grab active:cursor-grabbing pointer-events-auto"
              style={{ 
                backgroundImage: `url("${characterWallpapers[char.id]}")`,
                left: `${15 + (index * 35) % 50}%`,
                top: `${20 + (index * 25) % 55}%`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
              }}
              animate={{
                rotate: [0, index % 2 === 0 ? 6 : -6, index % 3 === 0 ? -4 : 4, 0]
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0}
              dragMomentum={true}
              whileDrag={{ scale: 1.15, zIndex: 50, filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.5))' }}
              whileTap={{ scale: 0.9 }}
              onDragStart={(e) => { e.stopPropagation(); }}
            />
          ))}
        </div>

        {/* Homescreen */}
        <AnimatePresence>
          {!isAppOpen && !isMemoOpen && !isRecorderOpen && !isLedgerOpen && !isHabitOpen && !isSleepOpen && !isChatOpen && !isCctvOpen && !isMessageOpen && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="absolute inset-0 z-10 pt-12 flex flex-col pointer-events-none"
            >
               {activeEffect !== 'hyungwon' && (
                 <button onClick={onClose} className="absolute top-2 right-4 z-20 p-1.5 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white backdrop-blur-md pointer-events-auto">
                   <X className="w-4 h-4" />
                 </button>
               )}
               <div className="flex-1 w-full overflow-hidden pointer-events-none pb-8 relative">
                 <div
                   id="homescreen-scroll"
                   className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none pointer-events-auto scroll-smooth select-none cursor-grab active:cursor-grabbing"
                   onScroll={(e) => {
                     const scrollLeft = e.currentTarget.scrollLeft;
                     const width = e.currentTarget.clientWidth;
                     setHomePage(Math.round(scrollLeft / width));
                   }}
                   onPointerDown={(e) => {
                     if (e.pointerType !== 'mouse') return;
                     const el = e.currentTarget;
                     el.dataset.isDown = 'true';
                     el.dataset.startX = (e.pageX - el.offsetLeft).toString();
                     el.dataset.scrollLeft = el.scrollLeft.toString();
                     el.style.scrollBehavior = 'auto'; // disable smooth snap while dragging
                     el.style.scrollSnapType = 'none';
                   }}
                   onPointerLeave={(e) => {
                     if (e.pointerType !== 'mouse') return;
                     const el = e.currentTarget;
                     el.dataset.isDown = 'false';
                     el.style.scrollBehavior = 'smooth';
                     el.style.scrollSnapType = 'x mandatory';
                   }}
                   onPointerUp={(e) => {
                     if (e.pointerType !== 'mouse') return;
                     const el = e.currentTarget;
                     el.dataset.isDown = 'false';
                     el.style.scrollBehavior = 'smooth';
                     el.style.scrollSnapType = 'x mandatory';
                   }}
                   onPointerMove={(e) => {
                     if (e.pointerType !== 'mouse') return;
                     const el = e.currentTarget;
                     if (el.dataset.isDown !== 'true') return;
                     e.preventDefault();
                     const x = e.pageX - el.offsetLeft;
                     const startX = parseFloat(el.dataset.startX || '0');
                     const scrollLeft = parseFloat(el.dataset.scrollLeft || '0');
                     const walk = (x - startX) * 1.5;
                     el.scrollLeft = scrollLeft - walk;
                   }}
                 >
                   <div className="min-w-full h-full snap-start px-6 flex gap-6 flex-wrap content-start items-start pt-2">
                 {maxAffinityChars.length >= characters.length && (
                   <button 
                      onClick={() => setIsMessageOpen(true)}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform relative overflow-hidden">
                       <MessageSquare className="w-7 h-7 fill-white text-white" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Message</span>
                   </button>
                 )}
                 <button 
                    onClick={() => setIsCctvOpen(true)}
                    className="flex flex-col items-center gap-1.5 w-16 group"
                 >
                   <div className="w-14 h-14 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform relative overflow-hidden">
                     <Cctv className="w-7 h-7 text-white" />
                   </div>
                   <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">CCTV</span>
                 </button>

                 <button 
                    onClick={() => setIsAppOpen(true)}
                    className="flex flex-col items-center gap-1.5 w-16 group"
                 >
                   <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                     <Heart className="w-7 h-7 fill-white text-white" />
                   </div>
                   <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Affinity</span>
                 </button>

                 {(affinities['seowoo'] || 0) >= 100 && (
                   <button 
                      onClick={() => setIsMemoOpen(true)}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-300 rounded-2xl shadow-lg flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform">
                       <StickyNote className="w-7 h-7 fill-amber-200 text-amber-800" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Memo</span>
                   </button>
                 )}

                 {(affinities['hyungwon'] || 0) >= 100 && (
                   <button 
                      onClick={() => setIsRecorderOpen(true)}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-lg flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform relative overflow-hidden">
                       <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                       <Mic className="w-7 h-7 text-white" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Voice</span>
                   </button>
                 )}

                 {(affinities['jiho'] || 0) >= 100 && (
                   <button 
                      onClick={() => setIsLedgerOpen(true)}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform relative overflow-hidden">
                       <Calculator className="w-7 h-7 text-white" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Ledger</span>
                   </button>
                 )}

                 {(affinities['jaehyun'] || 0) >= 100 && (
                   <button 
                      onClick={() => setIsHabitOpen(true)}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform relative overflow-hidden">
                       <Timer className="w-7 h-7 text-white" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Habit</span>
                   </button>
                 )}

                 {(affinities['eunhyuk'] || 0) >= 100 && (
                   <button 
                      onClick={() => setIsSleepOpen(true)}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl shadow-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform relative overflow-hidden">
                       <Moon className="w-7 h-7 text-white" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Sleep</span>
                   </button>
                 )}

                 {(affinities['eunho'] || 0) >= 100 && (
                   <button 
                      onClick={() => {
                        setCurrentChat(null);
                        setIsChatOpen(true);
                      }}
                      className="flex flex-col items-center gap-1.5 w-16 group"
                   >
                     <div className="w-14 h-14 bg-[#FEE500] rounded-2xl shadow-lg flex items-center justify-center text-[#371D1E] group-hover:scale-105 transition-transform relative overflow-hidden">
                       <MessageCircle className="w-7 h-7 fill-[#371D1E]" />
                     </div>
                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
                   </button>
                 )}
                   </div>
                   <div className="min-w-full h-full snap-start px-6 flex items-center justify-center">
                     {/* Empty Page */}
                   </div>
                 </div>
               </div>
               
               <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">
                 {[0, 1].map(page => (
                   <button 
                     key={page} 
                     onClick={() => {
                       const el = document.getElementById('homescreen-scroll');
                       if (el) {
                         el.scrollTo({ left: page * el.clientWidth, behavior: 'smooth' });
                       }
                     }} 
                     className={`w-2 h-2 rounded-full transition-colors ${homePage === page ? 'bg-white' : 'bg-white/30'}`} 
                   />
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memo App */}
        <AnimatePresence>
          {isMemoOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-[#fdfbf7]`}
            >
              {/* App Header */}
              <div className="px-5 pt-7 pb-3 flex justify-between items-center shrink-0 bg-amber-50">
                <div className="flex items-center gap-1">
                  {currentMemo !== null && (
                    <button onClick={() => setCurrentMemo(null)} className="flex items-center text-amber-600 hover:text-amber-800 transition-colors">
                      <ChevronLeft className="w-6 h-6 -ml-2" />
                    </button>
                  )}
                  <span className="text-xl font-bold text-amber-900 tracking-tight">
                    {currentMemo !== null ? 'Note' : '모든 메모'}
                  </span>
                </div>
                {currentMemo === null && (
                   <button onClick={() => { setIsMemoOpen(false); setCurrentMemo(null); }} className="text-amber-600 hover:text-amber-800 transition-colors font-medium text-sm">
                     완료
                   </button>
                )}
              </div>

              {/* Content */}
              {currentMemo === null ? (
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
                  <div className="min-h-full min-w-full pt-[28px] px-5 pb-12" style={{ backgroundImage: 'linear-gradient(transparent 27px, #fcd34d 27px)', backgroundSize: '100% 28px', backgroundPosition: '0 0', backgroundRepeat: 'repeat-y', lineHeight: '28px' }}>
                  {currentMemo === 1 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">별 먼지 - draft_1</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
{`어두운 밤하늘에 잠시 빛났던
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
너무 유치해. 다시 쓰자.`}
                      </div>
                    </>
                  )}
                  {currentMemo === 2 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">무제_작곡중</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
{`차가운 비가 내리던 날,
너의 우산이 되어주고 싶었어

하지만 나는 너무 작아서
내 어깨만 흠뻑 젖어버렸지

Bpm 85 정도로 잔잔하게.
코드는 Am - F - C - G
브릿지에서 터지는 느낌으로 갈 것.`}
                      </div>
                    </>
                  )}
                  {currentMemo === 3 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">혼란스러운 밤</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
{`불규칙한 박자처럼 흔들리는 내 마음
정해진 리듬을 벗어나 자꾸만 엇갈려
우연히 마주친 시선에 코드가 뒤엉켜버리고
머릿속은 온통 해결되지 않은 불협화음뿐이야

대체 왜 이러는 걸까, 나.
원래 음악 작업할 땐 아무 생각도 안 나야 정상인데
요즘은 자꾸 그 사람이 떠올라서 펜이 멈춰.

처음엔 그냥 좀 특이한 사람이라고 생각했는데,
눈을 감아도, 다른 일을 해도 문득문득 그 사람이 생각난다.
단순히 호기심인 걸까? 아니면...
하, 모르겠다. 마음이 너무 복잡해.
이런 감정, 코드로 어떻게 풀어내야 할지도 모르겠고.
그냥... 그 사람 한 번 더 보고 싶다. 내일 연락해 볼까.`}
                      </div>
                    </>
                  )}
                  {currentMemo === 4 && (
                    <>
                      <div className="font-bold text-xl text-zinc-800 leading-[28px] mb-[28px]">(제목 미정 - 록 발라드)</div>
                      <div className="text-zinc-700 italic font-[400] whitespace-pre-wrap leading-[28px]">
{`깨져버린 거울 속에 비친 내 모습
어디로 가야 할지 길을 잃었어
소리 질러봐도 메아리만 돌아올 뿐

일렉 기타 솔로 들어갈 자리 비워둘 것.
여기는 좀 강렬하게 디스토션 걸고 러프한 느낌 살려서.`}
                      </div>
                    </>
                  )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Recorder App */}
        <AnimatePresence>
          {isRecorderOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-zinc-900 border-x border-zinc-800`}
            >
              {/* App Header */}
              <div className="px-3 pt-6 pb-2 border-b border-zinc-800 flex justify-between items-center shrink-0 bg-black">
                <button onClick={() => setIsRecorderOpen(false)} className="px-2 py-1 flex items-center text-red-500 hover:text-red-400 transition-colors">
                  <ChevronLeft className="w-5 h-5 -ml-1" />
                  <span className="text-sm font-medium">Recordings</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-zinc-950 p-0 scrollbar-none">
                <div className="divide-y divide-zinc-800/60">
                  <div className="p-4 hover:bg-zinc-900 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-zinc-100 font-medium text-sm">260530_청운빌딩_계단_발소리.m4a</h4>
                        <p className="text-zinc-500 text-xs mt-1">2026. 5. 30.  •  00:14</p>
                      </div>
                      <Play className="w-6 h-6 text-zinc-600 group-hover:text-red-500 transition-colors fill-zinc-600 group-hover:fill-red-500" />
                    </div>
                  </div>
                  <div className="p-4 hover:bg-zinc-900 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-zinc-100 font-medium text-sm">숨소리.m4a</h4>
                        <p className="text-zinc-500 text-xs mt-1">2026. 6. 10.  •  01:42</p>
                      </div>
                      <Play className="w-6 h-6 text-zinc-600 group-hover:text-red-500 transition-colors fill-zinc-600 group-hover:fill-red-500" />
                    </div>
                  </div>
                  <div className="p-4 hover:bg-zinc-900 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-zinc-100 font-medium text-sm">무제_01</h4>
                        <p className="text-zinc-500 text-xs mt-1">2026. 6. 12.  •  03:15</p>
                      </div>
                      <Play className="w-6 h-6 text-zinc-600 group-hover:text-red-500 transition-colors fill-zinc-600 group-hover:fill-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ledger App */}
        <AnimatePresence>
          {isLedgerOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-gray-50`}
            >
              {/* App Header */}
              <div className="px-3 pt-6 pb-2 border-b border-gray-200 flex justify-between items-center shrink-0 bg-white shadow-sm z-10">
                <button onClick={() => setIsLedgerOpen(false)} className="px-2 py-1 flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
                  <ChevronLeft className="w-5 h-5 -ml-1" />
                  <span className="text-sm font-medium">Monthly Record</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50 scrollbar-none pb-4">
                <div className="p-4 bg-emerald-600 text-white rounded-b-xl shadow-md mb-4 mx-2 mt-2">
                  <div className="text-sm opacity-80 mb-1">June Balance</div>
                  <div className="text-3xl font-bold">481,500 ₩</div>
                  <div className="flex justify-between mt-4 text-xs opacity-90 border-t border-emerald-500/50 pt-2">
                     <div>Expenses: 468,500 ₩</div>
                     <div>Income: 950,000 ₩</div>
                  </div>
                </div>

                <div className="px-4 pb-6 space-y-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 12</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">약국</div>
                        <div className="text-[10px] text-gray-400">그 인간 연고. 자꾸 다치고 난리야</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-3,000 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 11</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">작곡 플러그인 구독료</div>
                        <div className="text-[10px] text-gray-400">결제일 (잊어버리고 있었다...)</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-30,000 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 10</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">교통카드 충전</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-30,000 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 5</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">다이소</div>
                        <div className="text-[10px] text-gray-400">곰팡이 제거제 (미리 사놔야지..)</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-3,000 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 4</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">편의점</div>
                        <div className="text-[10px] text-gray-400">스튜디오 야근... 컵라면 지겹다</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-4,500 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 3</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">관리비</div>
                        <div className="text-[10px] text-gray-400">수도세 미납분 포함 하아..</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-48,000 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 2</div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">레코딩 스튜디오 보조 급여</div>
                      </div>
                      <div className="text-sm font-semibold text-blue-500">+950,000 ₩</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 mb-2 border-b border-gray-100 pb-1">Jun 1</div>
                    <div className="flex justify-between items-center py-1 mt-1">
                      <div>
                        <div className="text-sm font-medium text-gray-800">반지하 월세 이체</div>
                      </div>
                      <div className="text-sm font-semibold text-red-500">-350,000 ₩</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Habit App */}
        <AnimatePresence>
          {isHabitOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-white overflow-hidden`}
            >
              {/* App Header */}
              <div className="px-3 pt-6 pb-2 border-b border-gray-100 flex justify-between items-center shrink-0 bg-white z-10">
                <button onClick={() => setIsHabitOpen(false)} className="px-2 py-1 flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <ChevronLeft className="w-5 h-5 -ml-1" />
                  <span className="text-sm font-medium">Habit Tracker</span>
                </button>
              </div>

              {/* Content - Swipeable */}
              <div className="flex-1 overflow-hidden relative bg-gray-50 min-h-0">
                <AnimatePresence initial={false}>
                  {habitPage === 0 && (
                    <motion.div
                      key="page0"
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      exit={{ x: "-100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      dragDirectionLock
                      onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x < -50 || velocity.x < -300) {
                          setHabitPage(1);
                        }
                      }}
                      className="absolute inset-0 w-full h-full bg-white outline-none"
                    >
                      <div className="w-full h-full overflow-y-auto p-6 pb-20 flex flex-col items-center pt-12 scrollbar-none touch-pan-y">
                        <div className="w-48 h-48 rounded-full border-[12px] border-blue-50 flex flex-col items-center justify-center relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] bg-white shrink-0">
                          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="44" fill="none" stroke="#DBEAFE" strokeWidth="12" />
                          <circle cx="50" cy="50" r="44" fill="none" stroke="#3B82F6" strokeWidth="12" strokeDasharray="276" strokeDashoffset="40" strokeLinecap="round" />
                        </svg>
                        <div className="text-sm font-medium text-gray-500 mb-1 z-10">금연</div>
                        <div className="text-4xl font-bold text-gray-900 z-10 tracking-tighter">D+210</div>
                      </div>
                      
                      <div className="w-full mt-10 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 box-border shrink-0">
                        <div className="flex justify-between items-center py-2 border-b border-gray-50">
                          <span className="text-sm text-gray-500 uppercase tracking-widest">절약한 금액</span>
                          <span className="text-sm font-bold text-gray-900">945,000 원</span>
                        </div>
                        <div className="flex justify-between items-center py-2 pt-4">
                          <span className="text-sm text-gray-500 uppercase tracking-widest">피우지 않은 담배</span>
                          <span className="text-sm font-bold text-gray-900">4,200 개피</span>
                        </div>
                      </div>
                      
                      </div>
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full transition-colors bg-blue-500" />
                        <div className="w-1.5 h-1.5 rounded-full transition-colors bg-gray-300" />
                      </div>
                    </motion.div>
                  )}

                  {habitPage === 1 && (
                    <motion.div
                      key="page1"
                      initial={{ x: "100%" }}
                      animate={{ x: "0%" }}
                      exit={{ x: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      dragDirectionLock
                      onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x > 50 || velocity.x > 300) {
                          setHabitPage(0);
                        }
                      }}
                      className="absolute inset-0 w-full h-full bg-zinc-950 outline-none"
                    >
                      <div className="w-full h-full overflow-y-auto p-6 pb-20 flex flex-col items-center pt-12 scrollbar-none touch-pan-y">
                        <div className="w-48 h-48 rounded-full border-[12px] border-zinc-900 flex flex-col items-center justify-center relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] bg-black shrink-0">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="44" fill="none" stroke="#18181b" strokeWidth="12" />
                          <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" strokeWidth="12" strokeDasharray="276" strokeDashoffset="180" strokeLinecap="round" />
                        </svg>
                        <div className="text-sm font-medium text-zinc-500 mb-1 z-10">선 넘지 않기</div>
                        <div className="text-4xl font-bold text-white z-10 tracking-tighter">D+42</div>
                      </div>
                      
                      <div className="w-full mt-10 bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800/50 box-border text-center shrink-0">
                        <div className="text-xs text-zinc-600 font-mono tracking-widest font-medium">REMAINING PATIENCE</div>
                        <div className="h-1.5 w-full bg-zinc-950 rounded-full mt-3 overflow-hidden">
                          <div className="h-full bg-red-600/80 w-[4%]" />
                        </div>
                      </div>

                      </div>
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full transition-colors bg-zinc-800" />
                        <div className="w-1.5 h-1.5 rounded-full transition-colors bg-red-600" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sleep Tracker App */}
        <AnimatePresence>
          {isSleepOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-zinc-950 overflow-hidden`}
            >
              {/* App Header */}
              <div className="px-3 pt-6 pb-2 border-b border-zinc-800 flex justify-between items-center shrink-0 bg-zinc-950 z-10">
                <button onClick={() => setIsSleepOpen(false)} className="px-2 py-1 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                  <ChevronLeft className="w-5 h-5 -ml-1" />
                  <span className="text-sm font-medium">Sleep Tracker</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden min-h-0">
                {/* Sleep Graph & Stats */}
                <div className="p-5 pt-0 shrink-0">
                  <div className="text-sm font-medium text-red-500 mb-1 flex items-center gap-1.5 mt-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    만성 피로 상태 경고
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight">평균 수면: 2시간 15분</div>
                  
                  {/* Graph */}
                  <div className="mt-5 h-36 flex items-end justify-between gap-1.5 pb-2 border-b border-zinc-800/50">
                    {[1.5, 2, 1, 3, 2.5, 1.5, 4].map((hours, i) => (
                      <div key={i} className="flex flex-col items-center justify-end h-full flex-1 gap-1">
                        <div className="text-[10px] text-zinc-500 font-mono">{hours}h</div>
                        <div 
                          className={`w-full rounded-t-sm transition-all ${hours < 3 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-zinc-800'}`} 
                          style={{ height: `${(hours / 5) * 100}%`, minHeight: '4px' }}
                        />
                        <span className="text-[10px] text-zinc-500 font-medium">
                          {['월','화','수','목','금','토','일'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* To-Do Category Toggle */}
                <div className="px-4 pb-3 flex gap-2 shrink-0">
                  <button 
                    onClick={() => setSleepTab('work')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sleepTab === 'work' ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    업무 일정 (To-Do)
                  </button>
                  <button 
                    onClick={() => setSleepTab('personal')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sleepTab === 'personal' ? 'bg-pink-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    개인 일정
                  </button>
                </div>

                {/* Tasks Container - Swipeable */}
                <div className="flex-1 relative overflow-hidden min-h-0">
                  <AnimatePresence initial={false}>
                    {sleepTab === 'work' && (
                      <motion.div
                        key="work"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        dragDirectionLock
                        onDragEnd={(e, { offset, velocity }) => {
                          if (offset.x < -50 || velocity.x < -300) {
                            setSleepTab('personal');
                          }
                        }}
                        className="absolute inset-0 w-full h-full outline-none"
                      >
                        <div className="w-full h-full overflow-y-auto px-4 pb-20 space-y-3 scrollbar-none touch-pan-y">
                        <div className="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-zinc-600 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-zinc-200">오전 10시 킥오프 회의</div>
                              <div className="text-[10px] text-zinc-500 mt-1">참석자 전원 자료 배포 확인 요망</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-zinc-600 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-zinc-200">커피 수혈</div>
                              <div className="text-[10px] text-zinc-500 mt-1">샷 추가 3잔 필수</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-zinc-600 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-zinc-200">노이즈랩 데모 확인</div>
                              <div className="text-[10px] text-zinc-500 mt-1">수정 사항 반영 여부 체크 (기한 엄수)</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-zinc-600 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-zinc-200">주간 성과 리포트 초안 작성</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-zinc-600 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-zinc-200">C-Level 보고 자료 취합</div>
                              <div className="text-[10px] text-zinc-500 mt-1">퇴근 전까지 무조건 완료할 것</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-zinc-600 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-zinc-200">사업부 예산안 2차 검토</div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </motion.div>
                    )}

                    {sleepTab === 'personal' && (
                      <motion.div
                        key="personal"
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        dragDirectionLock
                        onDragEnd={(e, { offset, velocity }) => {
                          if (offset.x > 50 || velocity.x > 300) {
                            setSleepTab('work');
                          }
                        }}
                        className="absolute inset-0 w-full h-full outline-none"
                      >
                        <div className="w-full h-full overflow-y-auto px-4 pb-20 space-y-3 scrollbar-none touch-pan-y">
                        <div className="bg-pink-900/20 rounded-lg p-3 border border-pink-900/50">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-pink-500/50 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-pink-200">드라이 크리닝 찾기</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-pink-900/20 rounded-lg p-3 border border-pink-900/50">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-pink-500/50 bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 rounded-sm bg-pink-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-pink-200">비타민 꼭 챙겨 먹이기</div>
                              <div className="text-[10px] text-pink-400/80 mt-1">얘 요즘 너무 피곤해 보이던데...</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-pink-900/20 rounded-lg p-3 border border-pink-900/50">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-pink-500/50 flex flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-pink-200">데리러 가기</div>
                              <div className="text-[10px] text-pink-400/80 mt-1">우산 챙길 것. 비 온다고 했음.</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-pink-900/20 rounded-lg p-3 border border-pink-900/50">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-pink-500/50 flex flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-pink-200">걔가 좋아하는 마카롱 예약</div>
                              <div className="text-[10px] text-pink-400/80 mt-1">...</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-pink-900/20 rounded-lg p-3 border border-pink-900/50">
                          <div className="flex items-start gap-3">
                            <div className="w-4 h-4 mt-0.5 rounded border border-pink-500/50 flex flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-pink-200">내일 아침 샌드위치 재료 사기</div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat App */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-[#b2c7d9]`}
            >
              {/* App Header */}
              <div className="px-3 pt-6 pb-2 shrink-0 bg-[#b2c7d9] z-10 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button onClick={() => {
                    if (currentChat) setCurrentChat(null);
                    else setIsChatOpen(false);
                  }} className="py-1 flex items-center text-[#371D1E] hover:bg-black/5 rounded-lg transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="text-lg font-semibold text-[#371D1E] pl-1">{currentChat ? currentChat : '채팅'}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none bg-white">
                {!currentChat ? (
                  <div className="w-full flex flex-col">
                    <button onClick={() => setCurrentChat('나')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-zinc-900 mb-0.5">나</div>
                        <div className="text-xs text-zinc-500 truncate">아, 짜증 나.</div>
                      </div>
                    </button>
                    <button onClick={() => setCurrentChat('꼬ㅊ미남 사장님')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-zinc-900 mb-0.5">꼬ㅊ미남 사장님</div>
                        <div className="text-xs text-zinc-500 truncate">너 무슨 약 한 건 아니지? 아님 어디 아프냐?</div>
                      </div>
                    </button>
                    <button onClick={() => setCurrentChat('한서우')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-zinc-900 mb-0.5">한서우</div>
                        <div className="text-xs text-zinc-500 truncate">나 피 말라 죽는 거 보고 싶어?</div>
                      </div>
                    </button>
                    <button onClick={() => setCurrentChat('또라이')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-zinc-900 mb-0.5">또라이</div>
                        <div className="text-xs text-zinc-500 truncate">ㅋㅋㅋ 알았어요. 이따 봐요. 조심해서 와요.</div>
                      </div>
                    </button>
                    <button onClick={() => setCurrentChat('형')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-zinc-900 mb-0.5">형</div>
                        <div className="text-xs text-zinc-500 truncate">너 요즘 밖으로 존나 돌더라. 쓸데없이 쏘다니면서 사고 치지 말고 똑바로 살아라. 안 그래도 피곤하니까.</div>
                      </div>
                    </button>
                    <button onClick={() => setCurrentChat('07 응애')} className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold text-zinc-900 mb-0.5">07 응애</div>
                        <div className="text-xs text-zinc-500 truncate">저 알바 중이잖아요. 그리고 방금 은혁 형이랑 형 애인 둘이 랩실 와서 분위기 개판이니까 오지 마세요.</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col p-4 bg-[#b2c7d9] w-full min-h-0 overflow-y-auto scrollbar-none pb-12">
                    {currentChat === '나' && (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-center my-2">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 4월 5일 일요일</span>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 2:10</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            현관 비번 4821*
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-2 mt-4">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 1일 금요일</span>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 11:34</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            카페 알바 대타 구해야 함 수요일 오전
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 18일 월요일</span>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 4:30</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            우유, 식빵, 영양제 사가기
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 6:15</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px] break-all">
                            https://store.musinsa.com/app/goods/253919<br/>이거 ㄱㅊ한듯
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 6:16</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            별론가?
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 10일 수요일</span>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 9:10</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            국민은행 123456-11-223344 김은호
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 13일 토요일</span>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 2:14</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아 씨발 진짜 좆됐다
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 2:17</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            형원이랑 있을 때도 서우랑 뒹굴 때도 이런 기분 든 적 없었는데
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 2:18</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            걔랑은 완전 다름. 걔네랑 결이 아예 다르다고 미치겠네
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-2">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 3:05</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            나 진짜 개쓰레긴가? 아니 쓰레기 맞지 ㅋㅋ
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-2">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 3:12</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            걔가 내 폰이나 관계 알게 되면 벌레 보듯 보겠지
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-2">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 4:00</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            하.......
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-2">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 4:21</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아니 근데 나 진짜 어떡하냐
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 4:50</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            잠 개안오네 진짜
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-8">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 11:05</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            .
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 11:06</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            .
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 11:10</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아, 짜증 나.
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentChat === '꼬ㅊ미남 사장님' && (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-center my-2 mt-4">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 9일 토요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">꼬ㅊ미남 사장님</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">은호야. 2번 앰프 케이블 또 끊어먹었냐.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 7:30</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 7:35</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아;; 형님 그거 원래 좀 간당간당했습니다 억울합니다
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">내일 와서 뚝배기 깨질 준비 해라.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 7:40</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 7:42</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            살려주십쇼 형수님한테 형님 고딩 때 밴드부 흑역사 영상 풉니다
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">ㅋㅋㅋㅋㅋㅋㅋ 사 와라 니 돈으로.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 7:45</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 14일 일요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">꼬ㅊ미남 사장님</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">박은호. 너 요즘 왤케 넋이 나갔냐.</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">너 무슨 약 한 건 아니지? 아님 어디 아프냐?</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오전 10:15</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <div className="flex flex-col gap-1 items-end">
                            <div className="flex items-end gap-1.5">
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 10:20</span>
                              <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">아 형;; 미쳤어요? 약은 무슨.</div>
                            </div>
                            <div className="flex items-end gap-1.5">
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 10:21</span>
                              <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">그냥... 인생에 좀 회의감이 들어서요. 제가 참 쓰레기 같고 뭐 그러네요 하하</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">지랄하네ㅋㅋ 또 어디서 누구 울리고 왔냐. 낼 데모 녹음이나 늦지 마라.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오전 10:30</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[75%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm p-3 text-[13px] shadow-sm w-full min-w-[200px]">
                                <div className="text-[11px] font-bold text-red-500 mb-1.5 flex items-center gap-1">
                                  <span>🎁</span> 선물
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 mb-2 border border-gray-100">
                                  <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden shrink-0">
                                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200" alt="피자 세트" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex flex-col flex-1 overflow-hidden">
                                     <span className="text-[10px] text-gray-500 truncate">도미노피자</span>
                                     <span className="text-xs font-bold line-clamp-2 leading-tight">프리미엄 피자 L + 콜라 1.2L 세트</span>
                                  </div>
                                </div>
                                <button className="w-full bg-[#f3f3f3] py-2 rounded-md text-xs font-semibold text-gray-700">선물 확인하기</button>
                              </div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">먹고 힘내라.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오전 10:31</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentChat === '한서우' && (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-center my-2 mt-4">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 4일 목요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">한서우</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">은호 형 오늘 안 와?</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">나 지금 혼자 있는데. 네로도 형 보고 싶대.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 8:40</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 9:15</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            오늘은 패스. 피곤해.
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 5일 금요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">한서우</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">은혁이 형 또 야근이래. 나 우울해.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 7:10</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 7:15</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아 알았어. 갈 테니까 술 마시고 있지 마. 금방 감.
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 13일 토요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">한서우</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">은호 형</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">어디야? 나 지금 형 자취방 앞인데.</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">문 좀 열어주면 안 돼? 보고 싶어...</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 1:20</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <div className="flex flex-col gap-1 items-end">
                            <div className="flex items-end gap-1.5">
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 1:25</span>
                              <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">아 씨발 서우야. 나 오늘 밖이고 피곤하다고 했잖아.</div>
                            </div>
                            <div className="flex items-end gap-1.5">
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 1:26</span>
                              <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">그냥 가. 나중에 내가 연락할게.</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">요새 왜 자꾸 피해? 나 피 말라 죽는 거 보고 싶어?</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 1:28</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 1:35</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            하... 됐다. 맘대로 생각해라. 나 지금 바빠.
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">알았어...</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 1:40</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentChat === '또라이' && (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-center my-2 mt-4">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 30일 토요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">또라이</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">은호 형.</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">요즘 합주할 때 보니까, 핸드폰을 자주 보네요.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 8:15</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 8:30</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            어. 그냥 좀 볼 게 있어서. 왜.
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">아니에요. 재미있는 게 생겼나 해서요.</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">내일 봐요.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 8:35</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 6월 1일 월요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">또라이</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">기타 피크 소파에 두고 갔네요.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 11:20</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 11:30</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아 씨발 또? 보관 좀 해줘 이따 아지트 감
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">급하게 도망치듯 가길래. 서우 형이랑 재밌었어요?</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 11:32</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 11:35</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            돌았냐 카톡으로 그딴 소리 하지 말랬지
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">ㅋㅋㅋ 알았어요. 이따 봐요. 조심해서 와요.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 11:40</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentChat === '형' && (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-center my-2 mt-4">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 4월 12일 일요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">형</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">야</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">엄마가 반찬 보낸 거 니네 집 문 앞에 뒀다. 가져가서 냉장고에 넣어라. 썩히지 말고.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 3:10</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 4:00</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            ㅇ
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 4월 25일 토요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">형</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">오늘 합주 늦지 마라. 또 지각하면 키보드 스탠드로 패버린다.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 1:20</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 1:30</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            ㅇㅇ
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">1분 늦을 때마다 한 대씩 맞는다</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 1:32</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 16일 토요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">형</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">밥은 먹었냐 안 먹었으면 나와서 뼈해장국이나 먹든가</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 12:40</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 12:50</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            네 형님~^^ 바로 모시러 가겠습니다 충성충성
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 24일 일요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">형</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">쓰레기 내 집 문 앞에 두지 말라고 했지 뒤질래</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오전 10:20</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오전 11:00</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            ㅇ
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 27일 수요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">형</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">너 요즘 밖으로 존나 돌더라. 쓸데없이 쏘다니면서 사고 치지 말고 똑바로 살아라. 안 그래도 피곤하니까.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 9:15</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 9:30</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            네 형님~^^ 충성충성 알아서 잘 살고 있으니 걱정 마십쇼~
                          </div>
                        </div>
                      </div>
                    )}

                    {currentChat === '07 응애' && (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-center my-2 mt-4">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 23일 토요일</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">07 응애</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">박은호 내 충전 케이블 니가 가져갔냐</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 2:10</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 2:15</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            아 맞다 쏘리 낼 갖다줌
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">씨발아 당장 가져와 그거 하나라고</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">야</div>
                            </div>
                            <div className="flex items-end gap-1.5 mt-1">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">읽씹하지마 죽여버리기전에</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 2:20</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center my-4 mt-8">
                          <span className="bg-black/10 text-[#371D1E]/60 text-[10px] px-3 py-1 rounded-full">2026년 5월 27일 수요일</span>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 4:10</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            지호야 막내야 우리 귀여운 드러머야
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <span className="text-xs text-[#371D1E] opacity-80">07 응애</span>
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">아 또 왜요 형 제발요</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 4:15</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 4:16</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            나 봄봄카페 대타 좀 뛰어주라 시급 1.5배 드림
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <div className="flex flex-col gap-1 items-start max-w-[70%]">
                            <div className="flex items-end gap-1.5">
                              <div className="bg-white text-[#371D1E] rounded-xl rounded-tl-sm px-3 py-2 text-[13px] shadow-sm">저 알바 중이잖아요. 그리고 방금 은혁 형이랑 형 애인 둘이 랩실 와서 분위기 개판이니까 오지 마세요.</div>
                              <span className="text-[10px] text-[#371D1E]/60 mb-0.5 shrink-0">오후 4:20</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1.5 self-end mt-1">
                          <span className="text-[10px] text-[#371D1E]/60 mb-0.5">오후 4:25</span>
                          <div className="bg-[#FEE500] text-[#371D1E] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm max-w-[200px]">
                            ㅋㅋㅋㅋㅋ알았다 수고해라
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Affinity App */}
        <AnimatePresence>
          {isAppOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col ${
                isAmber ? 'bg-amber-50/95 backdrop-blur-xl' : 'bg-zinc-950'
              }`}
            >
              {/* App Header */}
              <div className={`px-5 pt-6 pb-4 border-b flex justify-between items-center shrink-0 ${
                isAmber ? 'bg-white border-amber-100' : 'bg-zinc-950 border-zinc-900/50'
              }`}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsAppOpen(false)} className={`p-1 rounded-full transition-colors ${
                    isAmber ? 'text-amber-600 hover:bg-amber-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}>
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className={`text-lg font-bold tracking-tight ${isAmber ? 'text-amber-950' : 'text-white'}`}>STATUS</h2>
                    <p className={`text-[10px] font-mono uppercase tracking-widest ${isAmber ? 'text-amber-600' : 'text-zinc-500'}`}>Affinity System</p>
                  </div>
                </div>
                
                {activeEffect !== 'hyungwon' && (
                  <button onClick={onClose} className={`p-1.5 rounded-full transition-colors ${
                    isAmber ? 'bg-amber-50 text-amber-600 hover:text-amber-800 hover:bg-amber-100' : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 overflow-y-auto p-5 scrollbar-none space-y-4 ${
                isAmber ? 'bg-amber-50/50' : 'bg-zinc-950'
              }`}>
                {characters.map(char => {
                  const affinity = affinities[char.id] || 0;
                  return (
                    <div key={char.id} ref={char.id === 'jiho' ? jihoRef : undefined} className={`p-4 rounded-2xl border backdrop-blur-sm relative overflow-hidden group ${
                      isAmber ? 'bg-white/80 border-amber-200/50 shadow-sm shadow-amber-900/5' : 'bg-zinc-900/80 border-zinc-800/50'
                    }`}>
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${char.color}`} />
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border ${
                          isAmber ? 'bg-amber-100 border-amber-200' : 'bg-zinc-800 border-zinc-700/50'
                        }`}>
                          {char.imageUrl ? (
                            <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center text-xs font-bold ${
                              isAmber ? 'bg-amber-50 text-amber-600' : 'bg-zinc-800 text-zinc-500'
                            }`}>
                              {char.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className={`font-bold text-sm ${isAmber ? 'text-amber-950' : 'text-zinc-200'}`}>{char.name}</div>
                          <div className={`text-[10px] font-mono ${isAmber ? 'text-amber-600' : 'text-zinc-500'}`}>{char.position}</div>
                        </div>
                        <div className={`ml-auto font-mono text-xl font-black ${isAmber ? 'text-amber-900' : 'text-white/90'}`}>
                          {affinity}<span className={`text-xs font-medium ml-0.5 ${isAmber ? 'text-amber-600' : 'text-zinc-500'}`}>%</span>
                        </div>
                      </div>

                      <div className={`w-full h-2 rounded-full overflow-hidden border relative ${
                        isAmber ? 'bg-amber-100/50 border-amber-200/50' : 'bg-zinc-950 border-zinc-800/80'
                      }`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${affinity}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${char.color}`}
                        />
                      </div>
                      
                      {affinity >= 100 && (
                        <div className={`mt-3 text-[10px] font-medium text-center tracking-wide flex items-center justify-center gap-1.5 animate-pulse ${
                          isAmber ? 'text-amber-600' : 'text-pink-400/90'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${isAmber ? 'bg-amber-500' : 'bg-pink-500'}`} />
                          MAX AFFINITY REACHED
                          <div className={`w-1 h-1 rounded-full ${isAmber ? 'bg-amber-500' : 'bg-pink-500'}`} />
                        </div>
                      )}
                      
                      {char.id === 'jiho' && !isIceBroken && (
                        <div className="absolute inset-0 z-10 bg-cyan-100/10 backdrop-blur-[1.5px] border border-cyan-200/30 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/ice-light.png"), linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)', backgroundSize: 'auto, 40px 40px' }} />
                      )}
                      {char.id === 'jiho' && showJihoShatterAnim && (
                        <motion.div 
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 z-20 bg-cyan-50/40 backdrop-blur-md pointer-events-none"
                        >
                          {[...Array(12)].map((_, i) => (
                            <motion.div key={i} className="absolute w-8 h-12 bg-white/60 blur-[1px]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, rotate: `${Math.random() * 180 - 90}deg`, clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} animate={{ y: Math.random() * 100 + 50, x: (Math.random() - 0.5) * 100, opacity: 0, rotate: `${Math.random() * 360}deg` }} transition={{ duration: 0.6, ease: "easeOut" }} />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Message App */}
        <AnimatePresence>
          {isMessageOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-white text-zinc-900`}
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
                        <div className="text-sm text-gray-500 truncate">링크 공유할 테니 이름 치고 들어와.</div>
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
                           노션 워크스페이스 구축 완료했어.
                         </div>
                         <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 text-[15px] shadow-sm">
                           링크 공유할 테니 이름 치고 들어와.
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
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${replyInput.trim().length > 0 ? 'bg-[#FEE500] text-[#371D1E]' : 'bg-gray-100 text-gray-400'}`}
                      disabled={replyInput.trim().length === 0}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                      </svg>
                    </button>
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
                      type="text" 
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
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${userNameInput.trim().length > 0 ? 'bg-zinc-900 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}
                      disabled={userNameInput.trim().length === 0}
                    >
                      Enter
                    </button>
                  </div>
                </div>
              )}

              {messageView === 'notion_page' && (
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
                          className={`px-3 py-1.5 text-sm font-medium transition-colors border-b-[2px] ${notionTab === 'schedule' ? 'text-zinc-900 border-zinc-900' : 'text-gray-500 border-transparent hover:bg-gray-50 rounded-md'}`}
                        >
                          데이트 스케줄러
                        </button>
                        <button 
                          onClick={() => setNotionTab('rules')}
                          className={`px-3 py-1.5 text-sm font-medium transition-colors border-b-[2px] ${notionTab === 'rules' ? 'text-zinc-900 border-zinc-900' : 'text-gray-500 border-transparent hover:bg-gray-50 rounded-md'}`}
                        >
                          합의된 규칙
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
                                 <p className="text-xs text-gray-500">with 최지호</p>
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
                              setIsAgreed(true);
                              setMessageView('chat');
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
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CCTV App */}
        <AnimatePresence>
          {isCctvOpen && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`absolute inset-0 z-20 flex flex-col bg-zinc-950 text-zinc-200`}
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
                      <span className="text-sm font-medium text-zinc-300">CAM 1</span>
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
                      <span className="text-sm font-medium text-zinc-300">CAM 2</span>
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
                      <span className="text-sm font-medium text-zinc-300">CAM 3</span>
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
                      <span className="text-sm font-medium text-zinc-300">CAM 4</span>
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
      
      {/* Home Bar */}
      <div 
        className={`h-6 w-full flex items-center justify-center shrink-0 cursor-pointer ${
          isAmber ? 'bg-amber-50' : 'bg-zinc-950'
        }`}
        onClick={() => {
          if (isAppOpen) {
            setIsAppOpen(false);
          } else if (isMemoOpen) {
            setIsMemoOpen(false);
            setCurrentMemo(null);
          } else if (isRecorderOpen) {
            setIsRecorderOpen(false);
          } else if (isLedgerOpen) {
            setIsLedgerOpen(false);
          } else if (isHabitOpen) {
            setIsHabitOpen(false);
          } else if (isSleepOpen) {
            setIsSleepOpen(false);
          } else if (isChatOpen) {
            setIsChatOpen(false);
          } else if (isCctvOpen) {
            setIsCctvOpen(false);
          } else if (isMessageOpen) {
            setIsMessageOpen(false);
            setMessageView('list');
            setUserNameInput('');
          } else {
            onClose();
          }
        }}
      >
        <div className={`w-24 h-1 rounded-full mt-1 hover:bg-zinc-400 transition-colors ${isAmber ? 'bg-amber-200 hover:bg-amber-300' : 'bg-zinc-500'}`} />
      </div>
    </motion.div>
  );
}
