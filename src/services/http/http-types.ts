import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

export type RequestConfig =
  InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

export type HttpError =
  AxiosError<{
    message?: string;
  }>;
  