import { Form, redirect } from "react-router";
import type { Route } from "./+types/registerUser";
import { useUser } from "~/app/hooks/useUser";
import { Link } from "react-router";

const { registerUser } = useUser();

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = await registerUser(formData);
  return redirect(`/users/${userId}`);
}

export default function RegisterUser() {
  return (
    <div>
      <h1>ユーザー登録</h1>
      <Form method="post">
        <input type="text" placeholder="ニックネーム" name="nickname" />
        <input type="email" placeholder="メールアドレス" name="email" />
        <input type="password" placeholder="パスワード" name="password" />
        <button type="submit">登録</button>
      </Form>
      <Link to="/login">ログインはこちら</Link>
    </div>
  );
}
