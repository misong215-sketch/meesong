const testData = {
    temperature: {
        title: "나의 인간관계 온도 테스트",
        subtitle: "나의 사회적 온도는 몇 도일까?",
        desc: "깊게 고민하지 말고 3초 안에 골라보세요!<br>평소 나의 인간관계 스타일을 확인해드립니다.",
        icon: "🤝",
        questions: [
            { q: "오랜만에 연락 온 친구가 \"나 요즘 좀 울적해\"라고 한다면?", a: "무슨 일 있어? 말해봐.. (일단 들어주며 공감한다)", b: "왜? 맛있는 거라도 먹으러 갈까? (해결책이나 기분 전환을 제안한다)" },
            { q: "단톡방에 누군가 웃긴 짤을 올렸을 때 나의 반응은?", a: "'ㅋㅋㅋㅋ' 폭풍 리액션과 함께 대화를 이어간다.", b: "조용히 보고 웃은 뒤, 굳이 답장은 안 한다." },
            { q: "처음 보는 사람들과 함께하는 모임에 초대받았다면?", a: "\"새로운 사람? 재밌겠다!\" 설레는 마음으로 간다.", b: "\"아는 사람 누구 있지?\" 명단을 확인하며 기를 빨려 한다." },
            { q: "친구와 약속을 잡았는데, 당일 아침 친구가 몸이 안 좋다고 취소한다면?", a: "\"헐, 많이 아파? 푹 쉬어 ㅠㅠ\" 걱정이 앞선다.", b: "\"어쩔 수 없지. 쉬어~\" 하고 내심 '오예! 집에서 쉴 수 있다'고 좋아한다." },
            { q: "누군가 나에게 선물을 줬을 때, 나의 진짜 속마음은?", a: "준 사람의 마음이 고마워서 감동받는다.", b: "'나도 나중에 비슷한 금액대로 돌려줘야겠군' 계산이 먼저 선다." }
        ],
        results: {
            hot: { title: "[활활 타오르는 장작불]", badge: "🔥", summary: "리액션 부자, 공감 능력 만렙! 주변 사람들에게 따뜻한 에너지를 나눠주는 타입입니다.", curation: ["[감정 기록 다이어리]", "[따뜻한 차/디퓨저]"], color: "#ff6b6b" },
            sunlight: { title: "[은은한 햇살]", badge: "☀️", summary: "적당히 다정하고, 선을 지키며 배려할 줄 아는 타입입니다. 부담스럽지 않은 따스함을 가지고 계시네요.", curation: ["[대화법 관련 베스트셀러]", "[심플한 편지지 세트]"], color: "#ffd93d" },
            lukewarm: { title: "[미지근한 보리차]", badge: "🍵", summary: "무던한 성격의 소유자로, 갈등을 싫어하며 상황에 잘 맞춰주는 편입니다. 평화를 유지하는 타입입니다.", curation: ["[명상/요가 용품]", "[편안한 홈웨어]"], color: "#fab1a0" },
            ice: { title: "[시원한 얼음물]", badge: "🧊", summary: "팩트 폭격기 기질이 있는 이성적인 타입입니다. 감정에 휘둘리기보다 효율과 논리를 중요하게 생각합니다.", curation: ["[효율적인 스케줄러]", "[노이즈 캔슬링 이어폰]"], color: "#74b9ff" }
        }
    },
    pastLife: {
        title: "전생 신분 테스트",
        subtitle: "나의 조선시대 신분은?",
        desc: "아침에 눈을 뜨니 조선시대?!<br>나의 성향으로 알아보는 전생 신분 테스트입니다.",
        icon: "📜",
        questions: [
            { q: "Q1. 아침에 눈을 떴는데, 낯선 초가집이다. 나의 첫 반응은?", a: "여기가 어디지? 일단 주위를 살피며 상황을 파악한다.", b: "꿈인가? 일단 다시 자본다. 어떻게든 되겠지." },
            { q: "Q2. 마을 잔치가 열렸다고 한다. 나는 어디에 있을까?", a: "무대 정중앙에서 춤추고 노래하며 분위기를 주도한다.", b: "구석에서 맛있는 전이나 집어 먹으며 구경만 한다." },
            { q: "Q3. 사또가 나에게 억울한 누명을 씌웠다. 나의 대처는?", a: "\"이건 법도에 어긋납니다!\" 논리적으로 반박하며 상소를 올린다.", b: "\"아이고 사또나리... 억울합니다ㅠㅠ\" 눈물로 호소한다." },
            { q: "Q4. 장터에서 물건을 사는데, 상인이 바가지를 씌우는 것 같다.", a: "\"이거 너무 비싼데요? 깎아주세요!\" 끝까지 흥정한다.", b: "'에이, 좋은 게 좋은 거지...' 그냥 달라는 대로 주고 빨리 자리를 뜬다." },
            { q: "Q5. 내일이 과거 시험 날이다. 지금 나의 상태는?", a: "이미 며칠 전부터 짐 다 싸두고 예상 문제 복습 중이다.", b: "\"아 맞다, 내일이었지?\" 급하게 벼락치기를 시작한다." }
        ],
        results: {
            king: { title: "[카리스마 넘치는 왕]", badge: "👑", summary: "리더십 있고 추진력이 강합니다. 자기주장이 확실하며 어디를 가나 주인공이 되는 타입입니다.", curation: ["[성공하는 리더의 메모법]", "[고급 만년필]"], color: "#d63031" },
            merchant: { title: "[똑부러지는 거상]", badge: "💰", summary: "계산이 빠르고 실속을 잘 챙깁니다. 돈 냄새를 잘 맡으며 효율적인 삶을 추구하는 현실주의자입니다.", curation: ["[자산 관리 엑셀 템플릿]", "[재테크 추천 도서]"], color: "#f1c40f" },
            socialite: { title: "[풍류를 즐기는 한량]", badge: "🍶", summary: "스트레스를 잘 받지 않고 현재의 행복을 중요하게 생각합니다. 맛집과 멋을 아는 진정한 예술가 타입입니다.", curation: ["[전통주 시음 세트]", "[휴대용 블루투스 스피커]"], color: "#16a085" },
            worker: { title: "[전설의 일잘러 노비]", badge: "🙇", summary: "손이 빠르고 일 처리가 완벽합니다. 시키는 일 그 이상을 해내지만, 만성 피로를 달고 사는 타입입니다.", curation: ["[거북목 방지 독서대]", "[피로회복용 비타민]"], color: "#7f8c8d" }
        }
    },
    mbtiTemp: {
        title: "나의 성격 온도 MBTI 테스트",
        subtitle: "내 성격은 몇 도일까?",
        desc: "성격 그룹별로 알아보는 나의 온도!<br>간단한 질문을 통해 당신의 성격 온도를 확인해보세요.",
        icon: "🧠",
        questions: [
            { q: "Q1. 주말 아침, 눈을 떴을 때 나의 첫 번째 계획은?", a: "\"오늘 할 일을 순서대로 머릿속으로 그려본다.\"", b: "\"일단 배고프니까 밥 먹고 생각하자.\"" },
            { q: "Q2. 오랜만에 친구가 \"오늘 번개로 만날래?\"라고 연락이 온다면?", a: "\"오, 좋아! 어디서 볼까?\" 일단 나갈 준비를 한다.", b: "\"아... 오늘은 집에서 쉬고 싶은데...\" 거절 대본을 짠다." },
            { q: "Q3. 친구가 고민을 털어놓으며 울먹일 때, 나의 진짜 속마음은?", a: "'왜 저런 일이 생겼지? 해결하려면 어떻게 해야 할까?'", b: "'얼마나 힘들었으면 저럴까... 마음 아프다 ㅠㅠ'" },
            { q: "Q4. 길을 가다 정말 특이하고 예쁜 소품을 발견했다면?", a: "\"예쁘긴 한데, 집에 두면 짐만 될 것 같아.\"", b: "\"이걸 사면 내 방 분위기가 확 바뀌겠지?\"" },
            { q: "Q5. 단체 카톡방에서 내 의견에 반대하는 사람이 나타난다면?", a: "\"제 생각은 이런 근거 때문에 맞습니다.\"", b: "\"아, 그럴 수도 있겠네요...\" 일단 수긍한다." },
            { q: "Q6. 여행 짐을 쌀 때, 나의 스타일은?", a: "필요할 수도 있는 것까지 꼼꼼히 챙겨서 리스트를 체크한다.", b: "\"가서 사면 되지!\" 핵심적인 것만 대충 던져 넣는다." }
        ],
        results: {
            sj: { title: "[100°C: 열정적인 용암]", badge: "🌋", summary: "SJ형 (ISTJ, ISFJ, ESTJ, ESFJ) - 계획적이고 책임감이 강합니다. 내 사람들에게는 한없이 뜨거운 열정파입니다.", curation: ["[플래너/다이어리]", "[멀티비타민]"], color: "#e74c3c" },
            nf: { title: "[60°C: 따뜻한 코코아]", badge: "☕", summary: "NF형 (INFJ, INFP, ENFJ, ENFP) - 공감 능력이 뛰어나고 이상적입니다. 따뜻하고 감성적인 대화를 좋아합니다.", curation: ["[감성 무드등]", "[에세이 베스트셀러]"], color: "#e67e22" },
            sp: { title: "[30°C: 시원한 탄산수]", badge: "🥤", summary: "SP형 (ISTP, ISFP, ESTP, ESFP) - 현재의 즐거움이 제일 중요합니다. 쿨하고 뒤끝 없는 시원시원한 성격입니다.", curation: ["[액션캠/카메라]", "[스포츠 용품]"], color: "#3498db" },
            nt: { title: "[0°C: 냉철한 얼음 결정]", badge: "❄️", summary: "NT형 (INTJ, INTP, ENTJ, ENTP) - 논리적이고 지적인 호기심이 많습니다. 감성보다는 효율을 중시하는 타입입니다.", curation: ["[IT 가젯/기기]", "[전문 서적/강의]"], color: "#95a5a6" }
        }
    }
};

