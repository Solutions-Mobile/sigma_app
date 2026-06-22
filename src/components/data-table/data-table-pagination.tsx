import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  limit: number;

  totalPages: number;
  totalRecords: number;

  disabled?: boolean;

  onPageChange: (page: number) => void;
};

export function DataTablePagination({
  page,
  totalPages,
  totalRecords,
  disabled = false,
  onPageChange,
}: Props) {
  const canPrevious =
    page > 1 && !disabled;

  const canNext =
    page < totalPages && !disabled;

  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-muted-foreground">
        Total de registros:
        {" "}
        {totalRecords}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!canPrevious}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Anterior
        </Button>

        <div className="text-sm">
          Página {page} de{" "}
          {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={!canNext}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
