import { useMemo, useState } from "react";
import { PanelLeftClose, PanelLeftOpen, } from "lucide-react";
import { useAuth } from "@/contexts/auth/use-auth";
import { getSidebarCollapsed, setSidebarCollapsed, } from "@/lib/auth/sidebar-storage";
import { hasPermission } from "@/lib/auth/permissions";
import { navigationConfig, type NavigationItem, } from "./navigation-config";
import { NavGroup } from "./nav-group";
import { NavItem } from "./nav-item";
import { cn } from "@/lib/utils";

function filterNavigation(
  items: NavigationItem[],
  profile: string
): NavigationItem[] {
  return items
    .filter((item) => {
      if (
        item.permission &&
        !hasPermission(
          profile,
          item.permission
        )
      ) {
        return false;
      }

      return true;
    })
    .map((item) => ({
      ...item,

      children: item.children?.filter(
        (child) =>
          !child.permission ||
          hasPermission(
            profile,
            child.permission
          )
      ),
    }))
    .filter((item) => {
      if (item.children) {
        return item.children.length > 0;
      }

      return true;
    });
}

export function AppSidebar() {
  const { user } = useAuth();

  const [collapsed, setCollapsed] =
    useState(getSidebarCollapsed);

  const items = useMemo(() => {
    return filterNavigation(
      navigationConfig,
      user?.profile || "USER"
    );
  }, [user?.profile]);


  function handleToggleSidebar() {
    const next = !collapsed;

    setCollapsed(next);
    setSidebarCollapsed(next);
  }

  return (
    <aside
      className={cn(
        "border-r bg-background transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <span className="font-semibold">
            Financeiro JS
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleSidebar}
          className="rounded-md p-2 hover:bg-muted"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="space-y-2 p-3">
        {items.map((item) => {
          if (item.children?.length) {
            return (
              <NavGroup
                key={item.label}
                item={item}
                collapsed={collapsed}
              />
            );
          }

          return (
            <NavItem
              key={item.path}
              label={item.label}
              path={item.path!}
              icon={item.icon}
              collapsed={collapsed}
            />
          );
        })}
      </nav>
    </aside>
  );
}
