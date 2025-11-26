import { isLongerThan, isRequired } from "~/domain/service/validationRules";
import type { ValidationError } from "~/domain/service/validationRules";

/*********************************************
 * ユーザー
 **********************************************/
export type User = {
  id: UserId;
  nickname: UserNickname;
  email: UserEmail;
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;
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

    const now = new Date();
    return { id, nickname, email, createdAt: now, updatedAt: now };
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

    const now = new Date();
    return { ...user, updatedAt: now };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_USER_UPDATE_FAILED}: ${error}`);
  }
};

/*********************************************
 * ID
 **********************************************/
export type UserId = string;

const MAX_USER_ID_LENGTH = 36;

/**
 * ユーザーのIDを検証する
 * @param id - ユーザーのID
 * @throws {Error} バリデーションエラー
 */
const validateUserId = (id: UserId) => {
  if (id.length > MAX_USER_ID_LENGTH) {
    throw new Error(`IDは${MAX_USER_ID_LENGTH}文字以内である必要があります`);
  }
};

/*********************************************
 * ニックネーム
 **********************************************/
type UserNickname = string;

const MAX_USER_NICKNAME_LENGTH = 20;

/**
 * ニックネームを検証する
 * @param nickname - ニックネーム
 * @throws {Error} バリデーションエラー
 */
const validateUserNickname = (nickname: UserNickname) => {
  if (nickname.length > MAX_USER_NICKNAME_LENGTH) {
    throw new Error(
      `ニックネームは${MAX_USER_NICKNAME_LENGTH}文字以内である必要があります`,
    );
  }
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

/*********************************************
 * 作成日時
 **********************************************/
type UserCreatedAt = Date;

/*********************************************
 * 更新日時
 **********************************************/
type UserUpdatedAt = Date;
