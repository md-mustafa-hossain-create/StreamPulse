const VideoTitle = ({ movieTitle, overview }) => {
  return (
    // NOTE: z-50 keeps this above the video layers; positioned from the bottom to avoid header overlap
    <div className="absolute bottom-[10%] md:bottom-[18%] left-0 px-6 md:px-12 lg:px-20 z-50 w-full max-w-xs md:max-w-xl lg:max-w-3xl">
      {/* "Now Playing" badge */}
      <div
        className="flex items-center gap-2 mb-3 md:mb-4"
        aria-label="Content label"
      >
        <span
          className="w-1 h-4 md:h-5 bg-brand-red rounded-full inline-block"
          aria-hidden="true"
        ></span>
        <p className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-gray-300">
          Now Playing
        </p>
      </div>

      {/* Movie title — scales from mobile (2xl) to desktop (6xl) */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-2 md:mb-4"
        style={{
          textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        {movieTitle}
      </h1>

      {/* Movie overview — hidden on mobile to save space, visible from md+ */}
      <p
        className="hidden md:block text-sm lg:text-base text-gray-100 leading-relaxed max-w-sm lg:max-w-lg line-clamp-2 lg:line-clamp-3 mb-5 md:mb-8"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.95)" }}
      >
        {overview}
      </p>

      {/* Action buttons */}
      <div
        className="flex items-center gap-3 md:gap-4"
        role="group"
        aria-label="Movie actions"
      >
        <button
          type="button"
          aria-label={`Play ${movieTitle}`}
          className="flex items-center gap-2 bg-white text-black font-bold
            text-sm md:text-base
            px-5 md:px-8 py-2 md:py-2.5
            rounded cursor-pointer
            hover:bg-white/75 active:scale-95
            transition-all duration-200"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
          Play
        </button>

        <button
          type="button"
          aria-label={`More information about ${movieTitle}`}
          className="flex items-center gap-2 bg-white/20 text-white font-semibold
            text-sm md:text-base
            px-5 md:px-8 py-2 md:py-2.5
            rounded cursor-pointer
            hover:bg-white/30 active:scale-95
            transition-all duration-200"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
