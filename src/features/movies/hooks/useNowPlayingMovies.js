import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../movieSlice";
import { fetchNowPlayingMovies } from "../../../lib/tmdb";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const movies = await fetchNowPlayingMovies();
        dispatch(addNowPlayingMovies(movies));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useNowPlayingMovies;
