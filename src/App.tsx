import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { Hero } from './components/Hero';
import { BandInfo } from './components/BandInfo';
import { Characters } from './components/Characters';
import { RelationshipMap } from './components/RelationshipMap';
import { PhotoGallery } from './components/PhotoGallery';
import { LiveComments } from './components/LiveComments';
import { FanCommunity } from './components/FanCommunity';
import { EnterScreen } from './components/EnterScreen';
import { StatusWindowToggleButton } from './components/StatusWindow';
import { MaxAffinityEffects } from './components/MaxAffinityEffects';
import { useAffinity } from './context/AffinityContext';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { triggeredEffects, activeEffect } = useAffinity();
  
  const hasJaehyunMax = triggeredEffects.includes('jaehyun');

  useEffect(() => {
    if (entered && audioRef.current) {
      if (activeEffect === 'hyungwon') {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [entered, isPlaying, activeEffect]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-zinc-800">
      <AnimatePresence>
        {!entered && <EnterScreen onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter flex items-center gap-4">
            NOX
            {hasJaehyunMax && (
              <div className="font-mono text-[10px] md:text-xs text-red-500 font-bold flex items-center gap-1.5 animate-pulse rounded bg-red-500/10 px-2 py-0.5 border border-red-500/20">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500" />
                REC
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            {entered && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                  aria-label={isPlaying ? "Pause BGM" : "Play BGM"}
                >
                  {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
                  <span className="truncate max-w-[150px] sm:max-w-none">BGM: 어지러운 궤도 (Tangled Orbit)</span>
                </button>
                <audio 
                  ref={audioRef}
                  src="https://raw.githubusercontent.com/roog24/10/main/%EC%96%B4%EC%A7%80%EB%9F%AC%EC%9A%B4%20%EA%B6%A4%EB%8F%84%20(Tangled%20Orbit).mp3"
                  loop
                  className="hidden"
                />
              </div>
            )}
            
            {!hasJaehyunMax && (
              <div className="font-mono text-xs text-zinc-600 hidden md:block">2026 ARCHIVE</div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="pt-16">
        <Hero />
        <BandInfo />
        <RelationshipMap />
        <Characters />
        <PhotoGallery />
        <LiveComments />
        <FanCommunity />
      </main>

      <footer className="py-12 px-6 border-t border-zinc-900 text-center font-mono text-xs text-zinc-600">
        <p>NOX RECORDING LOG . 2026</p>
        <p className="mt-2 text-zinc-800">Hongdae Cheongun Bldg.</p>
      </footer>

      {entered && <StatusWindowToggleButton />}
      {entered && <MaxAffinityEffects />}
    </div>
  );
}
