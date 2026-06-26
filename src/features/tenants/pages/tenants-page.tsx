import { /*useEffect,*/ useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams, } from "react-router-dom";
import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { TenantFormDialog } from "../components/tenant-form-dialog";
import { TenantTable } from "../components/tenant-table";
import { useCreateTenant } from "../hooks/use-tenant-create";
import { useTenantDelete } from "../hooks/use-tenant-delete";
import { useTenantUpdate } from "../hooks/use-tenant-update";
import { useTenantById } from "../hooks/use-tenant-by-id";

import type { Tenant } from "../types/tenant.types";
import type { TenantFormData } from "../schemas/tenant.schema";

export default function TenantsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tenantId = params.id;
  const pathname = location.pathname;
  const isCreateRoute = pathname.endsWith("/nova");
  const isEditRoute = pathname.endsWith("/editar");
  const searchTerm = searchParams.get("search") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"),);
  const [inputSearch, setInputSearch] = useState(searchTerm);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const createTenant = useCreateTenant();
  const updateTenant = useTenantUpdate();
  const deleteTenant = useTenantDelete();

  const {
    data: selectedTenant,
    isLoading: loadingTenant,
  } = useTenantById(tenantId ?? "");

  const formOpen = isCreateRoute || (isEditRoute && Boolean(tenantId));

  // useEffect(() => {
  //   setInputSearch(searchTerm);
  // }, [searchTerm]);

  function updateQueryParams(params: {
    page?: number;
    search?: string;
  }) {
    const next = new URLSearchParams(searchParams);

    if (params.page && params.page > 1) {
      next.set("page", String(params.page));
    } else {
      next.delete("page");
    }

    if (params.search?.trim()) {
      next.set(
        "search",
        params.search.trim(),
      );
    } else {
      next.delete("search");
    }

    setSearchParams(next);
  }

  function handleApplySearch() {
    updateQueryParams({
      page: 1,
      search: inputSearch,
    });
  }

  function handlePageChange(nextPage: number) {
    updateQueryParams({
      page: nextPage,
      search: searchTerm,
    });
  }

  function handleOpenCreate() {
    navigate({
      pathname: "/cadastros/empresas/nova",
      search: searchParams.toString(),
    });
  }
  function handleEdit(tenant: Tenant) {
    navigate({
      pathname: `/cadastros/empresas/${tenant.id}/editar`,
      search: searchParams.toString(),
    });
  }

  function handleCloseForm() {
    navigate({
      pathname: "/cadastros/empresas",
      search: searchParams.toString(),
    });
  }

  function handleDelete(tenant: Tenant) {
    setTenantToDelete(tenant);
    setConfirmDeleteOpen(true);
  }

  async function handleSubmitForm(
    data: TenantFormData,
  ) {
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
      //
    }
  }

  async function handleConfirmDelete() {
    if (!tenantToDelete) {
      return;
    }

    try {
      await deleteTenant.mutateAsync(
        tenantToDelete.id,
      );
    } finally {
      setConfirmDeleteOpen(false);
      setTenantToDelete(null);
    }
  }

  const formTitle = useMemo(() => {
    if (selectedTenant) {
      return "Editar tenant";
    }

    return "Novo tenant";
  }, [selectedTenant]);

  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div className="min-w-0 flex gap-2">
            <DataTableSearch
              value={inputSearch}
              placeholder="Pesquisar... (Enter)"
              onChange={setInputSearch}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleApplySearch();
                }
              }}
              onClear={() => {
                setInputSearch("");

                updateQueryParams({
                  page: 1,
                  search: "",
                });
              }}
            />

            <Button onClick={handleApplySearch}>
              Buscar
            </Button>
          </div>

          <Button onClick={handleOpenCreate}>
            Novo Tenant
          </Button>
        </PageToolbar>
      }
    >
      <TenantTable
        page={page}
        searchTerm={searchTerm}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TenantFormDialog
        open={formOpen}
        tenant={isEditRoute ? selectedTenant ?? null : null}
        title={formTitle}
        loading={
          loadingTenant ||
          createTenant.isPending ||
          updateTenant.isPending
        }
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Excluir tenant"
        description="Deseja realmente excluir este tenant? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        loading={deleteTenant.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDeleteOpen(false);
          setTenantToDelete(null);
        }}
      />
    </AppPage>
  );
}
