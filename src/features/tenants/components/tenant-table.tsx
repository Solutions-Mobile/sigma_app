import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { TenantTableActions } from "./tenant-table-actions";
import { useTenantsList } from "../hooks/use-tenants-list";
import { tenantColumns } from "./tenant-columns";
import { useAppSettings } from "@/lib/app-settings-context";
import type { Tenant } from "../types/tenant.types";

type TenantTableProps = {
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
  searchTerm?: string;
};

export function TenantTable({ onEdit, onDelete, searchTerm }: TenantTableProps) {
  const { settings } = useAppSettings();
  const [page, setPage] = useState(1);
  const limit = settings.pageSize;

  const { data, isLoading } = useTenantsList({ page, limit });

  const rows = Array.isArray(data) ? data : data?.data ?? [];
  const totalRecords = Array.isArray(data) ? rows.length : data?.totalRecords ?? 0;
  const totalPages = Array.isArray(data) ? 1 : data?.totalPages ?? 1;

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

  // Filtro local por termo de busca
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter((tenant) =>
      tenant.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.tradingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.documentNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={filteredRows}
        loading={isLoading}
      />
      {!isLoading && filteredRows.length > 0 && (
        <DataTablePagination
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalRecords={totalRecords}
          disabled={isLoading}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
