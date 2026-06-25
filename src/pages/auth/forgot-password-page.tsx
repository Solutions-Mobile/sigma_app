import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthFormShell } from "./auth-form-shell";

const forgotPasswordSchema = z.object({
    email: z.string().email("Informe um e-mail válido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    function onSubmit(data: ForgotPasswordFormData) {
        setMessage(`Enviamos instruções para ${data.email}. Verifique sua caixa de entrada.`);
    }

    return (
        <AuthFormShell
            title="Esqueci minha senha"
            subtitle="Informe o e-mail cadastrado para receber instruções de recuperação."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <Input placeholder="E-mail" {...register("email")} />
                    {errors.email && (
                        <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full">
                    Enviar instruções
                </Button>

                <p className="mt-6 text-sm text-slate-500">
                    Lembrou a senha? {'  '}
                    <Link to="/login" className="font-semibold text-slate-950 hover:text-slate-700">
                        Voltar ao login
                    </Link>
                </p>
            </form>

            {message && (
                <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {message}
                </p>
            )}
        </AuthFormShell>
    );
}
