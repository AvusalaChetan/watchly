import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../../config/axiosInstance";
import {isAxiosError} from "axios";

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken ",
  async (_, {rejectWithValue}) => {
    try {
      const res = await api.post("/auth/refresh-token");
      const data = res?.data?.data;

      return data;
    } catch (error) {
      return rejectWithValue(
        isAxiosError(error) ? error.response?.data : "Refresh failed",
      );
    }
  },
);
