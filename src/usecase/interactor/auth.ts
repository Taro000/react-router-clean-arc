import type { AuthRepository } from "~/domain/repository/auth";
import type { UserRepository } from "~/domain/repository/user";
import { newUser } from "~/domain/entity/user";
import type {
  LoginResponse,
  RegisterUserResponse,
  UserPassword,
} from "~/domain/entity/auth";
import type { UserEmail, UserNickname } from "~/domain/entity/user";
import type { AuthUsecase } from "~/usecase/usecase/auth";
import {
  newLoginRequest,
  newLoginResponse,
  newRegisterUserRequest,
  newRegisterUserResponse,
} from "~/domain/entity/auth";

/**
 * 認証ユースケースを作成する
 * - 認証関連のアプリケーションロジック
 */
export const createAuthUsecase = (
  authRepository: AuthRepository,
  userRepository: UserRepository,
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
    password: UserPassword,
  ): Promise<LoginResponse> => {
    try {
      const loginRequest = newLoginRequest(email, password);
      if (!loginRequest.isValid) {
        return newLoginResponse(
          undefined,
          undefined,
          loginRequest.errorMessages,
          false,
        );
      }
      // ログインする
      const userCredential =
        await authRepository.signInWithEmailPassword(loginRequest);
      return newLoginResponse(
        userCredential.userId,
        userCredential.accessToken,
        [],
        true,
      );
    } catch (error) {
      throw new Error(`usecaseでエラーが発生しました: ${error}`);
    }
  };

  const registerUser = async (
    nickname: UserNickname,
    email: UserEmail,
    password: UserPassword,
  ): Promise<RegisterUserResponse> => {
    try {
      const registerUserRequest = newRegisterUserRequest(
        nickname,
        email,
        password,
      );
      if (!registerUserRequest.isValid) {
        return newRegisterUserResponse(
          undefined,
          undefined,
          registerUserRequest.errorMessages,
          false,
        );
      }
      // ユーザーを作成する
      const userCredential =
        await authRepository.createUserWithEmailPassword(registerUserRequest);
      // ユーザーをDBに登録する
      const user = newUser(
        userCredential.userId,
        registerUserRequest.nickname,
        registerUserRequest.email,
      );
      await userRepository.createUser(user);
      return newRegisterUserResponse(
        userCredential.userId,
        userCredential.accessToken,
        [],
        true,
      );
    } catch (error) {
      throw new Error(`usecaseでエラーが発生しました: ${error}`);
    }
  };

  return {
    login,
    registerUser,
  };
};
