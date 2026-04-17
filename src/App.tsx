import { useState } from 'react'
import './App.css'

interface Option {
  label: string;
  score: number;
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
  {
    id: 1,
    text: "오늘 처음 본 사람에게 말을 걸어야 하는 상황이라면?",
    options: [
      { label: "전혀 어색하지 않게 먼저 말을 건다", score: 4 },
      { label: "용기 내어 가벼운 인사를 건넨다", score: 3 },
      { label: "누가 먼저 말을 걸어주길 기다린다", score: 2 },
      { label: "최대한 눈을 피하며 자리를 피한다", score: 1 },
    ]
  },
  {
    id: 2,
    text: "친구들과 여행을 갈 때 나의 모습은?",
    options: [
      { label: "숙소부터 맛집까지 완벽하게 계획한다", score: 4 },
      { label: "대략적인 일정은 미리 정해둔다", score: 3 },
      { label: "친구들이 정한 계획에 군말 없이 따른다", score: 2 },
      { label: "가서 하고 싶은 대로 즉흥적으로 움직인다", score: 1 },
    ]
  },
  {
    id: 3,
    text: "친구가 '나 너무 힘들어서 쇼핑했어'라고 한다면?",
    options: [
      { label: "뭐 샀어? 예쁜 거 샀어? 기분은 어때?", score: 1 },
      { label: "고생 많았네, 기분 전환이 됐다니 다행이야", score: 2 },
      { label: "많이 비싼 거야? 이번 달 예산은 괜찮아?", score: 3 },
      { label: "왜 힘든데? 쇼핑 말고 다른 해결책은 없어?", score: 4 },
    ]
  },
  {
    id: 4,
    text: "자기 전 침대에 누웠을 때 당신의 생각은?",
    options: [
      { label: "내일 해야 할 일들을 꼼꼼히 체크한다", score: 4 },
      { label: "오늘 하루 있었던 일들을 되돌아본다", score: 3 },
      { label: "말도 안 되는 엉뚱한 상상을 펼친다", score: 2 },
      { label: "아무 생각 없이 유튜브 보다가 잠든다", score: 1 },
    ]
  },
  {
    id: 5,
    text: "갑자기 예정에 없던 회식이 잡혔을 때?",
    options: [
      { label: "새로운 사람들과 친해질 기회라 즐겁다", score: 4 },
      { label: "조금 귀찮지만 참석해서 분위기를 맞춘다", score: 3 },
      { label: "내 개인 시간이 사라져서 속상하다", score: 2 },
      { label: "거절할 핑계를 대고 조용히 퇴근한다", score: 1 },
    ]
  },
  {
    id: 6,
    text: "어려운 과제가 주어졌을 때 당신의 해결 방식은?",
    options: [
      { label: "논리적으로 분석해서 체계적으로 접근한다", score: 4 },
      { label: "관련 정보를 최대한 수집한 뒤 시작한다", score: 3 },
      { label: "일단 몸으로 부딪히며 방법을 찾는다", score: 2 },
      { label: "주변 능력자에게 도움을 요청한다", score: 1 },
    ]
  },
  {
    id: 7,
    text: "약속 시간에 늦는 친구를 보았을 때?",
    options: [
      { label: "얼마나 더 걸리는지 체크하고 기다린다", score: 4 },
      { label: "무슨 일 있는지 물어보고 걱정해준다", score: 3 },
      { label: "혼자 딴짓하며 시간을 보내면 된다", score: 2 },
      { label: "나도 가끔 늦으니까 이해해준다", score: 1 },
    ]
  },
  {
    id: 8,
    text: "방 정리를 할 때 당신의 스타일은?",
    options: [
      { label: "모든 물건이 정해진 위치에 있어야 한다", score: 4 },
      { label: "눈에 보이는 지저분한 것만 치운다", score: 3 },
      { label: "어디에 뭐가 있는지 나만 알면 된다", score: 2 },
      { label: "정리가 뭐지? 그냥 쌓아두고 산다", score: 1 },
    ]
  },
  {
    id: 9,
    text: "새로운 취미를 시작할 때 당신의 행동은?",
    options: [
      { label: "관련 장비부터 완벽하게 갖춘다", score: 4 },
      { label: "기초 이론부터 탄탄히 공부한다", score: 3 },
      { label: "일단 가벼운 마음으로 체험부터 해본다", score: 2 },
      { label: "재미없으면 바로 그만둘 생각부터 한다", score: 1 },
    ]
  },
  {
    id: 10,
    text: "다른 사람의 고민을 상담해줄 때 당신은?",
    options: [
      { label: "명확한 해결책과 팩트를 제시한다", score: 4 },
      { label: "객관적인 상황을 분석해준다", score: 3 },
      { label: "상대의 감정에 깊이 공감해준다", score: 2 },
      { label: "그냥 묵묵히 끝까지 들어준다", score: 1 },
    ]
  },
  {
    id: 11,
    text: "쇼핑을 할 때 당신의 모습은?",
    options: [
      { label: "필요한 리스트만 딱 사고 돌아온다", score: 4 },
      { label: "가격과 성능을 꼼꼼히 비교한다", score: 3 },
      { label: "마음에 드는 게 있으면 즉흥적으로 산다", score: 2 },
      { label: "예쁜 쓰레기여도 기분 좋으면 산다", score: 1 },
    ]
  },
  {
    id: 12,
    text: "영화나 드라마를 볼 때 주로 느끼는 것은?",
    options: [
      { label: "영화의 설정과 논리적 허점을 찾는다", score: 4 },
      { label: "스토리의 구성과 전개를 분석한다", score: 3 },
      { label: "인물들의 감정에 이입되어 눈물을 흘린다", score: 2 },
      { label: "와, 예쁘다! 멋지다! 배경에 감탄한다", score: 1 },
    ]
  },
  {
    id: 13,
    text: "내 방에 혼자 있을 때 나는?",
    options: [
      { label: "내일의 계획을 세우거나 공부를 한다", score: 4 },
      { label: "취미 활동을 하며 시간을 보낸다", score: 3 },
      { label: "침대에 누워 멍하니 천장을 본다", score: 2 },
      { label: "끊임없이 상상의 나래를 펼친다", score: 1 },
    ]
  },
  {
    id: 14,
    text: "남들이 나를 어떻게 생각하는지가 중요할 때?",
    options: [
      { label: "능력 있고 성실한 사람으로 보이고 싶다", score: 4 },
      { label: "예의 바르고 배려심 넘치는 사람이고 싶다", score: 3 },
      { label: "독특하고 개성 넘치는 사람이고 싶다", score: 2 },
      { label: "별생각 없다, 나만 즐거우면 된다", score: 1 },
    ]
  },
  {
    id: 15,
    text: "갑자기 돈이 생겼다면 당신의 행동은?",
    options: [
      { label: "미래를 위해 저축하거나 투자한다", score: 4 },
      { label: "가족이나 지인에게 맛있는 걸 사준다", score: 3 },
      { label: "평소 사고 싶었던 걸 지른다", score: 2 },
      { label: "여행 계획을 짜고 바로 떠난다", score: 1 },
    ]
  }
];

