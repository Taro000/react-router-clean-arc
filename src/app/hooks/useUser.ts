// import { createFirebaseApp } from "~/infrastructure/firebase/app";
// import { createAuthRepository } from "~/interface/adapter/auth";
// import { createAuthUsecase } from "~/usecase/interactor/auth";
// import type { UserId } from "~/domain/entity/user";
// import { createUserRepository } from "~/interface/adapter/user";
// import { newUserEmail } from "~/domain/entity/user";
// import { newUserPassword } from "~/domain/entity/auth";

// const firebaseApp = createFirebaseApp();
// const authRepository = createAuthRepository(firebaseApp.auth);
// const userRepository = createUserRepository(firebaseApp.firestore);
// const authUsecase = createAuthUsecase(authRepository, userRepository);

// /**********************************************
//  * ユーザー関連のカスタムフック
//  * - Interface層に相当する。
//  * - Usecase層を呼び出す。
//  * - データ変換を通して、Reactとビジネスロジックの橋渡しを目的とする。
//  * - Useacse層の薄いラッパー。
//  **********************************************/
// export const useUser = () => {
//   const registerUser = async (formData: FormData): Promise<UserId> => {
//     try {
//       const registerData = Object.fromEntries(formData);
//       const authData = await authUsecase.registerUser(
//         String(registerData.nickname),
//         newUserEmail(String(registerData.email)),
//         newUserPassword(String(registerData.password))
//       );
//       return authData.userId;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { registerUser };
// };
