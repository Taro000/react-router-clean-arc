import type { Todo } from "./todo";
import type { User } from "./user";

/*********************************************
 * TODOリスト
 **********************************************/
export type TodoList = {
  id: TodoListId;
  owner: User;
  todos: Todo[];
};

const MAX_TODO_LIST_LENGTH = 100;
const ERROR_MESSAGE_TODO_LIST_ADD_TODO_FAILED = `TODOリストにTODOを追加できませんでした。`;
/**
 * TODOリストにTODOを追加する
 * @param todoList - TODOリスト
 * @param todo - TODO
 * @returns TODOリスト
 */
export const addTodo = (todoList: TodoList, todo: Todo): TodoList => {
  try {
    if (todoList.todos.length >= MAX_TODO_LIST_LENGTH) {
      throw new Error(
        `TODOリストは${MAX_TODO_LIST_LENGTH}個までしか追加できません`
      );
    }
    return {
      ...todoList,
      todos: [...todoList.todos, todo],
    };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_TODO_LIST_ADD_TODO_FAILED}: ${error}`);
  }
};

const ERROR_MESSAGE_TODO_LIST_REMOVE_TODO_FAILED = `TODOリストからTODOを削除できませんでした。`;
/**
 * TODOリストからTODOを削除する
 * @param todoList - TODOリスト
 * @param todo - TODO
 * @returns TODOリスト
 */
export const removeTodo = (todoList: TodoList, todo: Todo): TodoList => {
  try {
    return {
      ...todoList,
      todos: todoList.todos.filter((t) => t.id !== todo.id),
    };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_TODO_LIST_REMOVE_TODO_FAILED}: ${error}`);
  }
};

/*********************************************
 * ID
 **********************************************/
type TodoListId = string;

const MAX_TODO_LIST_ID_LENGTH = 36;

/**
 * TODOリストのIDを検証する
 * @param id - TODOリストのID
 * @throws {Error} バリデーションエラー
 */
export const validateTodoListId = (id: TodoListId) => {
  if (id.length > MAX_TODO_LIST_ID_LENGTH) {
    throw new Error(
      `IDは${MAX_TODO_LIST_ID_LENGTH}文字以内である必要があります`
    );
  }
};
