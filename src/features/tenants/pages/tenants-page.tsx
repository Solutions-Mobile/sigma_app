import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { TenantTable } from "../components/tenant-table";

export default function TenantsPage() {
  return (
    <AppPage>
      <PageToolbar title="Tenants" />
      <TenantTable />
    </AppPage>
  );
}

