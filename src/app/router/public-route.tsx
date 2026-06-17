import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/auth/use-auth";

export function PublicRoute() {
  const { authenticated } = useAuth();

  return authenticated
    ? <Navigate to="/" replace />
    : <Outlet />;
}

/*
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } =
    useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
*/