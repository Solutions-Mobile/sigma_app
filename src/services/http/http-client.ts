import axios from "axios";
import { env } from "@/lib/env";

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
