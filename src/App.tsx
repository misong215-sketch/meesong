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
  borderColor: string;
  factBombs: string[];
  description: string;
}

const QUESTIONS: Question[] = [
  // E vs I
  {
    id: 1,
    text: "주말 아침, 눈을 떴을 때 당신의 첫 생각은?",
    options: [
      { label: "오늘은 누구를 만나서 에너지를 채워볼까?", type: "E", weight: 2 },
      { label: "밀린 연락들에 답장부터 해야지!", type: "E", weight: 1 },
      { label: "조금 더 누워있다가 집안일을 해볼까?", type: "I", weight: 1 },
      { label: "오늘 하루는 온전히 나만의 시간이야!", type: "I", weight: 2 },
    ]
  },
  {
    id: 2,
    text: "새로운 사람들과의 모임에 참여하게 되었다면?",
    options: [
      { label: "내가 먼저 말을 걸며 분위기를 주도한다", type: "E", weight: 2 },
      { label: "어색함을 깨기 위해 적당히 노력한다", type: "E", weight: 1 },
      { label: "누가 말을 걸어줄 때까지 기다린다", type: "I", weight: 1 },
      { label: "최대한 조용히 구석에서 관찰한다", type: "I", weight: 2 },
    ]
  },
  {
    id: 3,
    text: "모르는 번호로 전화가 오면 당신은?",
    options: [
      { label: "누굴까? 궁금해서 바로 받는다", type: "E", weight: 2 },
      { label: "망설이다가 일단 받아본다", type: "E", weight: 1 },
      { label: "거의 받지 않고 문자가 오길 기다린다", type: "I", weight: 1 },
      { label: "벨소리가 끝날 때까지 쳐다만 본다", type: "I", weight: 2 },
    ]
  },
  {
    id: 4,
    text: "에너지가 방전되었을 때 충전하는 방법은?",
    options: [
      { label: "사람들을 만나 신나게 떠든다", type: "E", weight: 2 },
      { label: "가까운 친구와 맛있는 것을 먹는다", type: "E", weight: 1 },
      { label: "집에서 영화를 보거나 게임을 한다", type: "I", weight: 1 },
      { label: "혼자 아무것도 안 하고 멍하니 쉰다", type: "I", weight: 2 },
    ]
  },
  // S vs N
  {
    id: 5,
    text: "길을 가다 예쁜 꽃을 발견했을 때 당신의 생각은?",
    options: [
      { label: "와, 색깔이 정말 선명하고 예쁘다", type: "S", weight: 2 },
      { label: "이게 무슨 꽃이지? 꽃 이름을 떠올린다", type: "S", weight: 1 },
      { label: "꽃말이 뭘까? 누군가에게 선물하고 싶다", type: "N", weight: 1 },
      { label: "이 꽃처럼 나도 활짝 피어날 미래를 꿈꾼다", type: "N", weight: 2 },
    ]
  },
  {
    id: 6,
    text: "요리를 할 때 당신의 스타일은?",
    options: [
      { label: "레시피의 계량 수치를 정확히 지킨다", type: "S", weight: 2 },
      { label: "눈대중으로 하되 대략적인 틀을 따른다", type: "S", weight: 1 },
      { label: "냉장고에 있는 재료로 창의적인 시도를 한다", type: "N", weight: 1 },
      { label: "새로운 맛의 조합을 실험해보는 게 즐겁다", type: "N", weight: 2 },
    ]
  },
  {
    id: 7,
    text: "미래에 대해 생각할 때 주로 드는 생각은?",
    options: [
      { label: "당장 내일, 다음 주의 계획을 세운다", type: "S", weight: 2 },
      { label: "현실적으로 가능한 목표를 구체화한다", type: "S", weight: 1 },
      { label: "5년 뒤, 10년 뒤의 내 모습을 상상한다", type: "N", weight: 1 },
      { label: "전혀 예상치 못한 놀라운 일들이 일어날 것 같다", type: "N", weight: 2 },
    ]
  },
  {
    id: 8,
    text: "영화를 보고 난 뒤, 당신의 감상은?",
    options: [
      { label: "줄거리와 연출, 배우의 연기를 기억한다", type: "S", weight: 2 },
      { label: "인상 깊었던 장면들을 하나하나 되짚는다", type: "S", weight: 1 },
      { label: "영화가 전하는 메시지와 철학을 고민한다", type: "N", weight: 1 },
      { label: "주인공의 상황이 내 삶에 어떤 의미인지 생각한다", type: "N", weight: 2 },
    ]
  },
  // T vs F
  {
    id: 9,
    text: "친구가 '나 오늘 우울해서 쇼핑했어'라고 한다면?",
    options: [
      { label: "어떤 걸 샀어? 가성비는 좋아?", type: "T", weight: 2 },
      { label: "왜 우울해? 무슨 일 있었어?", type: "F", weight: 2 },
      { label: "많이 샀어? 얼마 썼어?", type: "T", weight: 1 },
      { label: "기분은 좀 나아졌어? 예쁜 거 샀네!", type: "F", weight: 1 },
    ]
  },
  {
    id: 10,
    text: "누군가 당신의 의견에 반대한다면?",
    options: [
      { label: "상대방의 논리가 맞는지부터 따져본다", type: "T", weight: 2 },
      { label: "기분이 상하지만 일단 이유를 들어본다", type: "F", weight: 1 },
      { label: "내가 틀렸다면 즉시 인정하고 수정한다", type: "T", weight: 1 },
      { label: "비난받는 느낌이 들어 속상함이 앞선다", type: "F", weight: 2 },
    ]
  },
  {
    id: 11,
    text: "거절해야 하는 상황에서 당신은?",
    options: [
      { label: "안 되는 이유를 명확하고 짧게 말한다", type: "T", weight: 2 },
      { label: "미안한 마음을 충분히 표현하며 완곡하게 말한다", type: "F", weight: 2 },
      { label: "최대한 객관적인 상황을 설명한다", type: "T", weight: 1 },
      { label: "상대방이 상처받지 않도록 고민하며 말한다", type: "F", weight: 1 },
    ]
  },
  {
    id: 12,
    text: "칭찬을 들었을 때 가장 기분 좋은 말은?",
    options: [
      { label: "와, 정말 똑똑하고 일 잘하시네요!", type: "T", weight: 2 },
      { label: "항상 성실하고 믿음직스러워요!", type: "T", weight: 1 },
      { label: "마음이 정말 따뜻하고 착하시네요!", type: "F", weight: 1 },
      { label: "정말 독특하고 매력이 넘치시네요!", type: "F", weight: 2 },
    ]
  },
  // J vs P
  {
    id: 13,
    text: "여행 가방을 싸는 당신의 모습은?",
    options: [
      { label: "필요한 리스트를 만들어 미리 다 챙긴다", type: "J", weight: 2 },
      { label: "전날 밤에 대략적으로 챙겨둔다", type: "J", weight: 1 },
      { label: "나가기 직전에 눈에 보이는 대로 넣는다", type: "P", weight: 1 },
      { label: "가서 사면 되지! 일단 몸만 떠난다", type: "P", weight: 2 },
    ]
  },
  {
    id: 14,
    text: "과제를 하거나 업무를 처리할 때?",
    options: [
      { label: "미리미리 해서 기한보다 빨리 끝낸다", type: "J", weight: 2 },
      { label: "계획을 세워 차근차근 진행한다", type: "J", weight: 1 },
      { label: "마감 직전이 되어야 집중력이 폭발한다", type: "P", weight: 1 },
      { label: "흥미가 생길 때 몰아서 처리한다", type: "P", weight: 2 },
    ]
  },
  {
    id: 15,
    text: "정해진 약속 시간이 다가오면 당신은?",
    options: [
      { label: "5~10분 일찍 도착해서 기다린다", type: "J", weight: 2 },
      { label: "정각에 딱 맞춰 도착하려 노력한다", type: "J", weight: 1 },
      { label: "준비하다 보니 조금씩 늦는 편이다", type: "P", weight: 1 },
      { label: "약속 장소 근처에 와서야 준비를 시작한다", type: "P", weight: 2 },
    ]
  }
];

