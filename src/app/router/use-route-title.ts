import { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { routeConfig } from "./route-config";

export function useRouteTitle() {
  const location = useLocation();

  return useMemo(() => {
    const route = routeConfig.find((item) => matchPath(item.path, location.pathname));

    return route?.title ?? "";
  }, [location.pathname]);
}
