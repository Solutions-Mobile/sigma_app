//src\components\data-table\data-table-loading.tsx
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

type Props = {
  rows?: number;
  columns?: number;
};

export function DataTableLoading({
  rows = 10,
  columns = 5,
}: Props) {
  return (
    <>
      {Array.from({
        length: rows,
      }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({
            length: columns,
          }).map(
            (
              _,
              columnIndex,
            ) => (
              <TableCell
                key={columnIndex}
              >
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              </TableCell>
            ),
          )}
        </TableRow>
      ))}
    </>
  );
}
