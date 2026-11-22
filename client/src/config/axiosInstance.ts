import axios from "axios";
import {store} from "../app/store/store";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        await api.get("/auth/refresh-token");
        return api(originalReq);
      } catch (error) {
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }
  },
);