const PERSONAS: Persona[] = [
  { id: 1, mbti: "ISTJ", name: "청렴결백 계획러", emoji: "🧐", color: "#F5F5F5", borderColor: "#2d3436", factBombs: ["철저한 규칙주의", "시간 약속 칼", "정리정돈의 신", "사실 위주 판단"], description: "당신은 세상을 움직이는 성실한 일꾼! 완벽한 계획으로 신뢰를 얻는 원칙주의자입니다." },
  { id: 2, mbti: "ISFJ", name: "다정한 수호자", emoji: "🛡️", color: "#FFFDE7", borderColor: "#f1c40f", factBombs: ["조용한 배려왕", "기억력 만렙", "책임감 강함", "전통과 예의 중시"], description: "당신은 주변 사람들을 따뜻하게 감싸 안는 수호자! 섬세한 관찰력으로 모두를 챙겨줍니다." },
  { id: 3, mbti: "INFJ", name: "신비로운 선지자", emoji: "🔮", color: "#F3E5F5", borderColor: "#9b59b6", factBombs: ["속 깊은 통찰력", "완벽주의적 배려", "강한 신념", "혼자만의 시간 필수"], description: "당신은 세상을 더 나은 곳으로 만들려는 평화주의자! 신비로운 통찰력을 가졌습니다." },
  { id: 4, mbti: "INTJ", name: "전략가 고양이", emoji: "🐈", color: "#ECEFF1", borderColor: "#34495e", factBombs: ["냉철한 분석력", "비효율 증오", "독립적인 영혼", "자기 확신 강함"], description: "당신은 모든 것을 꿰뚫어 보는 지략가! 논리적인 사고로 정답을 찾아내는 전략가입니다." },
  { id: 5, mbti: "ISTP", name: "만능 재주꾼", emoji: "🛠️", color: "#EFEBE9", borderColor: "#795548", factBombs: ["실용적인 해결사", "과묵하지만 예리함", "기계 조작 달인", "쿨한 마이페이스"], description: "당신은 위기 상황에서 빛을 발하는 실전파! 필요한 것만 골라 하는 효율의 대가입니다." },
  { id: 6, mbti: "ISFP", name: "자유로운 예술가", emoji: "🎨", color: "#FCE4EC", borderColor: "#e91e63", factBombs: ["현재를 즐기는 삶", "갈등 회피 만렙", "예술적 감각", "따뜻한 감성"], description: "당신은 삶 자체가 하나의 예술인 낭만파! 자유로운 영혼으로 매 순간을 아름답게 삽니다." },
  { id: 7, mbti: "INFP", name: "꿈꾸는 꼬마유령", emoji: "👻", color: "#E1F5FE", borderColor: "#3498db", factBombs: ["상상력 대폭발", "유리 멘탈 주의", "이상주의자", "조용한 열정"], description: "당신은 마음속에 거대한 우주를 품은 몽상가! 따뜻한 마음으로 세상을 꿈꿉니다." },
  { id: 8, mbti: "INTP", name: "아이디어 뱅크", emoji: "🧪", color: "#FFEBEE", borderColor: "#e74c3c", factBombs: ["논리적인 의심꾼", "지적 호기심 폭발", "귀찮음이 본체", "촌철살인 유머"], description: "당신은 끊임없이 질문을 던지는 지식 탐구자! 새로운 아이디어로 가득 찬 천재형입니다." },
  { id: 9, mbti: "ESTP", name: "모험을 즐기는 사자", emoji: "🦁", color: "#FFF3E0", borderColor: "#e67e22", factBombs: ["행동이 앞서는 타입", "말솜씨 화려함", "에너지 넘침", "즉흥적인 즐거움"], description: "당신은 두려움 없는 도전가! 넘치는 에너지로 주변을 압도하는 매력을 가졌습니다." },
  { id: 10, mbti: "ESFP", name: "슈퍼스타 에너자이저", emoji: "🌟", color: "#FFF9C4", borderColor: "#f39c12", factBombs: ["모임의 주인공", "리액션 기계", "지금 이 순간 최고", "낙천적인 성격"], description: "당신은 인생이 축제인 타고난 스타! 밝은 미소로 세상을 환하게 비추는 존재입니다." },
  { id: 11, mbti: "ENFP", name: "반짝이는 유니콘", emoji: "🦄", color: "#E8F5E9", borderColor: "#2ecc71", factBombs: ["사람이 제일 좋아", "아이디어 화수분", "금방 질림 주의", "긍정 파워 만렙"], description: "당신은 반짝이는 아이디어로 가득 찬 행복 전도사! 사람들에게 큰 즐거움을 줍니다." },
  { id: 12, mbti: "ENTP", name: "뜨거운 감자", emoji: "🔥", color: "#E0F2F1", borderColor: "#1abc9c", factBombs: ["토론이 제일 재밌음", "기존 방식 거부", "다재다능 잡학왕", "유쾌한 악동"], description: "당신은 고정관념을 깨부수는 혁신가! 기발한 생각으로 늘 새로운 자극을 만듭니다." },
  { id: 13, mbti: "ESTJ", name: "엄격한 관리자", emoji: "💼", color: "#ECEFF1", borderColor: "#2c3e50", factBombs: ["결과 중심주의", "질서와 법 중시", "강한 책임감", "리더십 발휘"], description: "당신은 사회를 지탱하는 든든한 기둥! 확실한 목표와 규율로 성과를 만들어냅니다." },
  { id: 14, mbti: "ESFJ", name: "사교적인 꽃", emoji: "🌸", color: "#FFFDE7", borderColor: "#fdcb6e", factBombs: ["분위기 파악 1등", "남 챙기기 진심", "공감 능력 최고", "예의 바른 생활"], description: "당신은 사람들을 끈끈하게 연결하는 외교관! 따뜻한 공감으로 평화를 만듭니다." },
  { id: 15, mbti: "ENFJ", name: "정의로운 햇살", emoji: "☀️", color: "#FFF3E0", borderColor: "#e67e22", factBombs: ["선한 영향력", "동기부여의 달인", "리더십 끝판왕", "이상적인 세상 추구"], description: "당신은 타인의 성장을 돕는 위대한 스승! 따뜻한 카리스마로 사람들을 이끕니다." },
  { id: 16, mbti: "ENTJ", name: "정복자 대장님", emoji: "👑", color: "#FFEBEE", borderColor: "#c0392b", factBombs: ["강력한 추진력", "장기적 비전", "자신감 뿜뿜", "성과가 전부"], description: "당신은 목표를 향해 진격하는 리더! 압도적인 추진력으로 승리를 쟁취합니다." },
  // Extra 4 types for more variety
  { id: 17, mbti: "INTJ-Extreme", name: "얼음 왕국 지배자", emoji: "❄️", color: "#E1F5FE", borderColor: "#2980b9", factBombs: ["극강의 논리", "감정 0% 도달", "천재적 전략", "혼자만의 성"], description: "당신은 감정에 흔들리지 않는 완벽한 이성의 지배자! 가장 차갑고 가장 정확합니다." },
  { id: 18, mbti: "ENFP-Extreme", name: "무지개빛 댕댕이", emoji: "🐶", color: "#FFF3E0", borderColor: "#ff7675", factBombs: ["텐션 폭발", "사랑둥이 그 자체", "호기심 우주 돌파", "모두가 내 친구"], description: "당신은 존재만으로도 행복을 주는 사랑의 화신! 우주에서 가장 밝은 텐션을 가졌습니다." },
  { id: 19, mbti: "ISTJ-Extreme", name: "걸어다니는 법전", emoji: "⚖️", color: "#F5F5F5", borderColor: "#2d3436", factBombs: ["오차 허용 안 함", "기록의 신", "원칙주의 만렙", "안정의 대명사"], description: "당신은 한 치의 오차도 허용하지 않는 완벽의 수호자! 세상을 가장 정확하게 유지합니다." },
  { id: 20, mbti: "ESFP-Extreme", name: "파티광 악어", emoji: "🐊", color: "#E8F5E9", borderColor: "#27ae60", factBombs: ["흥 폭주족", "리액션 대폭발", "패션 피플", "인생은 욜로"], description: "당신은 한 번뿐인 인생을 가장 화려하게 사는 파티 킹! 어디서든 축제를 만듭니다." }
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
      const e_i = nextScores.E >= nextScores.I ? 'E' : 'I';
      const s_n = nextScores.S >= nextScores.N ? 'S' : 'N';
      const t_f = nextScores.T >= nextScores.F ? 'T' : 'F';
      const j_p = nextScores.J >= nextScores.P ? 'J' : 'P';
      const mbti = e_i + s_n + t_f + j_p;
      
      // logic to get 20 types
      let finalResult: Persona;
      const baseIndex = PERSONAS.findIndex(p => p.mbti === mbti);
      
      // Extreme check: if sum of weights for a dimension is very high, assign extreme persona
      if (mbti === "INTJ" && nextScores.I >= 6 && nextScores.T >= 6) {
        finalResult = PERSONAS[16]; // INTJ-Extreme
      } else if (mbti === "ENFP" && nextScores.E >= 6 && nextScores.N >= 6) {
        finalResult = PERSONAS[17]; // ENFP-Extreme
      } else if (mbti === "ISTJ" && nextScores.I >= 6 && nextScores.J >= 6) {
        finalResult = PERSONAS[18]; // ISTJ-Extreme
      } else if (mbti === "ESFP" && nextScores.E >= 6 && nextScores.P >= 6) {
        finalResult = PERSONAS[19]; // ESFP-Extreme
      } else {
        finalResult = PERSONAS[baseIndex] || PERSONAS[0];
      }
      
      setResult(finalResult);
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
              <h1>내 안의 숨은 <br/><span>성격 스티커 찾기</span></h1>
              <p>나를 가장 잘 나타내는 <br/>귀여운 성격 스티커를 만나보세요!</p>
              
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
          <div className="result-view">
            <div className="sticker-container" style={{ '--sticker-color': result.color, '--border-color': result.borderColor } as any}>
              <div className="sticker-body">
                <p className="user-greeting"><span>{userName}</span>님의 성격 스티커</p>
                <div className="sticker-main">
                  <span className="sticker-emoji">{result.emoji}</span>
                  <h2 className="sticker-name">{result.name}</h2>
                  <div className="sticker-mbti">{result.mbti}</div>
                </div>

                <div className="bombs-grid">
                  {result.factBombs.map((bomb, i) => (
                    <div key={i} className="mini-bubble">
                      #{bomb}
                    </div>
                  ))}
                </div>

                <div className="result-body">
                  <div className="final-desc">
                    <p>{result.description}</p>
                  </div>
                </div>
              </div>
              <div className="sticker-edge"></div>
            </div>
            <button className="btn-retry" onClick={() => setStep('landing')}>다시 테스트하기 🔄</button>
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
