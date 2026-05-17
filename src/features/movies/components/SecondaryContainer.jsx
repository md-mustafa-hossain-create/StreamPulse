const SecondaryContainer = () => {
  return (
    <div className="relative z-30 -mt-25 md:-mt-52">
      <div className="h-20 md:h-32 bg-linear-to-b from-transparent to-brand-black" />

      <div className="bg-brand-black relative z-40 px-6 md:px-12 lg:px-20">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-6 drop-shadow-md">
          Now Playing
        </h2>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="min-w-[140px] md:min-w-[200px] aspect-2/3 bg-white/5 border border-white/10 rounded-lg animate-pulse"
            />
          ))}
        </div>

        <div className="h-screen" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
