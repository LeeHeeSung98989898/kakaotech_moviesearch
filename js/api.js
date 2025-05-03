import { API_KEY } from './config.js';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

export async function fetchPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

export async function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    const res = await fetch(url);
    return await res.json();
}

export { IMG_URL };