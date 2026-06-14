const fs = require('fs');
let content = fs.readFileSync('src/components/StatusWindow.tsx', 'utf8');

// Move maxAffinityChars out of z-0
// The z-0 wrapper is:
//         <div className={`absolute inset-0 z-0 overflow-hidden ...`}>
//           ...
//           {maxAffinityChars.map( ... )}
//         </div>

const chibisTarget = `          {maxAffinityChars.map((char, index) => (
            <motion.div 
              key={char.id}
              className="absolute w-28 h-28 bg-contain bg-center bg-no-repeat cursor-grab active:cursor-grabbing z-[15]"
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

content = content.replace(chibisTarget, '        </div>\n');

const applyChibis = `        {/* Homescreen */}`
content = content.replace(applyChibis, `
        {/* Floating Chibis */}
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
        </div>

        {/* Homescreen */}`);


// Replace Homescreen layout
const hsTarget = `               <motion.div 
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

const hsNew = `               <div className="flex-1 relative overflow-hidden flex pointer-events-none pb-8">
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

content = content.replace(hsTarget, hsNew);

const hsTargetEnd = `                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
                   </button>
                 )}
                   </div>
                 </div>
                 <div className="w-1/2 min-w-[50%] shrink-0 px-6 flex items-center justify-center">
                 </div>
               </motion.div>
               <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">`;

const hsNewEnd = `                     <span className="text-[10px] text-white bg-black/40 px-1.5 rounded-[4px] backdrop-blur-sm shadow-sm font-medium">Talk</span>
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

content = content.replace(hsTargetEnd, hsNewEnd);

fs.writeFileSync('src/components/StatusWindow.tsx', content);
