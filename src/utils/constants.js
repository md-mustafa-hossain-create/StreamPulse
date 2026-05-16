import authBackground from "../assets/authBackground-bg.jpg";

export const APP_NAME = "StreamPulse";

export const ROUTES = {
  HOME: "/",
  BROWSE: "/browse",
};

export const BG_IMAGE_URL = authBackground;

export const NAV_ITEMS = ["Home", "Tv Shows", "Movies", "New & Popular"];

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: "Email is not valid",
  PASSWORD_INVALID: "Password is not valid",
};

export const AUTH_ERRORS = {
  INVALID_EMAIL: "auth/invalid-email",
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  EMAIL_IN_USE: "auth/email-already-in-use",
  WEAK_PASSWORD: "auth/weak-password",
  NETWORK_FAILED: "auth/network-request-failed",
};

export const AUTH_ERROR_MESSAGES = {
  INVALID_EMAIL: "That email address doesn't look right.",
  INVALID_CREDENTIALS: "Incorrect email or password. Please try again.",
  EMAIL_IN_USE: "This email is already registered. Try signing in instead!",
  WEAK_PASSWORD: "Your password is too weak. Try at least 8 characters.",
  NETWORK_ERROR: "Check your internet connection and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
};

export const TMDB_API_BASE_OPTIONS = {
  method: "GET",
  params: { page: "1" },

  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjk0ZWQ3ZjVjMTA4ZmFmYTMwZGY4YTkxNTNhY2E5NSIsIm5iZiI6MTc3ODQzNDkwOC43ODU5OTk4LCJzdWIiOiI2YTAwYzM1YzNlOTg0YjkzNjZlYzIzNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L3CE7ZrSTjkM8CLbnsFwSjkDYSVKzKoDyTA0FB2ZMj8",
  },
};

export const TMDB_ENDPOINTS = {
  NOW_PLAYING: "https://api.themoviedb.org/3/movie/now_playing",

  GET_TRAILER: (movieId) =>
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
};
