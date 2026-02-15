import z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const phoneSchema = z
  .union([z.string(), z.undefined(), z.literal(null)])
  .transform((val) => (val === undefined || val === null ? "" : val))
  .pipe(
    z
      .string()
      .min(1, "Phone number is required")
      .refine((val) => isValidPhoneNumber(val), "Please enter a valid phone number")
  );

export const loginSchema = z.object({
  phone: phoneSchema,
  phoneCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneCode:z.string().optional(),
  phoneNumber:z.string().optional(),
  phone: phoneSchema,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  phoneCode: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
});

export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});