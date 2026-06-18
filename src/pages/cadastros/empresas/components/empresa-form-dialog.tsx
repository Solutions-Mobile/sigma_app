import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useForm,
} from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  empresaFormSchema,
  type EmpresaFormData,
} from "@/schemas/empresa/empresa-form.schema";

import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";

type EmpresaFormDialogProps = {
  open: boolean;

  empresa: EmpresaDTO | null;

  loading: boolean;

  onClose: () => void;

  onSubmit: (
    data: EmpresaFormData,
  ) => Promise<void>;
};

export function EmpresaFormDialog({
  open,
  empresa,
  loading,
  onClose,
  onSubmit,
}: EmpresaFormDialogProps) {
  const form =
    useForm<EmpresaFormData>({
      resolver:
        zodResolver(
          empresaFormSchema,
        ),

      defaultValues: {
        companyName: "",
        tradingName: "",
        documentNumber: "",
      },
    });

  useEffect(() => {
    if (!empresa) {
      form.reset({
        companyName: "",
        tradingName: "",
        documentNumber: "",
      });

      return;
    }

    form.reset({
      companyName:
        empresa.companyName,

      tradingName:
        empresa.tradingName,

      documentNumber:
        empresa.documentNumber,
    });
  }, [empresa, form]);

  async function handleSubmit(
    data: EmpresaFormData,
  ) {
    await onSubmit(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar empresa
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
          )}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Input
              placeholder="Razão social"
              {...form.register(
                "companyName",
              )}
            />

            {form.formState.errors
              .companyName && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .companyName
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Nome fantasia"
              {...form.register(
                "tradingName",
              )}
            />

            {form.formState.errors
              .tradingName && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .tradingName
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Documento"
              {...form.register(
                "documentNumber",
              )}
            />

            {form.formState.errors
              .documentNumber && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .documentNumber
                    .message
                }
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}