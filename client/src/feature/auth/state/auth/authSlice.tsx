import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {refreshAccessToken} from "./authAction";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthChecked?: boolean;
  isLoading:boolean
};

const authState: AuthState = {
  user: null,
  accessToken: null,
  isAuthChecked: false,
  isLoading:true,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{user: User; accessToken: string}>,
    ) => {
       state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthChecked = true;
      state.isLoading = false;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken?.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accesstoken;
      })
      .addCase(refreshAccessToken?.rejected, (state) => {
        state.isAuthChecked = true;
        state.accessToken = null;
        state.user = null;
      });
  },
});

export const {setCredentials,setAuthChecked, logout} = authSlice.actions;

export default authSlice.reducer;
