import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect((config.MONGO_URI || process.env.MONGO_URI )as string);
     console.log("MongoDB connected");
  } catch (error) {
    console.log((error as Error).message);
    throw error
  }
}
