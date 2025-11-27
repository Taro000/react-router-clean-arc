import type { Route } from "./+types/userSetting";

export async function loader({ params }: Route.LoaderArgs) {
  const userId = params.userId;
  return { userId };
}

export default function UserSetting() {
  return (
    <div>
      <h1>ユーザー設定</h1>
    </div>
  );
}
