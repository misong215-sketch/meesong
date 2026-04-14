import { useState, useRef, useEffect } from 'react'
import './App.css'

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

interface Persona {
  color: string;
  hex: string;
  title: string;
  description: string;
  exercise: string;
  diet: string;
}

interface LogEntry {
  type: 'food' | 'exercise' | 'trainer';
  text: string;
  timestamp: Date;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "평소 하루 활동량은 어느 정도인가요?",
    options: [
      { label: "거의 움직이지 않아요 (사무직 등)", score: 1 },
      { label: "가벼운 산책 정도는 해요", score: 2 },
      { label: "매일 꾸준히 운동을 해요", score: 3 },
      { label: "육체적인 활동이 매우 많아요", score: 4 },
    ]
  },
  {
    id: 2,
    text: "평소 식습관은 어떤가요?",
    options: [
      { label: "규칙적이고 건강하게 먹어요", score: 1 },
      { label: "배달 음식이나 외식이 잦아요", score: 2 },
      { label: "스트레스를 먹는 것으로 풀어요", score: 3 },
      { label: "식사 시간이 매우 불규칙해요", score: 4 },
    ]
  },
  {
    id: 3,
    text: "평균 수면 시간은 얼마나 되나요?",
    options: [
      { label: "8시간 이상 푹 자요", score: 1 },
      { label: "6-7시간 정도 적당히 자요", score: 2 },
      { label: "5시간 미만으로 늘 부족해요", score: 3 },
      { label: "수면의 질이 매우 낮아요", score: 4 },
    ]
  },
  {
    id: 4,
    text: "현재 느끼는 스트레스 지수는?",
    options: [
      { label: "거의 없어요, 평온해요", score: 1 },
      { label: "가끔 받지만 관리 가능해요", score: 2 },
      { label: "꽤 높아서 피로감을 느껴요", score: 3 },
      { label: "매우 높아서 일상이 힘들어요", score: 4 },
    ]
  }
];

const PERSONAS: Record<number, Persona> = {
  1: {
    color: "에너제틱 오렌지",
    hex: "#ff7e5f",
    title: "활동적인 에너지 메이커!",
    description: "높은 활동량을 가진 당신은 더 효율적인 회복과 폭발적인 에너지가 필요합니다.",
    exercise: "고강도 인터벌 트레이닝(HIIT) & 러닝",
    diet: "고단백 식단 + 충분한 수분 섭취"
  },
  2: {
    color: "캄 블루",
    hex: "#4facfe",
    title: "차분하고 꾸준한 페이스 메이커!",
    description: "정적인 라이프스타일의 당신에게는 유연함과 부드러운 순환이 필요합니다.",
    exercise: "요가 & 필라테스 & 가벼운 산책",
    diet: "지중해식 식단 (신선한 채소와 올리브유)"
  },
  3: {
    color: "밸런스 그린",
    hex: "#43e97b",
    title: "균형 잡힌 라이프 밸런서!",
    description: "적당한 활동과 휴식을 즐기는 당신, 현재의 균형을 유지하는 것이 핵심입니다.",
    exercise: "주 3회 웨이트 트레이닝 & 배드민턴",
    diet: "탄수화물, 단백질, 지방의 황금 비율 식단"
  },
  4: {
    color: "리질리언트 레드",
    hex: "#f093fb",
    title: "회복이 필요한 열정가!",
    description: "스트레스가 높고 휴식이 부족한 당신, 가장 먼저 필요한 것은 몸의 회복입니다.",
    exercise: "스트레칭 & 명상 & 수영",
    diet: "항산화 식품 (베리류, 견과류) 중심의 식단"
  }
};

const CHEAT_KEYWORDS = ['피자', '치킨', '햄버거', '떡볶이', '마라탕', '술', '야식', '디저트', '케이크', '도넛', '콜라', '라면', '튀김', '삼겹살'];
const EXERCISE_KEYWORDS = ['달리기', '러닝', '조깅', '스쿼트', '팔굽혀펴기', '수영', '요가', '필라테스', '헬스', '걷기', '등산', '배드민턴', '줄넘기', '홈트', '운동완료'];

