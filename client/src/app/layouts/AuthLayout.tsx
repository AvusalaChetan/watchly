import {Outlet} from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <main>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AuthLayout;
