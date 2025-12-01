import type { UserRepository } from "~/domain/repository/user";
import type { UserUsecase } from "~/usecase/usecase/user";
import type { User, UserId } from "~/domain/entity/user";

export const createUserUsecase = (
  userRepository: UserRepository,
): UserUsecase => {
  /**
   * ユーザー情報を取得する
   * @param id - ユーザーID
   * @returns User - ユーザー
   * @throws {Error} ユーザー取得で例外が発生した場合
   */
  const getUser = async (id: UserId): Promise<User> => {
    try {
      const user = await userRepository.getUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    getUser,
  };
};
