import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormShell } from "./auth-form-shell";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Informe sua senha atual"),
  newPassword: z.string().min(6, "Informe uma nova senha com pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme a nova senha"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas devem ser iguais",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordPage() {
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  //function onSubmit(data: ChangePasswordFormData) {
  function onSubmit() {
    setSuccess("Senha alterada com sucesso. Use a nova senha para fazer login.");
  }

  return (
    <AuthFormShell
      title="Alterar senha"
      subtitle="Atualize sua senha para manter sua conta segura."
      actions={
        <Link
          to="/login"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Voltar ao login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input type="password" placeholder="Senha atual" {...register("currentPassword")} />
          {errors.currentPassword && (
            <p className="mt-2 text-sm text-destructive">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <Input type="password" placeholder="Nova senha" {...register("newPassword")} />
          {errors.newPassword && (
            <p className="mt-2 text-sm text-destructive">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <Input type="password" placeholder="Confirmar nova senha" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Alterar senha
        </Button>
      </form>

      {success && (
        <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {success}
        </p>
      )}
    </AuthFormShell>
  );
}
