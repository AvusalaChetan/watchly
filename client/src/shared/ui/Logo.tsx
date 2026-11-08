import { Link } from "react-router";
import { LuPlay } from "react-icons/lu";

const Logo = () => {
  return (
    <Link to="/home" aria-label="Watchly home" className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-slate-900 text-white">
        <LuPlay size={16} />
      </span>
      <span className="text-xl font-bold tracking-tight text-slate-900">Watchly</span>
    </Link>
  );
};

export default Logo;