import { useContext, useEffect, useState } from "react";
import SearchContext from "../../context/SearchContext";
import { SearchService } from "../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import { addRecentSearch } from "../../app/searchSlice";

import RecentSearch from "./RecentSearch";

const SearchBox = ({ submitLabel, searchFilter }) => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  useEffect(() => {
    const newFilter = async () => {
      const filtredArray = await SearchService({ q: searchValue });
      searchFilter(filtredArray);
      console.log(searchValue);
    };
    newFilter();
    // eslint-disable-next-line
  }, [searchValue]);

  //Recent Searches

  const recentSearch = useSelector((state) => state.search.recentSearch);
  const [showRecent, setShowRecent] = useState(false);
  const dispatch = useDispatch();
  const submitSearchForm = (e) => {
    e.preventDefault();
    dispatch(addRecentSearch(searchValue));
  };

  return (
    <div>
      <form onSubmit={submitSearchForm} className="flex items-center">
        <img
          src="./assets/icon-search.svg"
          alt="logo"
          className="w-9 h-9 mr-[-15px]"
        />
        <input
          className="mx-7 p-4 w-[90%] bg-transparent placeholder: text-xl outline-0"
          placeholder={submitLabel}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onClick={() => setShowRecent((prevState) => !prevState)}
        ></input>
      </form>

      {showRecent && (
        <div className="mx-7 p-4 h-[50px] w-[90%] bg-[#161D2F] placeholder: text-xl outline-0 static z-10 flex  rounded-xl">
          <small className="text-[#e75c5c]">Recent searches:</small>
          {recentSearch.slice(-5).map((recent) => (
            <RecentSearch recent={recent} key={recent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
