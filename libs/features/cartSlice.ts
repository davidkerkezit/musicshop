import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "searchSlider",
  initialState: null as boolean | null,
  reducers: {
    hideCart: () => {
      return false;
    },
    showCart: () => {
      return true;
    },
    toogleCart: (state) => {
      if (state === null) {
        return true;
      } else {
        return !state;
      }
    },
  },
});

export const { hideCart, showCart, toogleCart } = cartSlice.actions;
export default cartSlice.reducer;
