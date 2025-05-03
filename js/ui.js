import { fetchMovieDetails, IMG_URL } from './api.js';

export function renderMovies(movies, container) {
    container.innerHTML = '';
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');

    movies.forEach(movie => {
        const isBookmarked = bookmarks[movie.id];

        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.id = movie.id;

        card.innerHTML = `
      <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/200x300'}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
        <button class="bookmark-button" data-id="${movie.id}">
          ${isBookmarked ? '❤️' : '🤍'}
        </button>
      </div>
    `;

        container.appendChild(card);
    });
}

export async function showModal(movieId) {
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modalDetails');
    const movie = await fetchMovieDetails(movieId);
    modalDetails.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview || '줄거리가 없습니다.'}</p>
  `;
    modal.classList.remove('hidden');
}

export function hideModal() {
    document.getElementById('modal').classList.add('hidden');
}