import express from "express";
import type {Request, Response, NextFunction} from "express";

import cookieParser from "cookie-parser";
// import morgan from "morgan";

import authRoutes from "../routes/auth/auth.routes.js";
import videoRoutes from "../routes/videos/videos.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

let count = 0;

app.use((req, res, next) => {
  console.log(`Request #${++count}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

// app.use(morgan("dev")); 

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err.name,
   err ,
    message: err.message,
    success: false,
  });
});

export default app;
