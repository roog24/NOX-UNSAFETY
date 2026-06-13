import { relationships } from '../data';
import { Section, SectionTitle } from './Layout';
import { AlertCircle, Infinity } from 'lucide-react';

export function RelationshipMap() {
  return (
    <Section className="bg-zinc-900/20 border-t border-b border-zinc-800/50">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-1/3">
          <SectionTitle title="ENTANGLEMENT" subtitle="Hidden Dynamics" />
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            멤버들 간의 보이지 않는 관계망. 
            표면적으로는 평화로운 밴드 생활을 이어가고 있지만, 
            무대 아래에서는 얽히고설킨 아슬아슬한 관계가 지속되고 있습니다.
          </p>
          <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <AlertCircle className="w-5 h-5 text-zinc-500" />
            <p className="text-xs text-zinc-400">최지호(드럼)는 이 모든 관계를 알고 있으나 암묵적으로 방관 중입니다.</p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relationships.map((rel, idx) => {
            const isCheating = rel.type === '바람';
            return (
              <div 
                key={idx} 
                className={`relative p-6 rounded-2xl border ${
                  isCheating 
                    ? 'border-red-900/30 bg-red-950/10' 
                    : 'border-zinc-800 bg-zinc-900/50'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                    isCheating ? 'bg-red-900/50 text-red-300' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {rel.type} {rel.duration && `(${rel.duration})`}
                  </span>
                  {isCheating && <Infinity className="w-4 h-4 text-red-500/50" />}
                </div>
                
                <div className="flex items-center justify-between text-lg font-bold text-white mb-2">
                  <span>{getKoreanName(rel.source)}</span>
                  <div className={`flex-grow h-[1px] mx-4 border-t border-dashed ${isCheating ? 'border-red-800' : 'border-zinc-700'}`} />
                  <span>{getKoreanName(rel.target)}</span>
                </div>
                
                {rel.desc && (
                  <p className={`text-sm mt-3 ${isCheating ? 'text-red-400/80' : 'text-zinc-500'}`}>
                    {rel.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function getKoreanName(id: string) {
  const map: Record<string, string> = {
    eunhyuk: '박은혁',
    eunho: '박은호',
    seowoo: '한서우',
    hyungwon: '차형원',
    jiho: '최지호',
    jaehyun: '윤재현'
  };
  return map[id] || id;
}
