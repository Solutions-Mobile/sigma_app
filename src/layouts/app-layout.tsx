import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/navigation/app-sidebar";

import { AppHeader } from "@/components/app/app-header";

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
