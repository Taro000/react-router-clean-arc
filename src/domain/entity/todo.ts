import type { UserId } from "src/domain/entity/user";

/*********************************************
 * TODO
 **********************************************/
export type Todo = {
  id: TodoId;
  title: TodoTitle;
  content: TodoContent;
  status: TodoStatus;
  dueDate: TodoDueDate;
  createdAt: TodoCreatedAt;
  updatedAt: TodoUpdatedAt;
};

const ERROR_MESSAGE_TODO_CREATION_FAILED = `TODOの作成に失敗しました`;
/**
 * TODOオブジェクトを作成する
 * @param id - TODOのID
 * @param title - TODOのタイトル
 * @param content - TODOの内容
 * @param status - TODOのステータスの初期値
 * @param dueDate - TODOの期限
 * @returns TODOオブジェクト
 * @throws {Error} TODOオブジェクトの作成に失敗した場合
 */
export const newTodo = (
  id: TodoId,
  title: TodoTitle,
  content: TodoContent,
  status: TodoStatus,
  dueDate: TodoDueDate,
): Todo => {
  try {
    validateTodoId(id);
    validateTodoTitle(title);
    validateTodoContent(content);
    validateTodoDueDate(dueDate);

    const now = new Date();

    return {
      id,
      title,
      content,
      status,
      dueDate,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    throw new Error(`${ERROR_MESSAGE_TODO_CREATION_FAILED}: ${error}`);
  }
};

/*********************************************
 * ID
 **********************************************/
export type TodoId = string;

const MAX_TODO_ID_LENGTH = 36;

/**
 * TODOのIDを検証する
 * @param id - TODOのID
 * @throws {Error} バリデーションエラー
 */
const validateTodoId = (id: TodoId) => {
  if (id.length > MAX_TODO_ID_LENGTH) {
    throw new Error(`IDは${MAX_TODO_ID_LENGTH}文字以内である必要があります`);
  }
};

/*********************************************
 * タイトル
 **********************************************/
export type TodoTitle = string;

const MAX_TODO_TITLE_LENGTH = 30;

/**
 * TODOのタイトルを検証する
 * @param title - TODOのタイトル
 * @throws {Error} バリデーションエラー
 */
const validateTodoTitle = (title: TodoTitle) => {
  if (title.length > MAX_TODO_TITLE_LENGTH) {
    throw new Error(
      `タイトルは${MAX_TODO_TITLE_LENGTH}字以内である必要があります`,
    );
  }
};

/*********************************************
 * 内容
 **********************************************/
export type TodoContent = string;

const MAX_TODO_CONTENT_LENGTH = 1000;

/**
 * TODOの内容を検証する
 * @param content - TODOの内容
 * @throws {Error} バリデーションエラー
 */
const validateTodoContent = (content: TodoContent) => {
  if (content.length > MAX_TODO_CONTENT_LENGTH) {
    throw new Error(
      `内容は${MAX_TODO_CONTENT_LENGTH}文字以内である必要があります`,
    );
  }
};

/*********************************************
 * ステータス
 **********************************************/
export type TodoStatus = "未着手" | "進行中" | "完了" | "保留";

/*********************************************
 * 期限
 **********************************************/
export type TodoDueDate = Date;

/**
 * TODOの期限を検証する
 * @param dueDate - TODOの期限
 * @throws {Error} バリデーションエラー
 */
const validateTodoDueDate = (dueDate: TodoDueDate) => {
  if (dueDate < new Date()) {
    throw new Error("期限は未来の日時である必要があります");
  }
};

/*********************************************
 * 作成日時
 **********************************************/
type TodoCreatedAt = Date;

/*********************************************
 * 更新日時
 **********************************************/
type TodoUpdatedAt = Date;

/*********************************************
 * ユーザーのTODOを検索するクエリ
 **********************************************/
export type SearchUsersTodoQuery = {
  field: "name";
  query: UserId;
};
