import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";
import type { FirebaseAuthClient } from "src/interface/port/auth";

/**
 * Firebase認証クライアントを作成する
 * @param app - Firebaseアプリ
 * @returns Firebase認証クライアント
 */
export const createFirebaseAuthClient = (
  app: FirebaseApp
): FirebaseAuthClient => {
  const auth = getAuth(app);

  const ERROR_MESSAGE_CREATE_USER_WITH_EMAIL_PASSWORD_FAILED = `ユーザーを作成できませんでした。`;
  /**
   * メールアドレスとパスワードでユーザーを作成する
   * @param email - メールアドレス
   * @param password - パスワード
   * @returns UserCredential - 作成したユーザーの認証情報
   * @throws {Error} ユーザーを作成できなかった場合
   */
  const createUserWithEmailPassword = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credential;
    } catch (error) {
      throw new Error(
        `${ERROR_MESSAGE_CREATE_USER_WITH_EMAIL_PASSWORD_FAILED}: ${error}`
      );
    }
  };

  const ERROR_MESSAGE_SIGN_IN_WITH_EMAIL_PASSWORD_FAILED = `ログインできませんでした。`;
  /**
   * メールアドレスとパスワードでログインする
   * @param email - メールアドレス
   * @param password - パスワード
   * @returns UserCredential - ログインしたユーザーの認証情報
   * @throws {Error} ログインできなかった場合
   */
  const signInWithEmailPassword = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credential;
    } catch (error) {
      throw new Error(
        `${ERROR_MESSAGE_SIGN_IN_WITH_EMAIL_PASSWORD_FAILED}: ${error}`
      );
    }
  };

  return { createUserWithEmailPassword, signInWithEmailPassword };
};
