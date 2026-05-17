import { TMDB_IMAGE_BASE_URL } from "../../../lib/tmdb";
import { Star } from "lucide-react";

const MovieCard = ({ movie }) => {
  const { 
    title: movieTitle, 
    poster_path, 
    backdrop_path, 
    vote_average, 
    release_date 
  } = movie;

  // Fallback to backdrop_path if poster_path is missing, or return null if both are missing
  const imagePath = poster_path || backdrop_path;
  if (!imagePath) return null;

  // Extract the release year
  const releaseYear = release_date ? release_date.split("-")[0] : "";

  // Format rating to a single decimal place
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";

  return (
    <div className="relative min-w-[140px] md:min-w-[190px] aspect-2/3 group cursor-pointer rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-500 ease-out hover:border-brand-red/40">
      {/* Movie Poster Image with Hover Zoom */}
      <img
        src={TMDB_IMAGE_BASE_URL + imagePath}
        alt={`${movieTitle} Poster`}
        className="w-full h-full object-cover aspect-2/3 transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Cinematic Dark Overlay Vignette */}
      <div 
        className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 z-10"
        aria-hidden="true"
      />

      {/* Info Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20 flex flex-col gap-1 md:gap-1.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        {/* Rating and Release Year Row */}
        <div className="flex items-center gap-2">
          {vote_average > 0 && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-[10px] md:text-xs font-bold text-amber-400">
              <Star size={10} className="fill-amber-400" />
              <span>{rating}</span>
            </div>
          )}
          {releaseYear && (
            <span className="text-[10px] md:text-xs text-gray-400 font-semibold">
              {releaseYear}
            </span>
          )}
        </div>

        {/* Movie Title */}
        <h3 className="text-xs md:text-sm font-bold text-white tracking-wide leading-snug line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {movieTitle}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
