import type {
  ButtonHTMLAttributes,
} from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
  };

export function LoadingButton({
  loading,
  children,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      disabled={loading}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}

      {children}
    </Button>
  );
}
