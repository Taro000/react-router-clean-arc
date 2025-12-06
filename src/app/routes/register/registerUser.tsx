import { Form, data, redirect } from "react-router";
import { Link } from "react-router";
import type { Route } from "./+types/registerUser";
import { useRegister } from "~/app/routes/register/useRegister";
import { getSession, commitSession } from "~/app/sessions.server";

const { register } = useRegister();

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
    },
  );
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));

    const formData = await request.formData();
    const actionData = await register(formData);

    if (!actionData.isValid) {
      return { errorMessage: actionData.errorMessage };
    }

    if (!actionData.accessToken || !actionData.userId) {
      session.flash("error", "ユーザー登録に失敗しました。");
      return redirect("/registerUser", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

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
        error instanceof Error ? error.message : "ユーザー登録に失敗しました。",
    };
  }
}

export default function RegisterUser({ actionData }: Route.ComponentProps) {
  const { errorMessage } = actionData || { errorMessage: "" };

  return (
    <div>
      <h1>ユーザー登録</h1>
      <Form noValidate method="post">
        <input type="text" placeholder="ニックネーム" name="nickname" />
        <input type="email" placeholder="メールアドレス" name="email" />
        <input type="password" placeholder="パスワード" name="password" />
        <p>{errorMessage}</p>
        <button type="submit">登録</button>
      </Form>
      <Link to="/login">ログインはこちら</Link>
    </div>
  );
}
