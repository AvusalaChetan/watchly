import dotenv from "dotenv";

dotenv.config();

export const config = {
  get MONGO_URI() {
    return process.env.MONGO_URI as string;
  },
  get PORT() {
    return process.env.PORT;
  },
  get ACCESS_TOKEN_SECRET() {
    return process.env.ACCESS_TOKEN_SECRET as string;
  },
  get REFRESH_TOKEN_SECRET() {
    return process.env.REFRESH_TOKEN_SECRET as string;
  },
  get CLOUDINARY_NAME() {
    return process.env.CLOUDINARY_NAME?.trim() as string;
  },
  get CLOUDINARY_API_KEY() {
    return process.env.CLOUDINARY_API_KEY?.trim() as string;
  },
  get CLOUDINARY_API_SECRET() {
    return process.env.CLOUDINARY_API_SECRET?.trim() as string;
  },
};
