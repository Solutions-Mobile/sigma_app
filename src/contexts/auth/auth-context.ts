import { createContext } from "react";
import type { AuthContextData } from "./types";

export const AuthContext =
  createContext<AuthContextData>(
    {} as AuthContextData,
  );

/*
import { createContext } from "react";
import { AuthUser } from "../types/auth";

export interface AuthContextData {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  signIn: (
    accessToken: string,
    refreshToken: string,
    user: AuthUser
  ) => void;

  signOut: () => void;
}

export const AuthContext =
  createContext<AuthContextData | null>(null);
*/  