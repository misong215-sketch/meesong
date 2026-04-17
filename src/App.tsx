import { useState } from 'react'
import './App.css'

interface Option {
  label: string;
  type: string; // E, I, S, N, T, F, J, P
  weight: number;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Persona {
  id: number;
  mbti: string;
  name: string;
  emoji: string;
  color: string;
  subColor: string;
  factBombs: string[];
  description: string;
}

const QUESTIONS: Question[] = [
  // E vs I (4 questions)
  {
    id: 1,
    text: "헬스장에 처음 갔을 때, 당신의 행동은?",
    options: [
      { label: "트레이너나 옆 사람에게 운동 기구 사용법을 물어본다", type: "E", weight: 2 },
      { label: "아는 사람을 만나면 반갑게 인사하며 같이 운동하자고 한다", type: "E", weight: 1 },
      { label: "조용히 유튜브로 사용법을 찾아본 뒤 혼자 시작한다", type: "I", weight: 1 },
      { label: "구석진 곳에서 남들 눈에 안 띄게 조심스럽게 운동한다", type: "I", weight: 2 },
    ]
  },
  {
    id: 2,
    text: "식단 관리를 시작했다면, 누구에게 알리나요?",
    options: [
      { label: "인스타그램이나 단톡방에 매 끼니 사진을 찍어 올린다", type: "E", weight: 2 },
      { label: "친한 친구 몇 명에게만 '나 식단 시작했다'고 말한다", type: "E", weight: 1 },
      { label: "굳이 말하지 않고 혼자 조용히 실천한다", type: "I", weight: 1 },
      { label: "남들이 물어볼 때까지 절대 먼저 말하지 않는다", type: "I", weight: 2 },
    ]
  },
  {
    id: 3,
    text: "운동 후 스트레스를 푸는 가장 좋은 방법은?",
    options: [
      { label: "친구들과 시원한 제로 콜라 한 잔하며 수다 떨기", type: "E", weight: 2 },
      { label: "운동 오픈 채팅방에서 사람들과 정보 공유하기", type: "E", weight: 1 },
      { label: "집에서 혼자 시원하게 샤워하고 좋아하는 영상 보기", type: "I", weight: 1 },
      { label: "조용한 공원을 혼자 산책하며 생각 정리하기", type: "I", weight: 2 },
    ]
  },
  {
    id: 4,
    text: "단체 운동(GX) 수업에 참여하게 된다면?",
    options: [
      { label: "맨 앞자리에서 강사님과 눈을 맞추며 열정적으로 따라한다", type: "E", weight: 2 },
      { label: "중간쯤에서 분위기에 맞춰 적당히 에너지를 얻는다", type: "E", weight: 1 },
      { label: "뒷자리에서 묵묵히 내 동작에만 집중한다", type: "I", weight: 1 },
      { label: "사람이 너무 많은 수업은 피하고 싶다", type: "I", weight: 2 },
    ]
  },
  // S vs N (4 questions)
  {
    id: 5,
    text: "새로운 다이어트 보조제를 고를 때 가장 중요한 것은?",
    options: [
      { label: "성분 함량, 실제 후기, 검증된 임상 데이터", type: "S", weight: 2 },
      { label: "유명한 브랜드나 주변 지인의 실제 추천", type: "S", weight: 1 },
      { label: "제품의 컨셉이나 혁신적인 기술력", type: "N", weight: 1 },
      { label: "이걸 먹고 건강해진 내 모습을 상상하며 직관적으로 선택", type: "N", weight: 2 },
    ]
  },
  {
    id: 6,
    text: "운동 목표를 세울 때 당신의 스타일은?",
    options: [
      { label: "한 달에 몸무게 2kg 감량, 체지방 3% 감소 등 수치 위주", type: "S", weight: 2 },
      { label: "오늘 걷기 1만 보, 스쿼트 50개 등 당장의 실천 위주", type: "S", weight: 1 },
      { label: "바디 프로필 찍기, 예쁜 옷 입기 등 전반적인 이미지 위주", type: "N", weight: 1 },
      { label: "미래에 더 활기차고 건강해진 나를 꿈꾸며 광범위하게", type: "N", weight: 2 },
    ]
  },
  {
    id: 7,
    text: "운동 영상을 볼 때 주로 어떤 것을 보나요?",
    options: [
      { label: "정확한 자세와 해부학적 근육 움직임을 설명하는 영상", type: "S", weight: 2 },
      { label: "오늘 바로 따라 할 수 있는 루틴 루틴 영상", type: "S", weight: 1 },
      { label: "운동 동기부여가 되는 화려한 편집의 영상", type: "N", weight: 1 },
      { label: "미래의 운동 트렌드나 색다른 철학을 담은 영상", type: "N", weight: 2 },
    ]
  },
  {
    id: 8,
    text: "다이어트 중 맛있는 음식을 발견했다면?",
    options: [
      { label: "칼로리와 영양 성분을 꼼꼼히 체크한다", type: "S", weight: 2 },
      { label: "이전의 먹어본 익숙한 맛과 비교해본다", type: "S", weight: 1 },
      { label: "이 음식을 다이어트용으로 어떻게 변형할지 상상해본다", type: "N", weight: 1 },
      { label: "이걸 먹음으로써 내 기분과 에너지가 어떻게 바뀔지 생각한다", type: "N", weight: 2 },
    ]
  },
  // T vs F (4 questions)
  {
    id: 9,
    text: "친구가 '나 오늘 운동 가기 너무 귀찮아'라고 한다면?",
    options: [
      { label: "'너 이번 주에 2번밖에 안 갔잖아. 빨리 가.'라고 팩폭한다", type: "T", weight: 2 },
      { label: "'가기 전이 제일 힘들지, 일단 옷부터 입어봐'라고 조언한다", type: "T", weight: 1 },
      { label: "'그럴 때 있지, 오늘 하루는 푹 쉬는 게 어때?'라고 공감한다", type: "F", weight: 1 },
      { label: "'나도 그랬는데, 같이 힘내보자!'라며 위로한다", type: "F", weight: 2 },
    ]
  },
  {
    id: 10,
    text: "다이어트 실패 원인을 분석할 때 당신은?",
    options: [
      { label: "식단 기록과 운동량을 분석하며 논리적인 원인을 찾는다", type: "T", weight: 2 },
      { label: "다음에는 어떤 전략을 써야 할지 객관적으로 계획한다", type: "T", weight: 1 },
      { label: "의지력이 약했던 나 자신을 자책하며 감정적으로 힘들다", type: "F", weight: 1 },
      { label: "주변 환경이나 상황이 도와주지 않았던 속상함을 느낀다", type: "F", weight: 2 },
    ]
  },
  {
    id: 11,
    text: "운동 유튜버를 선택할 때 더 끌리는 쪽은?",
    options: [
      { label: "전문 지식이 풍부하고 이론적으로 설명해주는 유튜버", type: "T", weight: 2 },
      { label: "운동 성과가 뚜렷하고 객관적인 증명을 해주는 유튜버", type: "T", weight: 1 },
      { label: "말투가 다정하고 친근하게 소통해주는 유튜버", type: "F", weight: 1 },
      { label: "자신의 고충을 솔직하게 털어놓으며 공감을 이끌어내는 유튜버", type: "F", weight: 2 },
    ]
  },
  {
    id: 12,
    text: "목표 체중에 도달했을 때 가장 듣고 싶은 칭찬은?",
    options: [
      { label: "정말 대단하다, 철저한 자기관리의 결실이네!", type: "T", weight: 2 },
      { label: "수치가 증명하네, 네 노력이 헛되지 않았어", type: "T", weight: 1 },
      { label: "와, 분위기가 확 달라졌어! 너무 예쁘고 멋져", type: "F", weight: 1 },
      { label: "그동안 고생 많았지? 고생한 보람이 있어서 다행이야", type: "F", weight: 2 },
    ]
  },
  // J vs P (3 questions)
  {
    id: 13,
    text: "당신의 주간 운동 계획표는?",
    options: [
      { label: "요일별 부위와 시간까지 완벽하게 정해져 있다", type: "J", weight: 2 },
      { label: "일주일에 몇 번 갈지 대략적인 계획은 있다", type: "J", weight: 1 },
      { label: "그날의 컨디션에 따라 하고 싶은 운동을 선택한다", type: "P", weight: 1 },
      { label: "친구가 가자고 하거나 상황이 되면 간다", type: "P", weight: 2 },
    ]
  },
  {
    id: 14,
    text: "여행을 가서 식단 관리는 어떻게 하나요?",
    options: [
      { label: "여행지 근처 샐러드 맛집을 미리 다 찾아둔다", type: "J", weight: 2 },
      { label: "적당히 먹되, 과식하지 않으려 미리 마음먹는다", type: "J", weight: 1 },
      { label: "여행인데 일단 즐겁게 먹고 돌아와서 생각한다", type: "P", weight: 1 },
      { label: "맛있어 보이는 게 있으면 즉흥적으로 먹는다", type: "P", weight: 2 },
    ]
  },
  {
    id: 15,
    text: "운동복을 준비하는 시점은?",
    options: [
      { label: "전날 밤에 미리 가방까지 다 챙겨둔다", type: "J", weight: 2 },
      { label: "나가기 최소 한 시간 전에는 미리 챙겨둔다", type: "J", weight: 1 },
      { label: "나가기 직전에 눈에 보이는 대로 주워 입는다", type: "P", weight: 1 },
      { label: "운동 가려고 마음먹는 그 순간 바로 챙겨서 나간다", type: "P", weight: 2 },
    ]
  }
];

const PERSONAS: Persona[] = [
  {
    id: 1, mbti: "ISTJ", name: "원칙주의 식단 관리자", emoji: "📉", color: "#F5F5F5", subColor: "#E0E0E0",
    factBombs: ["계획 없으면 운동 안 함", "정확한 무게 측정 필수", "루틴 깨지면 스트레스", "칼로리 계산 장인"],
    description: "철저한 데이터 분석과 계획을 바탕으로 건강을 관리하는 당신! 정해진 원칙을 지킬 때 가장 큰 성취감을 느낍니다."
  },
  {
    id: 2, mbti: "ISFJ", name: "세심한 페이스메이커", emoji: "🧘", color: "#FFFDE7", subColor: "#FFF9C4",
    factBombs: ["주변 사람 건강도 챙김", "꾸준함이 최고의 무기", "튀는 것보다 내실 집중", "칭찬 한마디에 힘남"],
    description: "남을 배려하면서도 자신만의 페이스를 묵묵히 지키는 타입입니다. 꾸준한 관리로 서서히 변화하는 정석 다이어터예요."
  },
  {
    id: 3, mbti: "INFJ", name: "통찰력 있는 멘탈 헬서", emoji: "🕊️", color: "#E3F2FD", subColor: "#BBDEFB",
    factBombs: ["운동의 의미를 찾음", "완벽주의적 성향", "혼자만의 명상 운동", "내면의 성장을 중시"],
    description: "단순한 체중 감량보다 심신의 조화를 중요하게 생각합니다. 깊은 통찰력으로 자신에게 가장 적합한 건강 라이프를 설계해요."
  },
  {
    id: 4, mbti: "INTJ", name: "전략적인 목표 달성가", emoji: "🏗️", color: "#F3E5F5", subColor: "#E1BEE7",
    factBombs: ["효율성 극대화 추구", "근거 없는 정보 질색", "독보적인 의지력", "장기적인 시스템 구축"],
    description: "체계적인 분석을 통해 가장 효율적인 운동 경로를 찾아냅니다. 감정에 휘둘리지 않고 목표를 향해 냉철하게 나아갑니다."
  },
  {
    id: 5, mbti: "ISTP", name: "만능 운동 기구 술사", emoji: "🛠️", color: "#EFEBE9", subColor: "#D7CCC8",
    factBombs: ["이론보다 실전파", "최소 효율 최대 효과", "위기 상황 순발력", "재미없으면 안 함"],
    description: "다양한 운동 기구를 다루는 데 능숙하며, 실용적인 운동을 선호합니다. 복잡한 계획보다는 상황에 맞춰 유연하게 움직입니다."
  },
  {
    id: 6, mbti: "ISFP", name: "감각적인 힐링 다이어터", emoji: "🎨", color: "#FCE4EC", subColor: "#F8BBD0",
    factBombs: ["예쁜 운동복이 동기부여", "억지로 하는 거 질색", "현재의 즐거움 중시", "감성적인 운동 공간"],
    description: "운동의 과정 자체가 즐거워야 합니다. 아름다운 자연 속 산책이나 감각적인 요가 클래스처럼 몸과 마음이 즐거운 활동을 선호해요."
  },
  {
    id: 7, mbti: "INFP", name: "꿈꾸는 자유로운 영혼", emoji: "☁️", color: "#E1F5FE", subColor: "#B3E5FC",
    factBombs: ["내적 동기가 중요", "규칙적인 건 힘들어", "상상하며 즐겁게", "자아 성찰의 시간"],
    description: "엄격한 규칙보다는 자신의 내면이 이끄는 대로 움직이는 것을 좋아합니다. 창의적이고 자유로운 방식의 건강 관리가 잘 어울려요."
  },
  {
    id: 8, mbti: "INTP", name: "호기심 많은 분석가", emoji: "🧪", color: "#FFEBEE", subColor: "#FFCDD2",
    factBombs: ["원리를 알아야 시작", "끊임없는 의문 제기", "비효율적인 루틴 거부", "실험적인 식단 도전"],
    description: "운동과 식단에 대한 해박한 지식을 쌓는 것을 즐깁니다. 자신만의 논리로 최적화된 건강 관리법을 끊임없이 연구합니다."
  },
  {
    id: 9, mbti: "ESTP", name: "스릴 만점 액티브 챌린저", emoji: "🏎️", color: "#FFF3E0", subColor: "#FFE0B2",
    factBombs: ["에너지 넘치는 활동", "지루한 건 못 참음", "즉각적인 보상 선호", "모험적인 스포츠"],
    description: "넘치는 에너지를 발산할 수 있는 격렬한 운동을 좋아합니다. 경쟁과 스릴을 즐기며 현장에서 몸으로 부딪히는 스타일이에요."
  },
  {
    id: 10, mbti: "ESFP", name: "분위기 메이커 에너자이저", emoji: "🎉", color: "#FFF9C4", subColor: "#FFF176",
    factBombs: ["함께하면 즐거움 배가", "주목받는 게 좋아", "지루한 식단은 거부", "현재를 즐기는 삶"],
    description: "사람들과 어울려 즐겁게 운동하는 것을 선호합니다. 당신의 밝은 에너지는 주변 사람들까지 건강하게 만드는 힘이 있어요."
  },
  {
    id: 11, mbti: "ENFP", name: "열정적인 라이프 탐험가", emoji: "🌈", color: "#E8F5E9", subColor: "#C8E6C9",
    factBombs: ["새로운 운동 컬렉터", "금방 질릴 수도 있음", "긍정의 힘 만렙", "다양한 시도 선호"],
    description: "새로운 운동과 건강 트렌드에 관심이 많습니다. 열정적으로 도전하고 즐거움을 찾는 당신은 인생 자체가 하나의 활기찬 탐험이에요."
  },
  {
    id: 12, mbti: "ENTP", name: "기발한 전략 아이디어맨", emoji: "💡", color: "#E0F2F1", subColor: "#B2DFDB",
    factBombs: ["토론하며 정보 습득", "기존 방식에 의문", "재치 있는 다이어트", "지적인 자극 필요"],
    description: "남들과 다른 독특하고 효과적인 관리법을 고안해내는 데 탁월합니다. 지루한 반복보다는 매번 새로운 자극이 필요한 스타일이에요."
  },
  {
    id: 13, mbti: "ESTJ", name: "엄격한 건강 관리 감독관", emoji: "⚖️", color: "#ECEFF1", subColor: "#CFD8DC",
    factBombs: ["결과는 성실함의 증거", "질서 있는 체계 선호", "리더십 발휘", "현실적인 성과 중시"],
    description: "확실한 목표와 규율을 가지고 자신을 관리합니다. 체계적이고 조직적인 환경에서 가장 효율적으로 건강 목표를 달성합니다."
  },
  {
    id: 14, mbti: "ESFJ", name: "다정한 건강 전도사", emoji: "🍎", color: "#FFFDE7", subColor: "#FFF9C4",
    factBombs: ["정보 공유의 여왕/왕", "협동 운동 선호", "인정받을 때 기쁨", "사회적 관계 중시"],
    description: "주변 사람들과 건강 정보를 나누고 서로 응원하며 관리하는 것을 좋아합니다. 함께하는 즐거움이 당신의 가장 큰 원동력입니다."
  },
  {
    id: 15, mbti: "ENFJ", name: "신념 있는 건강 리더", emoji: "🦁", color: "#FFF3E0", subColor: "#FFE0B2",
    factBombs: ["선한 영향력 전파", "동기부여의 달인", "이상적인 목표 설정", "사람을 이끄는 힘"],
    description: "자신뿐만 아니라 타인의 성장과 건강에도 진심입니다. 확고한 신념과 따뜻한 리더십으로 건강한 라이프스타일을 이끌어갑니다."
  },
  {
    id: 16, mbti: "ENTJ", name: "압도적인 성과 추구자", emoji: "🌋", color: "#FFEBEE", subColor: "#FFCDD2",
    factBombs: ["한계 돌파의 희열", "철저한 성과 분석", "강력한 추진력", "비효율은 용납 불가"],
    description: "목표를 정하면 수단과 방법을 가리지 않고 달성해냅니다. 자신을 한계까지 밀어붙여 결과를 만들어내는 모습이 인상적입니다."
  }
];

function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [result, setResult] = useState<Persona | null>(null);

  const startQuiz = () => {
    if (!userName.trim()) {
      alert('이름을 입력해 주세요!');
      return;
    }
    setStep('quiz');
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  };

  const handleAnswer = (type: string, weight: number) => {
    const nextScores = { ...scores, [type]: scores[type as keyof typeof scores] + weight };
    setScores(nextScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate MBTI
      const mbti = 
        (nextScores.E >= nextScores.I ? 'E' : 'I') +
        (nextScores.S >= nextScores.N ? 'S' : 'N') +
        (nextScores.T >= nextScores.F ? 'T' : 'F') +
        (nextScores.J >= nextScores.P ? 'J' : 'P');
      
      const found = PERSONAS.find(p => p.mbti === mbti) || PERSONAS[0];
      setResult(found);
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
              <span className="q-number">질문 {currentQuestion + 1} / {QUESTIONS.length}</span>
              <h2 className="question-text">{QUESTIONS[currentQuestion].text}</h2>
              <div className="options-grid">
                {QUESTIONS[currentQuestion].options.map((option, i) => (
                  <button 
                    key={i} 
                    className="option-btn"
                    onClick={() => handleAnswer(option.type, option.weight)}
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
                <div className="mbti-tag">{result.mbti}</div>
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
