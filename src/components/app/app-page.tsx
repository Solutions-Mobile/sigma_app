type Props = {
  toolbar?: React.ReactNode;
  children: React.ReactNode;
};

export function AppPage({
  toolbar,
  children,
}: Props) {
  return (
    <div className="space-y-6">
      {toolbar}

      {children}
    </div>
  );
}
