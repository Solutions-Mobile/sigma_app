//import { LogOut, Moon, Sun } from "lucide-react";
//import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/use-auth";
//import { useTheme } from "@/components/theme/use-theme";
import { AppBreadcrumbs } from "@/components/breadcrumbs/app-breadcrumbs";
import { usePageMetadata } from "@/hooks/use-page-metadata";

export function AppHeader() {
  const { title, breadcrumbs } = usePageMetadata();
  const { user } = useAuth();

  return (
    <header className="border-b bg-background px-6 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            {title}
          </h1>

          <AppBreadcrumbs
            items={breadcrumbs}
          />
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