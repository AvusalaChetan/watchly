import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon" | "avatar" | "primary";
};

const variants = {
  icon: "rounded-full p-2 hover:bg-slate-100",
  avatar: "flex size-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white hover:bg-slate-700",
primary:
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
};

const Button = ({ variant = "primary", className, type = "button", children, ...props }: ButtonProps) => {
  return (
    <button type={type} className={clsx(variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;