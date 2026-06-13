import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Share2, ChevronDown, ChevronUp, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  time: string;
  likes: number;
  comments: Comment[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    title: "솔직히 은혁-서우-은호 이 삼각관계 나만 미치겠냐?",
    content: "아니 형제가 한 사람 두고 묘한 기류 흐르는 거 진짜 미친 거 아님...? 서우는 은혁이랑 만나는 거 같으면서도 은호 앞에서는 묘하게 나른하고 무방비해지는 거 보임;;; 은혁은 그거 다 알면서 서우 통제하려고 하고, 은호는 형 도발하려고 더 자극적으로 서우 건드리는 거면 진짜 개맛도리인데... 나만 쓰레기냐?",
    author: "익명_NOX단",
    time: "10분 전",
    likes: 342,
    comments: [
      { id: "c1", author: "익명_88", text: "ㅁㅊ 뇌물줄테니까 연성 좀", time: "8분 전" },
      { id: "c2", author: "익명_12", text: "은혁이는 눈치챘어도 일부러 모른척하면서 서우 침대에서 더 몰아붙일듯 ㄷㄷ", time: "5분 전" },
      { id: "c1_1", author: "익명_45", text: "아니 근데 상식적으로 서우가 은호 아래 깔리는 게 맞지 않냐? 은호 피지컬을 봐...", time: "3분 전" },
      { id: "c1_2", author: "익명_99", text: "ㄴㅈㅅ 윗댓 알못이네; 서우는 무조건 은혁이한테만 휘둘리는 포지션임. 은호랑은 그냥 붙어먹기만 할듯", time: "2분 전" },
      { id: "c1_3", author: "평화주의자", text: "싸우지마... 쓰리썸도 있잖아... (조심스럽게)", time: "방금" }
    ]
  },
  {
    id: "p2",
    title: "형원-은호-은혁 이쪽 텐션도 장난 아님...",
    content: "형원이랑 은호 찐한 사이 맞지? 근데 왜 형원이 특유의 그 서늘한 시선이 가끔 은혁이 쪽으로 향하냐고... 은호는 지가 형원이 휘두른다고 생각하는데 막상 깊은 밤 되면 형원이한테 완전 압도당해서 엉엉 울고 매달리는 그림 상상됨... 그러다 형원이가 은혁이랑 비밀스럽게 얽히는 거 은호가 목격하면... 하아 맵다 매워",
    author: "야행성고양이",
    time: "32분 전",
    likes: 512,
    comments: [
      { id: "c3", author: "익명_09", text: "와 미친 형원이가 은혁이한테 눈길 주는거 나도 느낌... 은호만 불쌍한데 개꼴포야 진짜", time: "20분 전" },
      { id: "c4", author: "음표도둑", text: "형원이는 은호 방치하면서 애태우고, 은호는 거기 안달복달하는 거 뇌피셜 돌려봄 🔞", time: "15분 전" },
      { id: "c4_1", author: "익명_33", text: "하극상 존맛인데 은호가 형원이 깔아뭉개는 것도 한 번쯤은 보고 싶다...", time: "10분 전" },
      { id: "c4_2", author: "익명_77", text: "ㄴ미친소리하네 형원이가 무조건 탑이지; 은호는 그냥 입으로만 나불대는 허접 bottom 같음 ㅋㅋㅋ", time: "7분 전" },
      { id: "c4_3", author: "망상공장장", text: "아 근데 은혁이가 억지로 은호 범하는 중에 형원이가 방관하면서 관전하는 망상 해봄... 나 병원 가봐야하나?", time: "3분 전" },
      { id: "c4_4", author: "익명_82", text: "ㄴ 미친 ㅅㄲ야 형제끼리는 엮지말자 시발.", time: "1분 전" }
    ]
  },
  {
    id: "p3",
    title: "이 아찔한 치정극 속 최지호의 심정은?",
    content: "솔직히 이 모든 미친 관계성을 다 알고 있는 유일한 정상인 최지호... 속으로 '시발 이것들 또 지랄이네' 하면서 무념무상으로 드럼 스틱만 돌릴 거 생각하면 너무 웃김 ㅠㅠㅋㅋㅋㅋㅋ 지호는 제발 평범하고 스윗한 연애 했으면 좋겠다... (근데 은밀하게 은호 챙겨주는 거 씹덕포인트임)",
    author: "비트성애자",
    time: "1시간 전",
    likes: 289,
    comments: [
      { id: "c5", author: "익명_711", text: "지호는 진짜 보살임ㅋㅋㅋㅋ 다크서클의 8할은 멤버들 치정극 관람 때문일듯", time: "45분 전" },
      { id: "c5_1", author: "익명_02", text: "지호 혼자 덤덤하게 다 받아주다가 가끔 쎄하게 정색할 때 존나 무서움... 화나면 제일 무서울 타입", time: "30분 전" },
      { id: "c5_2", author: "익명_88", text: "지호은호 주식 산 사람 나밖에 없냐... 능글맞은 애랑 묵묵한 애 국룰인데", time: "15분 전" },
      { id: "c5_3", author: "익명_11", text: "ㄴ 너혼자 파라 그 주식 휴지조각임 ㅋㅋㅋㅋ 은호는 형원이꺼라고", time: "10분 전" }
    ]
  },
  {
    id: "p4",
    title: "레코딩 사장님 진짜 결혼해요? 내 첫사랑 시발 ㅠㅠ",
    content: "아니 재현 사장님 약혼 반지 꼈다는 루머 도는데 진짜임? ㅠㅠㅠㅠ 나 진심 사장님 처음 볼 때부터 짝사랑했는데... 그 다정하고 스윗한 어른 남자가 다른 사람한테 묶인다고 생각하니까 벌써 맴찢... 루머 상대 누군지 진짜 부럽다 하",
    author: "녹스마누라",
    time: "3시간 전",
    likes: 673,
    comments: [
      { id: "c6", author: "익명_22", text: "반지 낀 거 나도 본 거 같음... 하 유죄인간 ㅠㅠ", time: "2시간 50분 전" },
      { id: "c7", author: "익명_18", text: "침대에서 리드할 거 생각하니까 내가 다 눈물남", time: "2시간 30분 전" },
      { id: "c6_1", author: "익명_55", text: "상대 누구냐고 진짜... 안되겠다 내가 납치해서 지하창고에 가둬야겠음", time: "1시간 전" },
      { id: "c6_2", author: "익명_01", text: "ㄴ 범죄예고 신고완료 ^^", time: "55분 전" },
      { id: "c6_3", author: "익명_77", text: "아니 근데 이거 백퍼 멤버 중 한 명이랑 커플링 아님??? 서우 아닐까? 사장님이 유독 서우 곡 엄청 신경써주잖아", time: "30분 전" },
      { id: "c6_5", author: "녹스마누라", text: "ㄴ 뭐라냐 얘는 또. 결혼한다잖아 여자랑. 씨발. 씨발. 씨바아아아알!!!", time: "10분 전" },
      { id: "c6_6", author: "익명_12", text: "ㄴ ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 진정해 ㅋㅋㅋㅋㅋㅋㅋㅋ", time: "8분 전" },
      { id: "c6_7", author: "익명_88", text: "ㄴ 아 개웃겨 ㅋㅋㅋㅋㅋㅋㅋ 피눈물 흘리는 중 ㅋㅋㅋㅋㅋ", time: "5분 전" },
      { id: "c6_8", author: "익명_04", text: "ㄴ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 쓰니야 울지말고 천천히 숨 쉬어봐 ㅋㅋㅋㅋㅋㅋㅋ", time: "3분 전" }
    ]
  },
  {
    id: "p5",
    title: "한서우 목 뒤에 할퀸 자국",
    content: "어제 직캠 뜬 거 봤어?? 서우 드럼 비트 맞춰서 고개 숙일 때 목 뒤로 길게 할퀸 자국 선명하더라... 평소에 그렇게 하얗고 여린 애가 누구한테 그 정도로 당한 건지... 은혁인지 은호인지 아니면 제3의 인물인지 진심 돌아버리겠음 ㅠㅠ 하 너무 자극적이야",
    author: "탐정놀이",
    time: "5시간 전",
    likes: 412,
    comments: [
      { id: "c8", author: "익명_99", text: "ㅁㅊ 나도 봤음;; 누가 봐도 손톱 자국 아님?", time: "4시간 40분 전" },
      { id: "c8_1", author: "익명_21", text: "목덜미 물어뜯긴 자국 같기도 하던데... 누가 저렇게 짐승같이 흔적 남기냐 ㄷㄷ", time: "3시간 전" },
      { id: "c8_2", author: "익명_44", text: "이건 닥 은혁임. 은혁이 평소에 넥타이 꽉 조여매고 다니다가 단둘이 있을 때 서우 목덜미 질근질근 씹어놓을듯", time: "2시간 전" },
      { id: "c8_3", author: "익명_13", text: "ㄴ 야 은호일 수도 있지 은호 손버릇 안 좋기로 유명하잖아", time: "1시간 전" },
      { id: "c8_4", author: "익명_05", text: "아니 모기물린 자국 긁은 걸수도 있잖아 니들 일상생활 가능함? ㅋㅋㅋㅋ", time: "30분 전" }
    ]
  },
  {
    id: "p7",
    title: "최지호 과거 썰 푼다 (구라일 수도)",
    content: "내 건너건너 아는 애가 지호랑 동창인데, 학창시절부터 여자애들한테 인기 개많았는데 한 번도 안 사귀었다고 함. 밴드부에서도 맨날 구석에서 드럼만 치고... 근데 알지? 이런 애들이 의외로 한 번 스위치 눌리면 하드하게 돌변할지도 모름... (물론 내 바램임ㅎ)",
    author: "찌라시수집가",
    time: "10시간 전",
    likes: 310,
    comments: [
      { id: "c11", author: "익명_01", text: "지호가 한번 핀트 나가서 거칠게 다루는 거 보고싶다 ㅠㅠ", time: "9시간 전" },
      { id: "c11_1", author: "익명_34", text: "근데 지호 진짜 누구 사귀면 간이고 쓸개고 다 빼줄 거 같음...", time: "8시간 전" },
      { id: "c11_2", author: "익명_78", text: "ㄴ 그러다 통수맞고 흑화해서 집착광공 루트 타는거지 존맛탱 ㅋㅋㅋ", time: "5시간 전" },
      { id: "c11_3", author: "망상중증", text: "지호가 멤버들 다 따먹고 다니는 흑막이라는 망상 나 혼자 해본 거 아니지?", time: "2시간 전" },
      { id: "c11_4", author: "익명_55", text: "ㄴ 여기 병원 시급한 애들 왤케 많냐 ㅋㅋㅋㅋ 나도 예약좀 같이하자", time: "1시간 전" }
    ]
  }
];

