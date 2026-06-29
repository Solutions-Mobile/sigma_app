import type {  InputHTMLAttributes,} from "react";
import type {  Control,  FieldPath,    FieldValues,} from "react-hook-form";
//import {  Controller, } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props<
  TFieldValues extends FieldValues,
> =
  InputHTMLAttributes<HTMLInputElement> & {
    control: Control<TFieldValues>;

    name: FieldPath<TFieldValues>;

    label: string;
  };

export function FormInput<
  TFieldValues extends FieldValues,
>({
  control,
  name,
  label,
  ...props
}: Props<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>

          <FormControl>
            <Input
              {...field}
              {...props}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
/*
import type {  InputHTMLAttributes,} from "react";
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
*/