let activeTestId = '';
let currentQuestionIndex = 0;
let userAnswers = [];
let lastActiveSection = 'home-screen';

function initTest(testId) {
    activeTestId = testId;
    currentQuestionIndex = 0;
    userAnswers = [];
    
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
    userAnswers.push(answer);
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
        const scoreA = userAnswers.filter(a => a === 'A').length;
        if (scoreA === 5) result = results.hot;
        else if (scoreA >= 3) result = results.sunlight;
        else if (scoreA >= 1) result = results.lukewarm;
        else result = results.ice;
    } else if (activeTestId === 'pastLife') {
        const scoreA = userAnswers.filter(a => a === 'A').length;
        if (scoreA === 5) result = results.king;
        else if (scoreA >= 3) result = results.merchant;
        else if (scoreA >= 1) result = results.socialite;
        else result = results.worker;
    } else if (activeTestId === 'mbtiTemp') {
        let sj = 0, nf = 0, sp = 0, nt = 0;
        if (userAnswers[0] === 'A') sj++; else sp++;
        if (userAnswers[2] === 'A') nt++; else nf++;
        if (userAnswers[3] === 'A') { sj++; sp++; } else { nt++; nf++; }
        if (userAnswers[4] === 'A') nt++; else nf++;
        if (userAnswers[5] === 'A') sj++; else sp++;

        const maxScore = Math.max(sj, nf, sp, nt);
        if (maxScore === sj) result = results.sj;
        else if (maxScore === nf) result = results.nf;
        else if (maxScore === sp) result = results.sp;
        else result = results.nt;
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

// Lotto Logic
function showLotto() {
    hideAllSections();
    document.getElementById('lotto-screen').classList.add('active');
    // Reset balls
    const ballsContainer = document.getElementById('lotto-balls');
    ballsContainer.innerHTML = '<div class="ball-placeholder">?</div>'.repeat(6);
}

function generateLotto() {
    const ballsContainer = document.getElementById('lotto-balls');
    ballsContainer.innerHTML = ''; // Clear
    
    let numbers = [];
    while(numbers.length < 6) {
        let r = Math.floor(Math.random() * 45) + 1;
        if(numbers.indexOf(r) === -1) numbers.push(r);
    }
    numbers.sort((a, b) => a - b);

    numbers.forEach((num, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.className = `ball ${getBallColorClass(num)}`;
            ball.innerText = num;
            ballsContainer.appendChild(ball);
        }, index * 300); // Sequence animation
    });
}

