import type {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

const checkPasswordSecurity = (password: string): string | null => {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(password))
    return "Password must contain a lowercase letter";
  if (!/[A-Z]/.test(password))
    return "Password must contain an uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must contain a special character";
  return null; // password is strong
};

export const registerValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("enter a valid email")
    .bail(),

  body("username")
    .notEmpty()
    .withMessage("username is required")
    .bail()
    .isString()
    .withMessage("username must be string")
    .bail(),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isString()
    .withMessage("password must be string")
    .bail()
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters")
    .custom((value) => {
      const err = checkPasswordSecurity(value);
      if (err) throw new Error(err);
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array().map((e) => ({
          field: e.type === "field" ? e.path : e.type,
          message: e.msg,
        })),
      });
    }

    next();
  },
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .normalizeEmail()
    .bail()
    .isEmail()
    .withMessage("enter a valid email")
    .bail(),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isString()
    .withMessage("password must be string")
    .bail(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array().map((e) => ({
          field: e.type === "field" ? e.path : e.type,
          message: e.msg,
        })),
      });
    }
    next();
  },
];
