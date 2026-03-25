const testData = {
    temperature: {
        title: "나의 인간관계 온도 테스트",
        subtitle: "나의 사회적 온도는 몇 도일까?",
        desc: "깊게 고민하지 말고 3초 안에 골라보세요!<br>평소 나의 인간관계 스타일을 확인해드립니다.",
        icon: "🌡️",
        questions: [
            {
                q: "오랜만에 연락 온 친구가 \"나 요즘 좀 울적해\"라고 한다면?",
                a: "무슨 일 있어? 말해봐.. (일단 들어주며 공감한다)",
                b: "왜? 맛있는 거라도 먹으러 갈까? (해결책이나 기분 전환을 제안한다)"
            },
            {
                q: "단톡방에 누군가 웃긴 짤을 올렸을 때 나의 반응은?",
                a: "'ㅋㅋㅋㅋ' 폭풍 리액션과 함께 대화를 이어간다.",
                b: "조용히 보고 웃은 뒤, 굳이 답장은 안 한다."
            },
            {
                q: "처음 보는 사람들과 함께하는 모임에 초대받았다면?",
                a: "\"새로운 사람? 재밌겠다!\" 설레는 마음으로 간다.",
                b: "\"아는 사람 누구 있지?\" 명단을 확인하며 기를 빨려 한다."
            },
            {
                q: "친구와 약속을 잡았는데, 당일 아침 친구가 몸이 안 좋다고 취소한다면?",
                a: "\"헐, 많이 아파? 푹 쉬어 ㅠㅠ\" 걱정이 앞선다.",
                b: "\"어쩔 수 없지. 쉬어~\" 하고 내심 '오예! 집에서 쉴 수 있다'고 좋아한다."
            },
            {
                q: "누군가 나에게 선물을 줬을 때, 나의 진짜 속마음은?",
                a: "준 사람의 마음이 고마워서 감동받는다.",
                b: "'나도 나중에 비슷한 금액대로 돌려줘야겠군' 계산이 먼저 선다."
            }
        ],
        results: {
            hot: { title: "[활활 타오르는 장작불]", badge: "🔥", summary: "리액션 부자, 공감 능력 만렙! 주변 사람들에게 따뜻한 에너지를 나눠주는 타입입니다. 금방 친해지기도 하지만 그만큼 감정 소모가 클 수도 있어요.", curation: ["[감정 기록 다이어리]", "[따뜻한 차/디퓨저]"], color: "#ff6b6b" },
            sunlight: { title: "[은은한 햇살]", badge: "☀️", summary: "적당히 다정하고, 선을 지키며 배려할 줄 아는 타입입니다. 주변 사람들을 편안하게 해주며, 부담스럽지 않은 따스함을 가지고 계시네요.", curation: ["[대화법 관련 베스트셀러]", "[심플한 편지지 세트]"], color: "#ffd93d" },
            lukewarm: { title: "[미지근한 보리차]", badge: "🍵", summary: "무던한 성격의 소유자로, 갈등을 싫어하며 상황에 잘 맞춰주는 편입니다. 물 흐르듯 유연하게 인간관계를 맺으며 평화를 유지하는 타입입니다.", curation: ["[명상/요가 용품]", "[편안한 홈웨어]"], color: "#fab1a0" },
            ice: { title: "[시원한 얼음물]", badge: "🧊", summary: "팩트 폭격기 기질이 있는 이성적인 타입입니다. 인간관계에서 맺고 끊음이 확실하며, 감정에 휘둘리기보다 효율과 논리를 중요하게 생각합니다.", curation: ["[효율적인 스케줄러]", "[노이즈 캔슬링 이어폰]"], color: "#74b9ff" }
        }
    },
    pastLife: {
        title: "전생 신분 테스트",
        subtitle: "나의 조선시대 신분은?",
        desc: "아침에 눈을 뜨니 조선시대?!<br>나의 성향으로 알아보는 전생 신분 테스트입니다.",
        icon: "📜",
        questions: [
            {
                q: "Q1. 아침에 눈을 떴는데, 낯선 초가집이다. 나의 첫 반응은?",
                a: "여기가 어디지? 일단 주위를 살피며 상황을 파악한다.",
                b: "꿈인가? 일단 다시 자본다. 어떻게든 되겠지."
            },
            {
                q: "Q2. 마을 잔치가 열렸다고 한다. 나는 어디에 있을까?",
                a: "무대 정중앙에서 춤추고 노래하며 분위기를 주도한다.",
                b: "구석에서 맛있는 전이나 집어 먹으며 구경만 한다."
            },
            {
                q: "Q3. 사또가 나에게 억울한 누명을 씌웠다. 나의 대처는?",
                a: "\"이건 법도에 어긋납니다!\" 논리적으로 반박하며 상소를 올린다.",
                b: "\"아이고 사또나리... 억울합니다ㅠㅠ\" 눈물로 호소한다."
            },
            {
                q: "Q4. 장터에서 물건을 사는데, 상인이 바가지를 씌우는 것 같다.",
                a: "\"이거 너무 비싼데요? 깎아주세요!\" 끝까지 흥정한다.",
                b: "'에이, 좋은 게 좋은 거지...' 그냥 달라는 대로 주고 빨리 자리를 뜬다."
            },
            {
                q: "Q5. 내일이 과거 시험 날이다. 지금 나의 상태는?",
                a: "이미 며칠 전부터 짐 다 싸두고 예상 문제 복습 중이다.",
                b: "\"아 맞다, 내일이었지?\" 급하게 벼락치기를 시작한다."
            }
        ],
        results: {
            king: { title: "[카리스마 넘치는 왕]", badge: "👑", summary: "리더십 있고 추진력이 강합니다. 자기주장이 확실하며 어디를 가나 주인공이 되는 타입입니다.", curation: ["[성공하는 리더의 메모법]", "[고급 만년필]"], color: "#d63031" },
            merchant: { title: "[똑부러지는 거상]", badge: "💰", summary: "계산이 빠르고 실속을 잘 챙깁니다. 돈 냄새를 잘 맡으며 효율적인 삶을 추구하는 현실주의자입니다.", curation: ["[자산 관리 엑셀 템플릿]", "[재테크 추천 도서]"], color: "#f1c40f" },
            socialite: { title: "[풍류를 즐기는 한량]", badge: "🍶", summary: "스트레스를 잘 받지 않고 현재의 행복을 중요하게 생각합니다. 맛집과 멋을 아는 진정한 예술가 타입입니다.", curation: ["[전통주 시음 세트]", "[휴대용 블루투스 스피커]"], color: "#16a085" },
            worker: { title: "[전설의 일잘러 노비]", badge: "🙇", summary: "손이 빠르고 일 처리가 완벽합니다. 시키는 일 그 이상을 해내지만, 만성 피로를 달고 사는 타입입니다.", curation: ["[거북목 방지 독서대]", "[피로회복용 비타민]"], color: "#7f8c8d" }
        }
    }
};

