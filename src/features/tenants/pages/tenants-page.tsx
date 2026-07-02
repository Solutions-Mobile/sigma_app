import { /*useEffect,*/ useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams, } from "react-router-dom";
import { AppPage } from "@/components/app/app-page";
//import { PageToolbar } from "@/components/app/page-toolbar";
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
//import { Checkbox } from "@/components/ui/checkbox";

import { BaseCrudToolbar } from "@/features/_shared/crud/base-crud-toolbar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
//import { BaseListPage } from "@/features/_shared/crud/base-list-page";

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
  const isActive = searchParams.get("isActive") !== "false";
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

  function updateQueryParams(params: {
    page?: number;
    search?: string;
    isActive?: boolean;
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

    if (params.isActive === false) {
      next.set("isActive", "false");
    } else {
      next.delete("isActive");
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

  function handleAfterDelete() {
    navigate({
      pathname: "/cadastros/empresas",
      search: searchParams.toString(),
    });

    if (page > 1) {
      updateQueryParams({
        page: page - 1,
        search: searchTerm,
      });
    }
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

    await deleteTenant.mutateAsync(tenantToDelete.id,);
    setConfirmDeleteOpen(false);
    setTenantToDelete(null);
    handleAfterDelete();
  }

  const formTitle = useMemo(() => {
    if (selectedTenant) {
      return "Editar empresa";
    }

    return "Nova empresa";
  }, [selectedTenant]);

  return (
    <AppPage
      toolbar={
        <BaseCrudToolbar
          actions={
            <>
              <div className="flex items-center gap-2">
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

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/40 transition-all shadow-sm">
                  <Switch
                    id="active-filter"
                    checked={!isActive}
                    className="data-[state=checked]:bg-[#09448d] data-[state=unchecked]:bg-zinc-200 border border-transparent data-[state=unchecked]:border-zinc-300 focus-visible:ring-[#09448d]"
                    onCheckedChange={(checked) => {
                      updateQueryParams({
                        page: 1,
                        search: searchTerm,
                        isActive: !checked,
                      });
                    }}
                  />
                  <Label
                    htmlFor="active-filter"
                    className="text-sm font-semibold text-foreground/90 cursor-pointer select-none"
                  >
                    Mostrar Inativos
                  </Label>
                </div>
              </div>
              <Button onClick={handleOpenCreate}>
                Nova empresa
              </Button>
            </>
          }
        />}
    >
      <TenantTable
        page={page}
        searchTerm={searchTerm}
        isActive={isActive}
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

