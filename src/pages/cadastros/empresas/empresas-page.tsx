import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableActions } from "@/components/data-table/data-table-actions";
import { DataTableLoading } from "@/components/data-table/data-table-loading";
import { useEmpresasQuery } from "@/hooks/queries/use-empresas-query";
import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";

export function EmpresasPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const empresasQuery = useEmpresasQuery({ page, limit, });
  const empresas = empresasQuery.data?.data ?? [];
  const totalPages = empresasQuery.data?.totalPages ?? 1;
  const loading = empresasQuery.isLoading || empresasQuery.isFetching;

  function handlePreviousPage() {
    if (page <= 1) {
      return;
    }

    setPage(page - 1);
  }

  function handleNextPage() {
    if (
      page >= totalPages
    ) {
      return;
    }

    setPage(page + 1);
  }

  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />
          <Button onClick={() => navigate("/cadastros/empresas/nova",)} >
            Nova Empresa
          </Button>
        </PageToolbar>
      }
    >
      {loading ? (
        <DataTableLoading />
      ) : (
        <>
          <DataTable<EmpresaDTO>
            data={empresas}
            columns={[
              { key: "companyName", label: "Razão Social", },
              { key: "tradingName", label: "Fantasia", },
              { key: "documentNumber", label: "Documento", },
              {
                key: "id", label: "Ações",
                sortable: false,
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

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Página {page} de{" "}
              {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <Button variant="outline" disabled={page <= 1} onClick={handlePreviousPage}>
                Anterior
              </Button>

              <Button variant="outline" disabled={page >= totalPages} onClick={handleNextPage}>
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}
    </AppPage>
  );
}
