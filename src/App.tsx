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
  { 
    id: 1, name: "이불 밖은 위험해! 프로 집순이", emoji: "🛋️", color: "#F5F5F5", borderColor: "#2d3436", 
    factBombs: ["침대가 제2의 심장", "연락은 용건만 간단히", "나가기까지 3박 4일 고민", "집에서 제일 바쁨", "배달 앱 VIP", "씻는 것도 미룸", "넷플릭스 고인물", "내적 댄스 장인", "택배 뜯기가 유일한 운동", "폰 무음 모드 필수", "약속 취소되면 속으로 환호", "충전기 줄이 내 생명줄", "이불 밖은 남극", "홈웨어 수집가", "혼잣말 만렙", "냉장고 파먹기 달인", "햇빛보다 형광등", "소파와 물아일체", "비 오는 날 창밖 구경", "주말 순삭 전문가"], 
    description: "혼자 있을 때 에너지가 폭발하는 당신! 사회적 가면을 벗고 이불 속에서 가장 자유로운 영혼이 됩니다." 
  },
  { 
    id: 2, name: "걸어다니는 구글 캘린더", emoji: "📅", color: "#E3F2FD", borderColor: "#1976D2", 
    factBombs: ["알람 없으면 불안함", "정리정돈의 신", "예측 가능한게 좋아", "칼퇴가 인생의 목표", "지각은 죄악", "메모장 중독", "체크리스트 변태", "효율성 극대화", "분 단위 스케줄링", "무계획은 공포", "영수증 꼬박꼬박", "칼각 잡기", "화이트보드 사랑", "변수 통제광", "엑셀이 편함", "예비 플랜 B 보유", "가계부 만렙", "물건 제자리에", "시간 엄수 빌런", "완벽주의 강박"], 
    description: "질서 정연한 삶을 사랑하는 당신! 당신의 철저한 계획 덕분에 세상이 무너지지 않고 돌아가고 있습니다." 
  },
  { 
    id: 3, name: "눈물 많은 갬성 고래", emoji: "🐳", color: "#E1F5FE", borderColor: "#03A9F4", 
    factBombs: ["상상력 대폭발", "혼자만의 세계 뚜렷", "금방 사랑에 빠짐", "감수성 끝판왕", "새벽 2시 갬성", "거절 못해서 고민", "프로 공감러", "애니메이션 덕후", "플레이리스트 진심", "편지 쓰는 거 좋아함", "영화 보고 일주일 생각", "꿈 일기 작성", "작은 것에도 감동", "비 오는 날 노래 추천", "일기장 소중히", "감성 카페 탐방", "속마음은 여림", "나만의 아지트", "시집 읽기", "새벽 감성 폭발"], 
    description: "남들이 보지 못하는 따뜻한 세상을 꿈꾸는 당신! 풍부한 감수성으로 주변 사람들의 마음을 치유하는 마법사입니다." 
  },
  { 
    id: 4, name: "열정 만수르 햇님", emoji: "☀️", color: "#FFF3E0", borderColor: "#FF9800", 
    factBombs: ["모임의 중심", "리액션 혜자", "남 도와주다 하루 다 감", "오지떖도 사랑", "분위기 메이커", "텐션 폭주족", "미워할 수 없는 푼수", "칭찬 갈구형", "오지떖 넓음", "리더십 과잉", "고민 상담 전문", "단톡방 활발", "리액션 봇", "긍정의 아이콘", "모르는 사람과 절친", "리액션 장인", "에너지 과다", "모두의 친구", "이벤트 제조기", "하이텐션 유지"], 
    description: "주변에 밝은 에너지를 전파하며 모두를 이끄는 따뜻한 리더! 당신이 없는 모임은 팥 없는 찐빵과 같죠." 
  },
  { 
    id: 5, name: "냉철한 얼음 송곳 전략가", emoji: "🧊", color: "#F3E5F5", borderColor: "#9C27B0", 
    factBombs: ["감정보다 논리", "팩폭 제조기", "비효율은 용납 못함", "혼자가 제일 똑똑", "T발 너 C야?", "질문 빌런", "냉소적인 유머", "팩트 체크 장인", "논리 오류 즉시 발견", "토론에서 이겨야 함", "오글거림 극혐", "비판적 사고", "개인주의 끝판왕", "설명충 기질", "데이터 중독", "무표정의 달인", "효율적 인간관계", "감수성 제로", "비합리적 행동 극혐", "목표 중심적"], 
    description: "날카로운 분석력으로 복잡한 문제를 해결하는 최고의 전략가! 때로는 차가워 보이지만 누구보다 정확한 답을 제시합니다." 
  },
  { 
    id: 6, name: "자유로운 영혼 무지개 구름", emoji: "☁️", color: "#E8F5E9", borderColor: "#4CAF50", 
    factBombs: ["호기심 천국", "금방 질림 주의", "친구가 우주급", "세상이 다 신기함", "즉흥 여행 마스터", "아이디어 화수분", "속박은 거부한다", "해맑은 광기", "새로운 거 환장", "흥부자", "추진력은 좋으나 마무리 부족", "옷 잘 입음", "유행 민감", "호불호 확실", "리액션 큼", "도전 정신", "모험가", "벼락치기 천재", "반전 매력", "우주 대스타"], 
    description: "반짝이는 아이디어와 긍정 에너지로 즐거움을 찾는 분위기 메이커! 당신의 삶은 매일이 새로운 모험입니다." 
  },
  { 
    id: 7, name: "세심한 관찰자 돋보기", emoji: "🔍", color: "#FFFDE7", borderColor: "#FBC02D", 
    factBombs: ["기억력 만렙", "남 챙기기 1등", "안 보이는 곳까지 청소", "소심한 배려왕", "뒤끝 조금 있음", "안정 제일주의", "리액션 봇", "은근히 관종", "관찰 카메라급 눈썰미", "소리 없이 강함", "수호천사 기질", "예의 바름", "갈등 싫어함", "칭찬에 약함", "조용한 열정", "소확행 추구", "메모 습관", "정리의 신", "현실적인 조언", "믿음직함"], 
    description: "세심한 관찰력으로 주변 사람들을 조용히 챙겨주는 마음 따뜻한 수호자! 당신의 배려에 모두가 감동합니다." 
  },
  { 
    id: 8, name: "직진하는 불도저 리더", emoji: "🚜", color: "#FFEBEE", borderColor: "#F44336", 
    factBombs: ["일단 지르고 봄", "시간은 금이다", "경쟁에서 져본 적 없음", "결과로 승부함", "추진력 탱크급", "결단력 장인", "리더십 과잉", "워커홀릭 유망주", "야망가", "완벽한 성과", "리더 자질", "자기 확신", "효율적 업무", "카리스마", "결과 주의자", "압도적 존재감", "계획은 실천을 위해", "지배적인 성향", "목표 달성 중독", "카리스마 뿜뿜"], 
    description: "강력한 추진력으로 목표를 향해 거침없이 나아가는 승부사! 당신이 결심하면 불가능이란 없습니다." 
  },
  { 
    id: 9, name: "여유만만 나무늘보 분석가", emoji: "🦥", color: "#EFEBE9", borderColor: "#795548", 
    factBombs: ["세월아 네월아", "촌철살인 유머", "귀차니즘 대가", "생각은 우주급", "마감 직전 초능력", "지식 습득이 취미", "논리 왕국 건설", "무념무상", "설명하기 귀찮음", "개인주의", "팩트 지향", "조용한 관찰자", "똑똑한 귀차니스트", "궁금한 것만 파기", "토론은 머릿속으로", "게으른 천재", "지적인 대화 선호", "감정 소모 싫어함", "엉뚱한 상상", "마이웨이"], 
    description: "느긋해 보이지만 머릿속은 끊임없이 가동되는 지적인 분석가! 엉뚱하지만 날카로운 통찰력으로 사람들을 놀라게 합니다." 
  },
  { 
    id: 10, name: "흥 넘치는 파티피플 댄서", emoji: "💃", color: "#FFF9C4", borderColor: "#FFEB3B", 
    factBombs: ["주목받는 게 인생의 낙", "지금 이 순간 중요", "쇼핑은 나의 힘", "리액션 부자", "인생은 욜로", "관종력 만렙", "긍정 파워 뿜뿜", "지루함은 죄악", "패션 피플", "선물 좋아함", "수다쟁이", "모임 없으면 병남", "리액션 장인", "분위기 살리기", "단순하게 살자", "흥 대폭발", "사진 찍기 고수", "쇼핑 중독", "사람 좋아", "축제의 주인공"], 
    description: "어디서나 존재감을 발휘하며 주변을 즐겁게 만드는 타고난 연예인! 당신과 함께라면 지루할 틈이 없죠." 
  },
  { 
    id: 11, name: "정의로운 보안관 곰", emoji: "🐻", color: "#ECEFF1", borderColor: "#607D8B", 
    factBombs: ["법 없이도 살 사람", "규칙은 생명", "강강약약", "일 처리는 칼같이", "꼰대 소리 가끔 들음", "책임감 무한대", "팩트 폭격기", "의리 빼면 시체", "리더십", "조직적", "전통 중시", "보수적", "성실함", "결과 중심", "계획적", "확실한 기준", "신뢰의 상징", "현실적 해결", "체계적 관리", "듬직함"], 
    description: "확고한 신념과 책임감으로 사회의 질서를 유지하는 든든한 기둥! 당신이 있어 우리 사회가 안전합니다." 
  },
  { 
    id: 12, name: "다정한 솜사탕 외교관", emoji: "🍭", color: "#FCE4EC", borderColor: "#F06292", 
    factBombs: ["모든 소문은 나에게로", "기념일 절대 안 잊음", "함께 먹어야 맛있음", "사랑 갈구형", "눈치가 너무 빠름", "거절이 제일 힘듦", "프로 수발러", "인맥 관리왕", "리액션 혜자", "조화로운 분위기", "챙겨주는 기쁨", "수다 마스터", "화합의 아이콘", "인정 욕구", "다정한 말투", "고민 상담소", "사람 관계 진심", "센스 만점", "외로움 잘 탐", "모두의 비타민"], 
    description: "풍부한 공감 능력으로 조화로운 인간관계를 만들어가는 친절한 외교관! 당신의 다정함은 최고의 무기입니다." 
  },
  { 
    id: 13, name: "호기심 많은 사고뭉치 원숭이", emoji: "🐒", color: "#E0F2F1", borderColor: "#26A69A", 
    factBombs: ["말싸움 1등", "기존 방식 거부", "토론이 제일 재밌음", "천재 혹은 변태", "말주변이 화려함", "도전 정신 과잉", "임기응변 달인", "뒷감당은 나중에", "아이디어 뱅크", "유머 감각", "새로운 자극", "고정관념 파괴", "다재다능", "위트 가득", "말꼬리 잡기", "흥미 위주", "논리적 반박", "다재다능", "잔머리 대왕", "개척자"], 
    description: "고정관념을 깨부수는 혁신가! 기발한 생각과 유머 감각으로 늘 새로운 즐거움을 창조합니다." 
  },
  { 
    id: 14, name: "단단한 바위 산 해결사", emoji: "⛰️", color: "#E1F5FE", borderColor: "#0288D1", 
    factBombs: ["이론보다 실전", "기계 잘 고침", "말보다 몸이 먼저", "쿨함의 결정체", "무미건조한 말투", "독고다이 정신", "적응력 우주급", "스릴 중독", "도구 잘 다룸", "과묵한 카리스마", "융통성", "현재 집중", "효율 추구", "운동 신경", "취미 부자", "실용주의", "관찰력", "임기응변", "말수 적음", "매력 넘침"], 
    description: "적은 말수로 강렬한 존재감을 드러내는 실용적인 해결사! 위기 상황에서 가장 빛나는 실전파입니다." 
  },
  { 
    id: 15, name: "조용한 카리스마 선지자", emoji: "🎭", color: "#F3E5F5", borderColor: "#7B1FA2", 
    factBombs: ["속을 알 수 없음", "완벽주의적 배려", "혼자서 생각 많음", "직관이 무서움", "인간관계 좁고 깊게", "이상적인 삶 추구", "비밀이 많음", "내면의 열정", "통찰력", "예술적 감각", "복잡한 내면", "가치 중심", "신중함", "사색 즐기기", "몽상가", "진정성 중시", "은근한 고집", "영감", "사려 깊음", "정신적 지주"], 
    description: "깊은 통찰력과 확고한 신념을 바탕으로 묵묵히 자신의 길을 가는 선지자! 당신의 깊이는 가늠할 수 없습니다." 
  },
  { 
    id: 16, name: "에너지 뿜뿜 액티브 모험가", emoji: "🏃", color: "#FFF3E0", borderColor: "#E64A19", 
    factBombs: ["운동은 내 운명", "말주변이 화려함", "위기에 강함", "즉흥적인 즐거움", "활동적인 취미", "승부욕 폭발", "솔직담백함", "경험이 최고다", "순발력 만렙", "적응력 대장", "지루한 건 지옥", "유머러스", "액션 위주", "현실 감각", "감각적 즐거움", "모험심", "쿨가이", "낙천적", "관찰력 예리", "현장의 주인공"], 
    description: "두려움 없이 새로운 것에 도전하는 활동적인 모험가! 당신의 에너지는 주변 사람들을 움직이게 합니다." 
  },
  { 
    id: 17, name: "차분한 팩트 폭격기 고양이", emoji: "🐈", color: "#F5F5F5", borderColor: "#757575", 
    factBombs: ["사회적 가면 필수", "지식 습득이 취미", "감정 소모 혐오", "정확한게 최고", "예리한 눈썰미", "츤데레 매력", "자기애가 넘침", "침착한 광기", "개인 공간 침범 금지", "논리적인 말하기", "무심한 듯 챙겨줌", "혼자 일할 때 최고", "분석적", "감정에 무딤", "완벽주의", "고고한 태도", "호불호 확실", "지적인 호기심", "차분함", "은근한 허당기"], 
    description: "한 발짝 물러나 세상을 관찰하고 분석하는 똑똑한 고양이! 당신의 차분함 속에 예리함이 숨어 있습니다." 
  },
  { 
    id: 18, name: "반짝이는 별빛 요정", emoji: "🌸", color: "#FCE4EC", borderColor: "#EC407A", 
    factBombs: ["작은 것에도 감동", "일기 쓰기가 취미", "예술적 감각", "마음이 유리구슬", "의미 부여 끝판왕", "평화로운 영혼", "나만의 아지트", "프로 망상러", "다정한 위로", "귀여운 것 수집", "동화 같은 세상", "순수함", "배려 깊은 마음", "따뜻한 응원", "취향 확고", "감성 사진", "나만의 세계", "상냥함", "몽글몽글", "사랑스러움"], 
    description: "아름다운 것을 사랑하고 내면의 목소리에 귀를 기울이는 감성적인 요정! 당신의 세상은 무지개색입니다." 
  },
  { 
    id: 19, name: "웃음 제조기 행복 판다", emoji: "🐼", color: "#E8F5E9", borderColor: "#43A047", 
    factBombs: ["귀여움이 무기", "어딜가나 환영", "단순한게 최고", "금방 까먹음", "친화력 대폭발", "잠이 보약이다", "낙천적인 태도", "고민은 3초만", "긍정 에너지", "먹는 즐거움", "웃음 장벽 낮음", "해맑음", "천진난만", "모두를 웃게 함", "대충 살자", "친구 사랑", "편안함", "유쾌함", "힐링 존재", "단순 명료"], 
    description: "존재 자체가 주변 사람들에게 큰 위로와 웃음이 되는 행복한 판다! 당신 덕분에 세상이 따뜻해집니다." 
  },
  { 
    id: 20, name: "스마트한 임기응변 여우", emoji: "🦊", color: "#FFFDE7", borderColor: "#F9A825", 
    factBombs: ["눈치가 엄청 빠름", "재치 있는 유머", "임기응변 달인", "사람 잘 꼬심", "정보 습득력 1등", "재주가 많음", "위기 탈출 넘버원", "영리한 승부사", "눈치 백단", "센스 쟁이", "말 잘함", "기회 포착", "유연한 사고", "매력 발산", "두뇌 회전", "유머 감각", "다재다능", "임기응변", "잔머리 천재", "영리함"], 
    description: "비상한 두뇌와 매력으로 어떤 상황도 유연하게 넘기는 영리한 여우! 당신의 재치는 모두를 감탄하게 합니다." 
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
      // Map 15-60 range to 20 results (0 to 19 index)
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
