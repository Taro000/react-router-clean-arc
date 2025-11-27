import { describe, it, expect, beforeEach } from "vitest";
import { createFirebaseApp } from "../app";
import type { FirebaseApp } from "../app";
import type { FirestoreClient } from "src/interface/port/firestore";

describe("Firebase", () => {
  let app: FirebaseApp;
  let firestore: FirestoreClient;

  beforeEach(() => {
    app = createFirebaseApp();
    firestore = app.firestore;
  });

  it("Firestoreを作成できる", () => {
    expect(firestore).toBeDefined();
  });

  it("Firestoreでドキュメントの作成・更新・取得・削除ができる", async () => {
    // ドキュメントを作成する
    const documentId = await firestore.createDocument("tests", {
      name: "test",
    });
    expect(documentId).toBeDefined();

    // ドキュメントを更新する
    await firestore.updateDocument("tests", documentId, { name: "test2" });
    const updatedDocument = await firestore.getDocument("tests", documentId);
    expect(updatedDocument).toBeDefined();
    expect(updatedDocument.data()?.name).toBe("test2");

    // ドキュメントを取得する
    const document = await firestore.getDocument("tests", documentId);
    expect(document).toBeDefined();
    expect(document.data()?.name).toBe("test2");

    // ドキュメントを全て取得する
    const documents = await firestore.getAllFilteredDocuments("tests", {
      field: "name",
      op: "==",
      value: "test2",
    });
    expect(documents).toBeDefined();
    expect(documents.length).toBe(1);
    expect(documents[0].data()?.name).toBe("test2");

    // ドキュメントを削除する
    await firestore.deleteDocument("tests", documentId);
    const remainingDocuments = await firestore.getAllFilteredDocuments("tests");
    expect(remainingDocuments.length).toBe(1);
  });
});
