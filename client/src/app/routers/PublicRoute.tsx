import {Navigate, Outlet} from "react-router";
import {useAppSelector} from "../store/hooks/storeHookes";

const PublicRoute = () => {
  const {user, accessToken, isLoading} = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <p> loading...</p>;
  }

  if (user && accessToken) {
    return user.role === "admin" ? (
      <Navigate to={"/admin"} />
    ) : (
      <Navigate to={"/home"} />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
