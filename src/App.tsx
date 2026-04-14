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
  traits: string[];
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
    emoji: "🐼",
    color: "#F5F5F5",
    subColor: "#E0E0E0",
    traits: ["귀차니즘 심함", "침대와 물아일체", "연락 매우 느림", "평화주의자"],
    description: "숨 쉬는 것도 가끔은 귀찮아하는 당신! 하지만 누구보다 평화롭고 느긋한 마음씨를 가졌네요."
  },
  {
    id: 2,
    name: "계획 집착러 다람쥐",
    emoji: "🐿️",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    traits: ["계획에 진심임", "메모광", "시간 엄수 철저", "알고보면 완벽주의"],
    description: "준비성이 철저한 당신! 가끔은 도토리를 숨긴 곳을 까먹는 다람쥐처럼 여유를 가져보는 건 어떨까요?"
  },
  {
    id: 3,
    name: "유리멘탈 고양이",
    emoji: "🐱",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    traits: ["눈치 매우 빠름", "알고보면 따뜻함", "혼자있기 장인", "파워 예민"],
    description: "까칠해 보이지만 사실은 속정이 깊은 당신! 마음의 벽을 조금만 낮추면 더 행복해질 거예요."
  },
  {
    id: 4,
    name: "무한긍정 댕댕이",
    emoji: "🐶",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    traits: ["친화력 만렙", "단순 명료함", "꼬리 헬리콥터", "무한 긍정"],
    description: "세상 모든 게 즐거운 당신! 당신의 에너지는 주변 사람들을 항상 행복하게 만든답니다."
  },
  {
    id: 5,
    name: "팩트 살인마 여우",
    emoji: "🦊",
    color: "#FFEBEE",
    subColor: "#FFCDD2",
    traits: ["논리 끝판왕", "팩폭 장인", "효율 중시", "지능캐 여우"],
    description: "정답만 말하는 당신! 가끔은 정답보다 따뜻한 위로 한마디가 더 큰 힘이 될 때가 있어요."
  },
  {
    id: 6,
    name: "소심한 관종 햄스터",
    emoji: "🐹",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    traits: ["내적 댄스 중", "쭈구리 관종", "칭찬에 약함", "해바라기씨 사랑"],
    description: "관심은 받고 싶지만 나서는 건 무서운 당신! 당신의 존재만으로도 충분히 빛나고 있어요."
  },
  {
    id: 7,
    name: "마이웨이 호랑이",
    emoji: "🐯",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    traits: ["고집 불통", "리더십 장인", "솔직함 주의", "내 갈 길 간다"],
    description: "남들 눈치 안 보고 당당한 당신! 당신의 리더십은 멋지지만 주변 목소리도 조금만 들어주세요."
  },
  {
    id: 8,
    name: "걱정 인형 토끼",
    emoji: "🐰",
    color: "#E1F5FE",
    subColor: "#B3E5FC",
    traits: ["생각이 너무 많음", "걱정 과부하", "결정 장애", "깜짝 잘 놀람"],
    description: "일어나지도 않은 일로 고민하는 당신! 걱정의 90%는 실제로 일어나지 않는답니다. 힘내세요!"
  },
  {
    id: 9,
    name: "완벽주의 나무늘보",
    emoji: "🦥",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    traits: ["느릿느릿 완벽", "시작이 힘들군", "은근 고집셈", "프로 잠만보"],
    description: "완벽을 추구하느라 시작이 늦는 당신! 가끔은 완벽보다 일단 해보는 것이 더 중요하답니다."
  },
  {
    id: 10,
    name: "오지랖 코끼리",
    emoji: "🐘",
    color: "#ECEFF1",
    subColor: "#CFD8DC",
    traits: ["거절 못함", "친절함 과다", "공감 요정", "프로 고민상담러"],
    description: "남 챙기느라 본인은 못 챙기는 당신! 오늘은 자신을 위해 선물을 하나 해보는 건 어떨까요?"
  },
  {
    id: 11,
    name: "몽상가 고래",
    emoji: "🐳",
    color: "#E3F2FD",
    subColor: "#BBDEFB",
    traits: ["상상력 폭발", "자유로운 영혼", "감성 끝판왕", "4차원 몽상가"],
    description: "넓은 바다를 꿈꾸는 당신! 당신의 창의적인 생각은 세상을 더 아름답게 만들 수 있어요."
  },
  {
    id: 12,
    name: "열정 만수르 사자",
    emoji: "🦁",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    traits: ["열정 폭발", "승부욕 강함", "자기애 뿜뿜", "직진 불도저"],
    description: "어디서든 주인공이 되어야 하는 당신! 당신의 열정은 멋지지만 가끔은 휴식도 필요해요."
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
              <div className="main-character">✨</div>
              <h1>나의 숨겨진 <br/><span>동물 팩폭 MBTI</span></h1>
              <p>아기자기한데 뼈는 때리는 <br/>나의 진짜 성격 진단</p>
              <button className="btn-start" onClick={startQuiz}>테스트 시작하기! &rarr;</button>
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
          <div className="result-view" style={{ '--theme-color': result.color, '--sub-color': result.subColor } as any}>
            <div className="result-card">
              <div className="result-header">
                <div className="char-circle">
                  <span className="result-emoji">{result.emoji}</span>
                </div>
                <h2 className="result-name">{result.name}</h2>
              </div>

              <div className="traits-container">
                {result.traits.map((trait, i) => (
                  <span key={i} className="trait-tag">{trait}</span>
                ))}
              </div>

              <div className="result-body">
                <div className="desc-card">
                  <p>{result.description}</p>
                </div>
              </div>

              <button className="btn-retry" onClick={() => setStep('landing')}>다시 해보기 🔄</button>
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
