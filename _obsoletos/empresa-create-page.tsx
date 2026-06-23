import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AppPage } from "@/components/app/app-page";
import { AppCard } from "@/components/app/app-card";
import { AppForm } from "@/components/forms/app-form";
import { FormInput } from "@/components/forms/form-input";
import { FormActions } from "@/components/forms/form-actions";
import { LoadingButton } from "@/components/feedback/loading-button";
import {  type EmpresaFormData,  empresaFormSchema,} from "@/features/tenants/schemas/empresa-form.schema";
import { useCreateEmpresa } from "@/features/tenants/hooks/use-tenant-create";
import { useUpdateEmpresa } from "@/features/tenants/hooks/use-tenant-update";
import { useEmpresasQuery } from "../hooks/use-tenants-list";
//import { useEmpresaQuery } from "@/features/tenants/hooks/use-tenants-list";

export function EmpresaCreatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = !!id;

  const createMutation =
    useCreateEmpresa();
  const updateMutation =
    useUpdateEmpresa();
  const empresaQuery =
    useEmpresasQuery(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpresaFormData>({
    resolver: zodResolver(
      empresaFormSchema,
    ),
    defaultValues: {
      companyName: "",
      tradingName: "",
      documentNumber: "",
    },
  });

  useEffect(() => {
    if (!empresaQuery.data) {
      return;
    }

    reset({
      companyName:
        empresaQuery.data.companyName,
      tradingName:
        empresaQuery.data.tradingName,
      documentNumber:
        empresaQuery.data.documentNumber,
    });
  }, [empresaQuery.data, reset]);

  async function onSubmit(
    data: EmpresaFormData,
  ) {
    if (editing && id) {
      await updateMutation.mutateAsync({
        id,
        payload: data,
      });
    } else {
      await createMutation.mutateAsync(
        data,
      );
    }

    navigate("/cadastros/empresas");
  }

  const loading =
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <AppPage>
      <div className="max-w-3xl space-y-4">
        <div>
          <h1 className="text-xl font-semibold">
            {editing
              ? "Editar empresa"
              : "Nova empresa"}
          </h1>
        </div>

        <AppCard>
          {empresaQuery.isLoading && editing ? (
            <div className="py-8 text-sm text-muted-foreground">
              Carregando empresa...
            </div>
          ) : empresaQuery.isError && editing ? (
            <div className="space-y-4 py-8">
              <p className="text-sm text-muted-foreground">
                Falha ao carregar empresa.
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate(
                    "/cadastros/empresas",
                  )
                }
              >
                Voltar
              </Button>
            </div>
          ) : (
            <AppForm
              onSubmit={handleSubmit(
                onSubmit,
              )}
            >
              <FormInput
                label="Razão Social"
                error={
                  errors.companyName?.message
                }
                disabled={loading}
                {...register("companyName")}
              />

              <FormInput
                label="Nome Fantasia"
                error={
                  errors.tradingName?.message
                }
                disabled={loading}
                {...register("tradingName")}
              />

              <FormInput
                label="Documento"
                error={
                  errors.documentNumber?.message
                }
                disabled={loading}
                {...register(
                  "documentNumber",
                )}
              />

              <FormActions>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() =>
                    navigate(
                      "/cadastros/empresas",
                    )
                  }
                >
                  Cancelar
                </Button>

                <LoadingButton
                  type="submit"
                  loading={loading}
                >
                  {editing
                    ? "Atualizar"
                    : "Salvar"}
                </LoadingButton>
              </FormActions>
            </AppForm>
          )}
        </AppCard>
      </div>
    </AppPage>
  );
}
