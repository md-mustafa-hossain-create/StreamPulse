import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import movieReducer from "../features/movies/movieSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },
});

export default appStore;