const FACT_BOMBS = [
  "지금 그게 입으로 들어가요? 당신의 복근이 오열하고 있어요! 😭",
  "피자 한 조각에 런닝머신 30분... 감당할 수 있겠어요? 🍕🔥",
  "오늘만 날이 아니에요. 내일의 당신이 오늘의 당신을 원망할 겁니다! 😤",
  "다이어트는 내일부터? 그럼 내일의 몸매도 내일부터 시작되겠네요? 🙃",
  "그 칼로리, 지금 당장 나가서 다 태우고 올 자신 있죠? 🏃‍♂️🏃‍♀️",
  "거울 속의 당신과 눈을 마주치고 다시 말해봐요. 그게 진짜 배고픈 건지! 🤨",
  "지방들이 지금 자기들끼리 파티 중이래요. 축하드려요, 파티 장소는 당신의 뱃살입니다! 🎉",
  "맛있게 먹으면 0칼로리? 그건 누가 만든 헛소문일까요? 제 눈엔 지방만 보이는데요? 🧐",
  "입은 즐겁지만 배꼽은 울고 있습니다. 정신 차리세요! 뱃살이 '어서 와'라고 인사하잖아요. 🌊",
  "지금 먹은 그 한 입, 버피 테스트 100개로 갚으실 거죠? 제가 다 지켜보고 있습니다. 😈",
  "칼로리는 거짓말을 하지 않아요. 당신의 몸이 정직하게 증명할 겁니다. 무섭지 않나요? 📉",
  "그거 한 입 먹는다고 행복해지나요? 거울 보는 게 더 행복할 텐데... 선택은 당신의 몫! 🤳"
];

const PRAISES = [
  "세상에! 올림픽 나가는 줄 알았잖아요! 당신의 열정에 치어스... ⭐",
  "오늘 운동량 실화인가요? 근육들이 지금 축제를 벌이고 있어요! 💃🕺",
  "완벽합니다! 이 기세라면 한 달 뒤엔 완전 딴사람이 되어 있겠는데요? 🏆",
  "와... 진짜 독종이시네요! (칭찬입니다) 당신의 끈기에 경의를 표합니다! 👏",
  "지구력이 대단해요! 오늘 당신이 흘린 땀은 배신하지 않을 거예요! 💦✨",
  "와우! 갓벽 그 자체! 오늘 하루는 당신이 승리자입니다! 🥇",
  "지구가 흔들렸어요! 당신의 스쿼트 때문에요! 진정한 대지의 신이신가요? 🌍💪",
  "와... 이 정도면 넷플릭스 '피지컬:100' 다음 시즌 나가셔야겠는데요? 섭외 들어오겠어요! 📺🔥",
  "근육들이 당신을 찬양하고 있습니다. 진정한 '근수저'의 탄생인가요? 경이롭습니다! 🛐",
  "땀방울 하나하나가 다이아몬드보다 빛납니다. 당신은 움직이는 보석이에요! 💎✨",
  "지치지 않는 에너자이저! 당신의 열정에 제 배터리까지 완충되었습니다! 🔋⚡",
  "오늘의 고통은 내일의 복근이 됩니다. 당신은 이미 자신과의 싸움에서 이겼어요! 🤺👑"
];

