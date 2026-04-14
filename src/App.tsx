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
  factBombs: string[]; // 말풍선에 들어갈 팩폭 문구들
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
    factBombs: ["숨 쉬는 것도 귀찮지?", "카톡 답장 좀 해라", "누워있는 게 적성", "영혼 가출 1위"],
    description: "게으름의 끝판왕! 미루기 장인이라 내일의 내가 고생 중이에요."
  },
  {
    id: 2,
    name: "계획 강박 다람쥐",
    emoji: "🐿️",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: ["계획 없으면 불안함", "비효율적인 꼴 못 봄", "메모의 메모를 함", "피곤한 완벽주의"],
    description: "1분 단위로 인생 설계하느라 머리에 쥐나겠어요. 도토리나 까먹으면서 쉬세요!"
  },
  {
    id: 3,
    name: "유리멘탈 고양이",
    emoji: "🐱",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    factBombs: ["말 한마디에 이불킥", "파워 예민 보스", "혼자 있고 싶어(뻥임)", "기분파 끝판왕"],
    description: "까칠한 척하지만 사실은 관심 받고 싶은 츤데레! 유리멘탈 관리 좀 하세요."
  },
  {
    id: 4,
    name: "텅 빈 긍정 댕댕이",
    emoji: "🐶",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    factBombs: ["생각 없이 웃음", "거절 못하는 바보", "사기 당하기 딱 좋음", "분위기 파악 실패"],
    description: "세상은 아름답지만 당신 주머니는 털리고 있어요. 가끔은 의심 좀 하고 삽시다!"
  },
  {
    id: 5,
    name: "팩트 살인마 여우",
    emoji: "🦊",
    color: "#FFEBEE",
    subColor: "#FFCDD2",
    factBombs: ["맞는 말인데 기분 나쁨", "공감 능력 실종됨", "지기 싫어서 말꼬리", "인간미 0%"],
    description: "똑똑한 건 알겠는데 주변에 친구 다 떨어지겠어요. 정답보다 위로가 필요할 때도 있답니다."
  },
  {
    id: 6,
    name: "내적 관종 햄스터",
    emoji: "🐹",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    factBombs: ["관심 받고 싶어 미침", "근데 나서긴 무서움", "댓글 하나에 울고 웃음", "쭈구리 관종"],
    description: "해바라기씨 뒤에 숨어서 남들 쳐다만 보지 말고, 좀 당당하게 매력을 보여줘요!"
  },
  {
    id: 7,
    name: "황소 고집 호랑이",
    emoji: "🐯",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: ["남의 말 죽어도 안 들음", "내가 무조건 맞음", "답정너의 정석", "독불장군 1위"],
    description: "리더십이 아니라 그냥 고집이에요. 주변 사람들 귀에 딱지 앉겠어요!"
  },
  {
    id: 8,
    name: "걱정 과부하 토끼",
    emoji: "🐰",
    color: "#E1F5FE",
    subColor: "#B3E5FC",
    factBombs: ["일어나지도 않은 일 걱정", "결정 장애 말기", "남 눈치 보느라 바쁨", "쫄보 중의 쫄보"],
    description: "걱정만 하다가 인생 다 가겠어요! 깡총깡총 뛰어다닐 용기 좀 내보세요."
  },
  {
    id: 9,
    name: "잠만보 나무늘보",
    emoji: "🦥",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    factBombs: ["시작하려면 1년 걸림", "완벽 추구하다 포기", "움직이는 게 신기함", "느려터짐 주의"],
    description: "완벽하게 하려고 생각만 하다가 결국 아무것도 안 하죠? 그냥 좀 시작이라도 하세요!"
  },
  {
    id: 10,
    name: "오지랖 대장 코끼리",
    emoji: "🐘",
    color: "#ECEFF1",
    subColor: "#CFD8DC",
    factBombs: ["남의 일에만 참견", "내 코가 석 자임", "거절 못해서 끙끙", "피곤한 참견러"],
    description: "착한 사람 병 좀 고치세요. 남 챙기기 전에 본인 앞가림부터 하는 게 어때요?"
  },
  {
    id: 11,
    name: "망상 폭발 고래",
    emoji: "🐳",
    color: "#E3F2FD",
    subColor: "#BBDEFB",
    factBombs: ["꿈속에서 사는 중", "현실 파악 0점", "4차원을 넘어 8차원", "뜬구름 잡기 선수"],
    description: "바다 속에서 혼자 상상하지 말고 땅 위로 좀 올라오세요. 현실은 실전이라구요!"
  },
  {
    id: 12,
    name: "허세 작렬 사자",
    emoji: "🦁",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: ["주인공 병 말기", "남 가르치려 듦", "근거 없는 자신감", "관심 안 주면 삐짐"],
    description: "자신감은 좋은데 가끔은 좀 겸손해져 보세요. 남들은 당신 열정 때문에 기 빨려요!"
  },
  {
    id: 13,
    name: "개인주의 부엉이",
    emoji: "🦉",
    color: "#F3E5F5",
    subColor: "#E1BEE7",
    factBombs: ["사회성 부족함", "혼자가 세상 편함", "남 인생 관심 없음", "철벽 방어 장인"],
    description: "똑똑하긴 한데 가끔은 로봇 같아요. 인간미 좀 충전해서 사람들하고 어울려보세요."
  },
  {
    id: 14,
    name: "징징이 병아리",
    emoji: "🐥",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    factBombs: ["해달라는 거 오조오억개", "은근히 민폐 스타일", "혼자서는 아무것도 못함", "엄살 대장"],
    description: "귀여운 것도 한두 번이죠. 스스로 할 줄 아는 법도 좀 배워야 어른이 된답니다."
  },
  {
    id: 15,
    name: "산만함 1등 원숭이",
    emoji: "🐒",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    factBombs: ["주의력 결핍", "진득함 0%", "말이 너무 많음", "쉽게 질려함"],
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
      // 6~18점 범위를 15개 유형으로 매핑
      // index = floor((score - min) / (max - min + 1) * count)
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

              <div className="bubbles-container">
                {result.factBombs.map((bomb, i) => (
                  <div key={i} className={`speech-bubble bubble-${i + 1}`}>
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
