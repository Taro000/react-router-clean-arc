import type {
  SearchUsersTodoQuery,
  Todo,
  TodoId,
} from "src/domain/entity/todo";

export interface TodoRepository {
  createTodo: (todo: Todo) => Promise<TodoId>;
  updateTodo: (todo: Todo) => Promise<void>;
  getTodo: (id: TodoId) => Promise<Todo>;
  getAllTodos: (query?: SearchUsersTodoQuery) => Promise<Todo[]>;
  deleteTodo: (id: TodoId) => Promise<void>;
}
