export type DataSourceKind = "database" | "mock";

export type DataSourceConfig = {
  tenants: DataSourceKind;
  [resource: string]: DataSourceKind;
};

export type AppSettings = {
  dataSources: DataSourceConfig;
  pageSize: number;
};

const STORAGE_KEY = "sigma-app:settings";

export const DEFAULT_APP_SETTINGS: AppSettings = {
  dataSources: {
    tenants: "database",
  },
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
    ) as Partial<AppSettings> & {
      empresaDataSource?: DataSourceKind;
    };

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

export function getDataSource(
  settings: AppSettings,
  resource: string,
): DataSourceKind {
  return settings.dataSources[resource] ?? "database";
}

function normalizeAppSettings(
  settings: Partial<AppSettings> & {
    empresaDataSource?: DataSourceKind;
  },
): AppSettings {
  const pageSize = Number(
    settings.pageSize,
  );

  return {
    dataSources: {
      tenants:
        settings.empresaDataSource === "mock"
          ? "mock"
          : settings.dataSources?.tenants ?? "database",
      ...settings.dataSources,
    },
    pageSize: [10, 25, 50, 100].includes(
      pageSize,
    )
      ? pageSize
      : DEFAULT_APP_SETTINGS.pageSize,
  };
}
