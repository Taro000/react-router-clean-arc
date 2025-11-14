import type { UserId } from "~/domain/entity/user";

export type Auth = {
  userId: UserId;
  accessToken: AccessToken;
};

export const newAuth = (userId: UserId, accessToken: AccessToken): Auth => {
  return { userId, accessToken };
};

/*********************************************
 * アクセストークン
 **********************************************/
export type AccessToken = string;
