import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { photos } from '../photos';
import { characters } from '../data';
import { Photo } from '../types';
import { Section, SectionTitle } from './Layout';
import { Heart, MessageCircle, Send, Bookmark, Lock, Unlock, X } from 'lucide-react';

export function PhotoGallery() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  const handleLike = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    if (likedPhotos[photoId]) return;
    setLikedPhotos(prev => ({ ...prev, [photoId]: true }));
  };

  const filteredPhotos = photos.filter(p => {
    if (p.charId === 'secret') {
      return isSecretUnlocked;
    }
    if (activeTab === 'all') return true;
    return p.charId === activeTab;
  });

  const getCharName = (id: string) => {
    return characters.find(c => c.id === id)?.name || id;
  };

  return (
    <Section className="bg-zinc-950">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionTitle title="SOCIAL FEED" subtitle="Daily Life of NOX" />
        
        <button
          onClick={() => {
            if (isSecretUnlocked) {
              setIsSecretUnlocked(false);
              setActiveTab('all');
            } else {
              setIsSecretUnlocked(true);
              setActiveTab('');
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all ${
            isSecretUnlocked 
              ? 'bg-red-900/50 text-red-100 border border-red-500/50' 
              : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
          }`}
        >
          {isSecretUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isSecretUnlocked ? 'HIDE SECRET ARCHIVE' : 'UNLOCK SECRET ARCHIVE'}
        </button>
      </div>

      {!isSecretUnlocked && (
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-mono text-sm border transition-colors ${
              activeTab === 'all' 
                ? 'bg-white text-black border-white' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            All
          </button>
          {characters.map(char => (
            <button
              key={char.id}
              onClick={() => setActiveTab(char.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-mono text-sm border transition-colors ${
                activeTab === char.id 
                  ? 'bg-white text-black border-white' 
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              {char.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={photo.id}
              className={`bg-zinc-900 border rounded-xl md:rounded-2xl overflow-hidden shadow-xl ${
                photo.charId === 'secret' ? 'border-red-900/50' : 'border-zinc-800'
              }`}
            >
              {/* Header */}
              <div className="p-2 md:p-4 flex items-center justify-between border-b border-zinc-800/80">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold ${
                    photo.charId === 'secret' ? 'bg-red-900 text-white' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {photo.charId === 'secret' ? 'S' : getCharName(photo.charId).charAt(0)}
                  </div>
                  <span className={`font-bold font-sans text-xs md:text-base ${photo.charId === 'secret' ? 'text-red-400' : 'text-zinc-200'}`}>
                    {photo.charId === 'secret' ? 'HIDDEN.LOG' : `${photo.charId}_nox`}
                  </span>
                </div>
              </div>

              {/* Internal Image Container for aspect ratio */}
              <div 
                className="w-full aspect-square bg-zinc-950 overflow-hidden flex items-center justify-center cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Actions & Content */}
              <div className="p-3 md:p-4">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <div className="flex gap-2 md:gap-4">
                    <Heart 
                      className={`w-4 h-4 md:w-6 md:h-6 hover:scale-110 transition-transform cursor-pointer ${
                        likedPhotos[photo.id] 
                          ? 'text-red-500 fill-current' 
                          : photo.charId === 'secret' ? 'text-red-500' : 'text-zinc-400'
                      }`}
                      onClick={(e) => handleLike(e, photo.id)}
                    />
                    <MessageCircle className="w-4 h-4 md:w-6 md:h-6 text-zinc-400 hover:scale-110 transition-transform cursor-pointer" />
                    <Send className="w-4 h-4 md:w-6 md:h-6 text-zinc-400 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                  <Bookmark className="w-4 h-4 md:w-6 md:h-6 text-zinc-400 hover:scale-110 transition-transform cursor-pointer" />
                </div>
                
                <div className="font-bold text-[10px] md:text-sm text-zinc-100 mb-1.5 md:mb-2">
                  좋아요 {(photo.likes + (likedPhotos[photo.id] ? 1 : 0)).toLocaleString()}개
                </div>

                <div className="text-[10px] md:text-sm mb-3 md:mb-4 leading-tight md:leading-normal">
                  <span className={`font-bold mr-1.5 md:mr-2 ${photo.charId === 'secret' ? 'text-red-400' : 'text-zinc-200'}`}>
                    {photo.charId === 'secret' ? 'HIDDEN.LOG' : `${photo.charId}_nox`}
                  </span>
                  <span className="text-zinc-300">{photo.caption}</span>
                </div>

                {/* Comments */}
                {photo.comments.length > 0 && (
                  <div className="space-y-1 md:space-y-1.5 border-t border-zinc-800/80 pt-2 md:pt-3">
                    {photo.comments.map((comment, idx) => (
                      <div key={idx} className="text-[10px] md:text-sm leading-tight md:leading-normal">
                        <span className={`font-bold mr-1.5 md:mr-2 ${comment.user === 'System' ? 'text-red-500 font-mono text-[8px] md:text-xs' : 'text-zinc-400'}`}>
                          {comment.user}
                        </span>
                        <span className="text-zinc-400">{comment.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-8 cursor-pointer"
          >
            <button 
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
