import { UserData, UserDBA } from "~/types";

export const UserService = (db: UserDBA) => {
  const getUserById = async (id: number) => {
    const users = await db.getUserById(id);

    if (users.length === 0) {
      throw new Error(`No user found with ID ${id}.`);
    }

    return users[0];
  };

  const createUser = (userData: UserData) => {
    db.createUser(userData);
  };

  return {
    getUserById,
    createUser,
  };
};
