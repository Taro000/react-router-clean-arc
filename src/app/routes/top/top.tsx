import type { Route } from "./+types/top";
import { useTop } from "~/app/routes/top/useTop";
import { getSession } from "~/app/sessions.server";
import { redirect } from "react-router";

const { getUser } = useTop();

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId || userId !== params.userId) {
    return redirect("/login");
  }

  const user = await getUser(userId);
  return { user };
}

export default function Top({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div>
      <h1>TOP</h1>
      <p>ニックネーム: {user.nickname.value}</p>
      <p>メールアドレス: {user.email.value}</p>
      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/users/${user.id}/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
