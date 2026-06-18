import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { AppPage } from "@/components/app/app-page";

import { PageToolbar } from "@/components/app/page-toolbar";

import { DataTable } from "@/components/data-table/data-table";

import { DataTableActions } from "@/components/data-table/data-table-actions";

import { useEmpresas } from "@/hooks/api/use-empresas";

import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";

export function EmpresasPage() {
  const navigate =
    useNavigate();

  const {
    data = [],
    isLoading,
  } = useEmpresas();

  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button
            onClick={() =>
              navigate(
                "/cadastros/empresas/nova",
              )
            }
          >
            Nova Empresa
          </Button>
        </PageToolbar>
      }
    >
      <DataTable<EmpresaDTO>
        data={data}
        loading={isLoading}
        columns={[
          {
            key: "companyName",

            label:
              "Razão Social",
          },

          {
            key: "tradingName",

            label:
              "Fantasia",
          },

          {
            key:
              "documentNumber",

            label:
              "Documento",
          },

          {
            key: "id",

            label:
              "Ações",

            render: (
              _,
              row,
            ) => (
              <DataTableActions
                onEdit={() =>
                  navigate(
                    `/cadastros/empresas/${row.id}`,
                  )
                }
              />
            ),
          },
        ]}
      />
    </AppPage>
  );
}
