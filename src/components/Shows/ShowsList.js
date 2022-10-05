import { useContext, useState } from "react";
import BookmarkContext from "../../context/BookmarkContext";

const ShowsList = ({ shows }) => {
  const { addToBookmark } = useContext(BookmarkContext);
  const [showBookmark, setShowBookmark] = useState(false);

  return (
    <div className="flex flex-wrap">
      <div key={shows.id} className="flex flex-col-reverse">
        <div className="ml-8 cursor-pointer text-lg ">
          <div className="flex text-gray-400">
            <p className="font-light  ">{shows.year} •</p>
            <div className="flex align-center justify-around w-[120px] ">
              <img
                src="./assets/icon-category-tv.svg"
                alt="/"
                className="w-[17px] h-[17px] m-1"
              />
              <p className="font-light mr-1">{shows.category.name}</p>
            </div>
            <p className="font-light">• {shows.rating}</p>
          </div>
          <h1 className="text-xl">{shows.title}</h1>
        </div>
        {shows.images.slice(2, 3).map((image) => (
          <div className="m-8 relative " key={shows.id}>
            <img src={image.path} alt="/" className="rounded-xl w-[350px]" />
            <div
              className="absolute top-3 right-4 w-[30px] h-[30px] bg-slate-500 flex items-center justify-center rounded-full opacity-75 z-10 cursor-pointer"
              onClick={() => setShowBookmark(true)}
            >
              {showBookmark ? (
                <img src="./assets/icon-bookmark-full.svg" alt="/" />
              ) : (
                <img
                  src="./assets/icon-bookmark-empty.svg"
                  alt="/"
                  onClick={() => addToBookmark(shows.id)}
                />
              )}
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 ease-in duration-200">
              <div className="flex items-center w-30 bg-slate-500 rounded-2xl py-2 px-5 opacity-80 z-10 cursor-pointer">
                <img src="./assets/icon-play.svg" alt="/" className="mr-2" />
                <p>Play</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowsList;
