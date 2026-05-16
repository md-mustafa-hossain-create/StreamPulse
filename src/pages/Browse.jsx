import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import HeroSection from "../components/browse/HeroSection";
import SecondaryContainer from "../components/browse/SecondaryContainer";

const Browse = () => {
  // Fetching movie data on mount via custom hooks
  useNowPlayingMovies();

  return (
    <div className="w-full bg-brand-black text-white">
      <HeroSection />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
