type Props = {
  message?: string;
};

export function FormError({
  message,
}: Props) {
  if (!message) {
    return null;
  }

  return (
    <span className="text-sm text-red-500">
      {message}
    </span>
  );
}
