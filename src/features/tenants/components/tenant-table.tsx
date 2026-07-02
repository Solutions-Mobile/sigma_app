import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { BaseDataTable } from "@/features/_shared/data-table/base-data-table";
import { TenantTableActions } from "./tenant-table-actions";
import { tenantColumns } from "./tenant-columns";
import { useTenantsList } from "../hooks/use-tenants-list";
import { useAppSettings } from "@/lib/app-settings-context";
import type { Tenant } from "../types/tenant.types";
import { usePersistedTableState } from "@/features/_shared/data-table/use-persisted-table-state";
import { createActionsColumn } from "@/features/_shared/data-table/create-actions-column";

type TenantTableProps = {
  page: number;
  searchTerm?: string;
  onSearchChange?: (
    value: string
  ) => void;
  isActive?: boolean;
  onPageChange: (page: number) => void;
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
};

export function TenantTable({
  searchTerm,
  onSearchChange,
  isActive,
  onPageChange,
  onEdit,
  onDelete,
}: TenantTableProps) {
  const { settings } = useAppSettings();
  const limit = settings.pageSize;
  const { pagination, sorting, setPagination, setSorting, } = usePersistedTableState(
    "tenants-table",
    limit
  );
  const { data, isLoading } = useTenantsList({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchTerm,
    isActive,
  });

  const rows = Array.isArray(data) ? data : data?.data ?? [];
  const totalPages = Array.isArray(data) ? 1 : data?.totalPages ?? 1;
  const columns = useMemo<ColumnDef<Tenant>[]>(() => {
    const baseColumns = tenantColumns;

    if (!onEdit || !onDelete) {
      return baseColumns;
    }

    return [
      ...baseColumns,

      // {
      //   id: "actions",
      //   header: "Ações",
      //   cell: ({ row }) => (
      //     <TenantTableActions
      //       tenant={row.original}
      //       onEdit={onEdit}
      //       onDelete={onDelete}
      //     />
      //   ),
      // },
      
      createActionsColumn<Tenant>({
        cell: (tenant) => (
          <TenantTableActions
            tenant={tenant}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      }),
    ];
  }, [onEdit, onDelete]);

  return (
    <BaseDataTable
      data={rows}
      columns={columns}
      loading={isLoading}
      search={searchTerm}
      onSearchChange={onSearchChange}
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
