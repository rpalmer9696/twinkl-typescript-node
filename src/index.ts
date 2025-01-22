import express, { Express } from "express";
import { userRouter } from "./routes";
import "dotenv/config";
import { UserService } from "./lib";
import { UserDba } from "./db/user";
import { db } from "./db";

const app: Express = express();
const port = process.env.PORT || 3000;

const userService = UserService(UserDba(db));

app.use(express.json());

app.use("/user/", userRouter(userService));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
