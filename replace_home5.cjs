const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// Replace Floating Chibis
const chibisTarget = `        {/* Floating Chibis */}
        <div className="absolute inset-0 z-[15] pointer-events-none">
          {maxAffinityChars.map((char, index) => (
            <motion.div 
              key={char.id}
              className="absolute w-28 h-28 bg-contain bg-center bg-no-repeat cursor-grab active:cursor-grabbing pointer-events-auto"
              style={{ 
                backgroundImage: \`url("\${characterWallpapers[char.id]}")\`,
                left: \`\${15 + (index * 35) % 50}%\`,
                top: \`\${20 + (index * 25) % 55}%\`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
              }}
              animate={{
                x: [0, index % 2 === 0 ? 30 : -30, index % 3 === 0 ? -20 : 20, 0],
                y: [0, index % 2 === 0 ? -30 : 30, index % 3 === 0 ? 20 : -20, 0],
                rotate: [0, index % 2 === 0 ? 6 : -6, index % 3 === 0 ? -4 : 4, 0]
              }}
              transition={{
                duration: 15 + index * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              drag
              dragConstraints={{ left: -100, right: 100, top: -200, bottom: 200 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.15, zIndex: 20, filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.5))' }}
              whileTap={{ scale: 0.9, rotate: index % 2 === 0 ? 15 : -15 }}
            />
          ))}
        </div>`;

const chibisNew = `        {/* Floating Chibis */}
        <div className="absolute inset-0 z-[15] pointer-events-none">
          {maxAffinityChars.map((char, index) => (
            <motion.div 
              key={char.id}
              className="absolute pointer-events-auto"
              style={{ 
                left: \`\${15 + (index * 35) % 50}%\`,
                top: \`\${20 + (index * 25) % 55}%\`,
              }}
              animate={{
                x: [0, index % 2 === 0 ? 30 : -30, index % 3 === 0 ? -20 : 20, 0],
                y: [0, index % 2 === 0 ? -30 : 30, index % 3 === 0 ? 20 : -20, 0],
              }}
              transition={{
                duration: 15 + index * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-28 h-28 bg-contain bg-center bg-no-repeat cursor-grab active:cursor-grabbing"
                style={{ 
                  backgroundImage: \`url("\${characterWallpapers[char.id]}")\`,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
                }}
                animate={{
                  rotate: [0, index % 2 === 0 ? 6 : -6, index % 3 === 0 ? -4 : 4, 0]
                }}
                transition={{
                  duration: 15 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                drag
                dragConstraints={{ left: -100, right: 100, top: -200, bottom: 200 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.15, zIndex: 20, filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.5))' }}
                whileTap={{ scale: 0.9 }}
                onDragStart={(e) => e.stopPropagation()}
              />
            </motion.div>
          ))}
        </div>`;

content = content.replace(chibisTarget, chibisNew);

// Replace Homescreen Layout
const hsTarget = `               <div className="flex-1 relative overflow-hidden flex pointer-events-none pb-8">
                 <AnimatePresence initial={false} custom={homePage}>
                   {homePage === 0 && (
                     <motion.div
                       key="page-0"
                       initial={{ x: "-100%" }}
                       animate={{ x: "0%" }}
                       exit={{ x: "-100%" }}
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       className="absolute inset-0 w-full h-full pointer-events-auto px-6 content-start outline-none"
                       drag="x"
                       dragConstraints={{ left: 0, right: 0 }}
                       dragElastic={0.2}
                       dragDirectionLock
                       onDragEnd={(e, { offset, velocity }) => {
                         if (offset.x < -50 || velocity.x < -300) setHomePage(1);
                       }}
                     >
                       <div className="flex gap-6 flex-wrap content-start items-start w-full h-full">`;

const hsNew = `               <div className="flex-1 overflow-hidden pointer-events-none pb-8">
                 <motion.div
                   className="w-[200%] h-full flex pointer-events-auto"
                   drag="x"
                   dragConstraints={{ left: 0, right: 0 }}
                   dragElastic={0.2}
                   dragDirectionLock
                   onDragEnd={(e, { offset, velocity }) => {
                     if (offset.x < -50 || velocity.x < -300) setHomePage(1);
                     if (offset.x > 50 || velocity.x > 300) setHomePage(0);
                   }}
                   animate={{ x: homePage === 0 ? "0%" : "-50%" }}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 >
                   <div className="w-[50%] h-full px-6 flex gap-6 flex-wrap content-start items-start">`;

content = content.replace(hsTarget, hsNew);

const hsTargetEnd = `                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
                   </button>
                 )}
                       </div>
                     </motion.div>
                   )}
                   {homePage === 1 && (
                     <motion.div
                       key="page-1"
                       initial={{ x: "100%" }}
                       animate={{ x: "0%" }}
                       exit={{ x: "100%" }}
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       className="absolute inset-0 w-full h-full pointer-events-auto px-6 flex items-center justify-center outline-none"
                       drag="x"
                       dragConstraints={{ left: 0, right: 0 }}
                       dragElastic={0.2}
                       dragDirectionLock
                       onDragEnd={(e, { offset, velocity }) => {
                         if (offset.x > 50 || velocity.x > 300) setHomePage(0);
                       }}
                     >
                       {/* Empty Page */}
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
               
               <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">`;

const hsNewEnd = `                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
                   </button>
                 )}
                   </div>
                   <div className="w-[50%] h-full px-6 flex items-center justify-center">
                     {/* Empty Page */}
                   </div>
                 </motion.div>
               </div>
               
               <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">`;
               
content = content.replace(hsTargetEnd, hsNewEnd);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
