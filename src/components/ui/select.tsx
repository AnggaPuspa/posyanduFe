import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-stone-600 mb-2">
            {label}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            "w-full h-12 px-4 rounded-2xl border bg-stone-50/50 text-sm transition-all appearance-none",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
              : "border-stone-200 focus:border-amber-400 focus:ring-amber-200",
            "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
