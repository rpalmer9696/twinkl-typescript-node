import { db } from "~/db";

export type User = {
  id: number;
  fullName: string;
  password: string;
  email: string;
  createdDate: string;
  userType: "student" | "teacher" | "parent" | "private tutor";
};

export type UserData = Pick<
  User,
  "fullName" | "password" | "email" | "userType"
>;

export interface UserDBA {
  getUserById: (id: number) => Promise<User[]>;
  createUser: (user: UserData) => Promise<void>;
}

export type DBA = typeof db;
