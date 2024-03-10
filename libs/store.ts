import { configureStore } from "@reduxjs/toolkit";
import searchSliderSlice from "./features/searchSliderSlice";
import cartSlice from "./features/cartSlice";
import questionsSlice from "./features/questionsSlice";
import ordersSlice from "./features/ordersSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import menuSlice from "./features/menuSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      searchSliderSlice,
      cartSlice,
      questionsSlice,
      ordersSlice,
      menuSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
