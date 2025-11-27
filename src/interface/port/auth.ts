import type { UserCredential } from "firebase/auth";

export interface FirebaseAuthClient {
  createUserWithEmailPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  signInWithEmailPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential>;
}
