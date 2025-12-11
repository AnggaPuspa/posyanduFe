import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-stone-600 mb-2">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "w-full px-4 py-3 rounded-2xl border bg-white text-stone-700 text-sm transition-all resize-none",
            "placeholder:text-stone-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
              : "border-stone-200 focus:border-amber-400 focus:ring-amber-200",
            "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
