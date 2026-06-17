import { Button } from "@/components/ui/button";

import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";

import { EmptyState } from "@/components/data-display/empty-state";

export function PagamentosPage() {
  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button>
            Novo Pagamento
          </Button>
        </PageToolbar>
      }
    >
      <EmptyState
        title="Nenhum pagamento encontrado"
        description="Cadastre o primeiro pagamento."
      />
    </AppPage>
  );
}
