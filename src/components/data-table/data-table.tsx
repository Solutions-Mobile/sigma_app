//src\components\data-table\data-table.tsx
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableHeader } from "./data-table-header";
import { DataTableLoading } from "./data-table-loading";
import { DataTableSearch } from "./data-table-search";
import type {
  DataTableColumn,
  DataTableSort,
} from "./data-table-types";

type SearchProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

type Props<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  search?: SearchProps;
};

export function DataTable<T>({
  data,
  columns,
  loading = false,
  search,
}: Props<T>) {
  const [sort, setSort] =
    useState<DataTableSort<T>>();

  const sortedData = useMemo(() => {
    if (!sort) {
      return data;
    }

    const column = columns.find(
      (item) => item.key === sort.key,
    );

    if (!column) {
      return data;
    }

    return [...data].sort((first, second) => {
      const firstValue = getSortValue(
        first,
        column,
      );
      const secondValue = getSortValue(
        second,
        column,
      );
      const result = compareValues(
        firstValue,
        secondValue,
      );

      return sort.direction === "asc"
        ? result
        : result * -1;
    });
  }, [columns, data, sort]);

  function handleSortChange(
    column: DataTableColumn<T>,
  ) {
    if (column.sortable === false) {
      return;
    }

    setSort((current) => {
      if (current?.key !== column.key) {
        return {
          key: column.key,
          direction: "asc",
        };
      }

      if (current.direction === "asc") {
        return {
          key: column.key,
          direction: "desc",
        };
      }

      return undefined;
    });
  }

  return (
    <div className="space-y-3">
      {search && (
        <DataTableSearch
          value={search.value}
          placeholder={search.placeholder}
          disabled={
            search.disabled ?? loading
          }
          onChange={search.onChange}
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(
                    column.key,
                  )}
                >
                  <DataTableHeader
                    column={column}
                    sort={sort}
                    onSortChange={
                      handleSortChange
                    }
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <DataTableLoading
                rows={10}
                columns={
                  columns.length
                }
              />
            ) : sortedData.length === 0 ? (
              <DataTableEmpty />
            ) : (
              sortedData.map(
                (
                  row,
                  rowIndex,
                ) => (
                  <TableRow
                    key={rowIndex}
                  >
                    {columns.map(
                      (
                        column,
                      ) => (
                        <TableCell
                          key={String(
                            column.key,
                          )}
                        >
                          {column.render
                            ? column.render(
                                row[
                                  column.key
                                ],
                                row,
                              )
                            : String(
                                row[
                                  column.key
                                ] ?? "",
                              )}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function getSortValue<T>(
  row: T,
  column: DataTableColumn<T>,
) {
  if (column.sortAccessor) {
    return column.sortAccessor(row);
  }

  return row[column.key];
}

function compareValues(
  firstValue: unknown,
  secondValue: unknown,
) {
  if (
    firstValue == null &&
    secondValue == null
  ) {
    return 0;
  }

  if (firstValue == null) {
    return 1;
  }

  if (secondValue == null) {
    return -1;
  }

  if (
    firstValue instanceof Date ||
    secondValue instanceof Date
  ) {
    return new Date(
      firstValue as string | number | Date,
    ).getTime() - new Date(
      secondValue as string | number | Date,
    ).getTime();
  }

  if (
    typeof firstValue === "number" &&
    typeof secondValue === "number"
  ) {
    return firstValue - secondValue;
  }

  return String(firstValue).localeCompare(
    String(secondValue),
    "pt-BR",
    {
      numeric: true,
      sensitivity: "base",
    },
  );
}
