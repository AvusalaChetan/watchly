import bcrypt from "bcrypt";
import type {Request, Response} from "express";
import userModel from "../../models/user.model.js";
import {
  genAccessToken,
  genRefreshToken,
  readRefreshToken,
} from "../../utils/auth.utils.js";
import {tryCatch} from "../../utils/tryCatch.js";

const register = tryCatch(async (req: Request, res: Response) => {
  const {username, email, password} = req.body;

  const userExist = await userModel.findOne({email});

  if (userExist) {
    return res.status(409).json({
      success: false,
      message: "user already exist with that email",
      errors: [{field: "email", message: "user alredy exist with that email"}],
    });
  }

  const user = await userModel.create({
    username,
    email,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const accessToken = genAccessToken({userId: user.id, role: user.role});
  const refreshToken = genRefreshToken({userId: user.id, role: user.role});

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: `account is successfully created with this name ${username} and email ${email} `,
    data: {
      user: {
        name: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
      },
      accessToken,
    },
  });
});

const login = tryCatch(async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const user = await userModel.findOne({email});
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const accessToken = genAccessToken({userId: user.id, role: user.role});
  const refreshToken = genRefreshToken({userId: user.id, role: user.role});

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        name: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
      },
      accessToken,
    },
  });
});

const logout = tryCatch(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "there is no refresh token",
    });
  }
  const decode = readRefreshToken(refreshToken);

  const {userId} = decode;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user with that id not found ",
    });
  }

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken", {httpOnly: true, sameSite: "strict"});

  return res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});

const refreshToken = tryCatch(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "no refresh token",
    });
  }

  const {userId} = readRefreshToken(refreshToken);

  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "user not found with refresh token",
      success: false,
    });
  }

  if (refreshToken !== user?.refreshToken) {
    await userModel.findOneAndUpdate(
      {_id: user?._id},
      {
        refreshToken: null,
      },
    );
    return res.status(401).json({
      message: "refresh token mismatch",
      success: false,
    });
  }

  const accessToken = genAccessToken({userId: user.id, role: user.role});
  const newRefreshToken = genRefreshToken({userId: user.id, role: user.role});

  await userModel.findOneAndUpdate(
    {_id: user._id},
    {
      refreshToken: newRefreshToken,
    },
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    sameSite: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    messge: "Token rotated sccessfully",
    data: {
      user: {
        email: user.email,
        name: user.username,
        id: user._id,
      },
      accessToken,
    },
  });
});

const getMe = tryCatch(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
  const {userId, role} = req.user;

  const user = await userModel
    .findById(userId)
    .select("-passwordHash  -refreshToken");

  res.status(200).json({
    success: true,
    message: "User data featch successfully",
    data: {
      user,
    },
  });
});

export {login, logout, register, refreshToken, getMe};
