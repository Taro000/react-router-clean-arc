import { isLongerThan, isRequired } from "src/domain/service/validationRules";
import type { ValidationError } from "src/domain/service/validationRules";

/*********************************************
 * ユーザー
 **********************************************/
export type User = {
  id: UserId;
  nickname: UserNickname;
  email: UserEmail;
};

const ERROR_MESSAGE_USER_CREATION_FAILED = `ユーザーの作成に失敗しました`;
/**
 * ユーザーを作成する
 * @param nickname - ニックネーム
 * @param email - メールアドレス
 * @returns ユーザー
 */
export const newUser = (
  id: UserId,
  nickname: UserNickname,
  email: UserEmail,
): User => {
  try {
    validateUserId(id);
    validateUserNickname(nickname);
    validateUserEmail(email);

    return { id, nickname, email };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_USER_CREATION_FAILED}: ${error}`);
  }
};

const ERROR_MESSAGE_USER_UPDATE_FAILED = `ユーザーの更新に失敗しました`;
/**
 * ユーザーを更新する
 * @param user - ユーザー
 * @returns ユーザー
 * @throws {Error} ユーザーの更新に失敗した場合
 */
export const updateUser = (user: User): User => {
  try {
    validateUserNickname(user.nickname);
    validateUserEmail(user.email);

    return { ...user };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_USER_UPDATE_FAILED}: ${error}`);
  }
};

/*********************************************
 * ID
 **********************************************/
export type UserId = {
  description: "ユーザーID";
  value: string;
  maxLength: 36;
};

export const newUserId = (value: string): UserId => {
  return {
    description: "ユーザーID",
    value: value,
    maxLength: 36,
  };
};

/**
 * ユーザーのIDを検証する
 * @param id - ユーザーのID
 * @throws {Error} バリデーションエラー
 */
const validateUserId = (id: UserId) => {
  const rules = [isLongerThan(id.value, id.maxLength)];
  return rules.filter((rule) => rule !== undefined) as ValidationError[];
};

/*********************************************
 * ニックネーム
 **********************************************/
export type UserNickname = {
  description: "ニックネーム";
  value: string;
  maxLength: 20;
};

export const newUserNickname = (value: string): UserNickname => {
  return {
    description: "ニックネーム",
    value: value,
    maxLength: 20,
  };
};

/**
 * ニックネームを検証する
 * @param nickname - ニックネーム
 * @returns バリデーションエラーの配列
 */
export const validateUserNickname = (
  nickname: UserNickname,
): ValidationError[] => {
  const rules = [
    isRequired(nickname.value),
    isLongerThan(nickname.value, nickname.maxLength),
  ];
  return rules.filter((rule) => rule !== undefined) as ValidationError[];
};

/*********************************************
 * メールアドレス
 **********************************************/
export type UserEmail = {
  description: "メールアドレス";
  value: string;
  maxLength: 255;
};

export const newUserEmail = (value: string): UserEmail => {
  return {
    description: "メールアドレス",
    value: value,
    maxLength: 255,
  };
};

/**
 * メールアドレスを検証する
 * @param email - メールアドレス
 * @returns バリデーションエラーの配列
 */
export const validateUserEmail = (email: UserEmail): ValidationError[] => {
  const rules = [
    isRequired(email.value),
    isLongerThan(email.value, email.maxLength),
  ];
  return rules.filter((rule) => rule !== undefined) as ValidationError[];
};
