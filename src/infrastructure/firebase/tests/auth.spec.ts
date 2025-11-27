import { describe, it, expect, beforeEach } from "vitest";
import { createFirebaseApp } from "../app";
import type { FirebaseApp } from "../app";

describe("FirebaseAuthClient", () => {
  let app: FirebaseApp;

  beforeEach(() => {
    app = createFirebaseApp();
  });

  it("Firebase認証を作成できる", () => {
    const firebaseAuthClient = app.auth;
    expect(firebaseAuthClient).toBeDefined();
  });

  it("ユーザーを作成できる", async () => {
    const firebaseAuthClient = app.auth;
    const userCredential = await firebaseAuthClient.createUserWithEmailPassword(
      "test@example.com",
      "password",
    );
    expect(userCredential).toBeDefined();
  });

  it("ユーザーをログインできる", async () => {
    const firebaseAuthClient = app.auth;
    const userCredential = await firebaseAuthClient.signInWithEmailPassword(
      "test@example.com",
      "password",
    );
    expect(userCredential).toBeDefined();
  });
});
