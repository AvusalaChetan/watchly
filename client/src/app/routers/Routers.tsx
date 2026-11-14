import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router";
import Dashboard from "../../feature/admin/ui/pages/Dashboard";
import { refreshAccessToken } from "../../feature/auth/state/auth/authAction";
import Login from "../../feature/auth/ui/pages/Login";
import Register from "../../feature/auth/ui/pages/Register";
import UpdateVideo from "../../feature/videos/ui/pages/UpdateVideo";
import UploadVideo from "../../feature/videos/ui/pages/UploadVideo";
import VideoListPage from "../../feature/videos/ui/pages/VideoListPage";
import WatchPage from "../../feature/videos/ui/pages/WatchPage";
import HomePage from "../../shared/ui/pages/HomePage";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import { useAppDispatch } from "../store/hooks/storeHookes";
import AdminRoutes from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  const dispatch = useAppDispatch();
 

  useEffect(() => {
  dispatch(refreshAccessToken());
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
              path: "upload",
              element: <UploadVideo />,
            },
            {
              path: "update/:id",
              element: <UpdateVideo />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default Router;
