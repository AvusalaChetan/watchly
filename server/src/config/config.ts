import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGO_URI || !process.env.ACCESS_TOKEN_SECRET ||
   !process.env.REFRESH_TOKEN_SECRET ||
   !process.env.CLOUDINARY_API_KEY ||
   !process.env.CLOUDINARY_NAME ||
   !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('One or more required environment variables are missing')
}

export const config = {
  MONGO_URI: process.env.MONGO_URI as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME.trim() as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY.trim() as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET.trim() as string,
};
 