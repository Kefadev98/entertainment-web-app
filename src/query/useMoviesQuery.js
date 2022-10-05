import { useQuery } from "react-query";
import { getMovies } from "../services/Services";

export default function useMovies() {
  return useQuery(["movies"], getMovies, {
    onSuccess: (data) =>
      console.log(`Perform side effect after data fetching`, data),
    onError: (error) => console.error(`Something went wrong ${error.message}`),
  });
}
