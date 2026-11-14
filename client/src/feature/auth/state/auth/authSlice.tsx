import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {refreshAccessToken} from "./authAction";
import type {WritableNonArrayDraft} from "immer";

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
  isLoading: boolean;
};

const authState: AuthState = {
  user: null,
  accessToken: null,
  isAuthChecked: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        isLoading: boolean;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthChecked = true;
      state.isLoading = action.payload.isLoading;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
    
      .addCase(
        refreshAccessToken?.fulfilled,
        (
          state: WritableNonArrayDraft<AuthState>,
          action: PayloadAction<{user: User; accessToken: string}>,
        ) => {
          state.isAuthChecked = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.isLoading = false;
        },
      )
      .addCase(
        refreshAccessToken?.rejected,
        (state: WritableNonArrayDraft<AuthState>) => {
          state.isAuthChecked = true;
          state.accessToken = null;
          state.user = null;
          state.isLoading = false;
        },
      );
  },
});

export const {setCredentials, setLoading, setAuthChecked, logout} =
  authSlice.actions;

export default authSlice.reducer;
