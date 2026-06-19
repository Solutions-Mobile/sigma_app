//import { LogOut, Moon, Sun } from "lucide-react";
//import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/use-auth";
//import { useTheme } from "@/components/theme/use-theme";
import { AppBreadcrumbs } from "@/components/breadcrumbs/app-breadcrumbs";
import { usePageMetadata } from "@/hooks/use-page-metadata";

export function AppHeader() {
  const { title, breadcrumbs } = usePageMetadata();
  const { user } = useAuth();

  /*
  // MARCOS - 19/06/2026 - MOVIDO PARA "SideBar" 
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
   function handleToggleTheme() {
     setTheme(theme === "dark" ? "light" : "dark");
   }
  */

  return (
    <header className="border-b bg-background px-6 py-4">
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

          {/* // MARCOS - 19/06/2026 - MOVIDO PARA "SideBar" 
          <Button variant="outline" size="icon" onClick={handleToggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button> 

          <Button variant="outline" size="icon" onClick={logout}          >
            <LogOut className="h-4 w-4" />
          </Button>
          */}
        </div>
      </div>
    </header>
  );
}