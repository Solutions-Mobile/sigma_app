export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;

  user: {
    id: string;
    login: string;
    profile: string;
    email: string;
    tenantId: string;
  };
}
