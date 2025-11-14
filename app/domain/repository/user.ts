import type { User, UserId } from "~/domain/entity/user";

export interface UserRepository {
  createUser: (user: User) => Promise<UserId>;
  updateUser: (user: User) => Promise<void>;
  getUser: (id: UserId) => Promise<User>;
  deleteUser: (id: UserId) => Promise<void>;
}
