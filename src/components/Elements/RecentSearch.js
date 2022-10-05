import React from "react";
import SearchContext from "../../context/SearchContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { removeRecentSearch } from "../../app/searchSlice";
import { BiTrash } from "react-icons/bi";

const RecentSearch = ({ recent }) => {
  const dispatch = useDispatch();

  const removeSearchValue = (e) => {
    e.preventDefault();
    dispatch(removeRecentSearch(recent));
  };

  const { setSearchValue } = useContext(SearchContext);

  return (
    <ul className="flex">
      <li
        className="capitalize cursor-pointer ml-5 text-[#93969e] hover:text-[#FFF]"
        onClick={() => setSearchValue(recent)}
      >
        {recent}
      </li>
      <button
        onClick={removeSearchValue}
        className="ml-2 mt-1 text-[#93969e]  hover:text-[#fa7d7d]"
      >
        <BiTrash />
      </button>
    </ul>
  );
};

export default RecentSearch;
