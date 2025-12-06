import type { LoginResponse, RegisterUserResponse } from "~/domain/entity/auth";
import type { UserEmail, UserNickname } from "~/domain/entity/user";
import type { UserPassword } from "~/domain/entity/auth";

export interface AuthUsecase {
  login: (email: UserEmail, password: UserPassword) => Promise<LoginResponse>;
  registerUser: (
    nickname: UserNickname,
    email: UserEmail,
    password: UserPassword,
  ) => Promise<RegisterUserResponse>;
}
