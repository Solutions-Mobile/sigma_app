import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

export function DataTableEmpty() {
  return (
    <TableRow>
      <TableCell
        colSpan={999}
        className="h-24 text-center"
      >
        Nenhum registro encontrado.
      </TableCell>
    </TableRow>
  );
}
