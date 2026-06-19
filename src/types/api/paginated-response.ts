export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};
