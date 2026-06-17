import { useCallback, useMemo, useState, } from "react";
import { AuthContext } from "./auth-context";
import type { AuthUser } from "./types";
import { AuthStorage } from "@/lib/auth/auth-storage";
import { authService } from "@/services/auth/auth-service";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => AuthStorage.getUser(),);
  const loading = false;

  const login = useCallback(
    async (
      loginValue: string,
      password: string,
    ) => {
      const response =
        await authService.login({
          login: loginValue,
          password,
        });

      AuthStorage.setSession(response);

      setUser(response.user);
    },
    [],
  );

  const logout = useCallback(
    async () => {
      try {
        const refreshToken =
          AuthStorage.getRefreshToken();

        if (refreshToken) {
          await authService.logout(refreshToken,);
        }
      } catch {
        // ignora erro remoto
      }

      AuthStorage.clearSession();

      setUser(null);
    },
    [],
  );
  const value = useMemo(
    () => ({
      user,
      loading,
      authenticated: !!user,
      login,
      logout,
    }),
    [
      user,
      loading,
      login,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
