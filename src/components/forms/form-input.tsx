import type {
  InputHTMLAttributes,
} from "react";

import { FormError } from "./form-error";

type Props =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  };

export function FormInput({
  label,
  error,
  ...props
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="
          h-10
          w-full
          rounded-md
          border
          bg-background
          px-3
          text-sm
          outline-none
          focus:ring-2
        "
      />

      <FormError
        message={error}
      />
    </div>
  );
}
