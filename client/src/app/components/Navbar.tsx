import {useState} from "react";
import {LuMenu, LuSearch, LuUsers} from "react-icons/lu";
import Button from "../../shared/ui/components/Button";
import Logo from "../../shared/ui/Logo";
import {useAppSelector} from "../store/hooks/storeHookes";

const Navbar = () => {
  const {user} = useAppSelector((s) => s.auth);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  console.log(showSearch);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            aria-label="Open menu"
            className="lg:hidden rounded-lg"
          >
            <LuMenu size={24} />
          </Button>
          <Logo />
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <div
            className={`${showSearch ? "w-64" : "w-10 "} flex items-center  rounded-2xl transition-all duration-300 ease-out border border-gray-300 shadow-2xl inset-0.5 `}
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
          <Button variant="icon" aria-label="Users">
            <LuUsers size={22} />
          </Button>

          <Button variant="avatar" aria-label="Open profile menu">
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
