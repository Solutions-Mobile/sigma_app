type Props = {
  message?: string;
};

export function DataTableEmpty({
  message = "Nenhum registro encontrado",
}: Props) {
  return (
    <div
      className="
        flex
        h-40
        items-center
        justify-center
        rounded-md
        border
      "
    >
      <span className="text-sm text-muted-foreground">
        {message}
      </span>
    </div>
  );
}
