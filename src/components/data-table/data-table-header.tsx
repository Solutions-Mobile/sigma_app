import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  DataTableColumn,
  DataTableSort,
} from "./data-table-types";

type Props<T> = {
  column: DataTableColumn<T>;
  sort?: DataTableSort<T>;
  onSortChange: (
    column: DataTableColumn<T>,
  ) => void;
};

export function DataTableHeader<T>({
  column,
  sort,
  onSortChange,
}: Props<T>) {
  const sortable =
    column.sortable !== false;
  const isSorted =
    sort?.key === column.key;

  if (!sortable) {
    return <span>{column.label}</span>;
  }

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2 rounded-sm text-left transition-colors hover:text-primary",
        isSorted && "text-primary",
      )}
      onClick={() =>
        onSortChange(column)
      }
    >
      <span>{column.label}</span>

      {isSorted && sort.direction === "asc" ? (
        <ArrowUp className="size-4" />
      ) : isSorted && sort.direction === "desc" ? (
        <ArrowDown className="size-4" />
      ) : (
        <ArrowUpDown className="size-4 text-muted-foreground" />
      )}
    </button>
  );
}
