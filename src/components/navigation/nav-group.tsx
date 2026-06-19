import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import type { NavigationItem } from "./navigation-config";
import { NavItem } from "./nav-item";
import { cn } from "@/lib/utils";

type Props = {
  item: NavigationItem;
  collapsed?: boolean;
};

export function NavGroup({ item, collapsed, }: Props) {
  const location = useLocation();
  const hasActiveChild = useMemo(() => {
    return item.children?.some((child) =>
      location.pathname.startsWith(
        child.path || ""
      )
    );
  }, [item.children, location.pathname]);
  const [manualOpen, setManualOpen] =    useState(false);
  const open =    hasActiveChild || manualOpen;

  if (!item.children?.length) {
    return null;
  }

  const Icon = item.icon;

  function handleToggle() {
    if (hasActiveChild) {
      return;
    }

    setManualOpen((prev) => !prev);
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
          "hover:bg-muted"
        )}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className="h-4 w-4" />
          )}

          {!collapsed && (
            <span>{item.label}</span>
          )}
        </div>

        {!collapsed && (
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        )}
      </button>

      {open && !collapsed && (
        <div className="ml-4 space-y-1 border-l pl-2">
          {item.children.map((child) => (
            <NavItem
              key={child.path}
              label={child.label}
              path={child.path!}
              icon={child.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}
