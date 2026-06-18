type Props = {
  children: React.ReactNode;
};

export function FormActions({
  children,
}: Props) {
  return (
    <div className="flex justify-end gap-2 pt-4">
      {children}
    </div>
  );
}
