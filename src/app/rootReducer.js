// src/app/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventory/inventorySlice';
import tenantReducer from '../features/tenant/tenantSlice';
import { inventoryAPI } from '../features/inventory/inventoryAPI'; 

import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
import auditReducer from '../features/audit/auditSlice';
import ecommerceReducer from '../features/ecommerce/ecommerceSlice';

const rootReducer = combineReducers({
  tenant: tenantReducer,
  inventory: inventoryReducer,
  [inventoryAPI.reducerPath]: inventoryAPI.reducer,
  cart: cartReducer,
  orders: ordersReducer,
  audit: auditReducer,
  ecommerce: ecommerceReducer,
});

export default rootReducer;
