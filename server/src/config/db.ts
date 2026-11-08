import videoModel from "../models/video.model.js";
import {config} from "./config.js";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI as string);
     console.log("MongoDB connected");
  } catch (error) {
    console.log((error as Error).message);
  }
}
