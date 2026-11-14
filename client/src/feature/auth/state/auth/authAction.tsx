import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../../config/axiosInstance";

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken ",
  async () => {
    const res = await api.post("/auth/refresh-token");

    return res?.data?.data;
  },
);
