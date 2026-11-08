import {Navigate, Outlet, useLocation} from "react-router";
import {useAppSelector} from "../store/hooks/storeHookes";

const ProtectedRoute = () => {
  const {user, accessToken, isLoading} = useAppSelector((state) => state.auth);
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || !accessToken) {
    return <Navigate to="/auth/login" state={{from: location}} replace 
    />; 
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
