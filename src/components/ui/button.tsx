import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  gradient?: boolean;
}

const variantStyles = {
  primary: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-200 hover:shadow-xl",
  secondary: "bg-stone-100 text-stone-700 hover:bg-stone-200",
  outline: "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50",
  ghost: "text-stone-500 hover:bg-stone-100 hover:text-stone-700",
  danger: "bg-gradient-to-r from-rose-400 to-red-500 text-white shadow-lg shadow-rose-200 hover:shadow-xl",
  success: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200 hover:shadow-xl",
};

const sizeStyles = {
  sm: "h-9 px-4 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-2xl",
  lg: "h-12 px-6 text-base rounded-2xl",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      style={{ fontFamily: 'var(--font-nunito)' }}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
