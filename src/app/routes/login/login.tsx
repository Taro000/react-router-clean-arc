import { Form, data, redirect } from "react-router";
import type { Route } from "./+types/login";
import { Link } from "react-router";
import { getSession, commitSession } from "~/app/sessions.server";
import { useLogin } from "~/app/routes/login/useLogin";

const { login } = useLogin();

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (userId) {
    return redirect(`/users/${userId}`);
  }
  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));

    const formData = await request.formData();
    const actionData = await login(formData);

    if (!actionData.isValid) {
      return { errorMessage: actionData.errorMessage };
    }

    if (!actionData.accessToken || !actionData.userId) {
      session.flash("error", "ログインに失敗しました。");
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    console.log("actionData", actionData);
    session.set("userId", actionData.userId);
    session.set("accessToken", actionData.accessToken);
    return redirect(`/users/${actionData.userId}`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return {
      errorMessage:
        error instanceof Error ? error.message : "ログインに失敗しました。",
    };
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  const { errorMessage } = actionData || { errorMessage: "" };

  return (
    <div>
      <h1>ログイン</h1>
      <Form noValidate method="post">
        <input type="email" placeholder="メールアドレス" name="email" />
        <input type="password" placeholder="パスワード" name="password" />
        <p>{errorMessage}</p>
        <button type="submit">ログイン</button>
      </Form>
      <Link to="/register-user">ユーザー登録はこちら</Link>
    </div>
  );
}
