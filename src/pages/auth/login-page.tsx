import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useAuth } from "@/contexts/auth/use-auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Informe o login"),

  password: z
    .string()
    .min(1, "Informe a senha"),
});

type LoginFormData =
  z.infer<typeof loginSchema>;

export function LoginPage() {
  const {
    login: executeLogin,
    authenticated,
  } = useAuth();

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData,
  ) {
    try {
      setError("");
      setLoading(true);

      await executeLogin(
        data.login,
        data.password,
      );
    } catch {
      setError(
        "Login ou senha inválidos",
      );
    } finally {
      setLoading(false);
    }
  }

  if (authenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Financeiro JS
          </CardTitle>

          <CardDescription>
            Informe suas credenciais
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(
              onSubmit,
            )}
            className="space-y-4"
          >
            <div>
              <Input
                placeholder="Login"
                {...register("login")}
              />

              {errors.login && (
                <p className="mt-1 text-sm text-destructive">
                  {
                    errors.login
                      .message
                  }
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Senha"
                {...register(
                  "password",
                )}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-destructive">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Entrando..."
                : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
