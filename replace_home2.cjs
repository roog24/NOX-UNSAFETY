const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// Replace chibi z-index
content = content.replace(
  /className="absolute w-28 h-28 bg-contain bg-center bg-no-repeat cursor-grab active:cursor-grabbing z-10"/g,
  'className="absolute w-28 h-28 bg-contain bg-center bg-no-repeat cursor-grab active:cursor-grabbing z-[15]"'
);

// Add homePage state
content = content.replace(
  '  const [isAppOpen, setIsAppOpen] = useState(false);',
  '  const [isAppOpen, setIsAppOpen] = useState(false);\n  const [homePage, setHomePage] = useState(0);'
);

// Replace Homescreen wrapper start
const targetHomescreen = `               <div className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-none pointer-events-auto flex scroll-smooth pb-8 relative">
                 <div className="w-full min-w-full shrink-0 snap-center px-6">
                   <div className="flex gap-6 flex-wrap">`;
                   
const newHomescreen = `               <motion.div 
                 className="flex-1 flex pointer-events-auto w-[200%]"
                 drag="x"
                 dragConstraints={{ left: 0, right: 0 }}
                 dragElastic={0.2}
                 onDragEnd={(e, { offset, velocity }) => {
                   if (offset.x < -50 || velocity.x < -300) setHomePage(1);
                   if (offset.x > 50 || velocity.x > 300) setHomePage(0);
                 }}
                 animate={{ x: \`-\${homePage * 50}%\` }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               >
                 <div className="w-1/2 min-w-[50%] shrink-0 px-6 content-start">
                   <div className="flex gap-6 flex-wrap content-start items-start">`;

content = content.replace(targetHomescreen, newHomescreen);

// Replace Homescreen wrapper end
const targetEnd = `                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
                   </button>
                 )}
                   </div>
                 </div>
                 <div className="w-full min-w-full shrink-0 snap-center px-6 flex items-center justify-center">
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>`;

const newEnd = `                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
                   </button>
                 )}
                   </div>
                 </div>
                 <div className="w-1/2 min-w-[50%] shrink-0 px-6 flex items-center justify-center">
                 </div>
               </motion.div>
               <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">
                 {[0, 1].map(page => (
                   <button 
                     key={page} 
                     onClick={() => setHomePage(page)} 
                     className={\`w-2 h-2 rounded-full transition-colors \${homePage === page ? 'bg-white' : 'bg-white/30'}\`} 
                   />
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>`;

content = content.replace(targetEnd, newEnd);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
