import { Link } from "react-router";
import { LuPlay } from "react-icons/lu";
import { memo } from "react";

const Logo = () => {
  return (
    <Link to="/home" aria-label="Watchly home" className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-(--primary) text-white">
        <LuPlay size={16} />
      </span>
      <span className="text-xl font-bold tracking-tight text-(--foreground)">
        Watchly
      </span>
    </Link>
  );
};

export default memo(Logo);