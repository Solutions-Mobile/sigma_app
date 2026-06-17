import { Button } from "@/components/ui/button";

import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";

import { EmptyState } from "@/components/data-display/empty-state";

export function RecebimentosPage() {
  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button>
            Novo Recebimento
          </Button>
        </PageToolbar>
      }
    >
      <EmptyState
        title="Nenhum recebimento encontrado"
        description="Cadastre o primeiro recebimento."
      />
    </AppPage>
  );
}
