import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, name, price, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    decreaseQuantity(state, action) {
        const id = action.payload;
        const item = state.items.find(i => i.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelectors = {
  selectAll: (state) => state.cart.items,
};