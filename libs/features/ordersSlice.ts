import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";
import { CheckoutType } from "../types";

interface OrdersState {
  selectedOrdersCategory: CheckoutType[];
  allOrders: CheckoutType[];
  inProccess: CheckoutType[];
  completed: CheckoutType[];
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
      action: PayloadAction<{ orders: CheckoutType[]; category: string } | null>
    ) => {
      if (action.payload) {
        const { orders, category } = action.payload;
        state.allOrders = orders;
        state.inProccess = orders.filter(
          (order: CheckoutType) => !order.isChecked
        );
        state.completed = orders.filter(
          (order: CheckoutType) => order.isChecked
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
