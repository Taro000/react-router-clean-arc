import type { User, UserId } from "~/domain/entity/user";

export interface UserUsecase {
  getUser: (id: UserId) => Promise<User>;
}
