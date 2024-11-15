import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { persistStore } from "redux-persist";
import persistedAuthReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: []
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
