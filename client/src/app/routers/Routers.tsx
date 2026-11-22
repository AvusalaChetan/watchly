import {lazy, Suspense, useEffect} from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import Dashboard from "../../feature/admin/ui/pages/Dashboard";
import {refreshAccessToken} from "../../feature/auth/state/auth/authAction";
import UpdateVideo from "../../feature/videos/ui/pages/UpdateVideo";
import UploadVideo from "../../feature/videos/ui/pages/UploadVideo";
import VideoListPage from "../../feature/videos/ui/pages/VideoListPage";
import WatchPage from "../../feature/videos/ui/pages/WatchPage";
import HomePage from "../../shared/ui/pages/HomePage";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import {useAppDispatch} from "../store/hooks/storeHookes";
import AdminRoutes from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import {AuthPageLoader} from "../../shared/ui/components/Loading";

const Register = lazy(() => import("../../feature/auth/ui/pages/Register"));
const Login = lazy(() => import("../../feature/auth/ui/pages/Login"));

const Router = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  const routers = createBrowserRouter([
    {
      path: "/auth",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "register",
              element: (
                <Suspense fallback={<AuthPageLoader />}>
                  <Register />
                </Suspense>
              ),
            },
            {
              path: "login",
              element: (
                <Suspense fallback={<AuthPageLoader />}>
                  <Login />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
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
