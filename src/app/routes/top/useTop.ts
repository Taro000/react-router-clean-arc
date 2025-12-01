import type { User } from "~/domain/entity/user";
import { newUserId } from "~/domain/entity/user";
import { createUserRepository } from "~/interface/adapter/user";
import { createFirebaseApp } from "~/infrastructure/firebase/app";
import { createUserUsecase } from "~/usecase/interactor/user";

const firebaseApp = createFirebaseApp();
const userRepository = createUserRepository(firebaseApp.firestore);
const userUsecase = createUserUsecase(userRepository);

export interface UseTopReturn {
  getUser: (userId: string) => Promise<User>;
}

export const useTop = (): UseTopReturn => {
  const getUser = async (userId: string): Promise<User> => {
    try {
      const user = await userUsecase.getUser(newUserId(userId));
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    getUser,
  };
};
