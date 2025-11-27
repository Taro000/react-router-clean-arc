# react-router-clean-arc

アカウント登録機能が付いたTODOリストを作る。
UIは全く凝らない。

## アーキテクチャ概要
<img width="1332" height="840" alt="react-router-clean-arch" src="https://github.com/user-attachments/assets/0dcb098e-b402-4cdf-980f-9d2809289728" />

Domain層・UseCase層は詳細に影響を受けずに、オリジナルの型を用いて純粋なTypeScriptのコードベースを維持できる。

### Domain層

```
ドメインモデルとそれを用いた純粋なビジネスロジックを配置する。
```

- **Entity**：ドメインモデルとビジネスロジック。
- **Repository**：Interface層が実装すべきインターフェース。
- **Service**：汎用的なビジネスロジック。

### UseCase層

```
ドメイン層のメソッドとオブジェクトを組み合わせたアプリケーションロジックを配置する。
```

- **Usecase**：Interactorが実装すべきインターフェース。
- **Interactor**：アプリケーションロジック。

### Interface層

```
Infarastructure層とUseCase層/Domain層の間のデータ変換に責務を持つ。腐敗防止層。
Infarastructure層の詳細（型など）を知っても良い。
```

- **Port**：Infrastructure層が実装すべきインターフェース。
- **Adaptor**：データ変換ロジック。Domain層/Repositoryのインターフェースを実装。
- Custom Hook：ReactのカスタムフックはViewとUseCase層とのデータ変換に責務を持たせると、Interface層に分類できる。

### Infrastructure層

```
APIやDB、フレームワークなどの詳細。
Interface層/Portのインターフェースを実装。
```

- API Client
- DB Client
- View：React Router v7におけるRoute。HTMLのレンダリング・イベントハンドリングのみを担当する。（Loader/Actionにロジックを入れない。）

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
