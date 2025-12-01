import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import type { DocumentSnapshot } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";
import type { FirestoreClient, Filter } from "src/interface/port/firestore";

/**
 * Firestoreクライアントを作成する
 * @param app - Firebaseアプリ
 * @returns Firestoreクライアント
 */
export const createFirestoreClient = (app: FirebaseApp): FirestoreClient => {
  const db = getFirestore(app);

  const ERROR_MESSAGE_SAVE_DOCUMENT_FAILED = `ドキュメントにデータを保存できませんでした。`;
  /**
   * ドキュメントにデータを保存する
   * @param collectionPath - コレクションパス
   * @param data - データ
   * @returns 作成したドキュメントのID
   * @throws {Error} ドキュメントにデータを保存できなかった場合
   */
  const createDocument = async (
    collectionPath: string,
    data: Record<string, unknown>,
  ): Promise<string> => {
    try {
      const collectionRef = collection(db, collectionPath);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw new Error(`${ERROR_MESSAGE_SAVE_DOCUMENT_FAILED}: ${error}`);
    }
  };

  /**
   * IDを指定してドキュメントを作成する
   * @param collectionPath - コレクションパス
   * @param documentId - ドキュメントID
   * @param data - データ
   * @returns 作成したドキュメントのID
   * @throws {Error} ドキュメントを作成できなかった場合
   */
  const createDocumentWithId = async (
    collectionPath: string,
    documentId: string,
    data: Record<string, unknown>,
  ): Promise<string> => {
    try {
      const collectionRef = collection(db, collectionPath);
      const docRef = doc(collectionRef, documentId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return documentId;
    } catch (error) {
      throw new Error(`${ERROR_MESSAGE_SAVE_DOCUMENT_FAILED}: ${error}`);
    }
  };

  const ERROR_MESSAGE_UPDATE_DOCUMENT_FAILED = `ドキュメントを更新できませんでした。`;
  /**
   * ドキュメントを更新する
   * @param collectionPath - コレクションパス
   * @param documentId - ドキュメントID
   * @param data - データ
   * @returns void
   * @throws {Error} ドキュメントを更新できなかった場合
   */
  const updateDocument = async (
    collectionPath: string,
    documentId: string,
    data: Record<string, unknown>,
  ): Promise<void> => {
    try {
      const collectionRef = collection(db, collectionPath);
      const docRef = doc(collectionRef, documentId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(`${ERROR_MESSAGE_UPDATE_DOCUMENT_FAILED}: ${error}`);
    }
  };

  const ERROR_MESSAGE_GET_ALL_DOCUMENTS_FAILED = `コレクションのドキュメントを全て取得できませんでした。`;
  /**
   * フィルターを適用してコレクションのドキュメントを全て取得する
   * @param collectionPath - コレクションパス
   * @param filter - フィルター
   * @returns DocumentSnapshot[] - ドキュメントのスナップショットの配列
   * @throws {Error} ドキュメントを取得できなかった場合
   */
  const getAllFilteredDocuments = async (
    collectionPath: string,
    filter?: Filter,
  ): Promise<DocumentSnapshot[]> => {
    try {
      const collectionRef = collection(db, collectionPath);
      const q = filter
        ? query(collectionRef, where(filter.field, filter.op, filter.value))
        : query(collectionRef);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc);
    } catch (error) {
      throw new Error(`${ERROR_MESSAGE_GET_ALL_DOCUMENTS_FAILED}: ${error}`);
    }
  };

  const ERROR_MESSAGE_GET_DOCUMENT_FAILED = `ドキュメントを取得できませんでした。`;
  /**
   * ドキュメントを取得する
   * @param collectionPath - コレクションパス
   * @param documentId - ドキュメントID
   * @returns DocumentSnapshot - ドキュメントのスナップショット
   * @throws {Error} ドキュメントを取得できなかった場合
   */
  const getDocument = async (
    collectionPath: string,
    documentId: string,
  ): Promise<DocumentSnapshot> => {
    try {
      const collectionRef = collection(db, collectionPath);
      const docRef = doc(collectionRef, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap;
      } else {
        throw new Error(
          `${ERROR_MESSAGE_GET_DOCUMENT_FAILED}: ドキュメントが存在しません。`,
        );
      }
    } catch (error) {
      throw new Error(`${ERROR_MESSAGE_GET_DOCUMENT_FAILED}: ${error}`);
    }
  };

  const ERROR_MESSAGE_DELETE_DOCUMENT_FAILED = `ドキュメントを削除できませんでした。`;
  /**
   * ドキュメントを削除する
   * @param collectionPath - コレクションパス
   * @param documentId - ドキュメントID
   * @returns void
   * @throws {Error} ドキュメントを削除できなかった場合
   */
  const deleteDocument = async (
    collectionPath: string,
    documentId: string,
  ): Promise<void> => {
    try {
      const collectionRef = collection(db, collectionPath);
      const docRef = doc(collectionRef, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(`${ERROR_MESSAGE_DELETE_DOCUMENT_FAILED}: ${error}`);
    }
  };

  return {
    createDocument,
    createDocumentWithId,
    updateDocument,
    getAllFilteredDocuments,
    getDocument,
    deleteDocument,
  };
};
