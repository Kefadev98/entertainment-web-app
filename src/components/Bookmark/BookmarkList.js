import { useContext } from "react";
import BookmarkContext from "../../context/BookmarkContext";

const BookmarkList = ({ bookmark }) => {
  const { removeBookmark } = useContext(BookmarkContext);

  return (
    <div className="flex flex-wrap">
      <div key={bookmark.id} className="flex flex-col-reverse">
        <div className="ml-8 cursor-pointer text-lg">
          <div className="flex text-gray-400">
            <p className="font-light  ">{bookmark?.show?.year} •</p>

            {bookmark.category?.name === "Movie" ? (
              <div className="flex align-center justify-evenly w-[90px] ">
                <img
                  src="./assets/icon-category-movie.svg"
                  alt="/"
                  className="w-[17px] h-[17px] m-1"
                />
                <p className="font-extralight">
                  {bookmark.show?.category?.name}
                </p>
              </div>
            ) : (
              <div className="flex align-center justify-around w-[120px] ">
                <img
                  src="./assets/icon-category-movie.svg"
                  alt="/"
                  className="w-[17px] h-[17px] m-1"
                />
                <p className="font-light mr-1">
                  {bookmark.show?.category?.name}
                </p>
              </div>
            )}

            <p className="font-light ">• {bookmark.show?.rating}</p>
          </div>
          <h1 className="text-xl">{bookmark.show?.title}</h1>
        </div>
        {bookmark.show?.images?.slice(2, 3).map((image) => (
          <div className="m-8 relative " key={bookmark.id}>
            <img src={image?.path} alt="/" className="rounded-xl w-[360px]" />

            <div
              className="absolute top-3 right-4 w-[30px] h-[30px] bg-slate-500 flex items-center justify-center rounded-full opacity-75 z-10 cursor-pointer"
              onClick={() => removeBookmark(bookmark.id)}
            >
              <img src="./assets/icon-bookmark-full.svg" alt="/" />
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

export default BookmarkList;
