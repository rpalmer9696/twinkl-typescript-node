import { eq } from "drizzle-orm";
import { users } from "./schema";
import { UserDBA, DBA, UserData, User } from "~/types";

export const UserDba = (db: DBA): UserDBA => {
  const getUserById = async (id: number) => {
    return (await db.select().from(users).where(eq(users.id, id))) as User[];
  };

  const createUser = async (user: UserData) => {
    await db.insert(users).values(user);
  };

  return {
    getUserById,
    createUser,
  };
};
