import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/slices/movieSlice";
import { TMDB_API_BASE_OPTIONS, TMDB_ENDPOINTS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const response = await axios({
        ...TMDB_API_BASE_OPTIONS,
        url: TMDB_ENDPOINTS.NOW_PLAYING,
      });

      console.log(response?.data?.results);
      dispatch(addNowPlayingMovies(response?.data?.results));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
