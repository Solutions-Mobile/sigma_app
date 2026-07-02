import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DataTableToolbarProps = {
  search?: string;
  onSearchChange?: (
    value: string
  ) => void;
  onSearch?: () => void;
  onClear?: () => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
};

export function DataTableToolbar({
  search,
  onSearchChange,
  onSearch,
  onClear,
  actions,
  filters,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {onSearchChange && (
          <Input
            placeholder="Pesquisar..."
            value={search ?? ""}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="max-w-sm"
          />
        )}

        {onSearch && (
          <Button onClick={onSearch}>
            Buscar
          </Button>
        )}

        {onClear && (
          <Button
            variant="outline"
            onClick={onClear}
          >
            Limpar
          </Button>
        )}

        {filters}
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}