export type EmpresaDataSource =
  | "database"
  | "mock";

export type AppSettings = {
  empresaDataSource: EmpresaDataSource;
  pageSize: number;
};

const STORAGE_KEY = "sigma-app:settings";

export const DEFAULT_APP_SETTINGS: AppSettings = {
  empresaDataSource: "database",
  pageSize: 10,
};

export function getAppSettings(): AppSettings {
  if (typeof window === "undefined") {
    return DEFAULT_APP_SETTINGS;
  }

  const stored = window.localStorage.getItem(
    STORAGE_KEY,
  );

  if (!stored) {
    return DEFAULT_APP_SETTINGS;
  }

  try {
    const parsed = JSON.parse(
      stored,
    ) as Partial<AppSettings>;

    return normalizeAppSettings(parsed);
  } catch {
    return DEFAULT_APP_SETTINGS;
  }
}

export function saveAppSettings(
  settings: AppSettings,
) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      normalizeAppSettings(settings),
    ),
  );
}

function normalizeAppSettings(
  settings: Partial<AppSettings>,
): AppSettings {
  const pageSize = Number(
    settings.pageSize,
  );

  return {
    empresaDataSource:
      settings.empresaDataSource === "mock"
        ? "mock"
        : "database",
    pageSize: [10, 25, 50, 100].includes(
      pageSize,
    )
      ? pageSize
      : DEFAULT_APP_SETTINGS.pageSize,
  };
}
