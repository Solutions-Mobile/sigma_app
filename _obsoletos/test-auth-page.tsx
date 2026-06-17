import { useEffect } from "react";

import { api } from "@/lib/axios/api";
import { useAuth } from "@/contexts/auth/use-auth";

export function TestAuthPage() {
  const { login } = useAuth();

  useEffect(() => {
    async function execute() {
      await login(
        "admin",
        "123456",
      );

      const response = await api.get(
        "/auth/me/info",
      );

      console.log(response.data);
    }

    execute();
  }, [login]);

  return (
    <div>
      Testando Interceptors
    </div>
  );
}