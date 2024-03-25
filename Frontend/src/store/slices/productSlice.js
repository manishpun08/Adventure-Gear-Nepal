import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    searchText: null,
    category: null,
    minPrice: 0,
    maxPrice: 0,
  },
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearFilter: (state, action) => {
      state.searchText = null;
      state.category = null;
    },
    setMinPrice: (state, action) => {
      state.minPrice = +action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = +action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSearchText,
  setCategory,
  clearFilter,
  setMinPrice,
  setMaxPrice,
} = productSlice.actions;

export default productSlice.reducer;
