import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../../config/axiosInstance";
import {isAxiosError} from "axios";

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken ",
  async () => {
    try {
      const res = await api.post("/auth/refresh-token");
      const data = res?.data?.data
     
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
      }else{
        console.log(error)
      }
    }
  },
);
