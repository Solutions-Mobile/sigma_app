import {
  useSearchParams,
} from "react-router-dom";

type Params = {
  defaultPage?: number;
  defaultLimit?: number;
};

export function useUrlPagination({
  defaultPage = 1,
  defaultLimit = 10,
}: Params = {}) {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const page = Number(
    searchParams.get("page") ??
      defaultPage,
  );

  const limit = Number(
    searchParams.get("limit") ??
      defaultLimit,
  );

  const search =
    searchParams.get("search") ?? "";

  const setPage = (value: number) => {
    const params =
      new URLSearchParams(searchParams);

    params.set("page", String(value));

    setSearchParams(params);
  };

  const setLimit = (
    value: number,
  ) => {
    const params =
      new URLSearchParams(searchParams);

    params.set("limit", String(value));

    setSearchParams(params);
  };

  const setSearch = (
    value: string,
  ) => {
    const params =
      new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  return {
    page,
    limit,
    search,

    setPage,
    setLimit,
    setSearch,
  };
}
