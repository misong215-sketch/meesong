document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('auth-feed');
    const authModal = document.getElementById('auth-modal');
    const floatingBtn = document.getElementById('floating-auth-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const authForm = document.getElementById('auth-form');

    // 초기 가상 피드 데이터
    const initialFeeds = [
        { user: '민수', challenge: '운동', text: '오늘도 스쿼트 100개 완료! 허벅지가 타는 것 같아요 😂', time: '방금 전' },
        { user: '지은', challenge: '독서', text: '데미안 50페이지 읽었습니다. 문장이 너무 아름다워요.', time: '5분 전' },
        { user: '철수', challenge: '자기계발', text: '경제 뉴스 3개 요약 완료. 환율이 계속 오르네요.', time: '12분 전' },
        { user: '유리', challenge: '운동', text: '아침 조깅 5km 성공! 공기가 상쾌해요.', time: '20분 전' }
    ];

    // 피드 렌더링 함수
    function renderFeeds(data) {
        feedContainer.innerHTML = '';
        data.forEach(item => {
            const feedItem = document.createElement('div');
            feedItem.className = 'feed-item';
            feedItem.innerHTML = `
                <div class="user-info">
                    <div class="avatar"></div>
                    <span class="username">${item.user}</span>
                </div>
                <p class="feed-text">${item.text}</p>
                <div class="feed-meta">
                    <span class="challenge-tag">#${item.challenge}</span>
                    <span class="time">${item.time}</span>
                </div>
            `;
            feedContainer.prepend(feedItem);
        });
    }

    renderFeeds(initialFeeds);

    // 모달 제어
    floatingBtn.addEventListener('click', () => {
        authModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.style.display = 'none';
    });

    // 인증 폼 제출
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const challenge = document.getElementById('challenge-select').value;
        const text = document.getElementById('auth-text').value;

        if (!text) {
            alert('인증 내용을 입력해주세요!');
            return;
        }

        // 새 피드 추가
        const newFeed = {
            user: '나(User)',
            challenge: challenge.split('!')[0].trim(),
            text: text,
            time: '방금 전'
        };

        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.style.border = '2px solid #ff7e5f'; // 강조
        feedItem.innerHTML = `
            <div class="user-info">
                <div class="avatar" style="background: #ff7e5f"></div>
                <span class="username">${newFeed.user}</span>
            </div>
            <p class="feed-text">${newFeed.text}</p>
            <div class="feed-meta">
                <span class="challenge-tag">#${newFeed.challenge}</span>
                <span class="time">${newFeed.time}</span>
            </div>
        `;
        
        feedContainer.prepend(feedItem);
        
        // 초기화 및 닫기
        authForm.reset();
        authModal.style.display = 'none';
        
        // 부드러운 스크롤로 피드로 이동
        document.getElementById('feed').scrollIntoView({ behavior: 'smooth' });
    });

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
