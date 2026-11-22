import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon" | "avatar" | "primary";
  
};

const variants = {
  icon: "rounded-full p-2 text-(--muted) transition hover:bg-white/5 hover:text-(--foreground)",
  avatar:
    "flex size-10 items-center justify-center rounded-full border border-(--border) bg-(--bg) text-sm font-semibold text-(--foreground) transition hover:border-(--primary) hover:text-(--primary)",
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg) disabled:cursor-not-allowed disabled:opacity-50",
};

const Button = ({
  variant = "primary",
  className,
  type = "button",
  onClick,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
