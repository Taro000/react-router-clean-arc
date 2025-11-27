import type { CredentialData, LoginResponse } from "src/domain/entity/auth";
import type { User, UserEmail, UserId } from "src/domain/entity/user";
import type { UserPassword } from "src/domain/entity/auth";

export interface AuthUsecase {
  login: (email: UserEmail, password: UserPassword) => Promise<LoginResponse>;
  registerUser: (
    nickname: string,
    email: UserEmail,
    password: UserPassword
  ) => Promise<CredentialData>;
  getUser: (id: UserId) => Promise<User>;
}
