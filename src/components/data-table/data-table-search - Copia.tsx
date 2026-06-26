/*
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;

  placeholder?: string;

  disabled?: boolean;

  onChange: (value: string) => void;
};

export function DataTableSearch({ value, placeholder = "Pesquisar...", disabled = false, onChange, }: Props) {
  const handleClear = () => { onChange(""); };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="pl-9 pr-10"
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      {value && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
*/