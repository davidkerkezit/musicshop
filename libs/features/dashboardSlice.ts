import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const dashboardSlider = createSlice({
  name: "dashboardSlider",
  initialState: "add" as string | null,
  reducers: {
    selectDashboardOption: (
      state: string | null,
      action: PayloadAction<string | null>
    ) => {
      return action.payload;
    },
  },
});

export const { selectDashboardOption } = dashboardSlider.actions;
export default dashboardSlider.reducer;
