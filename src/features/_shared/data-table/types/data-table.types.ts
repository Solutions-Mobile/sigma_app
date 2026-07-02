import type {  ColumnDef,OnChangeFn,  PaginationState,  SortingState,} from "@tanstack/react-table";

export type BaseDataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  loading?: boolean;
  pageCount?: number;
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
};
