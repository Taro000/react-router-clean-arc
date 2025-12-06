import { createFirebaseApp } from "~/infrastructure/firebase/app";
import { createAuthRepository } from "~/interface/adapter/auth";
import { createAuthUsecase } from "~/usecase/interactor/auth";
import { newUserEmail, newUserNickname } from "~/domain/entity/user";
import { newUserPassword } from "~/domain/entity/auth";
import { createUserRepository } from "~/interface/adapter/user";

const firebaseApp = createFirebaseApp();
const authRepository = createAuthRepository(firebaseApp.auth);
const userRepository = createUserRepository(firebaseApp.firestore);
const authUsecase = createAuthUsecase(authRepository, userRepository);

export type RegisterActionData = {
  userId: string | undefined;
  accessToken: string | undefined;
  errorMessage: string | undefined;
  isValid: boolean;
};

export interface UseRegisterReturn {
  register: (formData: FormData) => Promise<RegisterActionData>;
}

export const useRegister = (): UseRegisterReturn => {
  const register = async (formData: FormData): Promise<RegisterActionData> => {
    try {
      const registerData = Object.fromEntries(formData);
      const registerResponse = await authUsecase.registerUser(
        newUserNickname(String(registerData.nickname)),
        newUserEmail(String(registerData.email)),
        newUserPassword(String(registerData.password)),
      );
      return {
        userId: registerResponse.userId?.value,
        accessToken: registerResponse.accessToken,
        errorMessage: registerResponse.errorMessages[0],
        isValid: registerResponse.isValid,
      };
    } catch (error: unknown) {
      return {
        userId: undefined,
        accessToken: undefined,
        errorMessage:
          error instanceof Error
            ? error.message
            : "ユーザー登録に失敗しました。",
        isValid: false,
      };
    }
  };

  return {
    register,
  };
};
