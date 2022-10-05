import SideBar from "../Elements/SideBar";
import SearchBox from "../Elements/SearchBox";
import BookmarkList from "./BookmarkList";
import { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import NewFilterData from "../Elements/NewFilterData";
import useBookmark from "../../query/useBookmarkQuery";
import { Helmet } from "react-helmet";
import ClipLoader from "react-spinners/ClipLoader";

const BookmarkPage = () => {
  const { searchFilter, filteredData, searchValue } = useContext(SearchContext);
  const { data: bookmarks, isLoading, isError, error } = useBookmark();

  return (
    <div className="flex justify-around mt-10">
      <Helmet>
        <title>Bookmarks</title>
        <meta name="description" content="Movies and TV series bookmarks" />
      </Helmet>
      <SideBar />
      <div className="w-[90%] ml-[150px]">
        <SearchBox
          submitLabel="Search for bookmarked shows"
          searchFilter={searchFilter}
        />
        {searchValue.length < 3 ? (
          <div>
            {isLoading ? (
              <div className="fixed inset-0 flex items-center justify-center z-10">
                <ClipLoader color={"#FC4747"} size={150} />
              </div>
            ) : (
              <h1 className="text-3xl m-5">Bookmarks</h1>
            )}
            {isError && <p className="text-3xl m-5">Error: {error.message}</p>}
            <div className="flex flex-wrap">
              {bookmarks?.data.map((bookmark) => (
                <BookmarkList bookmark={bookmark} key={bookmark.id} />
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

export default BookmarkPage;
