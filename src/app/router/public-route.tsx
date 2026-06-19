import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/use-auth";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({
  children,
}: PublicRouteProps) {
  const {
    authenticated,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  if (authenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}


/*
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/auth/use-auth";

export function PublicRoute() {
  const { authenticated } = useAuth();

  return authenticated
    ? <Navigate to="/" replace />
    : <Outlet />;
}
*/