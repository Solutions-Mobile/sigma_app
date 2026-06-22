//src\components\data-table\data-table.tsx
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableLoading } from "./data-table-loading";
import type {  DataTableColumn,} from "./data-table-types";

type Props<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
};

export function DataTable<T>({
  data,
  columns,
  loading = false,
}: Props<T>) {
  return (
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
                {column.label}
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
          ) : data.length === 0 ? (
            <DataTableEmpty />
          ) : (
            data.map(
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
  );
}