function App() {
  const [mode, setMode] = useState<'diagnosis' | 'trainer'>('diagnosis');
  const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // Trainer States
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [userInput, setUserInput] = useState('');
  const [challengeDay, setChallengeDay] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

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
      setStep('result');
    }
  };

  const getResultPersona = () => {
    const avgScore = totalScore / QUESTIONS.length;
    if (avgScore <= 1.5) return PERSONAS[2];
    if (avgScore <= 2.5) return PERSONAS[3];
    if (avgScore <= 3.5) return PERSONAS[1];
    return PERSONAS[4];
  };

  const persona = getResultPersona();

  // Trainer Methods
  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const isExercise = EXERCISE_KEYWORDS.some(kw => userInput.includes(kw));
    const isCheat = CHEAT_KEYWORDS.some(kw => userInput.includes(kw));
    
    const newLogs: LogEntry[] = [
      ...logs,
      { type: isExercise ? 'exercise' : 'food', text: userInput, timestamp: new Date() }
    ];

    let trainerMsg = "";
    if (isExercise) {
      trainerMsg = PRAISES[Math.floor(Math.random() * PRAISES.length)];
    } else if (isCheat) {
      trainerMsg = FACT_BOMBS[Math.floor(Math.random() * FACT_BOMBS.length)];
    } else {
      trainerMsg = "기록 완료! 내일도 꾸준히 해봐요. 지켜보고 있습니다... 👀";
    }

    newLogs.push({ type: 'trainer', text: trainerMsg, timestamp: new Date() });
    
    setLogs(newLogs);
    setUserInput('');
    if (isExercise) setChallengeDay(prev => Math.min(prev + 1, 30));
  };

  return (
    <div className="app">
      <nav className="mode-nav">
        <button 
          className={mode === 'diagnosis' ? 'active' : ''} 
          onClick={() => setMode('diagnosis')}
        >
          루틴 진단
        </button>
        <button 
          className={mode === 'trainer' ? 'active' : ''} 
          onClick={() => {
            setMode('trainer');
            if (logs.length === 0) {
              setLogs([{ type: 'trainer', text: "반가워요! 당신의 '팩폭' 트레이너입니다. 오늘 뭐 먹었는지, 운동은 했는지 솔직하게 불어봐요! 😏", timestamp: new Date() }]);
            }
          }}
        >
          AI 트레이너
        </button>
      </nav>

      <main className={mode === 'diagnosis' ? 'mode-content' : 'trainer-view'}>
        {mode === 'diagnosis' ? (
          <>
            {step === 'landing' && (
              <div className="landing-view">
                <div className="hero-content">
                  <span className="badge">AI 맞춤형 진단</span>
                  <h1>나만의 퍼스널 <br /><span>'핏(Fit) & 다이어트'</span> 루틴</h1>
                  <p>단순한 수치를 넘어 당신의 라이프스타일을 진단합니다.</p>
                  <button className="btn-start" onClick={startQuiz}>진단 시작하기 &rarr;</button>
                </div>
              </div>
            )}

            {step === 'quiz' && (
              <div className="quiz-view">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
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

            {step === 'result' && (
              <div className="result-view" style={{ '--result-color': persona.hex } as any}>
                <div className="result-card">
                  <header className="result-header">
                    <p>당신의 다이어트 컬러는</p>
                    <h2 className="color-name">[{persona.color}]</h2>
                    <h3>{persona.title}</h3>
                  </header>
                  
                  <div className="result-content">
                    <div className="desc-box">
                      <p>{persona.description}</p>
                    </div>

                    <div className="recommendation">
                      <div className="rec-item">
                        <span className="icon">🏋️‍♂️</span>
                        <div className="rec-text">
                          <h4>추천 운동</h4>
                          <p>{persona.exercise}</p>
                        </div>
                      </div>
                      <div className="rec-item">
                        <span className="icon">🥗</span>
                        <div className="rec-text">
                          <h4>추천 식단</h4>
                          <p>{persona.diet}</p>
                        </div>
                      </div>
                    </div>

                    <div className="monthly-plan">
                      <h4>한 달 루틴 가이드</h4>
                      <ul>
                        <li>1-2주차: 체력 증진 및 식단 적응기</li>
                        <li>3-4주차: 고강도 루틴 및 습관 안착기</li>
                      </ul>
                    </div>
                  </div>

                  <button className="btn-retry" onClick={() => setStep('landing')}>다시 테스트하기</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="trainer-container">
            <header className="trainer-header">
              <div className="challenge-status">
                <span className="label">1달 챌린지</span>
                <div className="day-count">DAY {challengeDay} / 30</div>
                <div className="challenge-progress">
                  <div className="progress-fill" style={{ width: `${(challengeDay / 30) * 100}%` }}></div>
                </div>
              </div>
              <div className="trainer-profile">
                <div className="avatar">🕶️</div>
                <div className="info">
                  <h3>팩폭 트레이너</h3>
                  <span className="status">온라인 (지켜보는 중)</span>
                </div>
              </div>
            </header>

            <div className="chat-area" ref={scrollRef}>
              {logs.map((log, i) => (
                <div key={i} className={`message ${log.type}`}>
                  <div className="msg-bubble">
                    {log.type === 'trainer' && <span className="sender">Trainer</span>}
                    <p>{log.text}</p>
                    <span className="time">{log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>

            <form className="input-area" onSubmit={handleLogSubmit}>
              <input 
                type="text" 
                placeholder="오늘 뭐 먹었나요? 혹은 어떤 운동을 했나요?" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit" className="btn-send">기록</button>
            </form>

            <div className="quick-guide">
              <p>팁: '피자', '치킨'을 입력하면 팩폭이, '달리기', '운동완료'를 입력하면 칭찬이 쏟아집니다!</p>
            </div>
          </div>
        )}
      </main>

      {/* AddToAny BEGIN */}
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
      {/* AddToAny END */}
    </div>
  )
}

export default App
