import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {readAccessToken} from "../utils/auth.utils.js";
import {tryCatch} from "../utils/tryCatch.js";

export const authenticated = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const [scheme, accessToken] = authorization?.split(" ") ?? [];

    if (scheme !== "Bearer" || !accessToken) {
      return res.status(401).json({
        message: "Authentication token is missing or invalid",
        success: false,
      });
    }

    try {
      const decoded = readAccessToken(accessToken);
      req.user = decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: "Access token expired",
          success: false,
        });
      }

      throw error;
    }

    next();
  },
);

export const authenticatedAdmin = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
     if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: " user is not authorize to perform this action",
      });
    }
    next();
  },
);
