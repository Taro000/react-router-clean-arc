import { createFirebaseApp } from "~/infrastructure/firebase/app";
import { createTodoRepository } from "~/interface/adapter/todo";
import type { TodoId } from "~/domain/entity/todo";
import type { Todo } from "~/domain/entity/todo";
import type { SearchUsersTodoQuery } from "~/domain/entity/todo";
import type { UserId } from "~/domain/entity/user";

const firebaseApp = createFirebaseApp();
const todoRepository = createTodoRepository(firebaseApp.firestore);

export const useTodo = () => {
  const getTodo = async (id: TodoId): Promise<Todo> => {
    try {
      const todo = await todoRepository.getTodo(id);
      return todo;
    } catch (error) {
      throw error;
    }
  };

  const getUserTodos = async (userId: UserId): Promise<Todo[]> => {
    try {
      const query: SearchUsersTodoQuery = {
        field: "name",
        query: userId,
      };
      const todos = await todoRepository.getAllTodos(query);
      return todos;
    } catch (error) {
      throw error;
    }
  };

  return {
    getTodo,
    getUserTodos,
  };
};
