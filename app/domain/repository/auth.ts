import type { Auth } from "~/domain/entity/auth";

export interface AuthRepository {
  createUserWithEmailPassword: (
    email: string,
    password: string,
  ) => Promise<Auth>;
  signInWithEmailPassword: (email: string, password: string) => Promise<Auth>;
}
