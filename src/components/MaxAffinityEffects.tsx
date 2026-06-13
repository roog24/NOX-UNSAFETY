import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAffinity } from '../context/AffinityContext';
import { Ghost, Sparkles, Smile, Star, Skull, Heart } from 'lucide-react';

export function MaxAffinityEffects() {
  const { activeEffect, triggerEffect, clearEffect } = useAffinity();

  // Jaeyhyun effect persists as long as user is active? Or just a simple blinker on top right forever after triggered once?
  // Let's implement activeEffects for Seowoo, Hyungwon, Eunho
  
  return (
    <AnimatePresence>
      {activeEffect === 'seowoo' && <SeowooEffect />}
      {activeEffect === 'hyungwon' && <HyungwonEffect />}
      {activeEffect === 'eunho' && <EunhoEffect />}
    </AnimatePresence>
  );
}

function SeowooEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[150] pointer-events-none overflow-hidden"
    >
      <motion.div 
        initial={{ y: "100%", opacity: 0, scale: 1 }}
        animate={{ y: "-20%", opacity: [0, 0.5, 0.8, 0.4, 0], scale: 1.5 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-zinc-800/80 via-zinc-600/30 to-transparent blur-[60px]"
        style={{ filter: "url(#smoke-filter)" }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
        animate={{ opacity: [0, 0.8, 1, 0], scale: 1, y: "-50%", x: "-50%" }}
        transition={{ duration: 3, times: [0, 0.4, 0.7, 1] }}
        className="absolute top-[40%] left-1/2 flex gap-12 sm:gap-20 z-10"
      >
        <div className="relative w-16 h-8 sm:w-24 sm:h-12 bg-amber-400 rounded-[100%] shadow-[0_0_40px_15px_rgba(251,191,36,0.4)] flex justify-center items-center rotate-[15deg] overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/40 after:to-transparent">
          <div className="w-1.5 sm:w-2 h-[85%] bg-black rounded-full shadow-[0_0_10px_2px_black]" />
        </div>
        <div className="relative w-16 h-8 sm:w-24 sm:h-12 bg-amber-400 rounded-[100%] shadow-[0_0_40px_15px_rgba(251,191,36,0.4)] flex justify-center items-center -rotate-[15deg] overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/40 after:to-transparent">
          <div className="w-1.5 sm:w-2 h-[85%] bg-black rounded-full shadow-[0_0_10px_2px_black]" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <svg className="hidden">
        <filter id="smoke-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </motion.div>
  );
}

function HyungwonEffect() {
  const [phase, setPhase] = useState<'glitch' | 'message'>('glitch');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('message');
    }, 6000); // 6 seconds of glitch
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center cursor-not-allowed ${
        phase === 'message' ? 'bg-black' : ''
      }`}
    >
      {phase === 'glitch' && (
        <React.Fragment>
          <div className="absolute inset-0 bg-red-900/10 mix-blend-color-burn animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
          {/* Glitch lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ top: `${Math.random() * 100}%`, height: `${Math.random() * 10 + 2}px` }}
                animate={{ x: [-10, 10, -5, 15, 0], opacity: [0.2, 0.8, 0.1, 0.9, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse', delay: Math.random() * 0.2 }}
                className="absolute w-full bg-white/20"
              />
            ))}
          </div>
          <div className="bg-black/90 px-6 py-3 border border-red-900/50 text-red-500 font-mono text-xl tracking-widest uppercase">
            [System: 통제권이 넘어갔습니다]
          </div>
        </React.Fragment>
      )}

      {phase === 'message' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white text-xl md:text-3xl font-light tracking-widest"
        >
          "놀랐어? <span className="font-bold">귀엽네.</span>"
        </motion.div>
      )}
    </motion.div>
  );
}

function EunhoEffect() {
  const [stickers, setStickers] = useState<{ id: number, x: number; y: number, r: number, scale: number }[]>([]);

  useEffect(() => {
    // Generate random stickers
    const newStickers = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: (Math.random() - 0.5) * 60,
      scale: Math.random() * 1 + 0.5
    }));
    setStickers(newStickers);
  }, []);

  const icons = [Star, Heart, Smile, Sparkles, Skull, Ghost];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[300] pointer-events-none"
    >
      {stickers.map((st, i) => {
        const Icon = icons[i % icons.length];
        const colors = ['text-pink-500', 'text-yellow-400', 'text-cyan-400', 'text-fuchsia-500', 'text-lime-400'];
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={st.id}
            initial={{ opacity: 0, scale: 0, rotation: st.r - 90 }}
            animate={{ opacity: 1, scale: st.scale, rotate: st.r }}
            transition={{ type: "spring", damping: 10, stiffness: 100, delay: Math.random() * 0.3 }}
            className={`absolute ${color} drop-shadow-xl p-2 bg-black/40 backdrop-blur-md border-2 border-current rounded-xl`}
            style={{ left: `${st.x}%`, top: `${st.y}%` }}
          >
            <Icon fill="currentColor" strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
