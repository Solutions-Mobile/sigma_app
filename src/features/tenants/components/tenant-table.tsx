import { DataTable } from "@/components/data-table/data-table";
import { useTenantsList } from "../hooks/use-tenants-list";
import { tenantColumns } from "./tenant-columns";

export function TenantTable() {
  const { data, isLoading } = useTenantsList({
    page: 1,
    limit: 50,
  });

  return (
    <DataTable
      columns={tenantColumns}
      data={data?.data ?? []}
      loading={isLoading}
    />
  );
}