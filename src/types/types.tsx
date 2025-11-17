import z from "zod";
import { loginSchema, registerSchema, profileSchema, passwordUpdateSchema } from "../schemas/schemas";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordUpdateFormData = z.infer<typeof passwordUpdateSchema>;

export interface Address {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: "shipping" | "billing";
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface User {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  profileImagePath: string;
  token: string;
  refreshToken: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  data: User;
  message: string;
  errorCode: string | null;
  errors: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerTitle: string;
  base64Image: string | null;
  customerImagePath: string;
  testimonialText: string;
  displayOrder: number;
  createdDateUtc: string;
  updatedDateUtc: string;
  // Fallback for old data structure
  name?: string;
  rating?: number;
  review?: string;
  verified?: boolean;
}