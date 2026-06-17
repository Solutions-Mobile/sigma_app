import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onPrevious(): void;
  onNext(): void;
};

export function DataTablePagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={page <= 1}
      >
        Anterior
      </Button>

      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Próxima
      </Button>
    </div>
  );
}
