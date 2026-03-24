const questions = [
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
];

const results = {
    hot: {
        title: "[활활 타오르는 장작불]",
        badge: "🔥",
        summary: "리액션 부자, 공감 능력 만렙! 주변 사람들에게 따뜻한 에너지를 나눠주는 타입입니다. 금방 친해지기도 하지만 그만큼 감정 소모가 클 수도 있어요.",
        curation: ["[감정 기록 다이어리]", "[따뜻한 차/디퓨저]"],
        color: "#ff6b6b"
    },
    sunlight: {
        title: "[은은한 햇살]",
        badge: "☀️",
        summary: "적당히 다정하고, 선을 지키며 배려할 줄 아는 타입입니다. 주변 사람들을 편안하게 해주며, 부담스럽지 않은 따스함을 가지고 계시네요.",
        curation: ["[대화법 관련 베스트셀러]", "[심플한 편지지 세트]"],
        color: "#ffd93d"
    },
    lukewarm: {
        title: "[미지근한 보리차]",
        badge: "🍵",
        summary: "무던한 성격의 소유자로, 갈등을 싫어하며 상황에 잘 맞춰주는 편입니다. 물 흐르듯 유연하게 인간관계를 맺으며 평화를 유지하는 타입입니다.",
        curation: ["[명상/요가 용품]", "[편안한 홈웨어]"],
        color: "#fab1a0"
    },
    ice: {
        title: "[시원한 얼음물]",
        badge: "🧊",
        summary: "팩트 폭격기 기질이 있는 이성적인 타입입니다. 인간관계에서 맺고 끊음이 확실하며, 감정에 휘둘리기보다 효율과 논리를 중요하게 생각합니다.",
        curation: ["[효율적인 스케줄러]", "[노이즈 캔슬링 이어폰]"],
        color: "#74b9ff"
    }
};

let currentQuestionIndex = 0;
let scoreA = 0;
let lastActiveSection = 'start-screen';

function startTest() {
    hideAllSections();
    document.getElementById('test-screen').classList.add('active');
    showQuestion();
}

function showQuestion() {
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
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    hideAllSections();
    document.getElementById('result-screen').classList.add('active');

    let resultType;
    if (scoreA === 5) resultType = results.hot;
    else if (scoreA >= 3) resultType = results.sunlight;
    else if (scoreA >= 1) resultType = results.lukewarm;
    else resultType = results.ice;

    document.getElementById('result-title').innerText = resultType.title;
    document.getElementById('result-badge').innerText = resultType.badge;
    document.getElementById('result-summary').innerText = resultType.summary;
    
    document.querySelector('.subtitle').style.color = resultType.color;
    document.getElementById('result-title').style.color = resultType.color;

    const curationList = document.getElementById('curation-list');
    curationList.innerHTML = '';
    resultType.curation.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        curationList.appendChild(li);
    });
}

function restartTest() {
    currentQuestionIndex = 0;
    scoreA = 0;
    hideAllSections();
    document.getElementById('start-screen').classList.add('active');
}

function shareResult() {
    alert("결과가 복사되었습니다! 친구들에게 공유해보세요.");
}

// Contact functions
function showContact() {
    // Save the current section to return to it later
    const activeSection = document.querySelector('section.active');
    if (activeSection) {
        lastActiveSection = activeSection.id;
    }
    hideAllSections();
    document.getElementById('contact-screen').classList.add('active');
}

function hideContact() {
    hideAllSections();
    document.getElementById(lastActiveSection).classList.add('active');
}

function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.remove('active'));
}
