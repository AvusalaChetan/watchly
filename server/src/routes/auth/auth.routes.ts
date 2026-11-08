import express from "express";
import {
  login,
  register,
  logout,
  refreshToken,
  getMe,
} from "../../controllers/auth/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../../validator/auth/auth.validator.js";
import {authenticated} from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", authenticated, logout);
router.post("/refresh-token", refreshToken);

router.get("/me", authenticated, getMe);

export default router;
