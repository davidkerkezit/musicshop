import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";
import { ProductType, checkoutType } from "../types";

interface OrdersState {
  selectedOrdersCategory: CartItem[];
  allOrders: CartItem[];
  inProccess: CartItem[];
  completed: CartItem[];
}

const initialState: OrdersState = {
  selectedOrdersCategory: [],
  allOrders: [],
  inProccess: [],
  completed: [],
};
export const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState,
  reducers: {
    ordersUpdate: (
      state: OrdersState,
      action: PayloadAction<{ orders: any[]; category: string } | null>
    ) => {
      if (action.payload) {
        const { orders, category } = action.payload;
        state.allOrders = orders;
        state.inProccess = orders.filter(
          (order: checkoutType) => !order.isChecked
        );
        state.completed = orders.filter(
          (order: checkoutType) => order.isChecked
        );

        // Update selectedOrdersCategory based on the category
        switch (category) {
          case "allorders":
            state.selectedOrdersCategory = state.allOrders;
            break;
          case "inproccess":
            state.selectedOrdersCategory = state.inProccess;
            break;
          case "completed":
            state.selectedOrdersCategory = state.completed;
            break;
          default:
            state.selectedOrdersCategory = state.allOrders;
            break;
        }
      }
    },
  },
});

export const { ordersUpdate } = ordersSlice.actions;
export default ordersSlice.reducer;
