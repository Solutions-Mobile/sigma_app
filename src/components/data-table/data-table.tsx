import { useMemo, useState } from "react";

import { AppCard } from "@/components/app/app-card";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableSearch } from "./data-table-search";

import type {
  DataTableProps,
} from "./data-table-types";

const ITEMS_PER_PAGE = 10;

export function DataTable<T extends object>({
  data,
  columns,
}: DataTableProps<T>) {
  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return data;
    }

    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value)
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )
    );
  }, [data, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedData = useMemo(() => {
    const start =
      (page - 1) * ITEMS_PER_PAGE;

    return filteredData.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredData, page]);

  function handlePrevious() {
    setPage((prev) =>
      Math.max(prev - 1, 1)
    );
  }

  function handleNext() {
    setPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  }

  return (
    <AppCard>
      <div className="space-y-4">
        <DataTableSearch
          value={search}
          onChange={setSearch}
        />

        <div className="overflow-auto rounded-md border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="border-b px-4 py-3 text-left font-medium"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map(
                (row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-muted/50"
                  >
                    {columns.map(
                      (column) => (
                        <td
                          key={String(
                            column.key
                          )}
                          className="border-b px-4 py-3"
                        >
                          {String(
                            row[
                              column.key
                            ]
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}

              {!paginatedData.length && (
                <tr>
                  <td
                    colSpan={
                      columns.length
                    }
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DataTablePagination
          page={page}
          totalPages={totalPages}
          onPrevious={
            handlePrevious
          }
          onNext={handleNext}
        />
      </div>
    </AppCard>
  );
}
