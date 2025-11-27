import { createContext } from "react-router";
import type { User } from "src/domain/entity/user";

export const UserContext = createContext<User | null>(null);
