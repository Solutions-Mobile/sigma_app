import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState, } from "@tanstack/react-table";
import { useMemo, useState, } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableLoading } from "./data-table-loading";
import { DataTableHeader } from "./data-table-header";
import type { DataTableColumn } from "./data-table-types";

type Props<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
};

export function DataTable<
  T extends object,
>({ data, columns, loading, }: Props<T>) {
  const [
    sorting,
    setSorting,
  ] = useState<SortingState>(
    [],
  );

  const tableColumns =
    useMemo<
      ColumnDef<T>[]
    >(
      () =>
        columns.map(
          (column) => ({
            accessorKey: String(column.key),
            header: (context) => (<DataTableHeader header={context.header} />),
            meta: column.label,
            cell: ({
              row,
              getValue,
            }) =>
              column.render
                ? column.render(
                  getValue(),
                  row.original,
                )
                : String(
                  getValue() ??
                  "",
                ),
          }),
        ),

      [columns],
    );

  // IGNORAR WARNING - 17/06/2026
  const table = useReactTable({
    data, columns: tableColumns, state: { sorting, },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) {
    return (
      <DataTableLoading />
    );
  }

  if (!data.length) {
    return <DataTableEmpty />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table
            .getHeaderGroups()
            .map((group) => (
              <TableRow
                key={group.id}
              >
                {group.headers.map(
                  (header) => (
                    <TableHead
                      key={
                        header.id
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header
                            .column
                            .columnDef
                            .header,

                          header.getContext(),
                        )}
                    </TableHead>
                  ),
                )}
              </TableRow>
            ))}
        </TableHeader>

        <TableBody>
          {table
            .getRowModel()
            .rows.map((row) => (
              <TableRow
                key={row.id}
              >
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <TableCell
                      key={
                        cell.id
                      }
                    >
                      {flexRender(
                        cell
                          .column
                          .columnDef
                          .cell,

                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}