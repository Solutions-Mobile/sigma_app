import type { LoginRequestDTO } from "./dtos/login-request.dto";
import type { LoginResponseDTO } from "./dtos/login-response.dto";
import type { RefreshResponseDTO } from "./dtos/refresh-response.dto";
import { httpClient } from "@/services/http/http-client";
//import type { ApiResponse } from "@/types/api/api-response";

export const authService = {
  async login(payload: LoginRequestDTO) {
    // const { data } = await httpClient.post<ApiResponse<LoginResponseDTO>>("/auth/login", payload);
    // return data.data;
    const { data } = await httpClient.post<LoginResponseDTO>("/auth/login", payload);
    return data;
  },

  async refreshToken(refreshToken: string) {
    // const { data } = await httpClient.post<ApiResponse<RefreshResponseDTO>>("/auth/refresh", { refreshToken });
    // return data.data;
    const { data } = await httpClient.post<RefreshResponseDTO>("/auth/refresh", { refreshToken });
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    await httpClient.post("/auth/logout", { refreshToken });
  },
};
