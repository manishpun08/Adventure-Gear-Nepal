import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    searchText: "",
  },
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchText } = productSlice.actions;

export default productSlice.reducer;
