import express from "express";
import request from "supertest";
import { userRouter } from "~/routes/user";
import { UserService } from "~/lib/user";
import { User, UserData, UserDBA } from "~/types";

describe("user integration tests", () => {
  let app: ReturnType<typeof express>;
  let mockDb: jest.Mocked<UserDBA>;

  beforeEach(() => {
    mockDb = {
      getUserById: jest.fn(),
      createUser: jest.fn(),
    };

    app = express();
    app.use(express.json());
    app.use("/user", userRouter(UserService(mockDb)));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user/:id", () => {
    it("should return 404 when user does not exist", async () => {
      mockDb.getUserById.mockResolvedValueOnce([]);

      const res = await request(app).get("/user/1");

      expect(mockDb.getUserById).toHaveBeenCalledWith(1);
      expect(res.status).toBe(404);
      expect(res.text).toBe("No user found with ID 1.");
    });

    it("should return 200 response with user data when user exists", async () => {
      const mockUser: User = {
        id: 1,
        fullName: "Test user",
        email: "test@test.test",
        password: "Password123",
        userType: "student",
        createdDate: "01/01/2025",
      };

      mockDb.getUserById.mockResolvedValueOnce([mockUser]);

      const res = await request(app).get("/user/1");

      expect(mockDb.getUserById).toHaveBeenCalledWith(1);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });
  });

  describe("POST /user", () => {
    it("should return 400 if userValidation middleware fails", async () => {
      const userData: UserData = {
        fullName: "test",
        email: "test",
        password: "test",
        userType: "parent",
      };

      const res = await request(app).post("/user").send(userData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual([
        "Email is invalid.",
        "Password does not match criteria.",
      ]);
      expect(mockDb.createUser).not.toHaveBeenCalled();
    });

    it("should return 201 response and create a user", async () => {
      const userData: UserData = {
        fullName: "Test user",
        email: "test@test.test",
        password: "Password123",
        userType: "parent",
      };

      const res = await request(app).post("/user").send(userData);

      expect(res.status).toBe(201);
      expect(res.text).toBe("User created.");
      expect(mockDb.createUser).toHaveBeenCalledWith(userData);
    });
  });
});
