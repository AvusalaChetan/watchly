import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {

  return (
    <main className="h-full w-full  overflow-x-hidden">
      <Navbar />
      <div className="h-full px-4 ">

      <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;

