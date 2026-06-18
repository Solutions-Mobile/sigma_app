import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AppPage } from "@/components/app/app-page";
import { AppCard } from "@/components/app/app-card";
import { AppForm } from "@/components/forms/app-form";
import { FormInput } from "@/components/forms/form-input";
import { FormActions } from "@/components/forms/form-actions";
import { LoadingButton } from "@/components/feedback/loading-button";
import { type EmpresaFormData, empresaFormSchema, } from "@/schemas/empresa/empresa-form.schema";
import { useCreateEmpresa } from "@/hooks/mutations/use-create-empresa";

export function EmpresaCreatePage() {
    const navigate = useNavigate();

    const createMutation =
        useCreateEmpresa();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmpresaFormData>({
        resolver: zodResolver(
            empresaFormSchema,
        ),
    });

    async function onSubmit(
        data: EmpresaFormData,
    ) {
        await createMutation.mutateAsync(
            data,
        );

        navigate("/cadastros/empresas");
    }

    return (
        <AppPage>
            <AppCard>
                <AppForm
                    onSubmit={handleSubmit(
                        onSubmit,
                    )}
                >
                    <FormInput
                        label="Razão Social"
                        error={
                            errors.companyName
                                ?.message
                        }
                        {...register(
                            "companyName",
                        )}
                    />

                    <FormInput
                        label="Nome Fantasia"
                        error={
                            errors.tradingName
                                ?.message
                        }
                        {...register(
                            "tradingName",
                        )}
                    />

                    <FormInput
                        label="Documento"
                        error={
                            errors.documentNumber
                                ?.message
                        }
                        {...register(
                            "documentNumber",
                        )}
                    />

                    <FormActions>
                        <Button
                            type="button"
                            variant="outline"
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
                            loading={
                                createMutation.isPending
                            }
                        >
                            Salvar
                        </LoadingButton>
                    </FormActions>
                </AppForm>
            </AppCard>
        </AppPage>
    );
}
