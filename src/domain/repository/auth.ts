import type { CredentialData, LoginRequest } from "src/domain/entity/auth";

export interface AuthRepository {
  createUserWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<CredentialData>;
  signInWithEmailPassword: (
    loginRequest: LoginRequest
  ) => Promise<CredentialData>;
}
