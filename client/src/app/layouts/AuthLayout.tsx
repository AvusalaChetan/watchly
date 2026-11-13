import {Navigate, Outlet} from "react-router";
import Header from "../components/Header";
import {useAppSelector} from "../store/hooks/storeHookes";
import Footer from "../components/Footer";

const AuthLayout = () => {
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (user && accessToken) {
    return user.role === "admin" ? (
      <Navigate to={"/admin"} />
    ) : (
      <Navigate to={"/home"} />
    );
  }

  return (
    <>
      <main>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AuthLayout;
