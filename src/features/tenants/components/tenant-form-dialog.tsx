import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm,} from "react-hook-form";
import {  Dialog,  DialogContent,  DialogFooter,  DialogHeader,  DialogTitle,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  tenantFormSchema,  type TenantFormData,} from "@/features/tenants/schemas/tenant.schema";
import type { Tenant } from "../types/tenant.types";

type TenantFormDialogProps = {
  open: boolean;
  tenant: Tenant | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (    data: TenantFormData,  ) => Promise<void>;
};

export function TenantFormDialog({
  open,
  tenant,
  loading,
  onClose,
  onSubmit,
}: TenantFormDialogProps) {
  const form =
    useForm<TenantFormData>({
      resolver:
        zodResolver(
          tenantFormSchema,
        ),

      defaultValues: {
        companyName: "",
        tradingName: "",
        documentNumber: "",
      },
    });

  useEffect(() => {
    if (!tenant) {
      form.reset({
        companyName: "",
        tradingName: "",
        documentNumber: "",
      });

      return;
    }

    form.reset({
      companyName:
        tenant.companyName,

      tradingName:
        tenant.tradingName,

      documentNumber:
        tenant.documentNumber,
    });
  }, [tenant, form]);

  async function handleSubmit(
    data: TenantFormData,
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
            Editar tenant
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