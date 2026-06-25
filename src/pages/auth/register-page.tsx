import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormShell } from "./auth-form-shell";

const registerSchema = z.object({
  login: z.string().min(1, "Informe o login"),
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "Informe uma senha com pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme a senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas devem ser iguais",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: RegisterFormData) {
    setSuccess(`Usuário ${data.login} cadastrado com sucesso. Faça login.`);
  }

  return (
    <AuthFormShell
      title="Crie sua conta"
      subtitle="Cadastre um usuário para acessar o sistema e comece a usar agora."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <Input placeholder="Login" {...register("login")} />
          {errors.login && (
            <p className="mt-2 text-sm text-destructive">{errors.login.message}</p>
          )}
        </div>

        <div>
          <Input placeholder="E-mail" {...register("email")} />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input type="password" placeholder="Senha" {...register("password")} />
          {errors.password && (
            <p className="mt-2 text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Input type="password" placeholder="Confirmar senha" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Cadastrar usuário
        </Button>
      </form>

      {success ? (
        <p className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </p>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold text-slate-950 hover:text-slate-700">
            Fazer login
          </Link>
        </p>
      )}
    </AuthFormShell>
  );
}
