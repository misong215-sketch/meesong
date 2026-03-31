document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destCards = document.querySelectorAll('.dest-card');

    // Category Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            destCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Destination Details Data
    const destinationDetails = {
        jeju: {
            title: "제주도 상세 정보",
            images: [
                "https://picsum.photos/seed/jeju1/600/400",
                "https://picsum.photos/seed/jeju2/600/400"
            ],
            description: "제주도는 사계절 내내 각기 다른 매력을 뽐내는 한국 최대의 섬입니다. 유네스코 세계자연유산으로 등재된 성산일출봉과 거문오름 용암동굴계 등 천혜의 자연경관을 자랑합니다.",
            spots: ["성산일출봉", "한라산 국립공원", "우도", "협재 해수욕장", "천지연 폭포"]
        },
        seoul: {
            title: "서울 상세 정보",
            images: [
                "https://picsum.photos/seed/seoul1/600/400",
                "https://picsum.photos/seed/seoul2/600/400"
            ],
            description: "서울은 600년이 넘는 역사를 간직한 전통과 최첨단 IT 기술이 공존하는 메가시티입니다. 한강을 중심으로 펼쳐지는 도심의 야경과 고궁의 정취를 모두 느낄 수 있습니다.",
            spots: ["경복궁", "N서울타워", "명동", "롯데월드타워", "북촌 한옥마을"]
        },
        gyeongju: {
            title: "경주 상세 정보",
            images: [
                "https://picsum.photos/seed/gyeongju1/600/400",
                "https://picsum.photos/seed/gyeongju2/600/400"
            ],
            description: "경주는 신라 천년의 숨결이 고스란히 남아있는 역사적 명소입니다. 도시 전체가 박물관이라 불릴 만큼 수많은 국보와 보물을 보유하고 있습니다.",
            spots: ["불국사", "석굴암", "안압지(동궁과 월지)", "첨성대", "대릉원"]
        },
        busan: {
            title: "부산 상세 정보",
            images: [
                "https://picsum.photos/seed/busan1/600/400",
                "https://picsum.photos/seed/busan2/600/400"
            ],
            description: "부산은 한국 제2의 도시이자 최대의 항구도시입니다. 화려한 해수욕장, 활기찬 수산시장, 그리고 산복도로를 따라 펼쳐지는 독특한 달동네 풍경이 매력적입니다.",
            spots: ["해운대 해수욕장", "감천문화마을", "자갈치 시장", "광안대교", "태종대"]
        },
        seorak: {
            title: "설악산 상세 정보",
            images: [
                "https://picsum.photos/seed/seorak1/600/400",
                "https://picsum.photos/seed/seorak2/600/400"
            ],
            description: "설악산 국립공원은 한국에서 가장 아름다운 자연 경관을 자랑하는 명산입니다. 기암괴석과 맑은 계곡, 그리고 케이블카를 통해 누구나 쉽게 즐길 수 있는 절경이 가득합니다.",
            spots: ["울산바위", "비룡폭포", "권금성 케이블카", "신흥사", "백담사"]
        },
        jeonju: {
            title: "전주 상세 정보",
            images: [
                "https://picsum.photos/seed/jeonju1/600/400",
                "https://picsum.photos/seed/jeonju2/600/400"
            ],
            description: "전주는 한국의 전통 맛과 멋이 가장 잘 보존된 도시입니다. 특히 전주 한옥마을은 한옥 생활 체험과 한복 체험, 그리고 비빔밥 등 다양한 먹거리로 유명합니다.",
            spots: ["전주 한옥마을", "전동성당", "경기전", "오목대", "남부시장 야시장"]
        }
    };

    // Modal Logic
    const modal = document.getElementById('destModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    const moreLinks = document.querySelectorAll('.more-link');

    moreLinks.forEach(link => {
        link.addEventListener('click', () => {
            const destId = link.getAttribute('data-id');
            const detail = destinationDetails[destId];

            if (detail) {
                let spotsHtml = detail.spots.map(spot => `
                    <div class="spot-item">
                        <span>📍 ${spot}</span>
                    </div>
                `).join('');

                modalBody.innerHTML = `
                    <div class="modal-header">
                        <h2>${detail.title}</h2>
                    </div>
                    <div class="modal-gallery">
                        <img src="${detail.images[0]}" alt="${detail.title}">
                        <img src="${detail.images[1]}" alt="${detail.title}">
                    </div>
                    <div class="modal-info">
                        <h4>여행지 소개</h4>
                        <p>${detail.description}</p>
                        <br>
                        <h4>추천 여행 명소</h4>
                        <div class="spot-list">
                            ${spotsHtml}
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scroll
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Newsletter form submission (simple alert)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert(`${email}님, 구독해주셔서 감사합니다! 최신 여행 소식을 보내드릴게요.`);
                newsletterForm.reset();
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
