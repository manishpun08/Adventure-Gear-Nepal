import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentSuccessStatus: false,
  },
  reducers: {
    togglePaymentStatus: (state) => {
      state.paymentSuccessStatus = !state.paymentSuccessStatus;
    },
  },
});

// Action creators are generated for each case reducer function
export const { togglePaymentStatus } = paymentSlice.actions;

export default paymentSlice.reducer;
