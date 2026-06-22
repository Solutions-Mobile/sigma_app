//src\lib\auth\auth-storage.ts
import type { LoginResponseDTO } from "@/services/auth/dtos/login-response.dto";

const ACCESS_TOKEN_KEY = "financeirojs-access-token";
const REFRESH_TOKEN_KEY = "financeirojs-refresh-token";
const USER_KEY = "financeirojs-user";

export class AuthStorage {
  static setSession(session: LoginResponseDTO): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  }

  static clearSession(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static getUser() {
    const user = localStorage.getItem(USER_KEY);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  static hasSession(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken() && this.getUser());
  }

  static getSession() {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
      user: this.getUser(),
    };
  }

  static setAccessToken(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  static setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}
