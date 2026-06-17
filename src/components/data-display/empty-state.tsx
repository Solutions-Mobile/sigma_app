type Props = {
  title: string;
  description?: string;
};

export function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
