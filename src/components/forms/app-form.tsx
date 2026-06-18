type Props = {
  children: React.ReactNode;
  onSubmit(): void;
};

export function AppForm({
  children,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {children}
    </form>
  );
}
