import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableLoading } from "./data-table-loading";
import { DataTablePagination } from "./data-table-pagination";
import type { BaseDataTableProps } from "./types/data-table.types";
import { ArrowUpDown } from "lucide-react";
import { DataTableToolbar } from "./data-table-toolbar";

export function BaseDataTable<TData>({
  data,
  columns,
  loading,
  search,
  onSearchChange,
  onSearch,
  onClear,
  toolbarActions,
  toolbarFilters,

  pageCount,
  totalRecords,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: BaseDataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // PARA SORT SERVER-SIDE, DESCOMENTAR LINHA ABAIXO E COMENTAR LINHA DEPOIS
    // manualSorting: true,

    // PARA SORT CLIENT-SIDE
    manualSorting: false,
    getSortedRowModel: getSortedRowModel(),
    pageCount,
    totalRecords,
    state: { pagination, sorting, },
    onPaginationChange,
    onSortingChange,
    enableSorting: true,
  });

  if (loading) {
    return <DataTableLoading />;
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar
        search={search}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
        onClear={onClear}
        actions={toolbarActions}
        filters={toolbarFilters}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : undefined
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                      {header.column.getCanSort() && (
                        <ArrowUpDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <DataTableEmpty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <DataTablePagination table={table} /> */}
      <DataTablePagination
        page={pagination.pageIndex + 1}
        limit={pagination.pageSize}
        totalPages={pageCount ?? 1}
        totalRecords={totalRecords ?? data.length}
        disabled={loading}
        onPageChange={(page) => {
          onPaginationChange({
            ...pagination,
            pageIndex: page - 1,
          });
        }}
      />
    </div>
  );
}