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
  name: string;
  mbtiTag: string;
  emoji: string;
  color: string;
  subColor: string;
  factBombs: string[];
  description: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "주말 아침, 눈을 떴을 때 당신의 첫 생각은?",
    options: [
      { label: "오늘은 누구를 만나서 에너지를 채워볼까?", score: 4 },
      { label: "밀린 연락들에 답장부터 해야지!", score: 3 },
      { label: "조금 더 누워있다가 집안일을 해볼까?", score: 2 },
      { label: "오늘 하루는 온전히 나만의 시간이야!", score: 1 },
    ]
  },
  {
    id: 2,
    text: "새로운 사람들과의 모임에 참여하게 되었다면?",
    options: [
      { label: "내가 먼저 말을 걸며 분위기를 주도한다", score: 4 },
      { label: "어색함을 깨기 위해 적당히 노력한다", score: 3 },
      { label: "누가 말을 걸어줄 때까지 기다린다", score: 2 },
      { label: "최대한 조용히 구석에서 관찰한다", score: 1 },
    ]
  },
  {
    id: 3,
    text: "여행 계획을 세울 때 당신의 스타일은?",
    options: [
      { label: "분 단위로 동선을 짜는 완벽주의자", score: 4 },
      { label: "가고 싶은 곳 몇 군데만 정해두는 타입", score: 3 },
      { label: "숙소만 정하고 나머지는 가서 생각한다", score: 2 },
      { label: "비행기 표만 끊고 떠나는 즉흥 여행가", score: 1 },
    ]
  },
  {
    id: 4,
    text: "친구가 속상한 일을 털어놓을 때 나의 반응은?",
    options: [
      { label: "현실적인 해결책부터 제시해준다", score: 4 },
      { label: "원인을 분석하며 상황을 판단해준다", score: 3 },
      { label: "진심으로 공감하며 같이 속상해한다", score: 2 },
      { label: "말없이 끝까지 들어주며 위로해준다", score: 1 },
    ]
  },
  {
    id: 5,
    text: "갑자기 예정에 없던 약속이 잡혔을 때?",
    options: [
      { label: "오히려 좋아! 즐겁게 나갈 준비를 한다", score: 1 },
      { label: "살짝 당황스럽지만 일단 맞춰본다", score: 2 },
      { label: "내 계획이 틀어져서 조금 스트레스 받는다", score: 3 },
      { label: "거절할 핑계를 필사적으로 생각한다", score: 4 },
    ]
  },
  {
    id: 6,
    text: "내가 꿈꾸는 나의 미래 모습은?",
    options: [
      { label: "현실적이고 안정적인 삶을 사는 사람", score: 4 },
      { label: "내 분야에서 최고의 능력을 인정받는 사람", score: 3 },
      { label: "자유롭고 창의적인 일을 마음껏 하는 사람", score: 2 },
      { label: "세상을 더 따뜻하게 만드는 선한 영향력", score: 1 },
    ]
  },
  {
    id: 7,
    text: "방 정리 정돈 상태는 어떤가요?",
    options: [
      { label: "모든 물건이 정해진 자리에 있어야 한다", score: 4 },
      { label: "가끔 어질러지지만 자주 치우는 편이다", score: 3 },
      { label: "한꺼번에 몰아서 대청소하는 스타일", score: 2 },
      { label: "어디에 뭐가 있는지 나만 알면 된다", score: 1 },
    ]
  },
  {
    id: 8,
    text: "어려운 과제가 주어졌을 때 당신의 행동은?",
    options: [
      { label: "체계적으로 순서를 정해 바로 시작한다", score: 4 },
      { label: "관련 정보를 충분히 수집한 뒤 시작한다", score: 3 },
      { label: "일단 부딪히면서 해결 방법을 찾는다", score: 2 },
      { label: "미룰 수 있을 때까지 미루다 시작한다", score: 1 },
    ]
  },
  {
    id: 9,
    text: "영화를 보고 난 뒤, 당신의 감상은?",
    options: [
      { label: "영화의 설정과 개연성을 논리적으로 분석한다", score: 4 },
      { label: "명대사나 인상 깊은 장면을 계속 되새긴다", score: 3 },
      { label: "주인공의 감정에 이입되어 한참을 여운에 젖는다", score: 2 },
      { label: "그냥 재미있었다고 생각하고 바로 잊는다", score: 1 },
    ]
  },
  {
    id: 10,
    text: "누군가 당신의 의견에 반대한다면?",
    options: [
      { label: "끝까지 논리적으로 설득하려 노력한다", score: 4 },
      { label: "상대방의 의견이 타당한지 객관적으로 검토한다", score: 3 },
      { label: "갈등을 피하기 위해 적당히 동조한다", score: 2 },
      { label: "기분이 상해서 속으로 삭인다", score: 1 },
    ]
  },
  {
    id: 11,
    text: "자기 전, 침대에서 당신은 어떤 생각을 하나요?",
    options: [
      { label: "내일 할 일들을 머릿속으로 정리한다", score: 4 },
      { label: "오늘 하루 동안 있었던 일들을 복기한다", score: 3 },
      { label: "말도 안 되는 엉뚱한 상상의 나래를 펼친다", score: 2 },
      { label: "아무 생각 없이 바로 잠든다", score: 1 },
    ]
  },
  {
    id: 12,
    text: "약속 장소에 늦는 친구를 보았을 때?",
    options: [
      { label: "얼마나 늦을지 정확히 확인하고 다음 계획을 짠다", score: 4 },
      { label: "왜 늦었는지 이유를 묻고 이해하려 노력한다", score: 3 },
      { label: "기다리면서 혼자 딴짓을 하며 시간을 보낸다", score: 2 },
      { label: "나도 가끔 늦으니까 별로 신경 쓰지 않는다", score: 1 },
    ]
  },
  {
    id: 13,
    text: "쇼핑을 할 때 당신의 스타일은?",
    options: [
      { label: "필요한 리스트를 미리 적어보고 그것만 산다", score: 4 },
      { label: "가격과 가성비를 꼼꼼히 따져보고 결정한다", score: 3 },
      { label: "마음에 드는 게 있으면 즉흥적으로 구매한다", score: 2 },
      { label: "점원이 추천해주는 대로 대충 산다", score: 1 },
    ]
  },
  {
    id: 14,
    text: "칭찬을 들었을 때 가장 기분 좋은 말은?",
    options: [
      { label: "와, 정말 똑똑하고 능력 있으시네요!", score: 4 },
      { label: "항상 성실하고 믿음직스러워요!", score: 3 },
      { label: "마음이 정말 따뜻하고 착하시네요!", score: 2 },
      { label: "정말 독특하고 개성이 넘치시네요!", score: 1 },
    ]
  },
  {
    id: 15,
    text: "단순 반복적인 일을 해야 한다면?",
    options: [
      { label: "정해진 매뉴얼대로 묵묵히 해치운다", score: 4 },
      { label: "어떻게 하면 더 효율적으로 할지 고민한다", score: 3 },
      { label: "음악을 듣거나 딴생각을 하며 지루함을 달랜다", score: 2 },
      { label: "금방 실증이 나서 자꾸 다른 짓을 한다", score: 1 },
    ]
  }
];

