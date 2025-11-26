import type { Route } from "./+types/todoDetail";
import { useTodo } from "~/hooks/useTodo";

const { getTodo } = useTodo();

export async function loader({ params }: Route.LoaderArgs) {
  const todoId = params.todoId;
  const todo = await getTodo(todoId);
  return { todo };
}

export default function TodoDetail({ loaderData }: Route.ComponentProps) {
  const { todo } = loaderData;
  return (
    <div>
      <h1>TODO詳細</h1>
      <p>タイトル: {todo.title}</p>
      <p>内容: {todo.content}</p>
      <p>ステータス: {todo.status}</p>
    </div>
  );
}
