// import { redirect } from "react-router";
// import { UserContext } from "~/context";
// import { getSession } from "~/sessions.server";

// export const authMiddleware = async ({ request, context }) => {
//   const session = await getSession(request);
//   const userId = session.get("userId");

//   if (!userId) {
//     throw redirect("/login");
//   }

//   const user = await getUserById(userId);
//   context.set(UserContext, user);
// };
