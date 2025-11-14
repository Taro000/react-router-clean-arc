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
type UserEmail = string;

const MAX_USER_EMAIL_LENGTH = 255;

/**
 * メールアドレスを検証する
 * @param email - メールアドレス
 * @throws {Error} バリデーションエラー
 */
const validateUserEmail = (email: UserEmail) => {
  if (email.length > MAX_USER_EMAIL_LENGTH) {
    throw new Error(
      `メールアドレスは${MAX_USER_EMAIL_LENGTH}文字以内である必要があります`,
    );
  }
};

/*********************************************
 * 作成日時
 **********************************************/
type UserCreatedAt = Date;

/*********************************************
 * 更新日時
 **********************************************/
type UserUpdatedAt = Date;
