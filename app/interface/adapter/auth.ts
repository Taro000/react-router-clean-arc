import type { FirebaseAuthClient } from "~/interface/port/auth";
import type { AuthRepository } from "~/domain/repository/auth";
import type { Auth } from "~/domain/entity/auth";
import { newAuth } from "~/domain/entity/auth";

export const createFirebaseAuthClient = (
  auth: FirebaseAuthClient,
): AuthRepository => {
  const createUserWithEmailPassword = async (
    email: string,
    password: string,
  ): Promise<Auth> => {
    try {
      const userCredential = await auth.createUserWithEmailPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;
      const accessToken = await userCredential.user.getIdToken();

      const userAuth = newAuth(userId, accessToken);
      return userAuth;
    } catch (error) {
      throw error;
    }
  };

  const signInWithEmailPassword = async (
    email: string,
    password: string,
  ): Promise<Auth> => {
    try {
      const userCredential = await auth.signInWithEmailPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;
      const accessToken = await userCredential.user.getIdToken();

      const userAuth = newAuth(userId, accessToken);
      return userAuth;
    } catch (error) {
      throw error;
    }
  };

  return { createUserWithEmailPassword, signInWithEmailPassword };
};
