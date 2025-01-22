import { User, UserData, UserDBA } from "~/types";
import { UserService } from "~/lib/user";

describe("UserService", () => {
  let mockDb: jest.Mocked<UserDBA>;
  let userService: ReturnType<typeof UserService>;

  const mockUser: User = {
    id: 1,
    fullName: "Test User",
    email: "test@test.test",
    password: "password",
    userType: "student",
    createdDate: "01/01/2025",
  };

  beforeEach(() => {
    mockDb = {
      getUserById: jest.fn(),
      createUser: jest.fn(),
    };

    userService = UserService(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should call db with correct ID once", async () => {
      mockDb.getUserById.mockResolvedValueOnce([mockUser]);

      const user = await userService.getUserById(1);

      expect(mockDb.getUserById).toHaveBeenCalledWith(1);
      expect(mockDb.getUserById).toHaveBeenCalledTimes(1);
      expect(user).toEqual(mockUser);
    });

    it("should throw error when ID does not exist", async () => {
      mockDb.getUserById.mockResolvedValueOnce([]);

      await expect(userService.getUserById(1)).rejects.toThrow(
        "No user found with ID 1."
      );
      expect(mockDb.getUserById).toHaveBeenCalledWith(1);
      expect(mockDb.getUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe("createUser", () => {
    it("should create user when valid data is supplied", async () => {
      const userData: UserData = {
        fullName: "Test User",
        email: "test@test.test",
        password: "password",
        userType: "parent",
      };

      await userService.createUser(userData);

      expect(mockDb.createUser).toHaveBeenCalledWith(userData);
      expect(mockDb.createUser).toHaveBeenCalledTimes(1);
    });
  });
});
