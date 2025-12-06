import type { FirebaseAuthClient } from "~/interface/port/auth";
import type { AuthRepository } from "~/domain/repository/auth";
import type {
  CredentialData,
  LoginRequest,
  RegisterUserRequest,
} from "~/domain/entity/auth";
import { newCredentialData } from "~/domain/entity/auth";
import { newUserId } from "~/domain/entity/user";

/*********************************************
 * 認証リポジトリを作成する
 **********************************************/
export const createAuthRepository = (
  auth: FirebaseAuthClient,
): AuthRepository => {
  /**
   * メールアドレスとパスワードでログインする
   * @param loginRequest - ログインリクエスト
   * @returns CredentialData - ユーザーの認証情報
   * @throws {Error} ログインできなかった場合
   */
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

  /**
   * メールアドレスとパスワードでユーザーを作成する
   * @param registerUserRequest - ユーザー登録リクエスト
   * @returns CredentialData - ユーザーの認証情報
   * @throws {Error} ユーザーを作成できなかった場合
   */
  const createUserWithEmailPassword = async (
    registerUserRequest: RegisterUserRequest,
  ): Promise<CredentialData> => {
    try {
      const userCredential = await auth.createUserWithEmailPassword(
        registerUserRequest.email.value,
        registerUserRequest.password.value,
      );
      const userId = userCredential.user.uid;
      const accessToken = await userCredential.user.getIdToken();

      const userAuth = newCredentialData(newUserId(userId), accessToken);
      return userAuth;
    } catch (error) {
      throw new Error(`interfaceでエラーが発生しました: ${error}`);
    }
  };

  return { signInWithEmailPassword, createUserWithEmailPassword };
};
