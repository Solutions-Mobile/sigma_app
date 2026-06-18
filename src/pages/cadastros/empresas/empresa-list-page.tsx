import { useState } from "react";

import { DataTable } from "@/components/data-table/data-table";

import { ConfirmDialog } from "@/components/dialogs/confirm-dialog";

import {
  empresaColumns,
} from "./empresa-columns";

import {
  EmpresaFormDialog,
} from "./components/empresa-form-dialog";

import {
  useEmpresasQuery,
} from "@/hooks/queries/use-empresas-query";

import {
  useDeleteEmpresa,
} from "@/hooks/mutations/use-delete-empresa";

import {
  useUpdateEmpresa,
} from "@/hooks/mutations/use-update-empresa";

import type {
  EmpresaDTO,
} from "@/services/empresas/dtos/empresa.dto";

import type {
  EmpresaFormData,
} from "@/schemas/empresa/empresa-form.schema";

export function EmpresaListPage() {
  const [
    selectedEmpresaDelete,
    setSelectedEmpresaDelete,
  ] = useState<EmpresaDTO | null>(
    null,
  );

  const [
    selectedEmpresaEdit,
    setSelectedEmpresaEdit,
  ] = useState<EmpresaDTO | null>(
    null,
  );

  const empresasQuery =
    useEmpresasQuery();

  const deleteMutation =
    useDeleteEmpresa();

  const updateMutation =
    useUpdateEmpresa();

  function handleEdit(
    empresa: EmpresaDTO,
  ) {
    setSelectedEmpresaEdit(
      empresa,
    );
  }

  function handleOpenDelete(
    empresa: EmpresaDTO,
  ) {
    setSelectedEmpresaDelete(
      empresa,
    );
  }

  async function handleDelete() {
    if (
      !selectedEmpresaDelete
    ) {
      return;
    }

    await deleteMutation.mutateAsync(
      selectedEmpresaDelete.id,
    );

    setSelectedEmpresaDelete(
      null,
    );
  }

  async function handleEditSubmit(
    data: EmpresaFormData,
  ) {
    if (
      !selectedEmpresaEdit
    ) {
      return;
    }

    await updateMutation.mutateAsync(
      {
        id: selectedEmpresaEdit.id,

        payload: data,
      },
    );

    setSelectedEmpresaEdit(
      null,
    );
  }

  return (
    <>
      <DataTable
        columns={empresaColumns({
          onEdit: handleEdit,

          onDelete:
            handleOpenDelete,
        })}
        data={
          empresasQuery.data ?? []
        }
        loading={
          empresasQuery.isLoading
        }
      />

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
