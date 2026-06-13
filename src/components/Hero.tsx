import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-zinc-900/40 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-zinc-900/60 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <p className="font-mono text-zinc-500 tracking-[0.3em] uppercase text-sm mb-6">
          Seoul Indie Band // 2026
        </p>
        <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600">
          NOX
        </h1>
        <div className="flex flex-col md:flex-row gap-8 max-w-2xl text-zinc-400 text-lg leading-relaxed font-light">
          <p>
            라이브 클럽을 중심으로 활동하며 업계에서 입소문을 타고 있는 5인조 자작곡 기반 인디 밴드.
            유튜브 채널 <strong className="text-zinc-200 font-medium">'녹스끼리'</strong>를 통해 매주 팬들과 소통하며 구독자 8.7만 명을 돌파했다.
          </p>
        </div>
        
        <div className="mt-12 flex gap-4">
          <div className="px-5 py-3 border border-zinc-800 rounded-full font-mono text-xs flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE CLUB GIGS
          </div>
          <div className="px-5 py-3 border border-zinc-800 rounded-full font-mono text-xs flex items-center gap-3 bg-zinc-900/50 backdrop-blur-sm">
            FANDOM : ASH
          </div>
        </div>
      </motion.div>
    </div>
  );
}
