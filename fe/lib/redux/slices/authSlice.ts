import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
  userId: string | null;
}

const initialState: AuthState = {
  userId: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    }
  }
});

const persistConfig = {
  key: "auth",
  storage
};
export const { setUserId } = authSlice.actions;
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
export default persistedAuthReducer;
