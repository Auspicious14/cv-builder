import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    const inputClasses = `
      w-full
      px-4
      py-2
      rounded-lg
      border
      bg-white
      dark:bg-dark-card
      transition-colors
      duration-200
      focus:ring-2
      focus:ring-primary-500/20
      focus:border-primary-500
      dark:focus:ring-primary-400/20
      dark:focus:border-primary-400
      outline-none
      ${
        error
          ? "border-red-500 dark:border-red-400"
          : "border-gray-300 dark:border-dark-border"
      }
      ${
        props.disabled
          ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          : "hover:border-gray-400 dark:hover:border-gray-500"
      }
      ${className}
    `;

    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <input
          ref={ref}
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${props.id}-error ${props.id}-helper`}
          {...props}
        />
        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${props.id}-helper`}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
