const STORAGE_KEY = "sidebar:collapsed";

export function getSidebarCollapsed() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setSidebarCollapsed(
  collapsed: boolean
) {
  localStorage.setItem(
    STORAGE_KEY,
    String(collapsed)
  );
}
