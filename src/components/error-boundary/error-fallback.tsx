import { Button } from "@/components/ui/button";

type Props = {
  onRetry: () => void;
};

export function ErrorFallback({
  onRetry,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">
          Ocorreu um erro inesperado
        </h1>

        <p className="text-sm text-muted-foreground">
          Tente novamente.
        </p>
      </div>

      <Button onClick={onRetry}>
        Recarregar página
      </Button>
    </div>
  );
}
