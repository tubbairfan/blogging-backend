import { Router } from "express";
import {
  signup,
  login,
  sendOtp,
  verifyOtp,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/user.controller";
import { verifyUser } from "../middlewares/auth";
import { validateBody } from "../middlewares/validation";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  sendOtpSchema,
  signupSchema,
  verifyOtpSchema,
} from "../validators/user.schema";

const router = Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyUser, logout);
router.post("/forgot-password", validateBody(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validateBody(resetPasswordSchema), resetPassword);
router.post("/change-password", verifyUser, validateBody(changePasswordSchema), changePassword);
router.post("/send-otp", validateBody(sendOtpSchema), sendOtp);
router.post("/verify-otp", validateBody(verifyOtpSchema), verifyOtp);
export default router;
