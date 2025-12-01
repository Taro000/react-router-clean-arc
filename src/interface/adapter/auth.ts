import type { FirebaseAuthClient } from "src/interface/port/auth";
import type { AuthRepository } from "src/domain/repository/auth";
import type { CredentialData, LoginRequest } from "src/domain/entity/auth";
import { newCredentialData } from "src/domain/entity/auth";
import { newUserId } from "src/domain/entity/user";

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

      const userAuth = newCredentialData(newUserId(userId), accessToken);
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

      const userAuth = newCredentialData(newUserId(userId), accessToken);
      return userAuth;
    } catch (error) {
      throw new Error(`interfaceでエラーが発生しました: ${error}`);
    }
  };

  return { createUserWithEmailPassword, signInWithEmailPassword };
};
