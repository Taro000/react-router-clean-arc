import { createFirebaseApp } from "~/infrastructure/firebase/app";
import { createAuthRepository } from "~/interface/adapter/auth";
import { createAuthUsecase } from "~/usecase/interactor/auth";
import { newUserEmail } from "~/domain/entity/user";
import { newUserPassword } from "~/domain/entity/auth";
import { createUserRepository } from "~/interface/adapter/user";

const firebaseApp = createFirebaseApp();
const authRepository = createAuthRepository(firebaseApp.auth);
const userRepository = createUserRepository(firebaseApp.firestore);
const authUsecase = createAuthUsecase(authRepository, userRepository);

export type LoginActionData = {
  userId: string | undefined;
  accessToken: string | undefined;
  errorMessage: string | undefined;
  isValid: boolean;
};

export interface UseLoginReturn {
  login: (formData: FormData) => Promise<LoginActionData>;
}

export const useLogin = (): UseLoginReturn => {
  const login = async (formData: FormData): Promise<LoginActionData> => {
    try {
      const loginData = Object.fromEntries(formData);
      const loginResponse = await authUsecase.login(
        newUserEmail(String(loginData.email)),
        newUserPassword(String(loginData.password)),
      );
      return {
        userId: loginResponse.userId?.value,
        accessToken: loginResponse.accessToken,
        errorMessage: loginResponse.errorMessages[0],
        isValid: loginResponse.isValid,
      };
    } catch (error: unknown) {
      return {
        userId: undefined,
        accessToken: undefined,
        errorMessage:
          error instanceof Error ? error.message : "ログインに失敗しました。",
        isValid: false,
      };
    }
  };

  return {
    login,
  };
};
