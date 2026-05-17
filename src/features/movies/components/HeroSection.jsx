import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import useMovieTrailer from "../hooks/useMovieTrailer";

const HeroSection = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  const [randomSeed] = useState(() => Math.random());

  const mainMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    const randomIndex = Math.floor(randomSeed * movies.length);
    return movies[randomIndex];
  }, [movies, randomSeed]);

  useMovieTrailer(mainMovie?.id);

  if (!mainMovie) return null;

  const { title, overview, backdrop_path: backdropPath } = mainMovie;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-brand-black">
      <VideoTitle movieTitle={title} overview={overview} />
      <VideoBackground movieTitle={title} backdropPath={backdropPath} />
    </div>
  );
};

export default HeroSection;
