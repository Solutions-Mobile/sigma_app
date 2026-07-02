import { useAuth } from "@/contexts/auth/use-auth";
import { AppBreadcrumbs } from "@/components/breadcrumbs/app-breadcrumbs";
import { usePageMetadata } from "@/hooks/use-page-metadata";

export function AppHeader() {
  const { breadcrumbs } = usePageMetadata();
  const { user } = useAuth();

  return (
    <header className="border-b bg-background px-6 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Sigma"
              className="h-10 w-10 object-contain bg-slate-400 rounded-full p-0.5"
            />
            <h1 className="text-2xl font-semibold">
              Signa Finance
            </h1>
          </div>

          <AppBreadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">
              {user?.login}
            </div>

            <div className="text-xs text-muted-foreground">
              {user?.profile}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}