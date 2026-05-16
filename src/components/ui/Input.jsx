import { forwardRef } from "react";

/**
 * NOTE: reusable input primitive designed for consistent form styling and accessibility
 * implementing focus-ring transitions and autofill resets for industrial-grade UI
 */
const Input = forwardRef(({ className = "", error, suffix, ...props }, ref) => {
  const baseStyles =
    "w-full bg-gray-900/80 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-300 autofill:shadow-[0_0_0_1000px_#111827_inset] [-webkit-text-fill-color:white] placeholder:text-gray-500";

  return (
    <div className="w-full group">
      <div className="relative">
        <input
          ref={ref}
          className={`${baseStyles} ${suffix ? "pr-12" : ""} ${
            error ? "ring-2 ring-brand-red/50" : ""
          } ${className}`}
          {...props}
        />
        {suffix && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="text-brand-red font-medium text-sm pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
