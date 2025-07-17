// src/features/orders/ordersSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  orders: [], // Each order: { id, items: [{ id, name, price, quantity }], timestamp }
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: {
      reducer(state, action) {
        state.orders.push(action.payload);
      },
      prepare({ items }) {
        return {
          payload: {
            id: nanoid(),
            items,
            timestamp: Date.now(),
          },
        };
      },
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;

// Selectors (optional)
export const selectOrders = (state) => state.orders.orders;
