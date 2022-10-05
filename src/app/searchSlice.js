import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentSearch: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addRecentSearch: (state, action) => {
      state.recentSearch = [...state.recentSearch, action.payload];
    },
    removeRecentSearch: (state, action) => {
      const index = state.recentSearch.indexOf(action.payload);
      if (index > -1) {
        state.recentSearch.splice(index, 1);
      }
    },
  },
});

export const { addRecentSearch, removeRecentSearch } = searchSlice.actions;
export default searchSlice.reducer;
