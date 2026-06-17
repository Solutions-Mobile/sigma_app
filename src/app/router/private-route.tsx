import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/auth/use-auth";

export function PrivateRoute() {
  const { authenticated } = useAuth();

  return authenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

/*
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } =
    useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
*/