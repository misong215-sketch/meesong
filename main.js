document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('auth-feed');
    const authModal = document.getElementById('auth-modal');
    const floatingBtn = document.getElementById('floating-auth-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const authForm = document.getElementById('auth-form');

    // 초기 가상 피드 데이터 (댓글 데이터 추가)
    const initialFeeds = [
        { id: 1, user: '민수', challenge: '운동', text: '오늘도 스쿼트 100개 완료! 허벅지가 타는 것 같아요 😂', time: '방금 전', comments: ['와 대단해요!', '저도 오늘 스쿼트 도전!'] },
        { id: 2, user: '지은', challenge: '독서', text: '데미안 50페이지 읽었습니다. 문장이 너무 아름다워요.', time: '5분 전', comments: ['저도 좋아하는 책이에요 :)'] },
        { id: 3, user: '철수', challenge: '자기계발', text: '경제 뉴스 3개 요약 완료. 환율이 계속 오르네요.', time: '12분 전', comments: [] },
        { id: 4, user: '유리', challenge: '운동', text: '아침 조깅 5km 성공! 공기가 상쾌해요.', time: '20분 전', comments: ['갓생 사시네요 부럽습니다!'] }
    ];

    // 피드 렌더링 함수 (댓글 영역 추가)
    function renderFeeds(data) {
        feedContainer.innerHTML = '';
        data.forEach(item => {
            addFeedItem(item);
        });
    }

    function addFeedItem(item) {
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.dataset.id = item.id;
        
        let commentsHtml = item.comments.map(c => `<div class="comment-text"><strong>익명:</strong> ${c}</div>`).join('');

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
            <div class="comment-section">
                <div class="comment-list">${commentsHtml}</div>
                <div class="comment-input-group">
                    <input type="text" class="comment-input" placeholder="댓글을 입력하세요...">
                    <button class="btn-comment-submit">게시</button>
                </div>
            </div>
        `;
        
        // 댓글 제출 이벤트 리스너 추가
        const submitBtn = feedItem.querySelector('.btn-comment-submit');
        const input = feedItem.querySelector('.comment-input');
        const list = feedItem.querySelector('.comment-list');

        submitBtn.addEventListener('click', () => {
            if (input.value.trim()) {
                const newComment = document.createElement('div');
                newComment.className = 'comment-text';
                newComment.innerHTML = `<strong>나:</strong> ${input.value}`;
                list.appendChild(newComment);
                input.value = '';
            }
        });

        // 엔터키 지원
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitBtn.click();
        });

        feedContainer.prepend(feedItem);
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

        const newFeed = {
            id: Date.now(),
            user: '나(User)',
            challenge: challenge.split('!')[0].trim(),
            text: text,
            time: '방금 전',
            comments: []
        };

        addFeedItem(newFeed);
        
        authForm.reset();
        authModal.style.display = 'none';
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
