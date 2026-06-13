import React, { useState, useEffect } from 'react';
import { Character } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { useAffinity } from '../context/AffinityContext';

export function CharacterCard({ char, onClick }: { char: Character; onClick?: () => void; key?: string | number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col bg-zinc-900 border border-zinc-800/80 overflow-hidden rounded-2xl cursor-pointer hover:border-zinc-700 transition-colors"
      onClick={onClick}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${char.color} z-10`} />
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-950">
        {char.imageUrl ? (
          <img 
            src={char.imageUrl} 
            alt={char.name} 
            className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
            referrerPolicy="no-referrer" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-800 font-bold text-2xl gap-2">
            <span>{char.name}</span>
            <span className="text-sm font-mono">{char.position}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-1 group-hover:text-zinc-100">{char.name}</h3>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300">
              {char.position}
            </span>
        </div>
      </div>
    </motion.div>
  );
}

export function CharacterProfileModal({ char, onClose }: { char: Character; onClose: () => void }) {
  const { affinities, increaseAffinity } = useAffinity();
  const clickCount = affinities[char.id] || 0;
  
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showBdsm, setShowBdsm] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [showAltImage, setShowAltImage] = useState(clickCount >= 100);

  const altImages: Record<string, string> = {
    eunhyuk: "https://i.postimg.cc/BvwdFwmR/39.png",
    eunho: "https://i.postimg.cc/gJZBZcXg/40.png",
    seowoo: "https://i.postimg.cc/9MZJfxK6/41.png",
    hyungwon: "https://i.postimg.cc/d12jFhZ8/42.png",
    jiho: "https://i.postimg.cc/Y28QxK6R/43.png",
    jaehyun: "https://i.postimg.cc/bJVNsTnr/44.png",
  };

  useEffect(() => {
    if (altImages[char.id]) {
      const img = new Image();
      img.src = altImages[char.id];
    }
  }, [char.id]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = { id: Date.now(), x, y };
    setHearts((prev) => [...prev, newHeart]);
    
    const newCount = clickCount + 1;
    increaseAffinity(char.id);

    if (newCount === 100) {
      setIsBlackout(true);
      setTimeout(() => {
        setIsBlackout(false);
        setShowAltImage(true);
      }, 1000);
    }

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  const getDialogue = (charId: string, count: number) => {
    if (count >= 100) {
      switch (charId) {
        case 'eunhyuk': return "하... 미치겠네 진짜. 얌전히 좀 있어봐, 더 이상 움직이면 내가..";
        case 'eunho': return "하아...! 아, 시발... 네가 날 여기까지 끌어내려놓고 지금 피하겠다고? 장난해? 더 해봐.";
        case 'seowoo': return "아아...! 더... 읏, 나 버리지 않을 거지...?";
        case 'hyungwon': return "그렇게 내 시선 받는 게 좋은가 봐? 꼴이 아주 볼만해, 아무것도 못 보고 덜덜 떠는 꼴이 꽤 귀여운데.";
        case 'jiho': return "...읏, 잠깐... 숨 좀 쉬고...";
        case 'jaehyun': return "하아... 진짜 사람 돌게 하네... 우리 예쁜이, 내가 어떻게 해줬으면 좋겠어? 응?";
        default: return "하아... 읏... 도저히 못 참겠어...";
      }
    } else if (count >= 80) {
      switch (charId) {
        case 'eunhyuk': return "더 이상은 못 참아. 네가 자초한 거야.";
        case 'eunho': return "하... 진짜 미치겠네. 오늘 밤엔 각오하는 게 좋을걸.";
        case 'seowoo': return "아... 더, 더 해줘... 머리가 이상해질 것 같아...";
        case 'hyungwon': return "이젠 정말 돌이킬 수 없어. 완전히 부숴줄게.";
        case 'jiho': return "시발, 진짜 적당히 좀 해. 확 덮쳐버리기 전에.";
        case 'jaehyun': return "이제 봐주는 거 없어. 네가 날 달아오르게 했으니까.";
        default: return "이제 한계야...";
      }
    } else if (count >= 50) {
      switch (charId) {
        case 'eunhyuk': return "...가만 두려고 했는데 안 되겠네. 이리 와.";
        case 'eunho': return "하, 너 진짜 돌았구나? 나 안 참는다 이제.";
        case 'seowoo': return "하아... 너밖에 없어... 계속 해줘...";
        case 'hyungwon': return "기꺼이 네가 원하는 대로 망가져 줄게.";
        case 'jiho': return "하아... 마음대로 해라. 어차피 말려도 안 들을 거잖아.";
        case 'jaehyun': return "선 넘으면 나도 돌려줄 수밖에 없어. 적당히 하자, 응?";
        default: return "이제 진짜 쓰다듬는 게 취미가 된 건가...";
      }
    } else if (count >= 30) {
      switch (charId) {
        case 'eunhyuk': return "하아... 진짜 어쩌자는 건지. 감당할 수 있지?";
        case 'eunho': return "진짜 끝까지 가보자는 거지? 후회하지 마.";
        case 'seowoo': return "나 버리지 마... 이렇게 만들어놓고 가면 진짜 미워할거야.";
        case 'hyungwon': return "묘한 기분이네... 네가 원한다면 전부 내어줄 수도 있을 것 같아.";
        case 'jiho': return "너 일부러 그러는 거지? 진짜 사람 짜증나게 하네.";
        case 'jaehyun': return "음... 곤란하네. 나 임자 있는 몸인 거 알잖아?";
        default: return "아아... 진짜 이러기야? 나 이제 몰라...";
      }
    } else if (count >= 15) {
      switch (charId) {
        case 'eunhyuk': return "이제 그만해도 되지 않을까...? 여기선 좀 곤란한데.";
        case 'eunho': return "오, 계속 만지게? 나야 늘 환영이지.";
        case 'seowoo': return "계속 할거면 끝까지 해... 중간에 멈추면 화낼거야.";
        case 'hyungwon': return "계속 만지네. 나를 관찰이라도 하는 건가?";
        case 'jiho': return "아, 거슬린다고. 왜 자꾸 만지는 건데?";
        case 'jaehyun': return "하하, 장난이 좀 심한데. 아저씨 놀리는 재미가 쏠쏠해?";
        default: return "이제 그만해도 되지 않을까...? 조금 부끄러운데..";
      }
    } else if (count >= 5) {
      switch (charId) {
        case 'eunhyuk': return "어, 갑자기 왜 이렇게 쓰다듬는 거야...?";
        case 'eunho': return "뭐야? 갑자기 왜 치고 그래. 나한테 반했어?";
        case 'seowoo': return "...뭐야. 왜 만져.";
        case 'hyungwon': return "...손, 꽤 따뜻하네.";
        case 'jiho': return "뭐야. 치워.";
        case 'jaehyun': return "어허, 갑자기 왜 이럴까?";
        default: return "어, 갑자기 왜 이렇게 쓰다듬는 거야...?";
      }
    }
    return null;
  };

  const dialogue = getDialogue(char.id, clickCount);
  const currentImageUrl = showAltImage && altImages[char.id] ? altImages[char.id] : char.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8"
      onClick={onClose}
    >
      <AnimatePresence>
        {isBlackout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-black z-[1000] pointer-events-none"
          />
        )}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-800 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-2 w-full flex-shrink-0 bg-gradient-to-r ${char.color}`} />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border border-zinc-700/50 rounded-full flex items-center justify-center bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="overflow-y-auto flex-grow p-5 md:p-8 scrollbar-none flex flex-col md:flex-row gap-6 md:gap-10">
          
          <div className="flex flex-col gap-4 w-full md:w-5/12 flex-shrink-0">
            <div 
              className="w-full aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 relative cursor-pointer group"
              onClick={handleImageClick}
            >
              {currentImageUrl ? (
                <img src={currentImageUrl} alt={char.name} className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-800 font-bold text-4xl group-hover:scale-105 transition-transform duration-500">
                  {char.name}
                </div>
              )}
              
              <AnimatePresence>
                {hearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -100, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute text-pink-500 z-10 pointer-events-none"
                    style={{ left: heart.x - 12, top: heart.y - 12 }}
                  >
                    <Heart className="w-6 h-6 fill-current drop-shadow-lg" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {dialogue && (
                <motion.div
                  key={clickCount >= 100 ? '100' : clickCount >= 80 ? '80' : clickCount >= 50 ? '50' : clickCount >= 30 ? '30' : clickCount >= 15 ? '15' : '5'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-black/40 border border-zinc-800/80 p-4 rounded-xl relative"
                >
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-black/40 border-l border-t border-zinc-800/80 rotate-45" />
                  <p className="text-sm md:text-base text-zinc-300 italic font-medium">"{dialogue}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col justify-start w-full md:w-7/12 py-2">
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">{char.name}</h3>
            <div className="flex items-center gap-2 mb-6">
               <span className="w-6 md:w-8 border-b-2 border-zinc-600 block" />
               <span className="text-sm md:text-base font-medium text-zinc-300">{char.role}</span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap mb-8">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-zinc-400 border border-zinc-700/50 px-3 py-1.5 rounded-md bg-zinc-800/30">
                {char.position}
              </span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-zinc-400 border border-zinc-700/50 px-3 py-1.5 rounded-md bg-zinc-800/30">
                AGE {char.age}
              </span>
              <span className="font-medium text-[10px] md:text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md tracking-wide">
                {char.mbti}
              </span>
            </div>

            <div className="p-4 md:p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/50 mb-8 pl-5 md:pl-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-700 rounded-l-xl" />
              <p className="text-sm md:text-base font-medium text-zinc-300 leading-relaxed italic">
                "{char.personality}"
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] md:text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-700" /> Detail Logs
              </h4>
              <ul className="space-y-3">
                {char.features.map((feat, idx) => (
                  <li key={idx} className="text-sm md:text-base flex items-start gap-3 text-zinc-400">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
                {char.bdsm && (
                  <li 
                    className="text-sm md:text-base flex items-start gap-3 text-red-500/80 hover:text-red-400 font-medium cursor-pointer transition-colors"
                    onClick={() => setShowBdsm(!showBdsm)}
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-800/80 flex-shrink-0" />
                    <span className="leading-snug">
                      {showBdsm ? char.bdsm : (
                        <span className="inline-flex items-center bg-red-950/30 px-2.5 py-0.5 rounded border border-red-900/30 text-xs tracking-wider opacity-80 backdrop-blur-sm">
                          성적 취향&BDSM (보기) 🔞
                        </span>
                      )}
                    </span>
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
