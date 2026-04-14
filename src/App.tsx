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
  animal: string;
  emoji: string;
  color: string;
  title: string;
  factBomb: string[];
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
    name: "귀차니즘 만렙 판다",
    animal: "Panda",
    emoji: "🐼",
    color: "#F5F5F5",
    title: "숨 쉬는 것도 가끔 귀찮음",
    factBomb: [
      "누워있는 게 인생의 목표임",
      "말투에서 영혼이 이미 가출함",
      "해야 할 일? 내일의 내가 하겠지",
      "연락 안 됨. 답장 기다리다 사리 나옴"
    ],
    description: "당신은 세상에서 가장 평화로운 존재지만, 가끔은 너무 평화로워서 정지 화면인 줄 알았어요."
  },
  {
    id: 2,
    name: "계획 집착러 다람쥐",
    animal: "Squirrel",
    emoji: "🐿️",
    color: "#FFF3E0",
    title: "1분 단위로 인생 설계 중",
    factBomb: [
      "계획 틀어지면 동공 지진 남",
      "메모장에 집착함. 메모의 메모를 함",
      "남의 비효율적인 행동 보면 화남",
      "본인만 아는 규칙이 너무 많음"
    ],
    description: "준비성이 철저한 건 좋지만, 가끔은 도토리 숨긴 곳을 까먹는 다람쥐처럼 여유를 가져보세요."
  },
  {
    id: 3,
    name: "유리멘탈 고양이",
    animal: "Cat",
    emoji: "🐱",
    color: "#FCE4EC",
    title: "파워 예민! 건드리면 하악질",
    factBomb: [
      "혼자 있고 싶은데 외로운 건 싫음",
      "말 한마디에 밤새 이불킥 함",
      "낯가림 만렙. 친해지기 난이도 극악",
      "기분파라서 주변 사람들 눈치 보게 함"
    ],
    description: "까칠해 보이지만 사실은 사랑받고 싶은 츤데레! 마음의 벽을 조금만 낮춰봐요."
  },
  {
    id: 4,
    name: "무한긍정 댕댕이",
    animal: "Dog",
    emoji: "🐶",
    color: "#FFFDE7",
    title: "세상은 아름다워! 꼬리 붕붕",
    factBomb: [
      "사람을 너무 좋아해서 사기당하기 딱 좋음",
      "생각이라는 걸 가끔 안 함",
      "분위기 파악 못 하고 혼자 신남",
      "거절 못 해서 온갖 일 다 떠맡음"
    ],
    description: "당신의 에너지는 주변을 밝게 하지만, 가끔은 멈춰 서서 현실을 직시할 필요가 있어요."
  },
  {
    id: 5,
    name: "팩트 살인마 여우",
    animal: "Fox",
    emoji: "🦊",
    color: "#FFEBEE",
    title: "논리로 다 패고 다님",
    factBomb: [
      "공감 능력 지능 문제라고 생각함",
      "맞는 말만 하는데 기분은 나쁨",
      "효율성 따지느라 인간미 실종됨",
      "지기 싫어서 끝까지 말꼬리 잡음"
    ],
    description: "똑똑한 건 인정! 하지만 가끔은 정답보다 따뜻한 위로 한마디가 더 중요할 때도 있답니다."
  },
  {
    id: 6,
    name: "소심한 관종 햄스터",
    animal: "Hamster",
    emoji: "🐹",
    color: "#FCE4EC",
    title: "구석이 좋은데 주목받고 싶어",
    factBomb: [
      "먼저 말 못 거는데 관심은 받고 싶음",
      "온라인에서는 핵인싸, 오프라인은 쭈구리",
      "댓글 하나하나에 일희일비함",
      "칭찬해주면 하루 종일 그 생각만 함"
    ],
    description: "해바라기씨처럼 소중한 당신의 매력을 조금 더 당당하게 보여줘도 괜찮아요!"
  },
  {
    id: 7,
    name: "마이웨이 호랑이",
    animal: "Tiger",
    emoji: "🐯",
    color: "#FFF3E0",
    title: "다 비켜! 내 갈 길 간다",
    factBomb: [
      "남의 조언? 응 안 들어",
      "고집이 황소고집 수준임",
      "본인 빼고 다 답답해함",
      "하고 싶은 건 무조건 해야 직성 풀림"
    ],
    description: "리더십은 멋지지만, 주변 사람들의 목소리에도 귀를 기울여야 진정한 왕이 될 수 있어요."
  },
  {
    id: 8,
    name: "걱정 인형 토끼",
    animal: "Rabbit",
    emoji: "🐰",
    color: "#E1F5FE",
    title: "세상 걱정 혼자 다 함",
    factBomb: [
      "일어나지도 않은 일로 소설 씀",
      "결정 장애 심각함. 메뉴 하나 못 고름",
      "남 눈치 보느라 본인 실속 못 챙김",
      "작은 일에도 깜짝깜짝 놀람"
    ],
    description: "걱정은 나누면 반이 된다지만, 당신은 나누기엔 너무 많은 걱정을 쌓아두고 있네요."
  },
  {
    id: 9,
    name: "게으른 완벽주의 나무늘보",
    animal: "Sloth",
    emoji: "🦥",
    color: "#EFEBE9",
    title: "시작은 창대하나 끝은 침대",
    factBomb: [
      "계획은 우주 정복급인데 실천은 0",
      "완벽하게 안 할 거면 아예 안 함",
      "누구보다 빠르게 남들과는 다르게 눕고 싶음",
      "마감 직전에 초인적인 힘 발휘함"
    ],
    description: "생각만 하다가 기회를 놓치지 마세요. 가끔은 완벽보다 시작이 더 중요하니까요."
  },
  {
    id: 10,
    name: "친절한 오지랖 코끼리",
    animal: "Elephant",
    emoji: "🐘",
    color: "#ECEFF1",
    title: "우리 모두 친구야! (피곤)",
    factBomb: [
      "남의 일 해결해주느라 내 일 못 함",
      "거절하면 큰일 나는 줄 암",
      "모든 사람한테 다 맞춰줌",
      "혼자 상처받고 겉으로는 웃음"
    ],
    description: "착한 사람 증후군에서 벗어나세요. 당신의 마음을 먼저 챙기는 것이 가장 중요합니다."
  },
  {
    id: 11,
    name: "상상력 과부하 고래",
    animal: "Whale",
    emoji: "🐳",
    color: "#E3F2FD",
    title: "꿈속에서 사는 중",
    factBomb: [
      "현실 파악 안 됨. 몽상가 기질 다분",
      "특이하다는 말 은근 즐김",
      "말투가 4차원적임",
      "감수성 폭발해서 혼자 눈물 훔침"
    ],
    description: "넓은 바다를 헤엄치는 고래처럼 자유로운 영혼! 하지만 현실의 땅도 밟아보세요."
  },
  {
    id: 12,
    name: "열정 만수르 사자",
    animal: "Lion",
    emoji: "🦁",
    color: "#FFF3E0",
    title: "오늘을 불태우자! 화르르",
    factBomb: [
      "남들 피곤하게 만드는 스타일",
      "가만히 있는 꼴을 못 봄",
      "모든 걸 경쟁으로 받아들임",
      "본인 열정 강요해서 주변 사람 탈진함"
    ],
    description: "열정은 좋지만 가끔은 불을 끄고 휴식하세요. 엔진도 쉬어야 오래 달리는 법입니다."
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
      // 6-18 point range mapped to 0-11 index
      const finalScore = nextScore;
      let index = Math.floor(((finalScore - 6) / 13) * 12);
      if (index < 0) index = 0;
      if (index > 11) index = 11;
      
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
              <span className="main-emoji">✨</span>
              <h1>귀염뽀짝 <br/><span>팩폭 MBTI</span></h1>
              <p>아기자기한데 뼈는 때리는 <br/>나의 진짜 성격 진단</p>
              <button className="btn-start" onClick={startQuiz}>나의 정체성 확인하기 &rarr;</button>
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
            <div className="question-container">
              <span className="q-number">Q{currentQuestion + 1}</span>
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
          <div className="result-view" style={{ '--result-color': result.color } as any}>
            <div className="result-card">
              <header className="result-header">
                <span className="result-emoji">{result.emoji}</span>
                <p className="type-title">{result.title}</p>
                <h2 className="type-name">{result.name}</h2>
              </header>

              <div className="result-content">
                <div className="fact-bomb-box">
                  <h3>🚫 팩트 폭격 주의</h3>
                  <ul>
                    {result.factBomb.map((fact, i) => (
                      <li key={i}>{fact}</li>
                    ))}
                  </ul>
                </div>

                <div className="desc-box">
                  <p>{result.description}</p>
                </div>
              </div>

              <button className="btn-retry" onClick={() => setStep('landing')}>다시 테스트하기</button>
            </div>
          </div>
        )}
      </main>

      <div className="a2a_kit a2a_kit_size_32 a2a_default_style share-buttons">
        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
        <a className="a2a_button_facebook"></a>
        <a className="a2a_button_mastodon"></a>
        <a className="a2a_button_email"></a>
        <a className="a2a_button_sms"></a>
        <a className="a2a_button_reddit"></a>
        <a className="a2a_button_kakao"></a>
        <a className="a2a_button_twitter"></a>
      </div>
    </div>
  )
}

export default App
