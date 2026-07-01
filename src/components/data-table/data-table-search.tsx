import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>,) => void;
  onClear?: () => void;
};

export function DataTableSearch({ value, placeholder, disabled,
  onChange,
  onKeyDown,
  onClear,
}: Props) {
return (
  <div className="relative flex items-center">
    <Input
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("pr-25")}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
    />

    {value && (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClear}
        className={cn(
          "absolute right-1 h-7 w-7 rounded-full transition-colors ",
          "text-foreground",
          "focus:outline-none focus:bg-primary dark:focus:bg-primary",
           "focus:ring-1 focus:ring-(--primary)"
        )}
      >
        <X className="h-4 w-4c" />
      </Button>
    )}
  </div>
);

}