let activeTestId = '';
let currentQuestionIndex = 0;
let scoreA = 0;
let lastActiveSection = 'home-screen';

function initTest(testId) {
    activeTestId = testId;
    currentQuestionIndex = 0;
    scoreA = 0;
    
    const data = testData[testId];
    document.getElementById('start-title').innerText = data.title;
    document.getElementById('start-subtitle').innerText = data.subtitle;
    document.getElementById('start-desc').innerHTML = data.desc;
    document.getElementById('start-icon').innerText = data.icon;
    
    hideAllSections();
    document.getElementById('start-screen').classList.add('active');
}

function startTest() {
    hideAllSections();
    document.getElementById('test-screen').classList.add('active');
    showQuestion();
}

function showQuestion() {
    const questions = testData[activeTestId].questions;
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.q;
    document.getElementById('btnA').innerText = question.a;
    document.getElementById('btnB').innerText = question.b;
    
    const percent = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = percent + '%';
    document.getElementById('page-count').innerText = `${currentQuestionIndex + 1}/${questions.length}`;
}

function nextQuestion(answer) {
    if (answer === 'A') scoreA++;
    currentQuestionIndex++;
    if (currentQuestionIndex < testData[activeTestId].questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    hideAllSections();
    document.getElementById('result-screen').classList.add('active');

    const results = testData[activeTestId].results;
    let result;

    if (activeTestId === 'temperature') {
        if (scoreA === 5) result = results.hot;
        else if (scoreA >= 3) result = results.sunlight;
        else if (scoreA >= 1) result = results.lukewarm;
        else result = results.ice;
    } else { // pastLife
        if (scoreA === 5) result = results.king;
        else if (scoreA >= 3) result = results.merchant;
        else if (scoreA >= 1) result = results.socialite;
        else result = results.worker;
    }

    document.getElementById('result-title').innerText = result.title;
    document.getElementById('result-badge').innerText = result.badge;
    document.getElementById('result-summary').innerText = result.summary;
    document.getElementById('result-title').style.color = result.color;

    const curationList = document.getElementById('curation-list');
    curationList.innerHTML = '';
    result.curation.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        curationList.appendChild(li);
    });
}

function goHome() {
    hideAllSections();
    document.getElementById('home-screen').classList.add('active');
}

function shareResult() {
    alert("결과가 복사되었습니다! 친구들에게 공유해보세요.");
}

function showContact() {
    const activeSection = document.querySelector('section.active');
    if (activeSection) lastActiveSection = activeSection.id;
    hideAllSections();
    document.getElementById('contact-screen').classList.add('active');
}

function hideContact() {
    hideAllSections();
    document.getElementById(lastActiveSection).classList.add('active');
}

function hideAllSections() {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
}
