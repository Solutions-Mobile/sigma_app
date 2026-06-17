type Props = {
  children: React.ReactNode;
};

export function AppCard({
  children,
}: Props) {
  return (
    <div className="rounded-lg border bg-background p-4">
      {children}
    </div>
  );
}
