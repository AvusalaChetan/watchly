import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  refreshToken: string | null;
}


const userSechema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    require: true,
  },
  refreshToken: {
    type: String,
  },
},{timestamps:true});

const userModel = mongoose.model("User", userSechema);

export default userModel;
