import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useMovieTrailers from "../../hooks/useMovieTrailer";

const HeroSection = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);

  // 1. Create a stable random "seed" exactly once when the component mounts.
  // This satisfies the "Purity" rule because Math.random() is only called once.
  const [randomSeed] = useState(() => Math.random());

  // 2. Use that stable seed to pick a movie whenever the movies list updates.
  // This satisfies the "Performance" rule by avoiding extra useEffect renders.
  const mainMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    const randomIndex = Math.floor(randomSeed * movies.length);
    return movies[randomIndex];
  }, [movies, randomSeed]);

  // Fetch trailer for the specifically selected random movie
  useMovieTrailers(mainMovie?.id);

  if (!mainMovie) return null;

  const { title, overview, id, backdrop_path } = mainMovie;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-brand-black">
      <VideoTitle movieTitle={title} overview={overview} id={id} />
      <VideoBackground movieTitle={title} backdropPath={backdrop_path} />
    </div>
  );
};

export default HeroSection;
