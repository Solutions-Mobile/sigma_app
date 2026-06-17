export type UserProfile =
  | "ADMIN"
  | "MANAGER"
  | "USER";

export type Permission =
  | "dashboard:view"

  | "empresas:view"
  | "usuarios:view"
  | "perfis:view"

  | "contas:view"
  | "recebimentos:view"
  | "pagamentos:view"

  | "relatorios:view"

  | "configuracoes:view";
  