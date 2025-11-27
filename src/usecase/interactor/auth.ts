import type { AuthRepository } from "src/domain/repository/auth";
import type { UserRepository } from "src/domain/repository/user";
import { newUser } from "src/domain/entity/user";
import type {
  CredentialData,
  LoginResponse,
  UserPassword,
} from "src/domain/entity/auth";
import type { User, UserEmail, UserId } from "src/domain/entity/user";
import type { AuthUsecase } from "src/usecase/usecase/auth";
import { newLoginRequest, newLoginResponse } from "src/domain/entity/auth";

/**
 * 認証ユースケースを作成する
 * - 認証関連のアプリケーションロジック
 */
export const createAuthUsecase = (
  authRepository: AuthRepository,
  userRepository: UserRepository
): AuthUsecase => {
  /**
   * ログインする
   * @param email - メールアドレス
   * @param password - パスワード
   * @returns LoginResponse - ログインレスポンス
   * @throws {Error} ログインで例外が発生した場合
   */
  const login = async (
    email: UserEmail,
    password: UserPassword
  ): Promise<LoginResponse> => {
    try {
      const loginRequest = newLoginRequest(email, password);
      if (!loginRequest.isValid) {
        return newLoginResponse(
          undefined,
          undefined,
          loginRequest.errorMessages,
          false
        );
      }
      const userCredential =
        await authRepository.signInWithEmailPassword(loginRequest);
      return newLoginResponse(
        userCredential.userId,
        userCredential.accessToken
      );
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (
    nickname: string,
    email: UserEmail,
    password: UserPassword
  ): Promise<CredentialData> => {
    try {
      // ユーザーを作成する
      const userCredential = await authRepository.createUserWithEmailPassword(
        email.value,
        password.value
      );
      // ユーザーをDBに登録する
      const user = newUser(userCredential.userId, nickname, email);
      await userRepository.createUser(user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id: UserId): Promise<User> => {
    try {
      const user = await userRepository.getUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    registerUser,
    getUser,
  };
};
