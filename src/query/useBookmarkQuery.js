import { useQuery } from "react-query";
import { getBookmark } from "../services/Services";

export default function useBookmark() {
  return useQuery(["bookmark"], getBookmark, {
    onSuccess: (data) =>
      console.log(`Perform side effect after data fetching`, data),
    onError: (error) => console.error(`Something went wrong ${error.message}`),
  });
}
