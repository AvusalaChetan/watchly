import {LuCopyright} from "react-icons/lu";
import {Outlet} from "react-router";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  
  return (
    <div className="flex min-h-screen flex-col bg-(--bg) text-(--foreground)">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="flex items-center justify-center gap-2 border-t border-(--border) py-4 text-center text-sm text-(--muted)">
        <LuCopyright /> {new Date().getFullYear()} Watchly
      </footer>
    </div>
  );
};

export default AdminLayout;
