import { motion } from 'motion/react';
import { Headphones } from 'lucide-react';

export function EnterScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <p className="font-mono text-zinc-500 mb-8 tracking-widest text-sm uppercase">NOX ARCHIVE . 2026</p>
        
        <button 
          onClick={onEnter}
          className="group relative px-8 py-4 bg-zinc-900 overflow-hidden rounded-full border border-zinc-800 hover:border-red-900 transition-colors flex items-center gap-4 focus:outline-none"
        >
          <div className="absolute inset-0 bg-red-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <Headphones className="w-5 h-5 text-red-500 relative z-10 animate-pulse" />
          <span className="font-black font-sans tracking-widest text-lg relative z-10">ENTER SITE</span>
        </button>
        
        <p className="font-mono text-zinc-500 mt-8 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          BGM: 어지러운 궤도 (Tangled Orbit)
        </p>
      </motion.div>
    </motion.div>
  );
}
