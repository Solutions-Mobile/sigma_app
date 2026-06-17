import { Button } from "@/components/ui/button";

import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";

import { EmptyState } from "@/components/data-display/empty-state";

export function ContasPage() {
  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />

          <Button>
            Nova Conta
          </Button>
        </PageToolbar>
      }
    >
      <EmptyState
        title="Nenhuma conta encontrada"
        description="Cadastre a primeira conta."
      />
    </AppPage>
  );
}
