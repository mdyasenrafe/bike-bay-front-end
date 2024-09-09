import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { baseApi } from "../api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import productSlice from "./features/product/productSlice";
import themeSlice from "./features/theme/themeSlice";
import rentalSlice from "./features/rental/rentalSlice";

// Persist config for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist config for theme slice
const themePersistConfig = {
  key: "themeMode",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedThemeReducer = persistReducer(themePersistConfig, themeSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    themeMode: persistedThemeReducer, // Persisted theme slice
    product: productSlice,
    rental: rentalSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
