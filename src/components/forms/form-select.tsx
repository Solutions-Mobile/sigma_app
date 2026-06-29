import type {  Control,  FieldPath,  FieldValues,} from "react-hook-form";
import {  FormControl,  FormField,  FormItem,  FormLabel,  FormMessage,} from "@/components/ui/form";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type Props<  TFieldValues extends FieldValues,> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
};

export function FormSelect< TFieldValues extends FieldValues,>({
  control,
  name,
  label,
  placeholder,
  options,
  disabled,
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

          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}