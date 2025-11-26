import type { CredentialData, LoginRequest } from "~/domain/entity/auth";

export interface AuthRepository {
  createUserWithEmailPassword: (
    email: string,
    password: string,
  ) => Promise<CredentialData>;
  signInWithEmailPassword: (
    loginRequest: LoginRequest,
  ) => Promise<CredentialData>;
}
