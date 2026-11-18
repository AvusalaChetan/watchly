import type { NextFunction,Request,Response } from "express";

export const tryCatch =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log((error as Error).message)
      next((error as Error).message);
    }
  };
