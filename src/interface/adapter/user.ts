import type { FirestoreClient } from "src/interface/port/firestore";
import type { UserRepository } from "src/domain/repository/user";
import type { User, UserId } from "src/domain/entity/user";
import {
  newUser,
  newUserNickname,
  newUserEmail,
  newUserId,
} from "src/domain/entity/user";
import type { DocumentSnapshot } from "firebase/firestore";

export const createUserRepository = (
  firestore: FirestoreClient,
): UserRepository => {
  const createUser = async (user: User): Promise<UserId> => {
    try {
      const userId = await firestore.createDocumentWithId(
        "users",
        user.id.value,
        {
          nickname: user.nickname.value,
          email: user.email.value,
        },
      );
      return newUserId(userId);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (user: User): Promise<void> => {
    try {
      await firestore.updateDocument("users", user.id.value, user);
      return;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id: UserId): Promise<User> => {
    try {
      const user = await firestore.getDocument("users", id.value);
      return convertDocumentSnapshotToUser(user);
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (id: UserId): Promise<void> => {
    try {
      await firestore.deleteDocument("users", id.value);
    } catch (error) {
      throw error;
    }
  };

  return { createUser, updateUser, getUser, deleteUser };
};

/**
 * DocumentSnapshotをUserに変換する
 * @param documentSnapshot
 * @returns User
 */
const convertDocumentSnapshotToUser = (
  documentSnapshot: DocumentSnapshot,
): User => {
  const data = documentSnapshot.data();
  return newUser(
    newUserId(documentSnapshot.id),
    newUserNickname(data?.nickname),
    newUserEmail(data?.email),
  );
};
