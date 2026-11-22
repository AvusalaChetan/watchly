import {Outlet} from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-(--bg) text-(--foreground)">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] px-4">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
