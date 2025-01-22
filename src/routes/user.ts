import { Request, Response, Router } from "express";
import { UserService } from "~/lib";
import { userValidation } from "./middleware/validation";
import { UserData } from "~/types";

export const userRouter = (userService: ReturnType<typeof UserService>) => {
  const router = Router();

  router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));
      res.json(user);
    } catch (e) {
      res.status(404).send((e as Error).message);
    }
  });

  router.post(
    "/",
    userValidation,
    (req: Request<{}, {}, UserData>, res: Response) => {
      userService.createUser({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
      });

      res.status(201).send("User created.");
    }
  );

  return router;
};
