import { useState } from 'react'
import './App.css'

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

interface Persona {
  id: number;
  name: string;
  emoji: string;
  color: string;
  subColor: string;
  factBombs: string[];
  description: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "주말에 갑자기 친구가 나오라고 한다면?",
    options: [
      { label: "오예! 바로 준비하고 나간다", score: 3 },
      { label: "나쁘지 않군, 적당히 맞춰서 나간다", score: 2 },
      { label: "이미 침대와 물아일체... 거절한다", score: 1 },
    ]
  },
  {
    id: 2,
    text: "새로운 프로젝트를 시작할 때 나는?",
    options: [
      { label: "철저한 계획 없이는 시작도 안 한다", score: 1 },
      { label: "큰 틀만 잡고 일단 부딪힌다", score: 2 },
      { label: "발등에 불이 떨어져야 움직인다", score: 3 },
    ]
  },
  {
    id: 3,
    text: "친구가 속상한 일을 털어놓을 때 나의 반응은?",
    options: [
      { label: "해결책을 찾아주느라 바쁘다", score: 1 },
      { label: "말없이 들어주며 공감해 준다", score: 3 },
      { label: "상대방의 논리적 오류를 찾는다", score: 2 },
    ]
  },
  {
    id: 4,
    text: "모르는 사람들과 함께 있는 자리에서 나는?",
    options: [
      { label: "먼저 말을 걸며 분위기를 주도한다", score: 3 },
      { label: "누가 말 걸어줄 때까지 기다린다", score: 2 },
      { label: "투명인간이 되고 싶어 구석에 박힌다", score: 1 },
    ]
  },
  {
    id: 5,
    text: "내가 생각하는 나의 모습은?",
    options: [
      { label: "현실적이고 실용적인 사람", score: 1 },
      { label: "상상력이 풍부하고 감성적인 사람", score: 3 },
      { label: "그냥 아무 생각이 없는 사람", score: 2 },
    ]
  },
  {
    id: 6,
    text: "방 정리 정돈 상태는 어떤가요?",
    options: [
      { label: "모든 물건이 제자리에 있어야 한다", score: 1 },
      { label: "적당히 살 만하면 된다", score: 2 },
      { label: "발 디딜 틈만 있으면 된다", score: 3 },
    ]
  }
];

