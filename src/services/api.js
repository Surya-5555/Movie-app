const API_KEY = "eb6c56a3c1125265d6afe4774673001b";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => { // Fetch popular movies
        const response = await fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        return data.results;
};

export const searchMovies = async (query) => { // Search for movies by title
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
};