import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchSlider = createSlice({
  name: "searchSlider",
  initialState: null as boolean | null,
  reducers: {
    hideSearch: () => {
      return false;
    },
    showSearch: () => {
      return true;
    },
    toogleSearch: (state) => {
      if (state === null) {
        return true;
      } else {
        return !state;
      }
    },
  },
});

export const { hideSearch, showSearch, toogleSearch } = searchSlider.actions;
export default searchSlider.reducer;