function getBallColorClass(num) {
    if (num <= 10) return 'ball-1';
    if (num <= 20) return 'ball-2';
    if (num <= 30) return 'ball-3';
    if (num <= 40) return 'ball-4';
    return 'ball-5';
}

// AI Dog Face Test Logic
const TM_MODEL_URL = "https://teachablemachine.withgoogle.com/models/QgnmsWGws/";
let model, maxPredictions;

async function showAiTest() {
    hideAllSections();
    document.getElementById('ai-test-screen').classList.add('active');
    
    // Reset preview
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '<p>사진을 업로드해주세요</p>';
    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('image-input').value = '';
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('image-preview');
        preview.innerHTML = `<img id="uploaded-image" src="${reader.result}" alt="Preview">`;
        document.getElementById('analyze-btn').style.display = 'block';
    }
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

async function predict() {
    const loading = document.getElementById('loading');
    const analyzeBtn = document.getElementById('analyze-btn');
    const image = document.getElementById('uploaded-image');
    
    if (!image) return;

    analyzeBtn.style.display = 'none';
    loading.style.display = 'block';

    try {
        // Load model if not loaded
        if (!model) {
            const modelURL = TM_MODEL_URL + "model.json";
            const metadataURL = TM_MODEL_URL + "metadata.json";
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
        }

        const prediction = await model.predict(image);
        
        // Find best result
        prediction.sort((a, b) => b.probability - a.probability);
        const topResult = prediction[0];

        // Custom descriptions and Images for specific dog breeds (based on model classes)
        const dogData = {
            "시바": {
                desc: "충성심 강하고 귀여운 시바견을 닮으셨네요! 볼살이 매력적일 확률이 높아요.",
                img: "images/siba.jpeg"
            },
            "캉갈": {
                desc: "카리스마 넘치고 든든한 캉갈을 닮으셨네요! 강인한 인상 속에 따뜻한 마음을 가진 분입니다.",
                img: "images/kangal.jpeg"
            },
            "불테리어": {
                desc: "개성 넘치고 유니크한 매력의 불테리어를 닮으셨네요! 한번 보면 잊혀지지 않는 독보적인 관상입니다.",
                img: "images/bullterrier.jpeg"
            },
            "푸들": {
                desc: "똑똑하고 애교 많은 푸들을 닮으셨네요! 사교성이 좋고 어디서나 사랑받는 타입입니다.",
                img: "images/poodle.jpeg"
            },
            "불독": {
                desc: "우직하고 신뢰감 있는 불독을 닮으셨네요! 겉은 무뚝뚝해 보여도 알수록 깊은 매력이 있습니다.",
                img: "images/bulldog.jpeg"
            }
        };

        const currentDog = dogData[topResult.className] || { desc: "정말 멋진 강아지 관상을 가지고 계시네요!", img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=500" };

        // Switch to result screen
        hideAllSections();
        const resultScreen = document.getElementById('result-screen');
        resultScreen.classList.add('active');

        // Text title hidden or minimized (using image as main title instead)
        document.getElementById('result-title').innerText = `${topResult.className}상 (일치율 ${(topResult.probability * 100).toFixed(1)}%)`;
        
        // Main result Image
        const badge = document.getElementById('result-badge');
        badge.innerHTML = `
            <div class="result-image-container">
                <img src="${currentDog.img}" alt="${topResult.className}">
            </div>
        `;
        
        document.getElementById('result-summary').innerText = currentDog.desc;
        document.getElementById('result-title').style.color = 'var(--primary-color)';

        // Show probability list with IMAGES
        const curationList = document.getElementById('curation-list');
        curationList.innerHTML = '<h3>📊 각각의 닮은 정도 확인하기</h3>';
        
        prediction.slice(0, 5).forEach(p => {
            const prob = (p.probability * 100).toFixed(1);
            const breedInfo = dogData[p.className] || { img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=100" };
            
            const item = document.createElement('li');
            item.style.display = 'block'; // Overwrite default flex
            item.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src="${breedInfo.img}" alt="${p.className}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; margin-right: 15px; border: 2px solid #eee;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 700; margin-bottom: 5px;">
                            <span>${p.className}</span>
                            <span>${prob}%</span>
                        </div>
                        <div class="result-bar-bg" style="margin-bottom: 0;">
                            <div class="result-bar" style="width: ${prob}%"></div>
                        </div>
                    </div>
                </div>
            `;
            curationList.appendChild(item);
        });

    } catch (error) {
        console.error(error);
        alert("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
        loading.style.display = 'none';
    }
}

function getDogEmoji(className) {
    const emojis = {
        "시바": "🐕", "캉갈": "🐺", "불테리어": "🐶", "푸들": "🐩", "불독": "🐂"
    };
    return emojis[className] || "✨";
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
