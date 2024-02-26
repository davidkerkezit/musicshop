import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  products: any[];
}

const initialState: ProductsState = {
  products: [],
};
export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    productsUpdate: (
      state: ProductsState,
      action: PayloadAction<{ products: any[] } | null>
    ) => {
      if (action.payload) {
      }
    },
  },
});

export const { productsUpdate } = productsSlice.actions;
export default productsSlice.reducer;
