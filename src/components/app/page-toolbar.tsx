type Props = {
  children: React.ReactNode;
};

export function PageToolbar({  children,}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      {children}
    </div>
  );
}
