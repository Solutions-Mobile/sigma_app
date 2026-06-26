import { useMemo } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { TenantTableActions } from "./tenant-table-actions";
import { tenantColumns } from "./tenant-columns";
import { useTenantsList } from "../hooks/use-tenants-list";
import { useAppSettings } from "@/lib/app-settings-context";
import type { Tenant } from "../types/tenant.types";

type TenantTableProps = {
  page: number;
  searchTerm?: string;
  onPageChange: (page: number) => void;
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
};

export function TenantTable({ page, searchTerm, onPageChange, onEdit, onDelete, }: TenantTableProps) {
  const { settings } = useAppSettings();
  const limit = settings.pageSize;

  //const { data, isLoading } = useTenantsList({ page, limit, });
  const { data, isLoading } = useTenantsList({ page, limit, search:searchTerm });
  const rows = Array.isArray(data)
    ? data
    : data?.data ?? [];

  const totalRecords = Array.isArray(data)
    ? rows.length
    : data?.totalRecords ?? 0;

  const totalPages = Array.isArray(data)
    ? 1
    : data?.totalPages ?? 1;

  const columns = useMemo(() => {
    const baseColumns = tenantColumns;

    if (!onEdit || !onDelete) {
      return baseColumns;
    }

    return [
      ...baseColumns,
      {
        key: "actions" as keyof Tenant,
        label: "Ações",
        sortable: false,
        render: (_, tenant: Tenant) => (
          <TenantTableActions
            tenant={tenant}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ];
  }, [onEdit, onDelete]);

  /*
  const filteredRows = useMemo(() => {
    if (!searchTerm) {
      return rows;
    }

    const normalized = searchTerm.toLowerCase();

    return rows.filter((tenant) =>
      tenant.companyName.toLowerCase().includes(normalized) ||
      tenant.tradingName.toLowerCase().includes(normalized) ||
      tenant.documentNumber.toLowerCase().includes(normalized)
    );
  }, [rows, searchTerm]);
  */

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={rows}
        loading={isLoading}
      />

      {!isLoading && rows.length > 0 && (
        <DataTablePagination
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalRecords={totalRecords}
          disabled={isLoading}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
