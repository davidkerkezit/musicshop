import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  inStock: number;
  category: string;
}

interface CartState {
  cartItems: CartItem[];
  isVisible: boolean | null;
  totalPrice: number;
}

let initialCartItems: CartItem[] = [];
let initialTotalPrice: number = 0;
if (typeof window !== "undefined") {
  const cartItemsFromStorage = localStorage.getItem("cart");
  initialCartItems = cartItemsFromStorage
    ? JSON.parse(cartItemsFromStorage)
    : [];
  let cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  initialTotalPrice = cartItems.reduce(
    (total: number, item: { quantity: number; price: number }) =>
      total + item.quantity * item.price,
    0
  );
}

const initialState: CartState = {
  cartItems: initialCartItems,
  isVisible: null,
  totalPrice: initialTotalPrice,
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
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseItemCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (
        existingItemIndex !== -1 &&
        state.cartItems[existingItemIndex].quantity > 0
      ) {
        state.cartItems[existingItemIndex].quantity -= quantity;
        if (state.cartItems[existingItemIndex].quantity === 0) {
          state.cartItems.splice(existingItemIndex, 1);
        }
        state.totalPrice = state.cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    removeProductFromCart: (state, action: PayloadAction<CartItem>) => {
      const { productId } = action.payload;
      const newArray = state.cartItems.filter(
        (item) => item.productId !== productId
      );
      state.cartItems = newArray;
      state.totalPrice = newArray.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      localStorage.setItem("cart", JSON.stringify(newArray)); // Save an empty array to localStorage
    },
    emptyCart: (state) => {
      state.totalPrice = 0;
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([])); // Save an empty array to localStorage
    },
  },
});

export const {
  hideCart,
  showCart,
  toggleCart,
  addItemToCart,
  decreaseItemCart,
  emptyCart,
  removeProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
