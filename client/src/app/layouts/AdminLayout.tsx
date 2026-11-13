import {LuCopyright} from "react-icons/lu";
import {Outlet} from "react-router";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
        <LuCopyright /> {new Date().getFullYear()} Watchly
      </footer>
    </div>
  );
};

export default AdminLayout;
