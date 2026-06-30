import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  footer?: ReactNode;
  onSubmit: () => void;
};

export function BaseEntityForm({ children,  footer,  onSubmit,}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {children}

      {footer}
    </form>
  );
}
