import {Navigate, Outlet, useLocation} from "react-router";
import {useAppSelector} from "../store/hooks/storeHookes";

const PublicRoute = () => {
  const {user, accessToken, isLoading} = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <p> loading...</p>;
  }

  if (user && accessToken) {
    return user.role === "admin" ? (
      <Navigate to={location.pathname || "/admin"} replace />
    ) : (
      <Navigate to={location.pathname || "/home"} replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
