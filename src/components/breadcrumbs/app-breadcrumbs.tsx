import { Fragment } from "react";

import { Link } from "react-router-dom";

import { ChevronRight } from "lucide-react";

import { routeConfig } from "@/app/router/route-config";

type Props = {
  items: string[];
};

export function AppBreadcrumbs({
  items,
}: Props) {
  function resolvePath(index: number) {
    return `/${items
      .slice(0, index + 1)
      .join("/")}`;
  }

  function resolveTitle(path: string) {
    return (
      routeConfig.find(
        (route) => route.path === path
      )?.title || path
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {items.map((_, index) => {
        const path = resolvePath(index);

        const isLast =
          index === items.length - 1;

        return (
          <Fragment key={path}>
            <Link
              to={path}
              className="hover:text-foreground"
            >
              {resolveTitle(path)}
            </Link>

            {!isLast && (
              <ChevronRight className="h-4 w-4" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
