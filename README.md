# react-router-clean-arc

アカウント登録機能が付いたTODOリストを作る。
UIは全く凝らない。

## 画面一覧

- アカウント登録画面
  - Email/PW、Google登録
- ログイン画面
  - Email/PW、Googleログイン
- TODOリスト / アカウントプロフィール画面（TOP画面）
  - ニックネーム・メールアドレスの表示
  - TODOのリスト表示（タイトル・ステータス・期限）
  - いいねボタン（他人のTODOの場合のみ）
- TODO詳細画面
  - タイトル・内容・ステータス・期限・作成日・いいね数の表示
  - TODO編集モーダル（自分のTODOの場合のみ）
  - いいねボタン（他人のTODOの場合のみ）
- アカウント設定画面
  - ニックネーム変更
  - ログアウト
- フィード画面
  - 他人のTODOをリスト表示（ニックネーム・タイトル・ステータス・期限）
  - 新着順
  - 各TODOに遷移可能
  - いいねボタン（他人のTODOの場合のみ）
- サイドバー
  - TOP画面リンク
  - アカウント設定画面リンク
  - フィード画面リンク
  - TODO作成モーダル表示ボタン

## データについて

### TODO

- タイトル：30字以内
- 内容：1000文字以内
- ステータス：未着手・進行中・完了・保留
- 期限：yyyy/mm/dd hh:mm

### アカウント

- ニックネーム：20字以内
- email

## Firestore コレクション設計

- users
  - nickname [string]
  - email [string]

- todos
  - owner [reference] : 所有者usersの参照
  - title [string]
  - content [string]
  - status [string]
  - due_date [timestamp]
  - goodluck_count [number] : いいね数
  - created_at [timestamp]
  - updated_at [timestamp]
