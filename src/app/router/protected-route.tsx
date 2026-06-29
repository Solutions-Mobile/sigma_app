import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth/use-auth";
import { hasPermission } from "@/lib/auth/permissions";
import type { Permission } from "@/types/auth/profilePermissionsTypes";

type Props = {
  children: React.ReactNode;
  permission?: Permission;
};

export function ProtectedRoute({  children,  permission,}: Props) {
  const { authenticated, user } =    useAuth();

  console.log(" authenticated: ", authenticated);
  console.log("user: ", user);
  console.log("children: ", children);
  console.log("permission: ", permission);

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    permission &&
    !hasPermission(
      user?.profile || "USER",
      permission
    )
  ) {
    return (
      <Navigate
        to="/403"
        replace
      />
    );
  }

  return children;
}
