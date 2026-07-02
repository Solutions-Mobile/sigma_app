import { useMemo, useState } from "react";
import type {  ColumnDef,  SortingState,} from "@tanstack/react-table";
import { BaseDataTable } from "@/features/_shared/data-table/base-data-table";
import { TenantTableActions } from "./tenant-table-actions";
import { tenantColumns } from "./tenant-columns";
import { useTenantsList } from "../hooks/use-tenants-list";
import { useAppSettings } from "@/lib/app-settings-context";
import type { Tenant } from "../types/tenant.types";

type TenantTableProps = {
  page: number;
  searchTerm?: string;
  isActive?: boolean;
  onPageChange: (page: number) => void;
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
};

export function TenantTable({
  page,
  searchTerm,
  isActive,
  onPageChange,
  onEdit,
  onDelete,
}: TenantTableProps) {
  const { settings } = useAppSettings();

  const limit = settings.pageSize;

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading } = useTenantsList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchTerm,
    isActive,
  });

  const rows = Array.isArray(data)
    ? data
    : data?.data ?? [];

  const totalPages = Array.isArray(data)
    ? 1
    : data?.totalPages ?? 1;

  const columns = useMemo<ColumnDef<Tenant>[]>(() => {
    const baseColumns = tenantColumns;

    if (!onEdit || !onDelete) {
      return baseColumns;
    }

    return [
      ...baseColumns,

      {
        id: "actions",

        header: "Ações",

        cell: ({ row }) => (
          <TenantTableActions
            tenant={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ];
  }, [onEdit, onDelete]);

  return (
    <BaseDataTable
      data={rows}
      columns={columns}
      loading={isLoading}
      pageCount={totalPages}
      pagination={pagination}
      onPaginationChange={(updater) => {
        const next =
          typeof updater === "function"
            ? updater(pagination)
            : updater;

        setPagination(next);

        onPageChange(next.pageIndex + 1);
      }}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
