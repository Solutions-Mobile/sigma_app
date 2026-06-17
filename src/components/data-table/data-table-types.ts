export type DataTableColumn<T> = {
  key: keyof T;
  label: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
};
