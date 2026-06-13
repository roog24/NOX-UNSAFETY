import React, { createContext, useContext, useState } from 'react';

type AffinityContextType = {
  affinities: Record<string, number>;
  increaseAffinity: (charId: string) => void;
  activeEffect: string | null;
  triggerEffect: (charId: string) => void;
  clearEffect: () => void;
  triggeredEffects: string[];
};

const AffinityContext = createContext<AffinityContextType>({
  affinities: {},
  increaseAffinity: () => {},
  activeEffect: null,
  triggerEffect: () => {},
  clearEffect: () => {},
  triggeredEffects: [],
});

export function AffinityProvider({ children }: { children: React.ReactNode }) {
  const [affinities, setAffinities] = useState<Record<string, number>>({});
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [seenEffects, setSeenEffects] = useState<Record<string, boolean>>({});
  const [triggeredEffects, setTriggeredEffects] = useState<string[]>([]);

  const increaseAffinity = (charId: string) => {
    setAffinities(prev => {
      const current = prev[charId] || 0;
      if (current >= 100) return prev;
      return {
        ...prev,
        [charId]: current + 1
      };
    });
  };

  const triggerEffect = (charId: string) => {
    if ((affinities[charId] || 0) >= 100 && !seenEffects[charId]) {
      setActiveEffect(charId);
      setSeenEffects(prev => ({ ...prev, [charId]: true }));
      setTriggeredEffects(prev => [...prev, charId]);
      
      if (['seowoo', 'hyungwon', 'eunho'].includes(charId)) {
        setTimeout(() => setActiveEffect(null), charId === 'hyungwon' ? 8000 : 3000);
      }
    }
  };

  const clearEffect = () => setActiveEffect(null);

  return (
    <AffinityContext.Provider value={{ affinities, increaseAffinity, activeEffect, triggerEffect, clearEffect, triggeredEffects }}>
      {children}
    </AffinityContext.Provider>
  );
}

export const useAffinity = () => useContext(AffinityContext);
