import { useEffect } from "react";
import { api } from "@/lib/axios/api";

export function DashboardPage() {
  useEffect(() => {
    async function test() {
      try {
        //const response = 
        await api.get("/auth/me/info",);
        // console.log("USER INFO", response.data,);
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

