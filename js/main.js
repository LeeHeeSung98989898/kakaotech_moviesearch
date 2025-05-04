import { fetchMovies, fetchPopularMovies } from './api.js';
import { renderMovies, showModal, hideModal } from './ui.js';

// DOM 요소 참조
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieList = document.getElementById('movieList');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// 인기 영화 불러오기
window.addEventListener('DOMContentLoaded', async () => {
    const movies = await fetchPopularMovies();
    renderMovies(movies, movieList);
});

// 검색 버튼, 엔터 입력시 실행
async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    const movies = await fetchMovies(query);
    renderMovies(movies, movieList);
}

// 검색 버튼
searchButton.addEventListener('click', handleSearch);

// 엔터 검색 실행
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// 영화 카드, 북마크 버튼 클릭 이벤트
movieList.addEventListener('click', e => {
    const bookmarkBtn = e.target.closest('.bookmark-button');
    if (bookmarkBtn) {
        const id = bookmarkBtn.dataset.id;
        toggleBookmark(id);
        return;
    }

    const card = e.target.closest('.movie-card');
    if (card) {
        const movieId = card.dataset.id;
        showModal(movieId);
    }
});

// 모달 닫기 버튼 클릭
closeModal.addEventListener('click', hideModal);

// 모달 바깥 영역 클릭 시 닫기
modal.addEventListener('click', e => {
    if (e.target === modal) hideModal();
});

// 북마크 상태
function toggleBookmark(movieId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');

    if (bookmarks[movieId]) {
        delete bookmarks[movieId]; // 이미 북마크 된 경우 제거
    } else {
        bookmarks[movieId] = true; // 북마크 추가
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // 버튼 ui 업데이트
    const button = document.querySelector(`.bookmark-button[data-id="${movieId}"]`);
    if (button) {
        button.textContent = bookmarks[movieId] ? '❤️' : '🤍';
    }
}