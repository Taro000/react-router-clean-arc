import type { Todo, TodoId } from "~/domain/entity/todo";
import type { Filter } from "~/interface/port/firestore";

export interface TodoRepository {
  createTodo: (todo: Todo) => Promise<TodoId>;
  updateTodo: (todo: Todo) => Promise<void>;
  getTodo: (id: TodoId) => Promise<Todo>;
  getAllTodos: (filter?: Filter) => Promise<Todo[]>;
  deleteTodo: (id: TodoId) => Promise<void>;
}
