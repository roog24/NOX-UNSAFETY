import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Layout';
import { MessageSquare } from 'lucide-react';

const fanNames = [
  'nox_lover', 'ASH_0912', 'seowoo_cat', '은호기타피크', 
  'studio_ghost', '지호픽', 'nox_kiri_fan', '과몰입러', 
  '은혁맘', '네로집사', '드럼러츠', '사장님팬', 
  'ASH_001', '과제하기싫다', '홍대고인물'
];

const commentsPool = [
  "오늘 라이브 미쳤음... 형원 베이스 솔로 미쳤나 진짜 🎸🔥",
  "은혁오빠 제발 잠 좀 자 ㅠㅠ 커피 그만 마시고 구석에서 졸고 있잖아 🥺",
  "하 서우 눈빛에 치이고 갑니다.. 네로랑 투샷 올려주세요 제발 🐈‍⬛",
  "아니 박은호 오늘 또 지각했다며 ㅋㅋㅋ 은혁이형 극대노한거 영상좀 다오",
  "노이즈랩 사장님 미모 박제 부탁드립니다... ✨",
  "최지호 무심하게 드럼 스틱 돌리는거 나만 봤어...? 나 치였어 치였어 🥁",
  "녹스끼리 뉴에피 언제 떠요 숨넘어감 ㅠㅠ 애들 관계성 돌아버려 진짜 💞",
  "차형원 박은호 볼 때 눈빛 너무 다정하지 않음? 나 진짜 미쳐 🫠",
  "오늘도 서우 챙기는 건 은혁이 뿐이네... 이쯤되면 공식 보호자 🛡️",
  "한서우 입술 밑 점 사랑하는 모임 (1/999999) 💋",
  "지호 오늘 알바하다가 또 투덜댔다에 내 전재산 건다 ㅋㅋㅋ 귀여움",
  "재현사장님 결혼 축하드려요 ㅠㅠ 행복하세요! 제 첫사랑 끝 😭💍",
  "형원이 오늘 또 줄 이어폰 끼고 혼자 뭐 들어... 나도 알려줘 🎧",
  "와 오늘 카페 갔는데 은호 오빠 알바하더라 비주얼 미침 ☕️✨",
  "녹스 단콘 언제해 제발 내 통장 가져가 💸💸",
  "지호 드럼 칠 때 팔뚝 핏줄 개미쳤음 찢었다 진짜 💪",
  "은혁이형 오늘 피곤해보이는데 텐션 왜이렇게 높아? 커피 세 잔 마셨나배 ☕️",
  "서우야 작곡 화이팅 ㅠㅠ 무리하지망 😭",
  "사장님 노이즈랩 투어 유튜브 함 찍어주심 안되나요 브금 깔아놓고 🎵",
  "최지호 또 지혼자 시크한척 하네 아우 저 은근슬쩍 챙겨주는 거 봐라 츤데레 ㅋ",
  "박은호 기타에 스티커 또 늘었냐? 저거 서우가 붙여준거 아냐??",
  "녹스 단톡방 캡쳐 풀면 나 운다... 제발 녹스끼리에서 공개좀",
  "형원이 왜 멍때려 ㅋㅋㅋㅋ 완전 영혼 로그아웃했는데 ☁️",
  "오늘 합주 분위기 뭔가 다르다 ㅋㅋㅋ 다들 텐션 저세상인데 🚀",
  "은호야 너 타투 언제 한 개 더 늘었어... 내 심장 부서짐",
  "서우 마이크 잡을 때 손가락 너무 예쁘지 않아? 🥲 서우야 나주거",
  "이은혜 언니 너무 부러워여 사장님 진짜 벤츠남인데 🚗💨",
  "녹스 다음 앨범 스포좀 제발요 현기증나요 😵 빙글빙글",
  "박은혁 키보드 치다가 웃는거 찍은 사람 공유좀요 시급합니다",
  "지호 반지하라서 비올 때 걱정된다 ㅠㅠ 물 안새지 지호야? ☔️",
  "어지러운 궤도 라이브로 들으니 귀 녹는다 진짜.. 🫠",
  "사랑해 NOX 평생 같이 가자 🖤❤️",
  "차형원 저 차분함 속에 똘끼가 보일때마다 너무 좋아 짜릿해 ⚡",
  "합주실 캠 좀 자주 켜주세요 ㅠㅠ 일상 애들 티키타카 보는 꿀잼 🍯",
  "은호 오늘 왤케 치명적이냐 작정했네 작정했어 💥",
  "지호 알바하는 스튜디오에 뼈를 묻고 싶다 뼈 1인분 예약요 🦴",
  "서우 감성 미쳤다 작사 누구야 진짜 천재 아니야? 📝",
  "은혁형님 동생 관리좀여 ㅋㅋㅋㅋ 박은호 진짜 텐션 미쳐날뜀",
  "재현 사장님 오늘 커피 쏘심?! 역시 노이즈랩 갓재현 ☕️🙌",
  "NOX 단독 콘서트 기원 1일차 🙏 포도알 줍게 해줘",
  "애들끼리 밥먹는 브이로그 내놔라 녹스 유튜브 🍽️",
  "요새 형원이가 은호 너무 잘 챙겨줘서 보기 좋아 죽겠음 💕",
  "지호씨 드럼 스틱 샀는데 어떻게 돌리죠 강좌좀 🥁",
  "은혁 서우 조합 너무 좋아... 프로듀싱 천재들 ㅠㅠ",
  "재현님 녹스 곡 많이많이 뽑아주세요 사랑합니다 🎛️💖",
  "박은혁 맨날 피곤해보이는데 침대에선 기승전결 완벽하게 통제하는 스탈일 거란 뇌피셜 돌려본다 🧎‍♀️",
  "박은호 저렇게 능글맞게 깝치다가도 진짜 좋아하는 사람 앞에선 타격감 쩔게 휘둘리면서 애원할 것 같음 ㅠ 뇌절 미안 🔞",
  "서우 예민한 고양이 같다가도 누구한테 푹 빠지면 엉망으로 지배당하고 싶어할 것 같은 관상임 ㅠㅠ 나만 이 망상함? 🔗",
  "차형원 저 무덤덤한 얼굴로 파트너 눈 가려놓고 방치플 할 것 같음 진심... 꼴포 미쳐버린 망상 회로 풀가동 🫠",
  "최지호 밖에서만 까칠하지, 단둘이 있으면 파트너 기분 다 맞춰주는 스윗한 탑일 것 같지 않냐... 진짜 매력 도랏...",
  "재현 사장님 특유의 유죄인간 텐션... 침대에서도 저렇게 여유롭게 칭찬하면서 어른스럽게 리드할 것 같아서 벽 부숨 🔨",
  "오늘 서우 왤케 나른해? 셔츠 안쪽 붉은 자국 모기 물린 거 맞겠지...? 누가 진하게 마킹한 거란 망상하게 하네 ㄷㄷ",
  "박은호 맨날 플러팅 하는데 막상 찐연애하면 하드코어하게 당할 거 같음ㅋㅋㅋ 아 상상만으로도 너무 맵다 진짜 🌶️",
  "나만 녹스 멤버들 사이에 묘한 텐션 느껴짐...? 서로 얽히고설킨 아찔한 치정극이라고 뇌피셜 돌리는 중 🤦‍♀️",
  "멤버들끼리 미묘한 신경전 벌일 때, 최지호 혼자 영혼 가출한 얼굴로 애써 흐린눈 하며 드럼 스틱만 돌릴 것 같음 ㅋㅋㅋㅋ"
];

