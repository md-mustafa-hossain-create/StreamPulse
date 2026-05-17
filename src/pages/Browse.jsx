import {
  HeroSection,
  SecondaryContainer,
  useNowPlayingMovies,
} from "../features/movies";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className="w-full bg-brand-black text-white">
      <HeroSection />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
