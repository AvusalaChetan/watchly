import {Outlet} from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-(--bg) text-(--foreground)">
      <Header />
      <div className="bg-(--bg) text-(--foreground)">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default AuthLayout;
