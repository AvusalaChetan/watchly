import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { LuLogOut, LuMenu, LuSearch } from "react-icons/lu";
import { NavLink } from "react-router";
import { useAuth } from "../../feature/auth/index";
import SearchList from "../../feature/videos/ui/components/SearchList";
import Button from "../../shared/ui/components/Button";
import Logo from "../../shared/ui/Logo";
import { useDebounce } from "../hooks/deBounceHook";
import { useSearch } from "../hooks/searchHook";
import { useAppSelector } from "../store/hooks/storeHookes";

const Navbar = () => {
  const {user} = useAppSelector((s) => s.auth);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const debounceVal = useDebounce(searchInput, 400);
  const {data, isLoading, error} = useSearch({debounceVal});

  const {logout} = useAuth();

  const navigation = [
    {name: "home", to: "/home"},
    {name: "videos", to: "/videos"},
    {name: "dashboard", to: "/admin/dashboard", adminOnly: true},
    {name: "upload", to: "/admin/upload", adminOnly: true},
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--border) bg-(--surface)">
      <div className="flex h-16 items-center justify-between px-4 relative">
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            aria-label="Open menu"
            className="lg:hidden rounded-lg md:hidden "
            onClick={() => setOpen((p) => !p)}
          >
            {open ? <BiLeftArrow size={18} /> : <LuMenu size={18} />}
          </Button>
          <Logo />
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <div
            className={`${showSearch ? "w-64 border" : "w-10"} flex items-center rounded-xl border-(--border) bg-(--bg) transition-all duration-300 ease-out`}
          >
            <input
              type="search"
              placeholder="Search videos"
              className={`${showSearch ? "" : "hidden"} h-full flex-1 bg-transparent px-4 text-sm text-(--foreground) outline-none placeholder:text-(--muted)`}
              onChange={(e) => setSearchInput(e.target.value)}
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
              className={`fixed bottom-0 left-0 top-16 z-50 flex w-1/2 flex-col gap-2 border-r border-(--border) bg-(--surface) p-4 transition-all duration-300 md:hidden ${
                open ? "translate-x-0" : "-translate-x-full "
              }`}
            >
              <NavLinks navigation={navigation} role={user?.role} />
            </nav>
          )}
          <Button variant="icon" className=" rounded-lg" onClick={logout}>
            <LuLogOut size={24} />
          </Button>

          <Button
            variant="avatar"
            aria-label="Open profile menu"
            className="border-2 border-(--primary) hover:text-white text-[1.2em] mb-1"
          >
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="absolute left-1/2 top-full z-50 h-fit w-[calc(100%-2rem)] -translate-x-1/2 rounded-b-xl border border-t-0 border-(--border) bg-(--surface) shadow-lg lg:w-[80%]">
          {isLoading ? (
            <p className="p-4 text-sm text-(--muted)">Loading...</p>
          ) : (
            <SearchList
              result={data?.result}
              error={error}
              isLoading={isLoading}
              setSearchInput={setSearchInput}
            />
          )}
        </div>
      )}
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
// const {pathname} = useLocation()

return (
    <>
      {navigation
        .filter((item) => !item.adminOnly || role === "admin")
        .map((item) => (
          <div className="flex flex-col gap-1" key={item.name}>
            <NavLink
              key={item.to}
              to={item.to}
              className={({isActive}) =>
                `link-underline px-4 py-2 text-base font-medium rounded-md transition-colors w-full capitalize ${
                  isActive
                    ? "text-(--primary)/80"
                    : "text-(--muted) hover:bg-white/5 hover:text-(--foreground)"
                }`
              }
            >
              {item.name}
            </NavLink>
            
          </div>
        ))}
    </>
  );
};

export default Navbar;
