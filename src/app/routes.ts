import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login/login.tsx"),
  route("/register-user", "routes/registerUser.tsx"),
  route("/feeds", "routes/feed.tsx"),
  ...prefix("/users", [
    route("/:userId", "routes/top/top.tsx"),
    route("/:userId/settings", "routes/userSetting.tsx"),
    route("/:userId/todos/:todoId", "routes/todoDetail.tsx"),
  ]),
] satisfies RouteConfig;
