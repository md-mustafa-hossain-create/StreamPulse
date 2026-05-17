import axios from "axios";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

export const fetchNowPlayingMovies = async () => {
  const response = await tmdbClient.get("/movie/now_playing", {
    params: { page: "1" },
  });

  return response?.data?.results ?? [];
};

export const fetchMovieTrailers = async (movieId) => {
  if (!movieId) return [];

  const response = await tmdbClient.get(`/movie/${movieId}/videos`, {
    params: { language: "en-US", page: "1" },
  });

  return response?.data?.results ?? [];
};
