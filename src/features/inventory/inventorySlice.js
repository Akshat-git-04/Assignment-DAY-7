// src/features/inventory/inventorySlice.js
import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit';

const productsAdapter = createEntityAdapter();

// Step 1: Generate sample products
// const generateProducts = Array.from({ length: 50000 }, (_, i) => ({
//   id: nanoid(),
//   tenantId: ['store-1', 'store-2', 'store-3'][i % 3],
//   name: `Product ${i + 1}`,
//   quantity: Math.floor(Math.random() * 100),
//   price: Math.floor(Math.random() * 500) + 50,
// }));

const generateProducts = Array.from({ length: 1000 }, (_, i) => ({
  id: nanoid(),
  tenantId: ['store-1', 'store-2', 'store-3'][i % 3],
  name: `Product ${i + 1}`,
  quantity: Math.floor(Math.random() * 100),
  price: Math.floor(Math.random() * 500) + 50,
}));

// Step 2: Create initialState using adapter and include your UI fields
const initialState = productsAdapter.getInitialState({
  search: '',
  filterTenant: 'store-1',
  page: 1,
  perPage: 10,
});

// Step 3: Add mock products into adapter state
const filledInitialState = productsAdapter.addMany(initialState, generateProducts);

// Step 4: Create slice with filled state
const inventorySlice = createSlice({
  name: 'inventory',
  initialState: filledInitialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        productsAdapter.addOne(state, action.payload);
      },
      prepare(product, tenantId) {
        return {
          payload: {
            ...product,
            id: nanoid(),
            tenantId,
          },
        };
      },
    },
    updateProduct(state, action) {
      productsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    deleteProduct(state, action) {
      productsAdapter.removeOne(state, action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      productsAdapter.updateOne(state, {
        id,
        changes: { quantity },
      });
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  updateQuantity,
  setSearch,
  setPage,
} = inventorySlice.actions;

export default inventorySlice.reducer;

// ✅ Adapter selectors — safe now!
export const inventorySelectors = productsAdapter.getSelectors(
  state => state?.inventory || { ids: [], entities: {} }
);


// const initialState = {
//   products: [
//     { id: nanoid(), tenantId: 'store-1', name: 'Laptop', quantity: 10, price: 999 },
//     { id: nanoid(), tenantId: 'store-2', name: 'Camera', quantity: 5, price: 1299 },
//   ],
// };
