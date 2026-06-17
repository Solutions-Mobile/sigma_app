export interface AuthUser {
  id: string;
  login: string;
  profile: string;
  email: string;
  tenantId: string;
}

export interface AuthContextData {
  user: AuthUser | null;
  authenticated: boolean;
  loading: boolean;

  login: (
    login: string,
    password: string,
  ) => Promise<void>;

  logout: () => Promise<void>;
}

/*
export interface AuthUser {
  id: string;
  login: string;
  name: string;
}

export interface AuthContextData {
  user: AuthUser | null;
  authenticated: boolean;
  loading: boolean;

  login(login: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
*/
