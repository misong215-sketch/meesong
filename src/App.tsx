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
    name: "침대 위 눕방 휴식형",
    emoji: "🛌",
    color: "#F5F5F5",
    subColor: "#E0E0E0",
    factBombs: [
      "침대가 제2의 심장", "연락보다 수면이 우선", "미루기 만렙 능력자", "최소 효율 극대화", 
      "누워있을 때 젤 행복", "약속 취소 환영", "집 밖은 전쟁터", "답장은 마음속으로",
      "귀찮음이 본체를 지배", "생각만 하다 하루 감", "움직이면 방전됨", "영혼 가출 중",
      "이불 밖은 위험해", "내일의 나에게 토스", "평화로운 게 최고"
    ],
    description: "게으른 게 아니라 에너지를 아끼는 중이에요. 효율적인 휴식의 대가!"
  },
  {
    id: 2,
    name: "분단위 루틴 설계자",
    emoji: "⏱️",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: [
      "기록 안 하면 불안함", "비효율적인 거 못 참음", "메모광 수집가", "철저한 시간 엄수",
      "완벽한 루틴 추구", "변수는 나의 적", "정리정돈의 달인", "미래 설계 장인",
      "1분 단위 스케줄", "꼼꼼함의 끝판왕", "남들 눈엔 피곤", "준비성 하나는 1등",
      "계획대로 안 되면 멘붕", "꼼수 부리기 싫어함", "체크리스트 강박"
    ],
    description: "머릿속에 항상 체크리스트가 돌아가는 당신! 준비성이 철저해 신뢰를 받아요."
  },
  {
    id: 3,
    name: "꼼꼼한 식단 분석가",
    emoji: "🥗",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    factBombs: [
      "말 한마디도 곱씹음", "분위기 파악 1초 컷", "혼자가 세상 편해", "섬세한 감성 소유자",
      "낯가림의 정석", "속마음은 꽁꽁", "예민한 레이더", "기분파라고 오해받음",
      "은근히 뒤끝 있음", "친해지면 수다쟁이", "상처 잘 받는 편", "눈치 백단 만렙",
      "취향 확고한 타입", "먼저 연락 안 함", "선 넘으면 칼차단"
    ],
    description: "섬세하고 예민한 감각을 가진 당신! 자신만의 확고한 기준과 취향을 가지고 있어요."
  },
  {
    id: 4,
    name: "파이팅 넘치는 에너지형",
    emoji: "🔥",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    factBombs: [
      "사람이 곧 에너지", "리액션 혜자 급", "거절 못 하는 천사", "금방 까먹는 해맑음",
      "친화력 우주 최강", "생각보다 몸이 먼저", "뒷감당은 나중에", "분위기 메이커",
      "솔직해서 투명함", "궁금한 거 못 참음", "걱정은 3초만", "사람 잘 믿는 편",
      "어색한 거 못 참음", "일단 지르고 봄", "칭찬해주면 춤춤"
    ],
    description: "당신의 긍정 에너지는 주변 사람들을 웃게 만드는 마법 같은 힘이 있어요!"
  },
  {
    id: 5,
    name: "스마트 팩트 지향형",
    emoji: "🧠",
    color: "#FFEBEE",
    subColor: "#FFCDD2",
    factBombs: [
      "논리 없음 대화 불가", "팩트가 제일 중요", "효율성 따지는 편", "지적 호기심 폭발",
      "감정보다 이성", "할 말은 하고 삶", "빈말 죽어도 못 함", "자기 주관 뚜렷",
      "해결책 제시 달인", "영혼 없는 리액션", "말꼬리 잡기 장인", "현실적인 조언가",
      "T발 너 C야?", "감정 소모 제일 싫음", "똑 부러지는 성격"
    ],
    description: "냉정해 보이지만 사실은 가장 정직한 조언자! 비효율을 걷어내는 지능캐예요."
  },
  {
    id: 6,
    name: "조용한 열정 노력파",
    emoji: "💪",
    color: "#FCE4EC",
    subColor: "#F8BBD0",
    factBombs: [
      "겉바속촉 성격", "소심한 관종", "속으로 내적 댄스", "칭찬에 춤추는 편",
      "걱정은 태산만큼", "남 시선 많이 의식", "조용한 카리스마", "은근히 질투쟁이",
      "세심한 배려 끝판왕", "혼자서 생각 많음", "먼저 말 걸기 힘듦", "알고보면 인싸",
      "기록하는 습관", "작지만 확실한 소확행", "따뜻한 응원 필요"
    ],
    description: "겉으로 드러내진 않지만 내면에는 누구보다 큰 열정과 의지를 품고 있어요."
  },
  {
    id: 7,
    name: "거침없는 직진 행동파",
    emoji: "🚀",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: [
      "자기 주도적 삶", "추진력은 탱크 급", "답답한 거 못 참음", "자존심이 곧 생명",
      "솔직함이 매력", "리더 기질 다분", "결과로 증명함", "내 사람은 잘 챙김",
      "고집 좀 있는 편", "뒤끝 없는 성격", "시원시원한 말투", "목표 지향적 인간",
      "남 눈치 안 봄", "책임감 넘쳐남", "직구 던지는 타입"
    ],
    description: "남들의 시선보다 자신의 신념을 믿고 나아가는 당당한 모습이 멋져요!"
  },
  {
    id: 8,
    name: "돌다리 신중 체크형",
    emoji: "🔍",
    color: "#E1F5FE",
    subColor: "#B3E5FC",
    factBombs: [
      "걱정이 취미생활", "선택 장애 중증", "남 배려하다 기 빨림", "돌다리도 두드림",
      "착한 사람 증후군", "거절이 제일 힘듦", "안전제일 주의자", "생각의 꼬리물기",
      "깜짝 잘 놀라는 편", "평화로운 관계 추구", "눈치가 너무 빠름", "조심성 끝판왕",
      "자기 검열 심함", "따뜻한 위로가 약", "세상 무해한 존재"
    ],
    description: "신중하고 세심한 성격 덕분에 주변 사람들에게 편안함을 주는 존재예요."
  },
  {
    id: 9,
    name: "느긋한 마이페이스형",
    emoji: "🧘",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    factBombs: [
      "세월아 네월아", "느긋함의 미학", "마감 직전 초능력", "실행보다 상상력",
      "은근히 고집 있음", "자기 페이스 유지", "강요받는 거 싫음", "단순한 게 최고",
      "스트레스 안 받음", "멍 때리기 장인", "잠이 보약임", "평화주의적 태도",
      "느리지만 다 함", "욕심 없는 편", "현재를 즐기는 중"
    ],
    description: "남들이 뭐라든 자신만의 속도로 인생을 즐기는 진정한 낭만파입니다."
  },
  {
    id: 10,
    name: "함께 걷는 페이스메이커",
    emoji: "🤝",
    color: "#ECEFF1",
    subColor: "#CFD8DC",
    factBombs: [
      "상담 요청 1순위", "남 챙기기 전문가", "공감 능력 200%", "오지떱도 사랑",
      "거절 못해 고민", "기억력 생각보다 좋음", "정의로운 마음씨", "믿음직한 버팀목",
      "포용력 있는 성격", "화나면 은근 무서움", "인간관계가 재산", "감수성 풍부함",
      "남 일에 진심인 편", "참견과 배려 사이", "듬직한 존재감"
    ],
    description: "넓은 마음으로 주변을 품어주는 당신! 당신 덕분에 주변이 따뜻해져요."
  },
  {
    id: 11,
    name: "이상적인 몽상 다이어터",
    emoji: "☁️",
    color: "#E3F2FD",
    subColor: "#BBDEFB",
    factBombs: [
      "상상력의 끝판왕", "자유로운 영혼", "예술적 감각 있음", "현실 파악 좀 늦음",
      "혼자만의 세계 뚜렷", "특이하다는 말 즐김", "낭만적인 몽상가", "감정선이 섬세함",
      "뜬구름 잡기 선수", "깊이 있는 생각", "이상적인 삶 추구", "말투가 감성적",
      "4차원 매력 뿜뿜", "직관을 믿는 편", "바다 같은 포용력"
    ],
    description: "남들이 보지 못하는 세상을 꿈꾸는 당신! 창의적인 영감을 주는 사람이에요."
  },
  {
    id: 12,
    name: "주인공 본능 챌린저",
    emoji: "👑",
    color: "#FFF3E0",
    subColor: "#FFE0B2",
    factBombs: [
      "주목받아야 활기참", "자기애가 넘침", "열정 강요 주의", "승부욕이 활활",
      "당당한 카리스마", "솔직하고 화끈함", "관심은 나의 힘", "칭찬 갈구형 인간",
      "내가 최고여야 함", "뒤끝 없는 시원함", "화려한 거 좋아함", "에너지 과부하",
      "리더가 되고 싶어", "허세도 매력임", "불도저 추진력"
    ],
    description: "어디서든 주인공이 되는 당신의 당당함은 주변 사람들에게 용기를 줍니다."
  },
  {
    id: 13,
    name: "독립적인 전략가 타입",
    emoji: "🎯",
    color: "#F3E5F5",
    subColor: "#E1BEE7",
    factBombs: [
      "독립적인 성향", "분석적인 사고", "말수가 적은 편", "자기 공간 필수",
      "지식 습득의 즐거움", "사회생활은 연기", "감정 낭비 질색", "객관적인 시각",
      "철벽 방어 장인", "냉정한 통찰력", "혼자 노는 게 젤 재밌음", "군더더기 없는 삶",
      "논리적인 설득", "사생활 보호 철저", "조용히 실속 챙김"
    ],
    description: "깊이 있는 통찰과 냉철한 분석으로 문제를 해결하는 지혜로운 사람입니다."
  },
  {
    id: 14,
    name: "보호가 필요한 비기너",
    emoji: "🌱",
    color: "#FFFDE7",
    subColor: "#FFF9C4",
    factBombs: [
      "도움 주는 재미", "애교 섞인 말투", "의존적인 타입", "보호본능 자극",
      "순수한 마음씨", "겁이 많은 편", "작은 거에도 행복", "함께하는 게 좋아",
      "눈물도 웃음도 많음", "응원이 필요한 타입", "솔직한 감정표현", "세상 순진무구",
      "조금 서툰 편", "함께 있을 때 힘남", "애정 갈구형"
    ],
    description: "존재 자체만으로도 주변을 밝고 따뜻하게 만드는 매력이 있는 사람이에요."
  },
  {
    id: 15,
    name: "다재다능 잡학 챌린저",
    emoji: "🌈",
    color: "#EFEBE9",
    subColor: "#D7CCC8",
    factBombs: [
      "호기심 천국", "산만해도 즐거워", "다재다능 잡학다식", "질리는 것도 빠름",
      "말이 엄청 많음", "분위기 주도형", "재치 있는 유머", "진지함은 3초만",
      "새로운 거 환장함", "인맥이 문어발", "창의적인 사고방식", "활동적인 취미",
      "지루함 못 참음", "임기응변 달인", "자유분방한 성격"
    ],
    description: "호기심 넘치는 당신의 활력은 지루한 일상에 새로운 바람을 일으킵니다."
  }
];

function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [result, setResult] = useState<Persona | null>(null);

  const startQuiz = () => {
    if (!userName.trim()) {
      alert('이름을 입력해 주세요!');
      return;
    }
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
              <h1>나에게 꼭 맞는 <br/><span>퍼스널 핏 & 루틴 진단</span></h1>
              <p>내 라이프스타일에 최적화된 <br/>나만의 다이어트 성향 테스트</p>
              
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="이름을 입력하세요" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="name-input"
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>

              <button className="btn-start" onClick={startQuiz}>테스트 시작하기 &rarr;</button>
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
                <p className="user-greeting"><span>{userName}</span>님의 진단 결과</p>
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

              <button className="btn-retry" onClick={() => setStep('landing')}>다시 테스트하기 🔄</button>
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
