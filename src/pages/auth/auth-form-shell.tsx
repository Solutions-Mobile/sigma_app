import { type ReactNode } from "react";
import heroImage from "@/assets/Login-500x700.png";

type Props = {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AuthFormShell({ title, subtitle, actions, children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-10">
        <div className="grid w-full lg:grid-cols-[minmax(380px,430px)_minmax(380px,1fr)]">
          <div className="rounded-l-4xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl border border-primary">
                  <img
                    src="/pwa-192x192.png"
                    alt="Sigma"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                    SIGMA
                  </p>
                </div>
              </div>
              {actions}
            </div>

            <div className="mt-10 space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight">
                {title}
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                {subtitle}
              </p>
            </div>

            <div className="mt-10">
              {children}
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-r-4xl bg-slate-100 lg:block">
            <img
              src={heroImage}
              alt="Login Imagem"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
