import { describe, it, expect } from "vitest";
import { createFirebaseApp } from "../app";

describe("FirebaseApp", () => {
  it("Firebaseアプリを初期化できる", () => {
    const firebaseApp = createFirebaseApp();
    expect(firebaseApp).toBeDefined();
  });
});
