import {body, validationResult} from "express-validator";
import {GENRES} from "../../models/video.model.js";
import type {Request, Response, NextFunction} from "express";
import { error } from "console";

export const videoUploadValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .bail()
    .isString()
    .withMessage("title must be a string")
    .bail(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .bail()
    .isString()
    .withMessage("description must be a string")
    .bail()
    .isLength({min: 20, max: 500})
    .withMessage("description must be 10 to 500 characters"),

  body("genre")
    .customSanitizer((v) => (Array.isArray(v) ? v : v ? [v] : []))
    .isArray({min: 1})
    .withMessage("at least one genre is required"),

  body("genre.*")
    .isIn(GENRES)
    .withMessage(`genre must be one of: ${GENRES.join(", ")}`),

  body("video").custom((_, {req}) => {
    if (!req.files?.video?.[0])
       throw new Error("video file is required");
    return true;
  }),

  body("thumbnail").custom((_, {req}) => {
    if (!req.files?.thumbnail?.[0])
      throw new Error("thumbnail file is required");
    return true;
  }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    console.log(errors)
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

export const videoUpdateValidator = [
  body("title")
    .optional()
    .isString()
    .withMessage("title must be a string")
    .bail(),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .bail()
    .isLength({min: 20, max: 500})
    .withMessage("description must be 10 to 500 characters"),

  body("genre")
    .optional()
    .customSanitizer((v) => (Array.isArray(v) ? v : v ? [v] : []))
    .isArray({min: 1})
    .withMessage("at least one genre is required"),

  body("genre.*")
    .optional()
    .isIn(GENRES)
    .withMessage(`genre must be one of: ${GENRES.join(", ")}`),

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

 