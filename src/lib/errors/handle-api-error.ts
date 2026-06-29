import axios from "axios";
import { appToast } from "@/lib/toast/toast";
import { ERROR_MESSAGES } from "./error-messages";
import type { ApiErrorResponse } from "./api-error";

export function handleApiError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    appToast.error(ERROR_MESSAGES.default);

    return;
  }

  if (!error.response) {
    appToast.error(ERROR_MESSAGES.network);

    return;
  }

  const status = error.response.status;

  const data = error.response.data as ApiErrorResponse;

  switch (status) {
    case 400:
      appToast.error(data.message || ERROR_MESSAGES.validation);
      return;

    case 401:
      appToast.error(ERROR_MESSAGES.unauthorized);
      return;

    case 403:
      appToast.error(ERROR_MESSAGES.forbidden);
      return;

    case 404:
      appToast.error(ERROR_MESSAGES.notFound);
      return;

    case 409:
      appToast.error(data.message || ERROR_MESSAGES.conflict);
      return;

    default:
      appToast.error(data.message || ERROR_MESSAGES.default);
  }
}
