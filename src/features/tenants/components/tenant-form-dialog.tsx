import { useEffect } from "react";
import { useForm, } from "react-hook-form";
import { zodResolver, } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tenantSchema, type TenantFormData, } from "../schemas/tenant.schema";
import type { Tenant, } from "../types/tenant.types";

type Props = {
  open: boolean;

  tenant?: Tenant | null;

  title: string;

  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    data: TenantFormData,
  ) => Promise<void>;
};

export function TenantFormDialog({
  open,
  tenant,
  title,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const form = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema,),
    defaultValues: {
      companyName: "",
      tradingName: "",
      documentNumber: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!tenant) {
      form.reset({
        companyName: "",
        tradingName: "",
        documentNumber: "",
        isActive: true,
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

      isActive:
        tenant.isActive,
    });
  }, [tenant, form]);

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
            {title}
          </DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(
            async (data) => {
              await onSubmit(data);
            },
          )}
        >
          <div className="space-y-2">
            <Input
              placeholder="Razão social"
              {...form.register(
                "companyName",
              )}
            />

            <p className="text-sm text-red-500">
              {
                form.formState.errors
                  .companyName
                  ?.message
              }
            </p>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Nome fantasia"
              {...form.register(
                "tradingName",
              )}
            />

            <p className="text-sm text-red-500">
              {
                form.formState.errors
                  .tradingName
                  ?.message
              }
            </p>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Documento"
              {...form.register(
                "documentNumber",
              )}
            />

            <p className="text-sm text-red-500">
              {
                form.formState.errors
                  .documentNumber
                  ?.message
              }
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
