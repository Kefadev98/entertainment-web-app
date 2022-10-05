import SearchBox from "../Elements/SearchBox";
import SideBar from "../Elements/SideBar";
import MovieList from "./MovieList";
import NewFilterData from "../Elements/NewFilterData";
import { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import useMovies from "../../query/useMoviesQuery";
import { Helmet } from "react-helmet";
import ClipLoader from "react-spinners/ClipLoader";

const MoviePage = () => {
  const { searchFilter, filteredData, searchValue } = useContext(SearchContext);
  const { data: movies, isLoading, isError, error } = useMovies();

  return (
    <div className="flex justify-around mt-10">
      <Helmet>
        <title>Movies</title>
        <meta name="description" content="Explore new movies" />
      </Helmet>
      <SideBar />
      <div className="w-[90%] ml-[150px]">
        <SearchBox
          submitLabel="Search for a movie"
          searchFilter={searchFilter}
        />
        {searchValue.length < 3 ? (
          <div>
            {isLoading ? (
              <div className="fixed inset-0 flex items-center justify-center z-10">
                <ClipLoader color={"#FC4747"} size={150} />
              </div>
            ) : (
              <h1 className="text-3xl m-5">Movies</h1>
            )}
            {isError && <p className="text-3xl m-5">Error: {error.message}</p>}
            <div className="flex flex-wrap">
              {movies?.data.map((movie) => (
                <MovieList movie={movie} key={movie.id} />
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

export default MoviePage;
