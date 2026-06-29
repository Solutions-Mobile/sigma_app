import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormShell } from "./auth-form-shell";
import axios from "axios";

const loginSchema = z.object({
  login: z.string().min(1, "Informe o login"),
  password: z.string().min(1, "Informe a senha"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login: executeLogin, authenticated, } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), });

  async function onSubmit(data: LoginFormData,) {
    try {
      setError("");
      setLoading(true);

      await executeLogin(data.login, data.password);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setError(message || "Erro ao autenticar");
        return;
      }
      setError("Erro interno ao autenticar");
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
    <AuthFormShell
      title="Bem-vindo"
      subtitle="Faça login para acessar seu painel financeiro."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input placeholder="Login" {...register("login")} />
          {errors.login && (
            <p className="mt-2 text-sm text-destructive">{errors.login.message}</p>
          )}
        </div>

        <div>
          <Input type="password" placeholder="Senha" {...register("password")} />
          {errors.password && (
            <p className="mt-2 text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-5 text-sm text-slate-500">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Acessar conta"}
          </Button>

          <Link to="/login/forgot-password" className="font-semibold text-slate-600 hover:text-slate-800">
            Esqueci minha senha
          </Link>

          <Link to="/login/register" className="font-semibold text-slate-600 hover:text-slate-800">
            Cadastrar uma conta
          </Link>
        </div>
      </form>
    </AuthFormShell>
  );
}
