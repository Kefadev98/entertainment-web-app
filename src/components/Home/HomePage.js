import Recommended from "./Recommended";
import SideBar from "../Elements/SideBar";
import TrendingShows from "./TrendingShows";
import SearchBox from "../Elements/SearchBox";
import SearchContext from "../../context/SearchContext";
import NewFilterData from "../Elements/NewFilterData";
import { useContext } from "react";
import useTrending from "../../query/useTrendingQuery";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import ClipLoader from "react-spinners/ClipLoader";

const HomePage = () => {
  const slider = useRef(null);

  const slideLeft = () => {
    const slide = slider.current;
    slide.scrollLeft = slide.scrollLeft - 800;
  };
  const slideRight = () => {
    const slide = slider.current;
    slide.scrollLeft = slide.scrollLeft + 800;
  };

  const { searchFilter, filteredData, searchValue } = useContext(SearchContext);
  const { data: trending, isLoading, isError, error } = useTrending();

  return (
    <div className="flex justify-around mt-10 overflow-hidden">
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Explore new trendings and recommended"
        />
      </Helmet>
      <SideBar />
      <div className="w-[90%] ml-[150px]">
        <SearchBox
          submitLabel="Search for Movies or TV series"
          searchFilter={searchFilter}
        />

        <div className="mb-20">
          {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <ClipLoader color={"#FC4747"} size={150} />
            </div>
          ) : (
            <h1 className="text-3xl m-5">Trending</h1>
          )}
          {isError && <p className="text-3xl m-5">Error: {error.message}</p>}
          <div className="flex">
            {isLoading ? (
              ""
            ) : (
              <MdChevronLeft
                size={80}
                onClick={slideLeft}
                className="translate-y-20 opacity-20 cursor-pointer hover:opacity-100 ease-in duration-200"
              />
            )}
            <div
              ref={slider}
              className="overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              <div className="flex w-[150%] justify-around m-1">
                {trending?.data?.map((trend) => (
                  <TrendingShows trend={trend} key={trend.id} />
                ))}
              </div>
            </div>
            {isLoading ? (
              ""
            ) : (
              <MdChevronRight
                size={80}
                onClick={slideRight}
                className="translate-y-20 opacity-20 cursor-pointer hover:opacity-100 ease-in duration-200"
              />
            )}
          </div>
        </div>

        {searchValue.length < 3 ? (
          <Recommended />
        ) : (
          <NewFilterData filteredData={filteredData} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
