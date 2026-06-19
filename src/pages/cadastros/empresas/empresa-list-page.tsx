import { useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-loading";
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";
import { empresaColumns } from "./empresa-columns";
import { EmpresaFormDialog } from "./components/empresa-form-dialog";
import { useEmpresasQuery } from "@/hooks/queries/use-empresas-query";
import { useDeleteEmpresa } from "@/hooks/mutations/use-delete-empresa";
import { useUpdateEmpresa } from "@/hooks/mutations/use-update-empresa";
import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";
import type { EmpresaFormData } from "@/schemas/empresa/empresa-form.schema";

export function EmpresaListPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search] = useState("");

  const [    selectedEmpresaDelete,    setSelectedEmpresaDelete,  ] = useState<EmpresaDTO | null>(null);
  const [    selectedEmpresaEdit,    setSelectedEmpresaEdit,  ] = useState<EmpresaDTO | null>(null);
  const empresasQuery = useEmpresasQuery({    page,    limit,    search,  });
  const deleteMutation = useDeleteEmpresa();
  const updateMutation = useUpdateEmpresa();
  const empresas =    empresasQuery.data?.data ?? [];
  const loading =    empresasQuery.isLoading ||    empresasQuery.isFetching;

  function handleEdit(    empresa: EmpresaDTO,  ) {
    setSelectedEmpresaEdit(      empresa,    );
  }

  function handleOpenDelete(    empresa: EmpresaDTO,  ) {
    setSelectedEmpresaDelete(      empresa,    );
  }

  function handlePageChange(    nextPage: number,  ) {
    setPage(nextPage);
    }

  async function handleDelete() {
    if (
      !selectedEmpresaDelete
    ) {
      return;
    }

    await deleteMutation.mutateAsync(      selectedEmpresaDelete.id,    );

    setSelectedEmpresaDelete(      null,    );
  }

  async function handleEditSubmit(    data: EmpresaFormData,  ) {
    if (
      !selectedEmpresaEdit
    ) {
      return;
    }

    await updateMutation.mutateAsync({      id: selectedEmpresaEdit.id,      payload: data,    });

    setSelectedEmpresaEdit(      null,    );
  }

  return (
    <>
      {loading ? (
        <DataTableLoading />
      ) : (
        <DataTable
          columns={empresaColumns({
            onEdit: handleEdit,

            onDelete:
              handleOpenDelete,
          })}
          data={empresas}
        />
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Página {page} de{" "}
          {empresasQuery.data
            ?.totalPages ?? 1}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() =>
              handlePageChange(
                page - 1,
              )
            }
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            type="button"
            disabled={
              page >=
              (empresasQuery.data
                ?.totalPages ?? 1)
            }
            onClick={() =>
              handlePageChange(
                page + 1,
              )
            }
            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={
          !!selectedEmpresaDelete
        }
        title="Excluir empresa"
        description={`Deseja excluir a empresa "${selectedEmpresaDelete?.companyName}"?`}
        loading={
          deleteMutation.isPending
        }
        onCancel={() =>
          setSelectedEmpresaDelete(
            null,
          )
        }
        onConfirm={handleDelete}
      />

      <EmpresaFormDialog
        open={
          !!selectedEmpresaEdit
        }
        empresa={
          selectedEmpresaEdit
        }
        loading={
          updateMutation.isPending
        }
        onClose={() =>
          setSelectedEmpresaEdit(
            null,
          )
        }
        onSubmit={
          handleEditSubmit
        }
      />
    </>
  );
}