import { useState } from 'react';
import { locations } from '../data';
import { Section, SectionTitle } from './Layout';
import { MapPin, Disc, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BandInfo() {
  const [openLocation, setOpenLocation] = useState<number | null>(null);
  const [ashOpen, setAshOpen] = useState(false);

  return (
    <Section>
      <SectionTitle title="THE PLACES" subtitle="Where NOX Breathes" />
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {locations.map((loc, idx) => (
          <div 
            key={idx} 
            className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors cursor-pointer"
            onClick={() => setOpenLocation(openLocation === idx ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-sans tracking-tight text-zinc-100 flex items-center gap-3">
                {idx === 0 ? <MapPin className="text-zinc-500" strokeWidth={1.5} /> : <Disc className="text-zinc-500" strokeWidth={1.5} />}
                {loc.name}
              </h3>
              <div className="flex items-center gap-4">
                <span className="font-mono text-zinc-500 text-sm border border-zinc-800 px-3 py-1 rounded-full hidden md:block">
                  {loc.floor}
                </span>
                <motion.div
                  animate={{ rotate: openLocation === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                </motion.div>
              </div>
            </div>
            
            <AnimatePresence>
              {openLocation === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6">
                    <p className="font-mono text-sm text-zinc-400 mb-6">{loc.description}</p>
                    <ul className="space-y-3">
                      {loc.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div 
        className="mt-16 p-8 border border-zinc-800 border-l-4 border-l-red-900 bg-zinc-950/50 rounded-r-2xl cursor-pointer hover:bg-zinc-900 transition-colors"
        onClick={() => setAshOpen(!ashOpen)}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-zinc-200 tracking-tight">팬덤 : ASH (애쉬)</h4>
          <motion.div
            animate={{ rotate: ashOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-zinc-500" />
          </motion.div>
        </div>
        
        <AnimatePresence>
          {ashOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <p className="text-zinc-400 leading-relaxed text-sm">
                  오래 지켜본 <strong className="text-zinc-300">고인물 팬</strong>들이 주축을 이룬다. 
                  특히 밴드 멤버들 간의 <strong className="text-zinc-300">관계성</strong>에 깊이 과몰입하는 성향이 강하며, 
                  그들이 만들어내는 유튜브 콘텐츠 '녹스끼리'를 통해 끈끈한 유대감을 형성하고 있다.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
