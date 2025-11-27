import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { useUser } from "~/app/hooks/useUser";
import { Link } from "react-router";

const { login } = useUser();

export type LoginActionData = {
  userId: string | undefined;
  errorMessage: string | undefined;
  isValid: boolean;
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const actionData = await login(formData);
  if (!actionData.isValid) {
    return { errorMessage: actionData.errorMessage };
  }
  return redirect(`/users/${actionData.userId}`);
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
