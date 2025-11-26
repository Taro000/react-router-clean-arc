import type { FirebaseAuthClient } from "~/interface/port/auth";
import type { AuthRepository } from "~/domain/repository/auth";
import type { CredentialData, LoginRequest } from "~/domain/entity/auth";
import { newCredentialData } from "~/domain/entity/auth";

export const createAuthRepository = (
  auth: FirebaseAuthClient,
): AuthRepository => {
  const createUserWithEmailPassword = async (
    email: string,
    password: string,
  ): Promise<CredentialData> => {
    try {
      const userCredential = await auth.createUserWithEmailPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;
      const accessToken = await userCredential.user.getIdToken();

      const userAuth = newCredentialData(userId, accessToken);
      return userAuth;
    } catch (error) {
      throw error;
    }
  };

  const signInWithEmailPassword = async (
    loginRequest: LoginRequest,
  ): Promise<CredentialData> => {
    try {
      const userCredential = await auth.signInWithEmailPassword(
        loginRequest.email.value,
        loginRequest.password.value,
      );
      const userId = userCredential.user.uid;
      const accessToken = await userCredential.user.getIdToken();

      const userAuth = newCredentialData(userId, accessToken);
      return userAuth;
    } catch (error) {
      throw error;
    }
  };

  return { createUserWithEmailPassword, signInWithEmailPassword };
};
