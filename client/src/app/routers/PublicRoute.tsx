
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks/storeHookes";

const PublicRoute = () => {
  const { user, accessToken, isLoading } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user && accessToken) {
    return user.role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
