//src\components\data-table\data-table-types.ts
export type DataTableColumn<T> = {
  key: keyof T;

  label: string;

  sortable?: boolean;

  sortAccessor?: (
    row: T,
  ) => string | number | Date | null | undefined;

  render?: (
    value: unknown,
    row: T,
  ) => React.ReactNode;
};

export type DataTableSortDirection =
  | "asc"
  | "desc";

export type DataTableSort<T> = {
  key: keyof T;
  direction: DataTableSortDirection;
};
