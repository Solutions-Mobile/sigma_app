import type {
  Header,
} from "@tanstack/react-table";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

type Props<T> = {
  header: Header<T, unknown>;
};

export function DataTableHeader<T>({
  header,
}: Props<T>) {
  const sorted =
    header.column.getIsSorted();

  return (
    <button
      type="button"
      className="
        flex
        items-center
        gap-2
      "
      onClick={header.column.getToggleSortingHandler()}
    >
      <span>
        {String(
          header.column.columnDef.meta,
        )}
      </span>

      {sorted === "asc" && (
        <ArrowUp className="h-4 w-4" />
      )}

      {sorted === "desc" && (
        <ArrowDown className="h-4 w-4" />
      )}
    </button>
  );
}
