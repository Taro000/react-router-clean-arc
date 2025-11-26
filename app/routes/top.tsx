import type { Route } from "./+types/top";
import { useUser } from "~/hooks/useUser";
import { useTodo } from "~/hooks/useTodo";
import { Link } from "react-router";

const { getUser } = useUser();
const { getUserTodos } = useTodo();

export async function loader({ params }: Route.LoaderArgs) {
  const userId = params.userId;
  const user = await getUser(userId);
  const todos = await getUserTodos(userId);
  return { user, todos };
}

export default function Top({ loaderData }: Route.ComponentProps) {
  const { user, todos } = loaderData;
  return (
    <div>
      <h1>TOP</h1>
      <p>ニックネーム: {user.nickname}</p>
      <p>メールアドレス: {user.email}</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/users/${user.id}/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
