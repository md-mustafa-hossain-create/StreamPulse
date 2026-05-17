import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TMDB_IMAGE_BASE_URL } from "../../../lib/tmdb";

const VideoBackground = ({ movieTitle, backdropPath }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] bg-brand-black">
      <img
        src={TMDB_IMAGE_BASE_URL + backdropPath}
        alt="Movie backdrop"
        className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out ${
          isVideoLoaded ? "md:opacity-0" : "opacity-100"
        }`}
      />

      <iframe
        className="hidden md:block w-full aspect-video scale-125 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&playlist=" +
          trailerVideo?.key +
          "&vq=hd1080"
        }
        title={`${movieTitle} trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameBorder="0"
      ></iframe>

      <div
        className="absolute inset-0 z-20 bg-linear-to-r from-brand-black/80 via-brand-black/30 to-transparent md:from-brand-black/70 md:via-brand-black/20 md:to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackground;