interface Comment {
  id: number;
  user: string;
  text: string;
}

export function LiveComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    let commentId = 0;
    
    const initial = Array.from({ length: 4 }).map(() => ({
      id: ++commentId,
      user: fanNames[Math.floor(Math.random() * fanNames.length)],
      text: commentsPool[Math.floor(Math.random() * commentsPool.length)],
    }));
    setComments(initial);

    const interval = setInterval(() => {
      setComments(prev => {
        const newComment = {
          id: ++commentId,
          user: fanNames[Math.floor(Math.random() * fanNames.length)],
          text: commentsPool[Math.floor(Math.random() * commentsPool.length)],
        };
        // 최신 댓글을 맨 위에 추가 (최대 10개 유지)
        return [newComment, ...prev].slice(0, 10);
      });
    }, Math.random() * 2000 + 2000); // 2~4초마다 랜덤하게 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-red-500 animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-bold font-sans tracking-tight text-white">LIVE CHAT</h2>
        <span className="bg-red-500/20 border border-red-500/30 text-red-400 text-xs px-2.5 py-1 rounded-full font-bold ml-2 font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          ASH
        </span>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-4 md:p-8 h-[450px] overflow-hidden relative flex flex-col justify-end">
        {/* 상단 페이드 아웃 효과 */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0e0e11] to-transparent z-10 pointer-events-none rounded-t-3xl border-t border-zinc-800/80" />
        
        <div className="flex flex-col-reverse gap-4 relative z-0">
          <AnimatePresence initial={false}>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                className="bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-3 shadow-lg shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400 uppercase overflow-hidden">
                      {comment.user.charAt(0)}
                    </div>
                    <span className="font-mono text-xs md:text-sm font-bold text-zinc-300">{comment.user}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-mono">Just now</span>
                </div>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">{comment.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
