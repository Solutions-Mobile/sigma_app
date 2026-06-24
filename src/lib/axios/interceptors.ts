import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { AuthStorage } from "@/lib/auth/auth-storage";
import { authService } from "@/services/auth/auth-service";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export function setupInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = AuthStorage.getAccessToken();
      console.log("Authorization Token:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = executeRefresh();
        }

        await refreshPromise;

        return api(originalRequest);
      } catch (refreshError) {
        AuthStorage.clearSession();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    },
  );
}

async function executeRefresh() {
  const refreshToken = AuthStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const response = await authService.refreshToken(refreshToken);

  AuthStorage.setAccessToken(response.accessToken);
  AuthStorage.setRefreshToken(response.refreshToken);
}
