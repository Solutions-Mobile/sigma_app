import { Button } from "@/components/ui/button";

import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";

import { EmptyState } from "@/components/data-display/empty-state";

export function UsuariosPage() {
  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button>
            Novo Usuário
          </Button>
        </PageToolbar>
      }
    >
      <EmptyState
        title="Nenhum usuário encontrado"
        description="Cadastre o primeiro usuário."
      />
    </AppPage>
  );
}
