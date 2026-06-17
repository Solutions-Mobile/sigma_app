import { useEffect } from "react";
//import { ThemeToggle } from "@/components/common/theme-toggle";
import { api } from "@/lib/axios/api";

export function DashboardPage() {
  useEffect(() => {
    async function test() {
      try {
        const response =
          await api.get(
            "/auth/me/info",
          );

        console.log(
          "USER INFO",
          response.data,
        );
      } catch (error) {
        console.error(error);
      }
    }

    test();
  }, []);

  return (
    <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
    </div>
  );
}

    // <div className="flex min-h-screen flex-col">
    //   <header className="flex items-center justify-end border-b p-4">
    //     <ThemeToggle />
    //   </header>

    //   <main className="flex flex-1 items-center justify-center">
    //     <h1 className="text-2xl font-semibold">
    //       Dashboard
    //     </h1>
    //   </main>
    // </div>
