import { useMemo } from "react";

import { useLocation } from "react-router-dom";

import { routeConfig } from "@/app/router/route-config";

export function usePageMetadata() {
  const location = useLocation();

  return useMemo(() => {
    const currentRoute = routeConfig.find(
      (route) => route.path === location.pathname
    );

    const breadcrumbs = location.pathname
      .split("/")
      .filter(Boolean);

    return {
      title: currentRoute?.title || "Página",

      breadcrumbs,
    };
  }, [location.pathname]);
}
