export type ApiErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
};
