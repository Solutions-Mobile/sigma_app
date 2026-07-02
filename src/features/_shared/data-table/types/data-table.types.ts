import type React from "react";
import type { ColumnDef, OnChangeFn, PaginationState, SortingState } from "@tanstack/react-table";

export type BaseDataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  loading?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  toolbarActions?: React.ReactNode;
  toolbarFilters?: React.ReactNode;
  pageCount?: number;
  totalRecords?: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
};
