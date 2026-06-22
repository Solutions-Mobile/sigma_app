//src\components\data-table\data-table-types.ts
export type DataTableColumn<T> = {
  key: keyof T;

  label: string;

  render?: (
    value: unknown,
    row: T,
  ) => React.ReactNode;
};
