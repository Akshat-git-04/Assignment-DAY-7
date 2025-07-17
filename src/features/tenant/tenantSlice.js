// src/features/tenant/tenantSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: { currentTenant: 'store-1' },
  reducers: {
    switchTenant(state, action) {
      state.currentTenant = action.payload;
    },
  },
});

export const { switchTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
