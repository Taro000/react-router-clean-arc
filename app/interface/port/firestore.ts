import type { FieldPath, WhereFilterOp } from "firebase/firestore";
import type { DocumentSnapshot } from "firebase/firestore";

export type Filter = {
  field: string | FieldPath;
  op: WhereFilterOp;
  value: unknown;
};

export interface FirestoreClient {
  createDocument: (
    collectionPath: string,
    data: Record<string, unknown>,
  ) => Promise<string>;
  createDocumentWithId: (
    collectionPath: string,
    documentId: string,
    data: Record<string, unknown>,
  ) => Promise<string>;
  updateDocument: (
    collectionPath: string,
    documentId: string,
    data: Record<string, unknown>,
  ) => Promise<void>;
  getAllFilteredDocuments: (
    collectionPath: string,
    filter?: Filter,
  ) => Promise<DocumentSnapshot[]>;
  getDocument: (
    collectionPath: string,
    documentId: string,
  ) => Promise<DocumentSnapshot>;
  deleteDocument: (collectionPath: string, documentId: string) => Promise<void>;
}
