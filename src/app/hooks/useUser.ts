import { createFirebaseApp } from "src/infrastructure/firebase/app";
import { createAuthRepository } from "src/interface/adapter/auth";
import { createAuthUsecase } from "src/usecase/interactor/auth";
import type { User, UserId } from "src/domain/entity/user";
import { createUserRepository } from "src/interface/adapter/user";
import { newUserEmail } from "src/domain/entity/user";
import { newUserPassword } from "src/domain/entity/auth";
import type { LoginActionData } from "~/app/routes/login";

const firebaseApp = createFirebaseApp();
const authRepository = createAuthRepository(firebaseApp.auth);
const userRepository = createUserRepository(firebaseApp.firestore);
const authUsecase = createAuthUsecase(authRepository, userRepository);

/**********************************************
 * ユーザー関連のカスタムフック
 * - Interface層に相当する。
 * - Usecase層を呼び出す。
 * - データ変換を通して、Reactとビジネスロジックの橋渡しを目的とする。
 * - Useacse層の薄いラッパー。
 **********************************************/
export const useUser = () => {
  const login = async (formData: FormData): Promise<LoginActionData> => {
    try {
      const loginData = Object.fromEntries(formData);
      const loginResponse = await authUsecase.login(
        newUserEmail(String(loginData.email)),
        newUserPassword(String(loginData.password))
      );
      return {
        userId: loginResponse.userId,
        errorMessage: loginResponse.errorMessages[0],
        isValid: loginResponse.isValid,
      };
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (formData: FormData): Promise<UserId> => {
    try {
      const registerData = Object.fromEntries(formData);
      const authData = await authUsecase.registerUser(
        String(registerData.nickname),
        newUserEmail(String(registerData.email)),
        newUserPassword(String(registerData.password))
      );
      return authData.userId;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id: UserId): Promise<User> => {
    try {
      const user = await authUsecase.getUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return { login, registerUser, getUser };
};
