import { useEffect, useState } from "react";
import type { OnChangeFn, PaginationState, SortingState } from "@tanstack/react-table";

type PersistedTableState = {
  pagination: PaginationState;
  sorting: SortingState;
};

// const DEFAULT_STATE: PersistedTableState = {
//   pagination: {
//     pageIndex: 0,
//     pageSize: 10,
//   },

//   sorting: [],
// };

export function usePersistedTableState(storageKey: string, pageSize = 10) {
  const [state, setState] = useState<PersistedTableState>(() => {
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      //return DEFAULT_STATE;
      return {
        pagination: {
          pageIndex: 0,
          pageSize,
        },

        sorting: [],
      };
    }

    try {
      return JSON.parse(stored);
    } catch {
      //return DEFAULT_STATE;
      return {
        pagination: {
          pageIndex: 0,
          pageSize,
        },

        sorting: [],
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return {
    pagination: state.pagination,

    sorting: state.sorting,

    //setPagination: (updater) => {
    setPagination: (updater: Parameters<OnChangeFn<PaginationState>>[0]) => {
      setState((prev) => ({
        ...prev,

        pagination: typeof updater === "function" ? updater(prev.pagination) : updater,
      }));
    },

    //setSorting: (updater) => {
    setSorting: (updater: Parameters<OnChangeFn<SortingState>>[0]) => {
      setState((prev) => ({
        ...prev,

        sorting: typeof updater === "function" ? updater(prev.sorting) : updater,
      }));
    },
  };
}
