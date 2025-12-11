import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, type = "text", id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-stone-600 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              "w-full h-12 rounded-2xl border bg-white text-stone-700 text-sm transition-all",
              "placeholder:text-stone-400",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              icon ? "pl-11 pr-4" : "px-4",
              error
                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                : "border-stone-200 focus:border-amber-400 focus:ring-amber-200",
              "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:opacity-50",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
        {hint && !error && <p className="mt-2 text-sm text-stone-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
