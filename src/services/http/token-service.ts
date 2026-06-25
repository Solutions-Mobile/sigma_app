import { AuthStorage } from "@/lib/auth/auth-storage";

export const tokenService = {
  getAccessToken() {
    return AuthStorage.getAccessToken();
  },

  getRefreshToken() {
    return AuthStorage.getRefreshToken();
  },

  setTokens(accessToken: string, refreshToken: string) {
    AuthStorage.setAccessToken(accessToken);
    AuthStorage.setRefreshToken(refreshToken);
  },

  clear() {
    AuthStorage.clearSession();
  },
};

/*
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenService = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
*/