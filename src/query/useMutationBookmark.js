import { useMutation, useQueryClient } from "react-query";
import { postBookmark } from "../services/Services";

export default function useBookmarkMutationPost() {
  const queryClient = useQueryClient();
  return useMutation(postBookmark, {
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries(["bookmark", newBookmark]);
      const previousBookmark = queryClient.getQueryData([
        "bookmark",
        newBookmark,
      ]);
      queryClient.setQueryData(["bookmark", newBookmark], newBookmark);
      return { previousBookmark };
    },
    onError: (_err, _newBookmark, context) => {
      queryClient.setQueryData(
        ["bookmark", context.newBookmark],
        context.previousBookmark
      );
    },
    onSettled: (newBookmark) => {
      queryClient.invalidateQueries(["bookmark", newBookmark]);
    },
  });
}
