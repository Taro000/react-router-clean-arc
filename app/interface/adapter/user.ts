import type { FirestoreClient } from "~/interface/port/firestore";
import type { UserRepository } from "~/domain/repository/user";
import type { User, UserId } from "~/domain/entity/user";
import { newUser } from "~/domain/entity/user";
import type { DocumentSnapshot } from "firebase/firestore";

export const createUserRepository = (
  firestore: FirestoreClient,
): UserRepository => {
  const createUser = async (user: User): Promise<UserId> => {
    try {
      const userId = await firestore.createDocument("users", user);
      return userId;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (user: User): Promise<void> => {
    try {
      await firestore.updateDocument("users", user.id, user);
      return;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id: UserId): Promise<User> => {
    try {
      const user = await firestore.getDocument("users", id);
      return convertDocumentSnapshotToUser(user);
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (id: UserId): Promise<void> => {
    try {
      await firestore.deleteDocument("users", id);
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
  return newUser(documentSnapshot.id, data?.nickname, data?.email);
};
