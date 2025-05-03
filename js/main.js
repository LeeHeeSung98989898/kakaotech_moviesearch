import { fetchMovies, fetchPopularMovies } from './api.js';
import { renderMovies, showModal, hideModal } from './ui.js';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieList = document.getElementById('movieList');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

window.addEventListener('DOMContentLoaded', async () => {
    const movies = await fetchPopularMovies();
    renderMovies(movies, movieList);
});

async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    const movies = await fetchMovies(query);
    renderMovies(movies, movieList);
}

searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

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

closeModal.addEventListener('click', hideModal);
modal.addEventListener('click', e => {
    if (e.target === modal) hideModal();
});

function toggleBookmark(movieId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');

    if (bookmarks[movieId]) {
        delete bookmarks[movieId];
    } else {
        bookmarks[movieId] = true;
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    const button = document.querySelector(`.bookmark-button[data-id="${movieId}"]`);
    if (button) {
        button.textContent = bookmarks[movieId] ? '❤️' : '🤍';
    }
}