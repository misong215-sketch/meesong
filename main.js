const destinationData = [
    {
        id: "seoul",
        category: "city",
        name: "서울 (Seoul)",
        shortDesc: "과거와 현재가 공존하는 대한민국의 수도",
        desc: "서울은 600년 역사의 고궁과 현대적인 빌딩숲이 어우러진 매력적인 도시입니다. 쇼핑, 미식, 문화 예술 등 즐길 거리가 가득합니다.",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=500",
        spots: ["경복궁", "N서울타워", "명동 쇼핑거리", "롯데월드타워"]
    },
    {
        id: "busan",
        category: "city",
        name: "부산 (Busan)",
        shortDesc: "푸른 바다와 활기찬 에너지가 넘치는 해양 도시",
        desc: "대한민국 제2의 도시이자 최대 항구도시인 부산은 아름다운 해수욕장과 싱싱한 해산물, 그리고 산복도로의 정취를 느낄 수 있는 곳입니다.",
        image: "https://images.unsplash.com/photo-1599939339720-333e22646399?auto=format&fit=crop&q=80&w=500",
        spots: ["해운대 해수욕장", "감천문화마을", "광안대교", "자갈치시장"]
    },
    {
        id: "jeju",
        category: "nature",
        name: "제주도 (Jeju Island)",
        shortDesc: "환상의 섬, 에메랄드빛 바다와 화산 지형",
        desc: "유네스코 세계자연유산에 등재된 제주도는 독특한 화산 지형과 아름다운 자연경관을 자랑합니다. 사계절 내내 각기 다른 매력을 뽐내는 곳입니다.",
        image: "https://images.unsplash.com/photo-1542359649-31e03ad4d92c?auto=format&fit=crop&q=80&w=500",
        spots: ["성산 일출봉", "한라산 국립공원", "협재 해수욕장", "천지연 폭포"]
    },
    {
        id: "gyeongju",
        category: "history",
        name: "경주 (Gyeongju)",
        shortDesc: "지붕 없는 박물관, 신라 천 년의 고도",
        desc: "천 년 왕조 신라의 수도였던 경주는 도시 전체가 하나의 거대한 박물관입니다. 불교 예술의 정수와 고분군의 신비로움을 느낄 수 있습니다.",
        image: "https://images.unsplash.com/photo-1624220551372-2d6d03429304?auto=format&fit=crop&q=80&w=500",
        spots: ["불국사", "석굴암", "첨성대", "동궁과 월지"]
    },
    {
        id: "gangneung",
        category: "nature",
        name: "강릉 (Gangneung)",
        shortDesc: "커피 향 가득한 동해안의 보석",
        desc: "맑고 깨끗한 동해 바다와 시원한 소나무 숲이 어우러진 강릉은 커피 거리로도 유명합니다. 낭만적인 바다 여행을 즐기기에 최적입니다.",
        image: "https://images.unsplash.com/photo-1620986701897-400827255be9?auto=format&fit=crop&q=80&w=500",
        spots: ["안목커피거리", "경포해변", "오죽헌", "정동진역"]
    },
    {
        id: "jeonju",
        category: "history",
        name: "전주 (Jeonju)",
        shortDesc: "가장 한국적인 도시, 맛과 멋의 고장",
        desc: "한옥마을을 중심으로 전통문화가 살아 숨 쉬는 전주는 비빔밥으로 대표되는 미식의 도시이기도 합니다. 한복 체험과 함께 옛 정취를 느껴보세요.",
        image: "https://images.unsplash.com/photo-1578338780289-4b68420377e8?auto=format&fit=crop&q=80&w=500",
        spots: ["전주 한옥마을", "전동성당", "경기전", "남부시장 야시장"]
    }
];

let lastActiveSection = 'home-screen';

function renderDestinations(filter = 'all') {
    const listContainer = document.getElementById('destination-list');
    listContainer.innerHTML = '';

    const filtered = filter === 'all' 
        ? destinationData 
        : destinationData.filter(item => item.category === filter);

    filtered.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'test-card';
        card.onclick = () => showDetail(dest.id);
        
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" class="card-image">
            <div class="test-info">
                <h3>${dest.name}</h3>
                <p>${dest.shortDesc}</p>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function filterDestinations(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(category === 'all' ? '전체' : category === 'city' ? '도시' : category === 'nature' ? '자연' : '역사')) {
            btn.classList.add('active');
        }
    });
    renderDestinations(category);
}

function showDetail(id) {
    const dest = destinationData.find(item => item.id === id);
    if (!dest) return;

    hideAllSections();
    document.getElementById('detail-screen').classList.add('active');

    document.getElementById('detail-title').innerText = dest.name;
    document.getElementById('detail-category').innerText = dest.category.toUpperCase();
    document.getElementById('detail-description').innerText = dest.desc;
    document.getElementById('detail-image').src = dest.image;

    const spotList = document.getElementById('spot-list');
    spotList.innerHTML = '';
    dest.spots.forEach(spot => {
        const li = document.createElement('li');
        li.innerText = spot;
        spotList.appendChild(li);
    });
}

function goHome() {
    hideAllSections();
    document.getElementById('home-screen').classList.add('active');
}

function showContact() {
    lastActiveSection = document.querySelector('section.active').id;
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

function shareResult() {
    alert("여행 정보가 복사되었습니다! 친구와 함께 여행 계획을 세워보세요.");
}

// Initial Load
window.onload = () => {
    renderDestinations();
};
