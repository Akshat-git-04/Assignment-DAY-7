import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  logs: [], // { id, action, timestamp, user, payload }
};

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    logAction(state, action) {
      const { actionType, payload, user = 'Admin' } = action.payload;
      state.logs.push({
        id: nanoid(),
        action: actionType,
        payload,
        user,
        timestamp: new Date().toISOString(),
      });
    },
    clearLogs(state) {
      state.logs = [];
    },
  },
});

export const { logAction, clearLogs } = auditSlice.actions;
export default auditSlice.reducer;
