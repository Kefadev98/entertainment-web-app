import { useContext, useState } from "react";
import BookmarkContext from "../../context/BookmarkContext";
import { getRecommend } from "../../services/Services";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";

const Recommended = () => {
  const { addToBookmark } = useContext(BookmarkContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendBookmark, setRecommendBookmark] = useState(false);

  const {
    data: response,
    isPreviousData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(["response", currentPage], () => getRecommend(currentPage), {
    keepPreviousData: true,
  });

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {isError && <p>Error: {error.message}</p>}
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <ClipLoader color={"#FC4747"} size={150} />
        </div>
      ) : (
        <h1 className="text-3xl m-5">Recommended for you</h1>
      )}

      {isSuccess && (
        <div className="flex flex-wrap">
          {response?.data?.map((recommended) => (
            <div key={recommended.id} className="flex flex-col-reverse">
              <div className="ml-8 cursor-pointer text-lg">
                <div className="flex text-gray-400">
                  <p className="font-light  ">{recommended?.year} •</p>
                  {recommended?.category?.name === "Movie" ? (
                    <div className="flex align-center justify-evenly w-[90px] ">
                      <img
                        src="./assets/icon-category-movie.svg"
                        alt="/"
                        className="w-[17px] h-[17px] m-1"
                      />
                      <p className="font-extralight">
                        {recommended?.category?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex align-center justify-around w-[120px] ">
                      <img
                        src="./assets/icon-category-tv.svg"
                        alt="/"
                        className="w-[17px] h-[17px] m-1"
                      />
                      <p className="font-light mr-1">
                        {recommended?.category?.name}
                      </p>
                    </div>
                  )}

                  <p className="font-light ">• {recommended?.rating}</p>
                </div>
                <h1 className="text-xl">{recommended?.title}</h1>
              </div>
              {recommended?.images?.slice(2, 3).map((image) => (
                <div className="m-8 relative " key={recommended.id}>
                  <img
                    src={image?.path}
                    alt="/"
                    className="rounded-xl w-[350px]"
                  />
                  <div
                    className="absolute top-3 right-4 w-[30px] h-[30px] bg-slate-500 flex items-center justify-center rounded-full opacity-75 z-10 cursor-pointer"
                    onClick={() => setRecommendBookmark(true)}
                  >
                    {recommendBookmark ? (
                      <img src="./assets/icon-bookmark-full.svg" alt="/" />
                    ) : (
                      <img
                        src="./assets/icon-bookmark-empty.svg"
                        alt="/"
                        onClick={() => addToBookmark(recommended.id)}
                      />
                    )}
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 ease-in duration-200">
                    <div className="flex items-center w-30 bg-slate-500 rounded-2xl py-2 px-5 opacity-80 z-10 cursor-pointer">
                      <img
                        src="./assets/icon-play.svg"
                        alt="/"
                        className="mr-2"
                      />
                      <p>Play</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="w-full flex justify-evenly my-10">
            <button
              onClick={previousPage}
              disabled={isPreviousData || currentPage === 1}
              className="text-xl w-[160px] h-[60px] bg-[#161D2F] rounded-lg hover:bg-[#FC4747] ease-in duration-300"
            >
              Previous Page
            </button>
            <div className="w-[60px] h-[60px] bg-[#161D2F] text-center rounded-md ">
              <p className="text-xl mt-4">{currentPage}</p>
            </div>
            <button
              onClick={nextPage}
              disabled={isPreviousData || currentPage === response?.last_page}
              className="text-xl w-[160px] h-[60px] bg-[#161D2F] rounded-lg hover:bg-[#FC4747] ease-in duration-300"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommended;
