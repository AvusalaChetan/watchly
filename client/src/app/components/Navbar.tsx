import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import {
  LuLogOut,
  LuMenu,
  LuSearch
} from "react-icons/lu";
import { NavLink } from "react-router";
import Button from "../../shared/ui/components/Button";
import Logo from "../../shared/ui/Logo";
import { useAppSelector } from "../store/hooks/storeHookes";

const Navbar = () => {
  const {user} = useAppSelector((s) => s.auth);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigation = [
    {name: "home", to: "/home"},
    {name: "videos", to: "/videos"},
    {name: "dashboard", to: "/admin/dashboard", adminOnly: true},
    {name: "upload", to: "/admin/upload", adminOnly: true},
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            aria-label="Open menu"
            className="lg:hidden rounded-lg md:hidden "
            onClick={() => setOpen((p) => !p)}
          >
            {open ? <BiLeftArrow /> : <LuMenu />}
          </Button>
          <Logo />
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <div
            className={`${showSearch ? "w-64 border" : "w-10 "} flex items-center  rounded-xl transition-all duration-300 ease-out  border-gray-300 shadow-2xl inset-0.5 `}
          >
            <input
              type="search"
              placeholder="Search videos"
              className={`${showSearch ? " " : "hidden"} h-full flex-1 bg-transparent text-sm outline-none px-4 `}
            />

            <Button
              variant="icon"
              aria-label="Search"
              className=""
              onClick={() => setShowSearch(!showSearch)}
            >
              <LuSearch size={22} />
            </Button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLinks navigation={navigation} role={user?.role} />
          </nav>

          {open && (
            <nav
              className={`md:hidden fixed top-16 bottom-0 left-0 w-1/2 bg-white   p-4 flex flex-col  gap-2 z-50 transition-all duration-300   ${
                open ? "translate-x-0" : "-translate-x-full "
              }`}
            >
              <NavLinks navigation={navigation} role={user?.role} />
            </nav>
          )}

          <Button variant="avatar" aria-label="Open profile menu">
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({
  navigation,
  role,
}: {
  navigation: {
    name: string;
    to: string;
    adminOnly?: boolean;
  }[];
  role: "user" | "admin" | undefined;
}) => {
  return (
    <>
      {navigation
        .filter((item) => !item.adminOnly || role === "admin")
        .map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({isActive}) =>
              `p-3 text-base font-medium rounded-md transition-colors w-full ${
                isActive
                  ? "underline"
                  : "text-black/70 hover:text-shadow-black hover:bg-white/10"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      <Button variant="icon" className=" rounded-lg">
        <LuLogOut size={24} />
      </Button>
    </>
  );
};

export default Navbar;
