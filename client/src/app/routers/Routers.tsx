import axios from "axios";
import {useEffect} from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router";
import {api} from "../../config/axiosInstance";
import {
  setAuthChecked,
  setCredentials,
  setLoading,
} from "../../feature/auth/state/auth/authSlice";
import Login from "../../feature/auth/ui/pages/Login";
import Register from "../../feature/auth/ui/pages/Register";
import VideoListPage from "../../feature/videos/ui/pages/VideoListPage";
import WatchPage from "../../feature/videos/ui/pages/WatchPage";
import HomePage from "../../shared/ui/pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import {useAppDispatch} from "../store/hooks/storeHookes";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoutes from "./AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../../feature/admin/ui/pages/Dashboard";
import UploadVideo from "../../feature/videos/ui/pages/UploadVideo";
 
const Router = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
     console.log("HYDRATION MOUNTED");
    const hydration = async () => {
      try {
        const res = await api.post("/auth/refresh-token");
        
        dispatch(setCredentials(res.data?.data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          redirect("/auth/login");
        }
      } finally {
        dispatch(setAuthChecked(true));
        dispatch(setLoading(false));
      }
    };

    hydration();

    return () => {
       console.log("HYDRATION unMOUNTED");
    };
  }, [dispatch]);

  const routers = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Navigate to={"/home"} />,
            },
            {
              path: "home",
              index: true,
              element: <HomePage />,
            },
            {
              path: "videos",
              index: true,
              element: <VideoListPage />,
            },
            {
              path: "video/watch/:id",
              element: <WatchPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminRoutes />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            {
              path: "",
              element: <Navigate to={"/admin/dashboard"} />,
            },
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path:'upload',
              element:<UploadVideo/>
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default Router;