export function FanCommunity() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const togglePost = (postId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = newComments[postId]?.trim();
    if (!text) return;

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              author: "나(익명)",
              text,
              time: "방금"
            }
          ]
        };
      }
      return post;
    }));

    setNewComments(prev => ({ ...prev, [postId]: "" }));
  };

  const handleLikePost = (postId: string) => {
    if (likedPosts[postId]) return;
    
    setLikedPosts(prev => ({ ...prev, [postId]: true }));
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div 
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <h2 className="text-3xl md:text-5xl tracking-tighter font-black text-white group-hover:text-fuchsia-400 transition-colors">
              SECRET LOUNGE
            </h2>
            <p className="mt-4 text-zinc-400 font-mono text-sm max-w-xl leading-relaxed">
              팬들만의 은밀한 익명 커뮤니티 공간.<br />
              (⚠️ 과몰입 및 뇌피셜 주의)
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-fuchsia-900/20 group-hover:text-fuchsia-400 group-hover:border-fuchsia-500/30 transition-all">
            {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-12 space-y-8">
                {posts.map(post => (
                  <div key={post.id} className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 md:p-8">
                    <div 
                      className="flex justify-between items-start mb-4 cursor-pointer group"
                      onClick={() => togglePost(post.id)}
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-fuchsia-400 transition-colors">{post.title}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-zinc-600 shrink-0">{post.time}</span>
                        {expandedPosts[post.id] ? <ChevronUp className="w-5 h-5 text-zinc-500 group-hover:text-fuchsia-400" /> : <ChevronDown className="w-5 h-5 text-zinc-500 group-hover:text-fuchsia-400" />}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-6 text-sm text-fuchsia-500/80 font-mono">
                      <span>{post.author}</span>
                    </div>

                    <AnimatePresence>
                      {expandedPosts[post.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-zinc-300 leading-relaxed max-w-3xl mb-8">
                            {post.content}
                          </p>

                          <div className="flex items-center gap-6 pb-6 border-b border-zinc-900 text-zinc-500 text-sm font-mono">
                            <button 
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center gap-2 transition-colors ${likedPosts[post.id] ? 'text-fuchsia-400' : 'hover:text-fuchsia-400'}`}
                            >
                              <Heart className={`w-4 h-4 ${likedPosts[post.id] ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </button>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.comments.length}</span>
                            </div>
                            <button className="flex items-center gap-2 hover:text-zinc-300 transition-colors ml-auto">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="pt-6 space-y-6">
                            {post.comments.map(comment => (
                              <div key={comment.id} className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 flex-shrink-0 border border-zinc-800" />
                                <div>
                                  <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-bold text-sm text-zinc-200">{comment.author}</span>
                                    <span className="text-xs text-zinc-600 font-mono">{comment.time}</span>
                                  </div>
                                  <p className="text-sm text-zinc-400">{comment.text}</p>
                                </div>
                              </div>
                            ))}

                            <div className="mt-6 flex gap-2 md:gap-3">
                              <div className="hidden sm:block w-8 h-8 rounded-full bg-fuchsia-900/20 border border-fuchsia-500/30 flex-shrink-0" />
                              <div className="flex-1 flex gap-2 min-w-0">
                                <input
                                  type="text"
                                  placeholder="익명으로 망상 하나 보태기..."
                                  value={newComments[post.id] || ""}
                                  onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                  className="flex-1 min-w-0 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all h-10"
                                />
                                <button
                                  onClick={() => handleAddComment(post.id)}
                                  className="shrink-0 h-10 px-4 rounded-lg bg-zinc-100 text-black flex items-center justify-center hover:bg-white transition-colors"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
