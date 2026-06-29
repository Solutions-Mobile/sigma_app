import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "@/lib/errors/handle-api-error";
import { appToast } from "@/lib/toast/toast";

type Params<TData, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys?: readonly unknown[];
  successMessage?: string;
};

export function useAppMutation<TData = unknown, TVariables = void>({
  mutationFn,
  invalidateKeys,
  successMessage,
}: Params<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    onSuccess: async () => {
      if (successMessage) {
        appToast.success(successMessage, {duration: 4000,});
      }

      if (invalidateKeys) {
        await queryClient.invalidateQueries({
          queryKey: invalidateKeys,
        });
      }
    },

    onError: handleApiError,
  });
}
