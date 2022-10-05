const TrendingShows = ({ trend }) => {
  return (
    <div key={trend.id}>
      {trend.images.slice(4, 5).map((image) => (
        <div className="mr-2 relative" key={image.id}>
          <img src={image.path} alt="/" className="rounded-xl w-[450px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center opacity-0 rounded-xl hover:opacity-100 ease-in duration-200">
            <div className="flex items-center w-30 bg-slate-500 rounded-2xl py-2 px-5 opacity-80 z-10 cursor-pointer">
              <img src="./assets/icon-play.svg" alt="/" className="mr-2" />
              <p>Play</p>
            </div>
          </div>
          <div className="absolute top-3 right-4 w-[30px] h-[30px] bg-slate-500 flex items-center justify-center rounded-full opacity-75">
            <img src="./assets/icon-bookmark-empty.svg" alt="/" />
          </div>
          <div className="absolute top-2/4 left-2">
            <div className="flex">
              <p className="font-light">{trend.year} •</p>
              <p className="ml-2 mr-2">{trend.category.name}</p>
              <p className="font-light">• {trend.rating}</p>
            </div>
            <h1 className="text-lg">{trend.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingShows;
