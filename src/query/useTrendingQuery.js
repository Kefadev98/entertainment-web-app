import { useQuery } from "react-query";
import { getTrending } from "../services/Services";

export default function useTrending() {
  return useQuery(["trending"], getTrending, {
    onSuccess: (data) =>
      console.log(`Perform side effect after data fetching`, data),
    onError: (error) => console.error(`Something went wrong ${error.message}`),
  });
}
