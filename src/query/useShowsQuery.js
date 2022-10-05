import { useQuery } from "react-query";
import { getShows } from "../services/Services";

export default function useShows() {
  return useQuery(["shows"], getShows, {
    onSuccess: (data) =>
      console.log(`Perform side effect after data fetching`, data),
    onError: (error) => console.error(`Something went wrong ${error.message}`),
  });
}
