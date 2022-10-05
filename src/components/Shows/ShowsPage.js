import SideBar from "../Elements/SideBar";
import ShowsList from "./ShowsList";
import SearchBox from "../Elements/SearchBox";
import SearchContext from "../../context/SearchContext";
import NewFilterData from "../Elements/NewFilterData";
import { useContext } from "react";
import useShows from "../../query/useShowsQuery";
import { Helmet } from "react-helmet";
import ClipLoader from "react-spinners/ClipLoader";

const ShowsPage = () => {
  const { searchFilter, filteredData, searchValue } = useContext(SearchContext);
  const { data: shows, isLoading, isError, error } = useShows();

  return (
    <div className="flex justify-around mt-10">
      <Helmet>
        <title>TV Series</title>
        <meta name="description" content="Explore new TV Series" />
      </Helmet>
      <SideBar />
      <div className="w-[90%] ml-[150px]">
        <SearchBox
          submitLabel="Search for a TV series"
          searchFilter={searchFilter}
        />
        {searchValue.length < 3 ? (
          <div>
            {isLoading ? (
              <div className="fixed inset-0 flex items-center justify-center z-10">
                <ClipLoader color={"#FC4747"} size={150} />
              </div>
            ) : (
              <h1 className="text-3xl m-5">TV Series</h1>
            )}
            {isError && <p className="text-3xl m-5">Error: {error.message}</p>}
            <div className="flex flex-wrap">
              {shows?.data.map((shows) => (
                <ShowsList shows={shows} key={shows.id} />
              ))}
            </div>
          </div>
        ) : (
          <NewFilterData filteredData={filteredData} />
        )}
      </div>
    </div>
  );
};

export default ShowsPage;
