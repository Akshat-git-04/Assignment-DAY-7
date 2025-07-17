// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import auditMiddleware from '../features/audit/auditMiddleware';
import offlineMiddleware from '../features/offline/offlineMiddleware';
import { inventoryAPI } from '../features/inventory/inventoryAPI';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(auditMiddleware, offlineMiddleware, inventoryAPI.middleware),
});

export const persistor = persistStore(store);
