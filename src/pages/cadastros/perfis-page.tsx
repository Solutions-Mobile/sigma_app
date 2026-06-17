import { Button } from "@/components/ui/button";

import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";

import { EmptyState } from "@/components/data-display/empty-state";

export function PerfisPage() {
  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button>
            Novo Perfil
          </Button>
        </PageToolbar>
      }
    >
      <EmptyState
        title="Nenhum perfil encontrado"
        description="Cadastre o primeiro perfil."
      />
    </AppPage>
  );
}