const PERSONAS: Persona[] = [
  {
    id: 1,
    name: "침대 귀신 판다",
    emoji: "🐼",
    color: "#F5F5F5",
    subColor: "#E0E0E0",
    factBombs: [
      "숨 쉬는 것도 귀찮지?", "카톡 답장 좀 해라", "누워있는 게 적성", "영혼 가출 1위", 
      "미루기 끝판왕", "씻는 것도 일이다", "폰 하는 게 유일한 운동", "내일의 나에게 토스",
      "주말엔 시체 모드", "천근만근 몸뚱이", "세상만사 귀찮음", "누가 밥 좀 떠먹여줘",
      "약속 취소되면 행복함", "이불 밖은 위험해", "침대랑 한 몸임"
    ],
    description: "게으름의 끝판왕! 미루기 장인이라 내일의 내가 고생 중이에요."
  },
  {
    id: 2,
    name: "계획 강박 다람쥐",
    emoji: "🐿️",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: [
      "계획 없으면 불안함", "비효율적인 꼴 못 봄", "메모의 메모를 함", "피곤한 완벽주의",
      "시간 강박 쩔음", "남들 답답해 죽음", "루틴 깨지면 멘붕", "정리 안 되면 화남",
      "미래 걱정 인형", "도토리 개수 다 쎔", "1분 1초가 소중함", "나 자신을 볶아댐",
      "융통성 실종 사건", "설명충 기질 다분", "꼼꼼함에 질림"
    ],
    description: "1분 단위로 인생 설계하느라 머리에 쥐나겠어요. 도토리나 까먹으면서 쉬세요!"
  },
  {
    id: 3,
    name: "유리멘탈 고양이",
    emoji: "🐱",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    factBombs: [
      "말 한마디에 이불킥", "파워 예민 보스", "혼자 있고 싶어(뻥)", "기분파 끝판왕",
      "낯가림 만렙", "친해지기 개빡셈", "은근히 질투쟁이", "혼자 상처받음",
      "관심 줘, 아니 주지마", "쿠쿠다스 심장", "눈치 보느라 피곤", "감정 기복 롤러코스터",
      "속을 알 수 없음", "서운한 거 오조오억개", "프로 삐짐러"
    ],
    description: "까칠한 척하지만 사실은 관심 받고 싶은 츤데레! 유리멘탈 관리 좀 하세요."
  },
  {
    id: 4,
    name: "텅 빈 긍정 댕댕이",
    emoji: "🐶",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    factBombs: [
      "생각 없이 웃음", "거절 못하는 바보", "사기 당하기 딱 좋음", "분위기 파악 실패",
      "금사빠 기질 있음", "지갑이 항상 빔", "말보다 몸이 먼저", "호구 잡히기 1순위",
      "뒷감당 생각 안 함", "집중력 3초 컷", "너무 솔직해서 탈", "남 좋은 일만 함",
      "귀 얇기가 종잇장", "맨날 신나 있음", "세상 물정 모름"
    ],
    description: "세상은 아름답지만 당신 주머니는 털리고 있어요. 가끔은 의심 좀 하고 삽시다!"
  },
  {
    id: 5,
    name: "팩트 살인마 여우",
    emoji: "🦊",
    color: "#FFEBEE",
    subColor: "#FFCDD2",
    factBombs: [
      "맞는 말인데 기분 나쁨", "공감 능력 실종됨", "지기 싫어서 말꼬리", "인간미 0%",
      "냉혈한 소리 들음", "효율 따지다 정떨어짐", "팩트로 사람 잡음", "친구 고민에 해결책만",
      "T발 너 C야?", "감수성 메마름", "논리로 다 패고 다님", "맞는 말 자판기",
      "감정 소모 극혐", "얄미운 똑똑이", "얄짤없는 성격"
    ],
    description: "똑똑한 건 알겠는데 주변에 친구 다 떨어지겠어요. 정답보다 위로가 필요할 때도 있답니다."
  },
  {
    id: 6,
    name: "내적 관종 햄스터",
    emoji: "🐹",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    factBombs: [
      "관심 받고 싶어 미침", "근데 나서긴 무서움", "댓글 하나에 울고 웃음", "쭈구리 관종",
      "혼자서 내적 댄스", "칭찬해주면 녹음", "은근히 질투 왕", "소심한 반항아",
      "뒤에서 욕하고 앞선 웃음", "자기애 넘치는데 티 안냄", "해바라기씨 뒤에 숨음", "먼저 연락 못함",
      "인싸가 되고픈 아싸", "눈에 띄고 싶음", "쭈구리 감성"
    ],
    description: "해바라기씨 뒤에 숨어서 남들 쳐다만 보지 말고, 좀 당당하게 매력을 보여줘요!"
  },
  {
    id: 7,
    name: "황소 고집 호랑이",
    emoji: "🐯",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: [
      "남의 말 죽어도 안 들음", "내가 무조건 맞음", "답정너의 정석", "독불장군 1위",
      "자존심이 목숨보다 중요", "사과하는 법 모름", "강약약강 조심", "남 무시하는 경향",
      "욱하면 아무도 못 말림", "명령질 대장", "공포의 리더십", "내 밑으로 다 집합",
      "고집불통의 대명사", "자기 합리화 장인", "벽 보고 대화하는 기분"
    ],
    description: "리더십이 아니라 그냥 고집이에요. 주변 사람들 귀에 딱지 앉겠어요!"
  },
  {
    id: 8,
    name: "걱정 과부하 토끼",
    emoji: "🐰",
    color: "#E1F5FE",
    subColor: "#B3E5FC",
    factBombs: [
      "일어나지도 않은 일 걱정", "결정 장애 말기", "남 눈치 보느라 바쁨", "쫄보 중의 쫄보",
      "세상 모든 게 무서움", "스트레스 만성 질환", "생각이 꼬리에 꼬리를", "불안해서 잠 못 잠",
      "남 기분 살피느라 기 빨림", "눈물 버튼 가까움", "거절하면 밤새 고민", "유리 심장 소유자",
      "쿠쿠다스보다 약함", "깜놀 장인", "소심함의 결정체"
    ],
    description: "걱정만 하다가 인생 다 가겠어요! 깡총깡총 뛰어다닐 용기 좀 내보세요."
  },
  {
    id: 9,
    name: "잠만보 나무늘보",
    emoji: "🦥",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    factBombs: [
      "시작하려면 1년 걸림", "완벽 추구하다 포기", "움직이는 게 신기함", "느려터짐 주의",
      "말투도 느릿느릿", "게으름의 끝은 어디?", "멍 때리기 국가대표", "시간 개념 상실",
      "행동보다 말이 앞섬", "실행력 제로", "누가 끌어줘야 움직임", "세월아 네월아",
      "속 터지는 속도", "굼뱅이 친구", "잠만 자고 싶음"
    ],
    description: "완벽하게 하려고 생각만 하다가 결국 아무것도 안 하죠? 그냥 좀 시작이라도 하세요!"
  },
  {
    id: 10,
    name: "오지랖 대장 코끼리",
    emoji: "🐘",
    color: "#ECEFF1",
    subColor: "#CFD8DC",
    factBombs: [
      "남의 일에만 참견", "내 코가 석 자임", "거절 못해서 끙끙", "피곤한 참견러",
      "모든 고민 내가 해결?", "착한 아이 증후군", "자기 삶은 뒷전", "감정 쓰레기통 자처",
      "남 비위 맞추기 달인", "은근히 꼰대 기질", "잔소리 대마왕", "모두와 친해지려 함",
      "인맥 관리에 집착", "피곤한 스타일", "선 넘는 친절"
    ],
    description: "착한 사람 병 좀 고치세요. 남 챙기기 전에 본인 앞가림부터 하는 게 어때요?"
  },
  {
    id: 11,
    name: "망상 폭발 고래",
    emoji: "🐳",
    color: "#E3F2FD",
    subColor: "#BBDEFB",
    factBombs: [
      "꿈속에서 사는 중", "현실 파악 0점", "4차원을 넘어 8차원", "뜬구름 잡기 선수",
      "공상하다 시간 다 감", "혼자만의 세계에 갇힘", "특이하다는 말 좋아함", "감수성 과부하",
      "현실성 없는 계획", "예술가병 말기", "말이 안 통함", "이상한 포인트에 꽂힘",
      "몽상가 그 자체", "비현실적 낙천주의", "지구 밖 사람"
    ],
    description: "바다 속에서 혼자 상상하지 말고 땅 위로 좀 올라오세요. 현실은 실전이라구요!"
  },
  {
    id: 12,
    name: "허세 작렬 사자",
    emoji: "🦁",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: [
      "주인공 병 말기", "남 가르치려 듦", "근거 없는 자신감", "관심 안 주면 삐짐",
      "자기애가 지나침", "칭찬 갈구형", "겉모습에 치중함", "허세가 몸에 벰",
      "내가 최고인 줄 암", "남의 실수는 못 참음", "주목 공포증(반대)", "대접받길 원함",
      "나르시시스트 기질", "부담스러운 열정", "오글거림 주의"
    ],
    description: "자신감은 좋은데 가끔은 좀 겸손해져 보세요. 남들은 당신 열정 때문에 기 빨려요!"
  },
  {
    id: 13,
    name: "개인주의 부엉이",
    emoji: "🦉",
    color: "#F3E5F5",
    subColor: "#E1BEE7",
    factBombs: [
      "사회성 부족함", "혼자가 세상 편함", "남 인생 관심 없음", "철벽 방어 장인",
      "공감하는 척만 함", "차가운 도시 로봇", "말수가 적음(귀찮아서)", "정떨어지는 성격",
      "냉정한 분석가", "비밀이 너무 많음", "다가가기 힘듦", "자기 공간 침범 극혐",
      "철저한 비즈니스 관계", "인간관계 정리 장인", "무미건조함"
    ],
    description: "똑똑하긴 한데 가끔은 로봇 같아요. 인간미 좀 충전해서 사람들하고 어울려보세요."
  },
  {
    id: 14,
    name: "징징이 병아리",
    emoji: "🐥",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    factBombs: [
      "해달라는 거 오조오억개", "은근히 민폐 스타일", "혼자서는 아무것도 못함", "엄살 대장",
      "도움 받는 걸 당연히 여김", "징징거림이 일상", "철부지 그 자체", "의존증 심각",
      "책임감 실종", "맨날 억울함", "애새끼 기질 다분", "손이 너무 많이 감",
      "민폐인 줄 모름", "독립심 제로", "삐지면 답 없음"
    ],
    description: "귀여운 것도 한두 번이죠. 스스로 할 줄 아는 법도 좀 배워야 어른이 된답니다."
  },
  {
    id: 15,
    name: "산만함 1등 원숭이",
    emoji: "🐒",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    factBombs: [
      "주의력 결핍", "진득함 0%", "말이 너무 많음", "쉽게 질려함",
      "이랬다 저랬다 끝판왕", "산만함의 극치", "하나라도 끝내봐", "금방 까먹음",
      "오지랖도 넓음", "가벼운 입", "진지함 실종", "집중력은 어디에?",
      "깊이가 없는 관계", "좌충우돌 민폐", "정신 사나움"
    ],
    description: "하나라도 제대로 끝내본 적 있나요? 이리저리 옮겨 다니지 말고 집중 좀 하세요!"
  }
];

