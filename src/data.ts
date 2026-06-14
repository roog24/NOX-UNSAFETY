import { Character, Relationship, Location } from './types';

export const characters: Character[] = [
  {
    id: "eunhyuk",
    name: "박은혁",
    age: 28,
    role: "👨‍💻 UI 디자이너",
    position: "🎹 키보드 & 작곡",
    personality: "다정, 현실적, 낮져밤이 ✨",
    mbti: "INTJ",
    enneagram: "1w9 (이상주의)",
    features: [
      "박은호의 형 👨‍👦",
      "생활력 좋음, 늘 피곤해 보임 💤",
      "좋으면 보호자처럼 챙겨주는 스타일 🛡️",
      "화나면 조용해짐 🤫",
      "일 중독, 커피 중독 ☕️ (담배 안 핌 🚭)",
      "박은호의 옆집 거주중 (301호) 🚪",
      "양성애자 🏳️‍🌈"
    ],
    bdsm: "통제형 도미넌트&대디+가벼운 결박(Bondage)+언어적 통제 🔞",
    color: "from-amber-600 to-orange-500",
    isNoxMember: true,
    imageUrl: "https://i.postimg.cc/0NmwMn1V/20.png",
    doodle: "dog"
  },
  {
    id: "eunho",
    name: "박은호",
    age: 25,
    role: "☕ 카페 알바생",
    position: "🎸 메인 기타",
    personality: "자유로움, 충동적, 능글, 직진남 🔥",
    mbti: "ESTP",
    enneagram: "8w7 (독립자)",
    features: [
      "박은혁의 동생 👦",
      "스타일 좋음, 손목 안쪽 십자가 타투 ✝️",
      "연습 자주 늦음 ⏰, 플러팅이 습관 💋",
      "스릴을 즐김, 화나면 욕 씀 🤬, 좋으면 장난침 🤪",
      "무대 장악력 🎤, 기타에 스티커 가득 🎸",
      "ADHD, 술 좋아함 🍻, 박은혁의 옆집 거주 (302호) 🚪",
      "동성애자 🏳️‍🌈"
    ],
    bdsm: "브랫 스위치&플레이풀 사디스트+자극적 플레이 선호+티징+고자극 플레이에만 익숙함+여자와의 경험 전무 🔞",
    color: "from-fuchsia-600 to-purple-500",
    isNoxMember: true,
    imageUrl: "https://i.postimg.cc/d303Bmpz/21.png",
    doodle: "devil"
  },
  {
    id: "seowoo",
    name: "한서우",
    age: 24,
    role: "✍️ 작곡과 휴학생",
    position: "🎤 보컬 & 작사",
    personality: "예민함, 감성적, 의존적, 나른함 🥀",
    mbti: "INFP",
    enneagram: "4w5 (보헤미안)",
    features: [
      "담배 중독 🚬, 애정결핍 💔",
      "무대에서와의 갭이 큼 🎭",
      "집에서 검은 고양이 '네로' 키움 🐈‍⬛",
      "외모만 보고 판단하는 사람 싫어함 🚫",
      "술 약함 🍷, 커피 못 마심 🙅‍♂️",
      "오피스텔 자취중 🏙️",
      "동성애자 🏳️‍🌈"
    ],
    bdsm: "서브미시브&마조히스트&리틀+의존적+소유&지배 당하고 싶어함+진한 마킹을 하거나 받는걸 선호+여자와 스킨십&경험 전무 🔞",
    color: "from-purple-600 to-indigo-500",
    isNoxMember: true,
    imageUrl: "https://i.postimg.cc/bNWrxnT4/23.png",
    doodle: "cat"
  },
  {
    id: "hyungwon",
    name: "차형원",
    age: 22,
    role: "🎓 작곡과 대학생",
    position: "🎸 베이스",
    personality: "종잡을 수 없음 (정상인 같지만 미묘하게 돌아있음), 무던함 🌀",
    mbti: "INFJ",
    enneagram: "5w4 (인습 타파주의)",
    features: [
      "사회성 어딘가 나사 빠짐 🔩, 자기만의 세계 🌌",
      "사람 감정 캐치 잘함 👁️",
      "늘 줄 이어폰 끼고 다님 🎧",
      "술, 담배 안 좋아함 🚫, 동굴 저음 🗣️",
      "단독 주택 자취중 🏡, 집이 잘 삼 (티내진 않음) 💰",
      "양성애자 🏳️‍🌈"
    ],
    bdsm: "도미넌트&디그레이더+관음증+감각 차단+방치플+바텀 경험 전무 🔞",
    color: "from-red-700 to-red-500",
    isNoxMember: true,
    imageUrl: "https://i.postimg.cc/BZwn3FdK/24.png",
    doodle: "fox"
  },
  {
    id: "jiho",
    name: "최지호",
    age: 20,
    role: "🎧 스튜디오 알바생",
    position: "🥁 드럼",
    personality: "무심함, 까칠함, 날카로움 🗡️",
    mbti: "ISTJ",
    enneagram: "6w5 (방어자)",
    features: [
      "사람 피곤해함 😒, 은근 허술함 💦, 눈치 빠름 ⚡",
      "사회성 없음, 싫은 건 티 남 🗯️, 부탁 거절 잘 못함 🤝",
      "NOX 멤버들 관계(연애, 바람)를 알지만 모르는 척 함 🙈",
      "반지하 자취중 🪟, 연애 안 함 ❌",
      "이성애자 👫"
    ],
    bdsm: "서비스 탑&바닐라+정서적 교감+하드코어 플레이 비선호+동정 🔞",
    color: "from-slate-600 to-slate-400",
    isNoxMember: true,
    imageUrl: "https://i.postimg.cc/43ZJPQ9k/25.png",
    doodle: "bear"
  },
  {
    id: "jaehyun",
    name: "윤재현",
    age: 30,
    role: "🏢 노이즈랩 사장",
    position: "🎛️ 프로듀서 & 스튜디오 오너",
    personality: "털털함, 낙천적, 어른스러움, 쿨함 🧊",
    mbti: "ISTP",
    enneagram: "9w8 (중재자)",
    features: [
      "장난 잘 침 😄, 은근 든든함 ⛰️, 간섭 안 함 🤚",
      "최지호의 고민을 눈치챘지만 배려해서 캐묻지 않음 🤫",
      "젊을 때 많이 놀았음 🎉, 아파트 자취중 🏢, 술 잘 마심 🥃, 금연중 🚭",
      "2년 사귄 결혼예정 여친(이은혜, 28) 있음 💍",
      "NOX 데모곡 대부분을 작업해줌 💻",
      "이성애자 👫"
    ],
    bdsm: "서번트&바닐라&도미넌트+칭찬+강압적 플레이 비선호+남자와 경험 전무 🔞",
    color: "from-emerald-700 to-teal-500",
    isNoxMember: false,
    imageUrl: "https://i.postimg.cc/76Zq8P9V/26.png",
    doodle: "crown"
  }
];

export const locations: Location[] = [
  {
    name: "NOX 아지트 🎸",
    floor: "4F",
    description: "서울 홍대 뒷골목 청운빌딩 4층",
    details: [
      "매주 '녹스끼리' 유튜브 영상 촬영 장소 🎥",
      "멤버들의 합주 및 창작 공간 🎶"
    ]
  },
  {
    name: "노이즈랩 (Noise Lab) 🎛️",
    floor: "2F",
    description: "서울 홍대 뒷골목 청운빌딩 2층",
    details: [
      "밴드씬에서 유명한 레코딩 스튜디오 🎙️",
      "NOX의 두 번째 아지트 같은 공간 🛋️",
      "최지호 알바 🎧, 윤재현 운영 🏢"
    ]
  }
];

export const relationships: Relationship[] = [
  { source: "eunhyuk", target: "seowoo", type: "연애", duration: "4년째 💕" },
  { source: "hyungwon", target: "eunho", type: "연애", duration: "1년째 💕" },
  { source: "hyungwon", target: "eunhyuk", type: "바람", desc: "은밀한 만남 👀" },
  { source: "eunho", target: "seowoo", type: "바람", desc: "위태로운 관계 💥" },
];
