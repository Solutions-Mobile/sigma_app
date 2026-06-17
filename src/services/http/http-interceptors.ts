import type { AxiosResponse } from "axios";
import { authService } from "@/services/auth/auth-service";
import { httpClient } from "./http-client";
import { tokenService } from "./token-service";
import type { HttpError, RequestConfig } from "./http-types";

let isRefreshing = false;

let failedQueue: Array<{
  resolve(token: string): void;
  reject(error: unknown): void;
}> = [];

function processQueue(error: unknown, token?: string) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);

      return;
    }

    promise.resolve(token || "");
  });

  failedQueue = [];
}

httpClient.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: HttpError) => {
    const originalRequest = error.config as RequestConfig;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(httpClient(originalRequest));
          },

          reject,
        });
      });
    }

    try {
      isRefreshing = true;

      const refreshToken = tokenService.getRefreshToken();

      if (!refreshToken) {
        throw error;
      }

      const response = await authService.refreshToken(refreshToken);

      tokenService.setTokens(response.accessToken, response.refreshToken);

      processQueue(null, response.accessToken);

      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

      return httpClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      tokenService.clear();

      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
