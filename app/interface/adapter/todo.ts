import type { Todo, TodoId } from "~/domain/entity/todo";
import { newTodo } from "~/domain/entity/todo";
import type { FirestoreClient, Filter } from "~/interface/port/firestore";
import type { DocumentSnapshot } from "firebase/firestore";
import type { TodoRepository } from "~/domain/repository/todo";

export const createTodoRepository = (
  firestore: FirestoreClient,
): TodoRepository => {
  const createTodo = async (todo: Todo): Promise<TodoId> => {
    try {
      const todoId = await firestore.createDocument("todos", todo);
      return todoId;
    } catch (error) {
      throw error;
    }
  };

  const updateTodo = async (todo: Todo): Promise<void> => {
    try {
      await firestore.updateDocument("todos", todo.id, todo);
      return;
    } catch (error) {
      throw error;
    }
  };

  const getTodo = async (id: string): Promise<Todo> => {
    try {
      const todo = await firestore.getDocument("todos", id);
      return convertDocumentSnapshotToTodo(todo);
    } catch (error) {
      throw error;
    }
  };

  const getAllTodos = async (filter?: Filter): Promise<Todo[]> => {
    try {
      const todos = await firestore.getAllFilteredDocuments("todos", filter);
      return todos.map((todo) => convertDocumentSnapshotToTodo(todo));
    } catch (error) {
      throw error;
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await firestore.deleteDocument("todos", id);
    } catch (error) {
      throw error;
    }
  };

  return {
    createTodo,
    updateTodo,
    getTodo,
    getAllTodos,
    deleteTodo,
  };
};

/**
 * DocumentSnapshotをTodoに変換する
 * @param documentSnapshot
 * @returns Todo
 */
const convertDocumentSnapshotToTodo = (
  documentSnapshot: DocumentSnapshot,
): Todo => {
  const data = documentSnapshot.data();
  return newTodo(
    documentSnapshot.id,
    data?.title,
    data?.content,
    data?.status,
    data?.dueDate,
  );
};
