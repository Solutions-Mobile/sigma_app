import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange(value: string): void;
};

export function DataTableSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Pesquisar..."
        className="h-10 w-full rounded-md border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2"
      />
    </div>
  );
}
