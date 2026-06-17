import { Button } from "@/components/ui/button";
import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { EmptyState } from "@/components/data-display/empty-state";
import { useEmpresas } from "@/hooks/api/use-empresas";

export function EmpresasPage() {
  const {
    data,
    isLoading,
    isError,
  } = useEmpresas();

  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button>
            Nova Empresa
          </Button>
        </PageToolbar>
      }
    >
      {isLoading && (
        <EmptyState
          title="Carregando empresas..."
        />
      )}

      {isError && (
        <EmptyState
          title="Erro ao carregar empresas"
        />
      )}

      {!isLoading &&
        !isError &&
        data && (
          <DataTable
            data={data}
            columns={[
              {
                key: "id",
                label: "Código",
              },

              {
                key: "companyName",
                label:
                  "Razão Social",
              },

              {
                key: "documentNumber",
                label:
                  "Documento",
              },

              {
                key: "tradingName",
                label: "Nome Fantasia",
              },
            ]}
          />
        )}
    </AppPage>
  );
}
