import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "../../models/auth.model";

interface userState {
  auth: Auth | null;
}

const initialState: userState = {
  auth: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGGER_IN_USER: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
    },
    LOGOUT: (state) => {
      state.auth = null;
    },
  },
});

// Actions
export const { LOGGER_IN_USER, LOGOUT } = userSlice.actions;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