const PERSONAS: Persona[] = [
  { id: 1, mbti: "INTJ-A", name: "우주급 브레인 외계인", emoji: "👽", color: "#E1F5FE", borderColor: "#2980b9", factBombs: ["지구 정복 계획 중", "감정은 데이터일 뿐", "혼자가 제일 편함", "극강의 효율 추구"], description: "당신은 범접할 수 없는 지능을 가진 전략가! 세상을 데이터로 분석하는 냉철한 외계인입니다." },
  { id: 2, mbti: "ISTJ", name: "청렴결백 법전 거북이", emoji: "🐢", color: "#F5F5F5", borderColor: "#2d3436", factBombs: ["원칙 없인 못 살아", "알람 10개 필수", "정리정돈의 달인", "느리지만 정확함"], description: "당신은 한 치의 오차도 허용하지 않는 완벽주의자! 성실함으로 세상을 지탱하는 거북이입니다." },
  { id: 3, mbti: "INFJ", name: "신비로운 유니콘", emoji: "🦄", color: "#F3E5F5", borderColor: "#9b59b6", factBombs: ["속 깊은 몽상가", "사람 마음 꿰뚫음", "나만의 세계 뚜렷", "조용한 카리스마"], description: "당신은 신비로운 통찰력을 가진 선지자! 따뜻한 마음으로 세상을 아름답게 보는 유니콘입니다." },
  { id: 4, mbti: "INTJ", name: "전략가 검은 고양이", emoji: "🐈‍⬛", color: "#ECEFF1", borderColor: "#34495e", factBombs: ["계획대로 되고 있어", "멍청함은 죄다", "독립심 우주 돌파", "시니컬한 매력"], description: "당신은 모든 것을 꿰뚫어 보는 지략가! 날카로운 분석력으로 정답만 찾아내는 고양이입니다." },
  { id: 5, mbti: "ISFJ", name: "다정한 수호천사", emoji: "😇", color: "#FFFDE7", borderColor: "#f1c40f", factBombs: ["기억력 만렙", "남 몰래 배려하기", "성실한 거부기", "예의 바른 생활"], description: "당신은 주변을 따뜻하게 지켜주는 수호자! 섬세한 배려로 모두의 마음을 녹여줍니다." },
  { id: 6, mbti: "ISTP", name: "쿨한 해결사 고양이", emoji: "🐈", color: "#EFEBE9", borderColor: "#795548", factBombs: ["말보다 행동", "기계 조작 달인", "귀차니즘의 대가", "위기 탈출 1등"], description: "당신은 자유로운 영혼의 실전파! 어떤 문제든 쿨하게 해결해버리는 매력적인 고양이입니다." },
  { id: 7, mbti: "ISFP", name: "감성 충만 나비", emoji: "🦋", color: "#FCE4EC", borderColor: "#e91e63", factBombs: ["현재가 제일 중요", "아름다움 덕후", "갈등은 피하고 싶어", "유리 멘탈 주의"], description: "당신은 삶을 예술처럼 사는 낭만가! 자유롭고 따뜻한 감성으로 세상을 수놓는 나비입니다." },
  { id: 8, mbti: "INFP", name: "꿈꾸는 아기 토끼", emoji: "🐰", color: "#E1F5FE", borderColor: "#3498db", factBombs: ["상상력 대폭발", "혼자서도 잘 놀아요", "마음이 너무 여림", "금방 사랑에 빠짐"], description: "당신은 마음속에 거대한 우주를 품은 몽상가! 순수한 마음으로 세상을 꿈꾸는 토끼입니다." },
  { id: 9, mbti: "INTP", name: "아이디어 뱅크 다람쥐", emoji: "🐿️", color: "#FFEBEE", borderColor: "#e74c3c", factBombs: ["왜?라고 묻기", "지적 호기심 폭발", "도토리 대신 지식", "논리 왕국 건설"], description: "당신은 끊임없이 질문을 던지는 지식 탐구자! 새로운 생각으로 가득 찬 똑똑한 다람쥐입니다." },
  { id: 10, mbti: "ESTP", name: "액티브 액션 사자", emoji: "🦁", color: "#FFF3E0", borderColor: "#e67e22", factBombs: ["일단 지르고 봄", "에너지 과부하", "말솜씨 화려함", "인생은 스릴"], description: "당신은 두려움 없는 도전가! 넘치는 에너지로 어디서든 주인공이 되는 용맹한 사자입니다." },
  { id: 11, mbti: "ESFP", name: "슈퍼스타 댕댕이", emoji: "🐶", color: "#FFF9C4", borderColor: "#f39c12", factBombs: ["흥이 넘침", "주목받는 게 인생의 낙", "리액션 혜자", "지금 이 순간 즐겨"], description: "당신은 인생이 축제인 타고난 연예인! 밝은 미소로 세상을 환하게 비추는 댕댕이입니다." },
  { id: 12, mbti: "ENFP", name: "호기심 많은 여우", emoji: "🦊", color: "#E8F5E9", borderColor: "#2ecc71", factBombs: ["사람이 제일 좋아", "아이디어 화수분", "금방 질림 주의", "긍정 파워 만렙"], description: "당신은 반짝이는 아이디어로 가득 찬 행복 전도사! 사람들에게 큰 즐거움을 주는 여우입니다." },
  { id: 13, mbti: "ENTP", name: "기발한 악동 원숭이", emoji: "🐒", color: "#E0F2F1", borderColor: "#1abc9c", factBombs: ["말싸움 1등", "기존 방식 거부", "토론이 제일 재밌음", "천재 혹은 변태"], description: "당신은 고정관념을 깨부수는 혁신가! 기발한 생각으로 늘 새로운 즐거움을 찾는 원숭이입니다." },
  { id: 14, mbti: "ESTJ", name: "엄격한 관리자 호랑이", emoji: "🐯", color: "#ECEFF1", borderColor: "#2c3e50", factBombs: ["결과 중심주의", "질서와 법 중시", "강한 책임감", "리더십 발휘"], description: "당신은 사회를 지탱하는 든든한 기둥! 확실한 목표와 규율로 성과를 만들어내는 호랑이입니다." },
  { id: 15, mbti: "ESFJ", name: "사교적인 꽃사슴", emoji: "🦌", color: "#FFFDE7", borderColor: "#fdcb6e", factBombs: ["분위기 파악 1등", "남 챙기기 진심", "공감 능력 최고", "예의 바른 생활"], description: "당신은 사람들을 끈끈하게 연결하는 외교관! 따뜻한 공감으로 평화를 만드는 사슴입니다." },
  { id: 16, mbti: "ENFJ", name: "정의로운 햇살 곰", emoji: "🐻", color: "#FFF3E0", borderColor: "#e67e22", factBombs: ["선한 영향력", "동기부여의 달인", "리더십 끝판왕", "이상적인 세상 추구"], description: "당신은 타인의 성장을 돕는 위대한 스승! 따뜻한 카리스마로 사람들을 이끄는 곰입니다." },
  { id: 17, mbti: "ENTJ", name: "정복자 독수리", emoji: "🦅", color: "#FFEBEE", borderColor: "#c0392b", factBombs: ["강력한 추진력", "장기적 비전", "자신감 뿜뿜", "성과가 전부"], description: "당신은 목표를 향해 진격하는 리더! 압도적인 추진력으로 승리를 쟁취하는 독수리입니다." },
  { id: 18, mbti: "INFP-T", name: "무지개빛 힐러 천사", emoji: "👼", color: "#FCE4EC", borderColor: "#ff7675", factBombs: ["모두를 치유함", "순수함 100%", "상처 잘 받음", "세상의 빛"], description: "당신은 지친 이들의 마음을 어루만지는 천사! 따뜻한 영혼으로 세상을 구원합니다." },
  { id: 19, mbti: "ESTP-T", name: "에너지 엔진 로봇", emoji: "🤖", color: "#EFEBE9", borderColor: "#95a5a6", factBombs: ["지치지 않는 체력", "논리적 행동파", "새로운 거 환장", "스피드 광"], description: "당신은 지치지 않는 열정을 가진 로봇! 엄청난 속도로 목표를 향해 달려갑니다." },
  { id: 20, mbti: "ENFP-T", name: "무지개 파티 피플", emoji: "🌈", color: "#FFF9C4", borderColor: "#8e44ad", factBombs: ["매일매일 축제", "우주급 텐션", "모두가 내 친구", "흥 대폭발"], description: "당신은 존재만으로도 주변을 축제로 만드는 주인공! 우주 최강의 흥을 가졌습니다." }
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
      // Map score (15 to 60) to 20 results (0 to 19 index)
      const finalScore = nextScore;
      // Formula: (score - minScore) / (maxScore - minScore) * (numResults - 1)
      let index = Math.floor(((finalScore - 15) / 45) * 20);
      if (index < 0) index = 0;
      if (index > 19) index = 19;
      
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
