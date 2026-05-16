import { useEffect } from "react";
import axios from "axios";
import { TMDB_API_BASE_OPTIONS, TMDB_ENDPOINTS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/slices/movieSlice";

const useMovieTrailers = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailers = async () => {
    if (!movieId) return;
    try {
      const response = await axios({
        ...TMDB_API_BASE_OPTIONS,
        url: TMDB_ENDPOINTS.GET_TRAILER(movieId),
        params: { language: "en-US" },
      });

      const trailer = response?.data?.results.find((v) => v.type === "Trailer");

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch trailers:", error);
    }
  };

  useEffect(() => {
    getMovieTrailers();
  }, [movieId]);
};

export default useMovieTrailers;
