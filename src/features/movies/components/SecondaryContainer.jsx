import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  console.log(movies);

  return (
    <div className="relative z-30 -mt-16 md:-mt-36">
      <div className="h-20 md:h-32 bg-linear-to-b from-transparent to-brand-black" />

      <div className="bg-brand-black relative z-40 px-6 md:px-12 lg:px-20">
        <h2 className="text-xl md:text-3xl font-bold text-white  mb-6 drop-shadow-md">
          Now Playing
        </h2>

        <div className="flex gap-4 overflow-x-auto no-scrollbar p-5">
          {movies?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>

        <div className="h-screen" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
