import { Request, Response } from "express";
import { userValidation } from "~/routes/middleware/validation/user";
import { UserData } from "~/types";

describe("userValidation", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return a 400 response and all errors when all validation fails", () => {
    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Full name is invalid.",
      "Email is invalid.",
      "User type is invalid.",
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response and all errors except full name when it is valid", () => {
    req.body = {
      fullName: "Test name",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Email is invalid.",
      "User type is invalid.",
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response and all errors except full name and email when it is valid", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "User type is invalid.",
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response and all errors except full name, email, and user type when it is valid", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
      userType: "student",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response when password is incorrect length", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
      userType: "student",
      password: "pass",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response when password does not contain a digit", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
      userType: "student",
      password: "Password",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response when password does not contain a lowercase letter", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
      userType: "student",
      password: "PASSWORD1",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Password does not match criteria.",
    ]);
  });

  it("should return a 400 response when password does not contain an uppercase letter", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
      userType: "student",
      password: "password1",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Password does not match criteria.",
    ]);
  });

  it("should call next when params are all valid", () => {
    req.body = {
      fullName: "Test name",
      email: "test@test.test",
      userType: "student",
      password: "Password123",
    };

    userValidation(req as Request<UserData>, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
