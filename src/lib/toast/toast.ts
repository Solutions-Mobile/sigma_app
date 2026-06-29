import { toast, type ExternalToast } from "sonner";

const defaultOptions: ExternalToast = {
  duration: Number.POSITIVE_INFINITY,
  closeButton: true,
};

export const appToast = {
  success(message: string, options?: ExternalToast) {
    toast.success(message, { ...defaultOptions, ...options });
  },

  error(message: string, options?: ExternalToast) {
    toast.error(message, { ...defaultOptions, ...options });
  },

  warning(message: string, options?: ExternalToast) {
    toast.warning(message, { ...defaultOptions, ...options });
  },

  info(message: string, options?: ExternalToast) {
    toast.info(message, { ...defaultOptions, ...options });
  },

  loading(message: string, options?: ExternalToast) {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
};