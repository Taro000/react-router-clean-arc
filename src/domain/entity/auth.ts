import type { UserEmail, UserId } from "src/domain/entity/user";
import { validateUserEmail } from "src/domain/entity/user";
import {
  isLongerThan,
  isShorterThan,
  isRequired,
  toErrorMessage,
} from "src/domain/service/validationRules";
import type { ValidationError } from "src/domain/service/validationRules";

/*********************************************
 * ログインリクエスト
 **********************************************/
export type LoginRequest = {
  email: UserEmail;
  password: UserPassword;
  errorMessages: string[];
  isValid: boolean;
};

/**
 * ログインリクエストを作成する
 * @param email - メールアドレス
 * @param password - パスワード
 * @returns ログインリクエスト
 */
export const newLoginRequest = (
  email: UserEmail,
  password: UserPassword,
): LoginRequest => {
  let errorMessages: string[] = [];
  errorMessages = errorMessages.concat(
    validateUserEmail(email).map((error) =>
      toErrorMessage(email.description, error, email.maxLength),
    ),
  );
  errorMessages = errorMessages.concat(
    validateUserPassword(password).map((error) =>
      toErrorMessage(
        password.description,
        error,
        password.maxLength,
        password.minLength,
      ),
    ),
  );
  return {
    email,
    password,
    errorMessages,
    isValid: errorMessages.length === 0,
  };
};

/*********************************************
 * ログインレスポンス
 **********************************************/
export type LoginResponse = {
  userId: UserId | undefined;
  accessToken: AccessToken | undefined;
  errorMessages: string[];
  isValid: boolean;
};

export const newLoginResponse = (
  userId: UserId | undefined,
  accessToken: AccessToken | undefined,
  errorMessages: string[] = [],
  isValid: boolean = false,
): LoginResponse => {
  return { userId, accessToken, errorMessages, isValid };
};

/*********************************************
 * パスワード
 **********************************************/
export type UserPassword = {
  description: "パスワード";
  value: string;
  maxLength: 128;
  minLength: 8;
};

export const newUserPassword = (value: string): UserPassword => {
  return {
    description: "パスワード",
    value: value,
    maxLength: 128,
    minLength: 8,
  };
};

/**
 * パスワードを検証する
 * @param password - パスワード
 * @returns バリデーションエラーの配列
 */
const validateUserPassword = (password: UserPassword): ValidationError[] => {
  const rules = [
    isRequired(password.value),
    isLongerThan(password.value, password.maxLength),
    isShorterThan(password.value, password.minLength),
  ];
  return rules.filter((rule) => rule !== undefined) as ValidationError[];
};

/*********************************************
 * 認証情報
 **********************************************/
export type CredentialData = {
  userId: UserId;
  accessToken: AccessToken;
};

export const newCredentialData = (
  userId: UserId,
  accessToken: AccessToken,
): CredentialData => {
  return { userId, accessToken };
};

/*********************************************
 * アクセストークン
 **********************************************/
export type AccessToken = string;
