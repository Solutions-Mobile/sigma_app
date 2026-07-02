import type React from "react";
import type { ColumnDef } from "@tanstack/react-table";

type CreateActionsColumnProps<TData> = {
  cell: (data: TData) => React.ReactNode;
};

export function createActionsColumn<TData>({
  cell,
}: CreateActionsColumnProps<TData>): ColumnDef<TData> {
  return {
    id: "actions",
    header: "Ações",
    enableSorting: false,
    cell: ({ row }) => cell(row.original),
  };
}
