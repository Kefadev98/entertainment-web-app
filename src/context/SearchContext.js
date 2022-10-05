import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  //Funkcija koja setuje podatke u globalni state
  const searchFilter = (data) => {
    setFilteredData(data);
  };

  return (
    <SearchContext.Provider
      value={{
        filteredData,
        setFilteredData,
        searchFilter,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
