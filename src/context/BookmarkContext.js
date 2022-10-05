import { createContext, useState } from "react";
import useBookmarkMutationPost from "../query/useMutationBookmark";
import useBookmarkMutationDelete from "../query/useDeleteBookmark";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [newBookmark, setNewBookmark] = useState([]);
  const { mutate: bookmarkAdd } = useBookmarkMutationPost();
  const { mutate: bookmarkDelete } = useBookmarkMutationDelete();

  const toggleBookmark = (show_id) => {
    setNewBookmark((prevState) => [...prevState, show_id]);
    console.log(show_id);
    console.log(newBookmark);
  };

  //Funkcija koja komunicira sa serverom, u kojoj pozivamo BookmarkService koji salje POST request
  const addToBookmark = (id) => {
    bookmarkAdd({ show_id: id });
    toggleBookmark(id);
  };

  const removeBookmark = (id) => {
    setNewBookmark((prevState) => [...prevState, id]);
    bookmarkDelete(id);
  };

  return (
    <BookmarkContext.Provider
      value={{
        newBookmark,
        toggleBookmark,
        addToBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkContext;
