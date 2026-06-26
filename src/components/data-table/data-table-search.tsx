import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>,) => void;
  onClear?: () => void;
};

export function DataTableSearch({
  value,
  placeholder,
  disabled,
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
        className="pr-10"
        onChange={(event) =>
          onChange(event.target.value)
        }
        onKeyDown={onKeyDown}
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 h-7 w-7"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}