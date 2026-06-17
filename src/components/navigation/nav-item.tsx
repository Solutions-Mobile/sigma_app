import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  path: string;
  icon?: React.ElementType;
  collapsed?: boolean;
};

export function NavItem({
  label,
  path,
  icon: Icon,
  collapsed,
}: Props) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          "hover:bg-muted",
          isActive &&
            "bg-primary text-primary-foreground",
          collapsed && "justify-center"
        )
      }
    >
      {Icon && <Icon className="h-4 w-4" />}

      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
