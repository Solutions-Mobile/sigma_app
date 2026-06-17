import { useContext } from "react";

import { AuthContext } from "./auth-context";

export function useAuth() {
  return useContext(AuthContext);
}

/*
import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}
*/