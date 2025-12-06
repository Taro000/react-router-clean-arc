import type {
  CredentialData,
  LoginRequest,
  RegisterUserRequest,
} from "~/domain/entity/auth";

export interface AuthRepository {
  createUserWithEmailPassword: (
    registerUserRequest: RegisterUserRequest,
  ) => Promise<CredentialData>;
  signInWithEmailPassword: (
    loginRequest: LoginRequest,
  ) => Promise<CredentialData>;
}
