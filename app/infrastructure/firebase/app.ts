import { initializeApp } from "firebase/app";
import { createFirebaseAuthClient } from "./auth";
import { createFirestoreClient } from "./firestore";
import type { FirebaseAuthClient } from "~/interface/port/auth";
import type { FirestoreClient } from "~/interface/port/firestore";

export type FirebaseApp = {
  auth: FirebaseAuthClient;
  firestore: FirestoreClient;
};

const ERROR_MESSAGE_CREATE_FIREBASE_APP_FAILED = `Firebaseアプリを作成できませんでした。`;
/**
 * Firebaseアプリを初期化する
 * @returns Firebaseアプリ
 * @throws {Error} Firebaseアプリを初期化できなかった場合
 */
export const createFirebaseApp = (): FirebaseApp => {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    const app = initializeApp(firebaseConfig);

    return {
      auth: createFirebaseAuthClient(app),
      firestore: createFirestoreClient(app),
    };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_CREATE_FIREBASE_APP_FAILED}: ${error}`);
  }
};
