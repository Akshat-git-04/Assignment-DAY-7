import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFilter: 'all', // all | sale | featured
  editingProduct: null,
  view: 'grid', // grid | list
};

const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.selectedFilter = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setEditingProduct(state, action) {
      state.editingProduct = action.payload;
    },
    clearEditingProduct(state) {
      state.editingProduct = null;
    },
  },
});

export const {
  setFilter,
  setView,
  setEditingProduct,
  clearEditingProduct,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
