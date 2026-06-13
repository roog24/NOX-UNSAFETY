import { useState } from 'react';
import { characters } from '../data';
import { Character } from '../types';
import { Section, SectionTitle } from './Layout';
import { CharacterCard, CharacterProfileModal } from './CharacterCard';
import { AnimatePresence } from 'motion/react';

export function Characters() {
  const noxMembers = characters.filter(c => c.isNoxMember);
  const studioMembers = characters.filter(c => !c.isNoxMember);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  return (
    <Section>
      <SectionTitle title="MEMBERS" subtitle="The Faces of NOX" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
        {noxMembers.map(char => (
          <CharacterCard key={char.id} char={char} onClick={() => setSelectedChar(char)} />
        ))}
      </div>

      <SectionTitle title="NOISE LAB" subtitle="Studio Family" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {studioMembers.map(char => (
          <CharacterCard key={char.id} char={char} onClick={() => setSelectedChar(char)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedChar && (
          <CharacterProfileModal char={selectedChar} onClose={() => setSelectedChar(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}
