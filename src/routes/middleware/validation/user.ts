import { NextFunction, Request, Response } from "express";
import { UserData } from "~/types";

/**
 * Explanation for the regex:
 * (?=.*[0-9]) positive lookahead to ensure there is at least 1 digit
 * (?=.*[a-z]) positive lookahead to ensure there is at least 1 lowercase letter
 * (?=.*[A-Z]) positive lookahead to ensure there is at least 1 uppercase letter
 * .{8,64} ensures the match is between 8 and 64 characters long
 */
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;
/** Full name can be any uppercase/lowercase letter and include spaces */
const fullNameRegex = /^[A-z\s]+$/;
/** Simple email regex to allow (anything)@(anything).(anything) */
const emailRegex = /([\w]+@[\w]+\.[\w]+)/;
/** Will only allow these user types strictly */
const userTypeRegex = /(student|teacher|parent|private tutor)/;

const isFullNameValid = (name: string) => fullNameRegex.test(name);
const isEmailValid = (email: string) => emailRegex.test(email);
const isPasswordValid = (password: string) => passwordRegex.test(password);
const isUserTypeValid = (userType: string) => userTypeRegex.test(userType);

export const userValidation = (
  req: Request<{}, {}, UserData>,
  res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  if (
    !req.body.hasOwnProperty("fullName") ||
    !isFullNameValid(req.body.fullName)
  ) {
    errors.push("Full name is invalid.");
  }

  if (!req.body.hasOwnProperty("email") || !isEmailValid(req.body.email)) {
    errors.push("Email is invalid.");
  }

  if (
    !req.body.hasOwnProperty("userType") ||
    !isUserTypeValid(req.body.userType)
  ) {
    errors.push("User type is invalid.");
  }

  if (
    !req.body.hasOwnProperty("password") ||
    !isPasswordValid(req.body.password)
  ) {
    errors.push("Password does not match criteria.");
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  next();
};
