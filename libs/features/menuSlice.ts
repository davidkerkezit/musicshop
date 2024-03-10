import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState: null as boolean | null,
  reducers: {
    hideMenu: () => {
      return false;
    },
    showMenu: () => {
      return true;
    },
    toogleMenu: (state) => {
      if (state === null) {
        return true;
      } else {
        return !state;
      }
    },
  },
});

export const { hideMenu, showMenu, toogleMenu } = menuSlice.actions;
export default menuSlice.reducer;
