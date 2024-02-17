import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  isVisible: boolean | null;
}

let initialCartItems: CartItem[] = [];

if (typeof window !== "undefined") {
  const cartItemsFromStorage = localStorage.getItem("cart");
  initialCartItems = cartItemsFromStorage
    ? JSON.parse(cartItemsFromStorage)
    : [];
}

const initialState: CartState = {
  cartItems: initialCartItems,
  isVisible: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hideCart: (state) => {
      state.isVisible = false;
    },
    showCart: (state) => {
      state.isVisible = true;
    },
    toggleCart: (state) => {
      if (state.isVisible === null) {
        state.isVisible = true;
      } else {
        state.isVisible = !state.isVisible;
      }
    },
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      // Existing product
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseItemCart: (state, action: PayloadAction<CartItem>) => {
      const { productId } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity -= action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  hideCart,
  showCart,
  toggleCart,
  addItemToCart,
  decreaseItemCart,
} = cartSlice.actions;

export default cartSlice.reducer;
