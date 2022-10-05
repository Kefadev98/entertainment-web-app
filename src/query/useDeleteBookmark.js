import { useMutation, useQueryClient } from "react-query";
import { deleteBookmark } from "../services/Services";

export default function useBookmarkMutationDelete() {
  const queryClient = useQueryClient();
  return useMutation(deleteBookmark, {
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries(["bookmark", newBookmark.id]);
      const previousBookmark = queryClient.getQueryData([
        "bookmark",
        newBookmark.id,
      ]);
      queryClient.setQueryData(["bookmark", newBookmark.id], newBookmark);
      return { previousBookmark, newBookmark };
    },
    onError: (_err, _newBookmark, context) => {
      queryClient.setQueryData(
        ["bookmark", context.newBookmark.id],
        context.previousBookmark
      );
    },
    onSettled: (newBookmark) => {
      queryClient.invalidateQueries(["bookmark", newBookmark.id]);
    },
  });
}