function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [result, setResult] = useState<Persona | null>(null);

  const startQuiz = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setTotalScore(0);
  };

  const handleAnswer = (score: number) => {
    const nextScore = totalScore + score;
    setTotalScore(nextScore);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = nextScore;
      let index = Math.floor(((finalScore - 6) / 13) * 15);
      if (index < 0) index = 0;
      if (index > 14) index = 14;
      
      setResult(PERSONAS[index]);
      setStep('result');
    }
  };

  return (
    <div className="app">
      <main className="main-content">
        {step === 'landing' && (
          <div className="landing-view">
            <div className="hero">
              <div className="main-character-float">✨</div>
              <h1>뼈 때리는 <br/><span>동물 팩폭 MBTI</span></h1>
              <p>아기자기하게 생겨서 <br/>할 말은 다 하는 성격 진단</p>
              <button className="btn-start" onClick={startQuiz}>팩폭 맞으러 가기 &rarr;</button>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div className="quiz-view">
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
            <div className="question-box">
              <span className="q-number">질문 {currentQuestion + 1}</span>
              <h2>{QUESTIONS[currentQuestion].text}</h2>
              <div className="options-grid">
                {QUESTIONS[currentQuestion].options.map((option, i) => (
                  <button 
                    key={i} 
                    className="option-btn"
                    onClick={() => handleAnswer(option.score)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="result-view" style={{ '--theme-color': result.color, '--sub-color': result.subColor } as any}>
            <div className="result-card">
              <div className="result-header">
                <h2 className="result-name">{result.name}</h2>
                <div className="char-stage">
                  <span className="result-emoji">{result.emoji}</span>
                </div>
              </div>

              <div className="bombs-grid">
                {result.factBombs.map((bomb, i) => (
                  <div key={i} className="mini-bubble">
                    {bomb}
                  </div>
                ))}
              </div>

              <div className="result-body">
                <div className="final-desc">
                  <p>{result.description}</p>
                </div>
              </div>

              <button className="btn-retry" onClick={() => setStep('landing')}>다시 테스트 (정신 차리기) 🔄</button>
            </div>
          </div>
        )}
      </main>

      <div className="a2a_kit a2a_kit_size_32 a2a_default_style share-buttons">
        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
        <a className="a2a_button_facebook"></a>
        <a className="a2a_button_kakao"></a>
        <a className="a2a_button_twitter"></a>
        <a className="a2a_button_line"></a>
      </div>
    </div>
  )
}

export default App
