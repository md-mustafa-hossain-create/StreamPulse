import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../movieSlice";
import { fetchMovieTrailers } from "../../../lib/tmdb";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieTrailer = async () => {
      try {
        const videos = await fetchMovieTrailers(movieId);
        const trailer = videos.find((video) => video.type === "Trailer");
        dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Failed to fetch trailers:", error);
      }
    };

    if (movieId) {
      getMovieTrailer();
    }
  }, [dispatch, movieId]);
};

export default useMovieTrailer;
