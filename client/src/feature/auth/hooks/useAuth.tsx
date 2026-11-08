import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/store/hooks/storeHookes";
import { api } from "../../../config/axiosInstance";
import { setCredentials } from "../state/auth/authSlice";
import type { LoginData, RegisterData } from "../types/formTypes";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const register = async (data: RegisterData) => {
    try {
      const res = await api.post("/auth/register", data);
      dispatch(setCredentials(res.data.data));
      toast.success(res?.data?.message);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  const login = async (data: LoginData) => {
    try {
      const res = await api.post("/auth/login", data);
      dispatch(setCredentials(res.data.data));
      toast.success(res?.data?.message);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'something went worng');
      } else {
        toast.error((error as Error)?.message);
      }
    }
  };

  return {register, login};
};
