/*
import { useState } from "react";
import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { TenantFormDialog } from "../components/tenant-form-dialog";
import { TenantTable } from "../components/tenant-table";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { useCreateTenant } from "../hooks/use-tenant-create";
import { useTenantDelete } from "../hooks/use-tenant-delete";
import { useUpdateTenant } from "../hooks/use-tenant-update";
import type { Tenant } from "../types/tenant.types";
import type { TenantFormData } from "../schemas/tenant.schema";

export default function TenantsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const createTenant = useCreateTenant();
  const updateTenant = useUpdateTenant();
  const deleteTenant = useTenantDelete();

  function handleOpenCreate() {
    setSelectedTenant(null);
    setFormOpen(true);
  }

  function handleEdit(tenant: Tenant) {
    setSelectedTenant(tenant);
    setFormOpen(true);
  }

  function handleDelete(tenant: Tenant) {
    setTenantToDelete(tenant);
    setConfirmDeleteOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
    setSelectedTenant(null);
  }

  async function handleSubmitForm(data: TenantFormData) {
    try {
      if (selectedTenant) {
        await updateTenant.mutateAsync({
          id: selectedTenant.id,
          payload: data,
        });
      } else {
        await createTenant.mutateAsync(data);
      }

      handleCloseForm();
    } catch {
      // Mutation errors are handled by hooks with toast notifications.
    }
  }

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  async function handleConfirmDelete() {
    if (!tenantToDelete) {
      return;
    }

    try {
      await deleteTenant.mutateAsync(tenantToDelete.id);
    } finally {
      setConfirmDeleteOpen(false);
      setTenantToDelete(null);
    }
  }

  function handleCancelDelete() {
    setConfirmDeleteOpen(false);
    setTenantToDelete(null);
  }

  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div className="min-w-0">
            <DataTableSearch
              value={searchTerm}
              placeholder="Pesquisar por nome, fantasia ou documento..."
              disabled={false}
              onChange={handleSearchChange}
            />
          </div>

          <Button onClick={handleOpenCreate}>
            Novo Tenant
          </Button>
        </PageToolbar>
      }
    >
      <TenantTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchTerm={searchTerm}
      />

      <TenantFormDialog
        open={formOpen}
        tenant={selectedTenant}
        title={selectedTenant ? "Editar tenant" : "Novo tenant"}
        loading={createTenant.isLoading || updateTenant.isLoading}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Excluir tenant"
        description="Deseja realmente excluir este tenant? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        loading={deleteTenant.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AppPage>
  );
}
*/