const PERSONAS: Persona[] = [
  { id: 1, name: "우주 최강 집순이", mbtiTag: "ISFP", emoji: "🏠", color: "#FFFDE7", subColor: "#FFF176", factBombs: ["침대가 제2의 심장", "연락은 용건만 간단히", "나가기까지 3박 4일 고민", "집에서 제일 바쁨"], description: "당신은 평화로운 자신의 공간에서 행복을 느끼는 진정한 휴식 장인입니다!" },
  { id: 2, name: "걸어다니는 계획표", mbtiTag: "ISTJ", emoji: "📅", color: "#F5F5F5", subColor: "#E0E0E0", factBombs: ["알람 없으면 불안함", "정리정돈의 신", "예측 가능한게 좋아", "칼퇴가 인생의 목표"], description: "철저한 규칙과 성실함으로 세상을 살아가는 든든한 원칙주의자입니다!" },
  { id: 3, name: "아이디어 뱅크 고래", mbtiTag: "INFP", emoji: "🐳", color: "#E3F2FD", subColor: "#BBDEFB", factBombs: ["상상력 대폭발", "혼자만의 세계 뚜렷", "금방 사랑에 빠짐", "감수성 끝판왕"], description: "남들이 보지 못하는 세상을 꿈꾸며 따뜻한 마음을 가진 몽상가입니다!" },
  { id: 4, name: "열정 만수르 햇님", mbtiTag: "ENFJ", emoji: "☀️", color: "#FFF3E0", subColor: "#FFE0B2", factBombs: ["모임의 중심", "리액션 혜자", "남 도와주다 하루 다 감", "오지랖도 사랑"], description: "주변에 밝은 에너지를 전파하며 모두를 이끄는 따뜻한 리더입니다!" },
  { id: 5, name: "냉철한 얼음 송곳", mbtiTag: "INTJ", emoji: "🧊", color: "#F3E5F5", subColor: "#E1BEE7", factBombs: ["감정보다 논리", "팩폭 제조기", "비효율은 용납 못함", "혼자가 제일 똑똑"], description: "날카로운 분석력으로 복잡한 문제를 해결하는 최고의 전략가입니다!" },
  { id: 6, name: "자유로운 영혼 구름", mbtiTag: "ENFP", emoji: "☁️", color: "#E8F5E9", subColor: "#C8E6C9", factBombs: ["호기심 천국", "금방 질림 주의", "친구가 우주급으로 많음", "세상이 다 신기함"], description: "반짝이는 아이디어와 긍정 에너지로 즐거움을 찾는 분위기 메이커입니다!" },
  { id: 7, name: "꼼꼼한 돋보기", mbtiTag: "ISFJ", emoji: "🔍", color: "#FFFDE7", subColor: "#FFF9C4", factBombs: ["기억력 만렙", "남 챙기기 1등", "안 보이는 곳까지 청소", "소심한 배려왕"], description: "세심한 관찰력으로 주변 사람들을 조용히 챙겨주는 마음 따뜻한 수호자입니다!" },
  { id: 8, name: "직진하는 불도저", mbtiTag: "ENTJ", emoji: "🚜", color: "#FFEBEE", subColor: "#FFCDD2", factBombs: ["일단 지르고 봄", "시간은 금이다", "경쟁에서 져본 적 없음", "결과로 승부함"], description: "강력한 추진력으로 목표를 향해 거침없이 나아가는 승부사입니다!" },
  { id: 9, name: "여유만만 나무늘보", mbtiTag: "INTP", emoji: "🦥", color: "#EFEBE9", subColor: "#D7CCC8", factBombs: ["세월아 네월아", "말수가 적지만 촌철살인", "귀차니즘의 대가", "생각은 우주급"], description: "느긋해 보이지만 머릿속은 끊임없이 가동되는 지적인 분석가입니다!" },
  { id: 10, name: "흥 넘치는 파티피플", mbtiTag: "ESFP", emoji: "💃", color: "#FFF9C4", subColor: "#FFF176", factBombs: ["주목받는 게 인생의 낙", "지금 이 순간이 중요", "쇼핑은 나의 힘", "리액션 부자"], description: "어디서나 존재감을 발휘하며 주변을 즐겁게 만드는 타고난 연예인입니다!" },
  { id: 11, name: "정의로운 보안관", mbtiTag: "ESTJ", emoji: "🤠", color: "#ECEFF1", subColor: "#CFD8DC", factBombs: ["법 없이도 살 사람", "규칙은 지키라고 있는 것", "강강약약", "일 처리는 칼같이"], description: "확고한 신념과 책임감으로 사회의 질서를 유지하는 든든한 관리자입니다!" },
  { id: 12, name: "다정한 솜사탕", mbtiTag: "ESFJ", emoji: "🍭", color: "#FCE4EC", subColor: "#F8BBD0", factBombs: ["모든 소문은 나에게로", "기념일 절대 안 잊음", "함께 먹어야 맛있음", "사랑 갈구형"], description: "풍부한 공감 능력으로 조화로운 인간관계를 만들어가는 친절한 외교관입니다!" },
  { id: 13, name: "호기심 많은 원숭이", mbtiTag: "ENTP", emoji: "🐒", color: "#E0F2F1", subColor: "#B2DFDB", factBombs: ["말싸움 1등", "기존 방식 거부", "토론이 제일 재밌음", "천재 혹은 변태"], description: "고정관념을 깨는 기발한 생각으로 늘 새로운 자극을 찾는 아이디어 맨입니다!" },
  { id: 14, name: "단단한 바위 산", mbtiTag: "ISTP", emoji: "⛰️", color: "#E1F5FE", subColor: "#B3E5FC", factBombs: ["이론보다는 실전", "기계 잘 고침", "말보다 몸이 먼저", "쿨함의 결정체"], description: "적은 말수로 강렬한 존재감을 드러내는 실용적인 해결사입니다!" },
  { id: 15, name: "조용한 카리스마", mbtiTag: "INFJ", emoji: "🎭", color: "#F3E5F5", subColor: "#E1BEE7", factBombs: ["속을 알 수 없음", "완벽주의적 배려", "혼자서 생각 많음", "직관이 무서움"], description: "깊은 통찰력과 신념을 바탕으로 묵묵히 자신의 길을 가는 선지자형입니다!" },
  { id: 16, name: "에너지 뿜뿜 챌린저", mbtiTag: "ESTP", emoji: "🏃", color: "#FFF3E0", subColor: "#FFE0B2", factBombs: ["운동은 내 운명", "말주변이 화려함", "위기에 강함", "즉흥적인 즐거움"], description: "두려움 없이 새로운 것에 도전하는 활동적인 모험가입니다!" },
  { id: 17, name: "침착한 관찰자 고양이", mbtiTag: "INTJ-T", emoji: "🐈", color: "#ECEFF1", subColor: "#CFD8DC", factBombs: ["예리한 눈썰미", "사회적 가면 필수", "지식 습득이 취미", "감정은 사치"], description: "한 발짝 물러나 세상을 분석하고 자신만의 정답을 찾아내는 똑똑한 고양이입니다!" },
  { id: 18, name: "반짝이는 별 꽃", mbtiTag: "INFP-T", emoji: "🌸", color: "#FCE4EC", subColor: "#F8BBD0", factBombs: ["작은 것에도 감동", "일기 쓰기가 취미", "예술적 감각", "마음이 유리구슬"], description: "아름다운 것을 사랑하고 내면의 목소리에 귀를 기울이는 감성적인 꽃입니다!" },
  { id: 19, name: "웃음 제조기 판다", mbtiTag: "ENFP-A", emoji: "🐼", color: "#F5F5F5", subColor: "#E0E0E0", factBombs: ["귀여움이 무기", "어딜가나 환영받음", "단순한게 최고", "금방 까먹음"], description: "당신의 존재 자체가 주변 사람들에게 큰 위로와 웃음이 되는 행복한 판다입니다!" },
  { id: 20, name: "스마트한 여우", mbtiTag: "ENTP-T", emoji: "🦊", color: "#FFEBEE", subColor: "#FFCDD2", factBombs: ["눈치가 엄청 빠름", "재치 있는 유머", "임기응변 달인", "사람 잘 꼬심"], description: "비상한 두뇌와 매력으로 어떤 상황도 유연하게 넘기는 영리한 여우입니다!" }
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
      let index = Math.floor(((finalScore - 15) / 46) * 20);
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
            <div className="sticker-container" style={{ '--sticker-color': result.color } as any}>
              <div className="sticker-body">
                <p className="user-greeting"><span>{userName}</span>님의 성격 스티커</p>
                <div className="sticker-main">
                  <span className="sticker-emoji">{result.emoji}</span>
                  <h2 className="sticker-name">{result.name}</h2>
                  <div className="sticker-mbti">{result.mbtiTag}</div>
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
