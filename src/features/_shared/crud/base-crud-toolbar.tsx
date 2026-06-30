import type { ReactNode } from "react";
import { useRouteTitle } from "@/app/router/use-route-title";

type Props = {
  title?: string;
  actions?: ReactNode;
};


export function BaseCrudToolbar({ title, actions, }: Props) {
  const routeTitle = useRouteTitle();
  return (
    <div className="flex items-center justify-between">
      {title && (
        <h2 className="text-lg font-medium">
          {title ?? routeTitle}
        </h2>
      )}

      <div className="flex items-center gap-2">
        {actions}
      </div>
    </div>
  );
}
