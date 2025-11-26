import type { CredentialData, LoginResponse } from "~/domain/entity/auth";
import type { User, UserEmail, UserId } from "~/domain/entity/user";
import type { UserPassword } from "~/domain/entity/auth";

export interface AuthUsecase {
  login: (email: UserEmail, password: UserPassword) => Promise<LoginResponse>;
  registerUser: (
    nickname: string,
    email: UserEmail,
    password: UserPassword,
  ) => Promise<CredentialData>;
  getUser: (id: UserId) => Promise<User>;
}
