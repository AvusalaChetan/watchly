import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/hooks/storeHookes";
import { useEffect } from "react";

const AdminRoutes = () => {
  const { user, isLoading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") {
      toast.error("You are not authorized to access this page");
    }
  }, [isLoading, user]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
   

  return <Outlet />;
};

export default AdminRoutes;
