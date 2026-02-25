import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(5, "Name must be at least 5 characters"),
  email: z.email("Valid email is required").trim().toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Valid email is required").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const sendOtpSchema = z.object({
  email: z.email("Valid email is required").trim().toLowerCase(),
});

export const verifyOtpSchema = z.object({
  email: z.email("Valid email is required").trim().toLowerCase(),
  code: z.string().length(6, "OTP must be exactly 6 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Valid email is required").trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  email: z.email("Valid email is required").trim().toLowerCase(),
  code: z.string().length(6, "OTP must be exactly 6 digits"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(5, "Name must be at least 5 characters").optional(),
    email: z.email("Valid email is required").trim().toLowerCase().optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one field (name or email) is required",
    path: ["body"],
  });
