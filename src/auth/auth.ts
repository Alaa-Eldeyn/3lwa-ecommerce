import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import toast from "react-hot-toast";
import { LoginFormData, RegisterFormData, User, AuthResponse } from "../types/types";
import { customAxios } from "./customAxios";

const COOKIE_NAME = "basitUser";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * حفظ بيانات المستخدم في الكوكيز
 */
export const saveUserToCookie = (user: User): void => {
  try {
    setCookie(COOKIE_NAME, JSON.stringify(user), {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.error("Error saving user to cookie:", error);
    throw new Error("Failed to save user data");
  }
};

/**
 * قراءة بيانات المستخدم من الكوكيز
 */
export const getUserFromCookie = (): User | null => {
  try {
    const userStr = getCookie(COOKIE_NAME);
    if (!userStr) return null;

    const user = JSON.parse(userStr as string) as User;
    return user;
  } catch (error) {
    console.error("Error reading user from cookie:", error);
    return null;
  }
};

/**
 * حذف بيانات المستخدم من الكوكيز
 */
export const removeUserFromCookie = (): void => {
  try {
    deleteCookie(COOKIE_NAME);
  } catch (error) {
    console.error("Error removing user from cookie:", error);
  }
};

/**
 * الحصول على الـ access token
 */
export const getAccessToken = (): string | null => {
  const user = getUserFromCookie();
  return user?.token || null;
};

/**
 * الحصول على الـ refresh token
 */
export const getRefreshToken = (): string | null => {
  const user = getUserFromCookie();
  return user?.refreshToken || null;
};

/**
 * التحقق من تسجيل دخول المستخدم
 */
export const isAuthenticated = (): boolean => {
  const user = getUserFromCookie();
  return !!user?.token;
};

/**
 * معالجة نجاح المصادقة
 */
const handleAuthSuccess = (response: AuthResponse): User => {
  if (!response.success || !response.data) {
    throw new Error(response.message || "Authentication failed");
  }

  const userData: User = {
    id: response.data.id,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    email: response.data.email,
    profileImagePath: response.data.profileImagePath,
    token: response.data.token,
    refreshToken: response.data.refreshToken,
    role: response.data.role,
  };

  saveUserToCookie(userData);

  // تحديث الـ store إذا كان متاح (client-side فقط)
  if (typeof window !== "undefined") {
    import("../store/userStore").then(({ useUserStore }) => {
      useUserStore.getState().setUser(userData);
    });
  }

  return userData;
};

/**
 * تسجيل دخول المستخدم
 */
export const loginUser = async (data: LoginFormData): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/login-customer`,
      {
        phoneCode: data.phoneCode,
        phoneNumber: data.phoneNumber,
        password: data.password,
      }
    );

    return handleAuthSuccess(response.data);
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "فشل تسجيل الدخول"
      : "فشل تسجيل الدخول";

    // Show toast notification if in browser context
    if (typeof window !== "undefined") {
      toast.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
};

/**
 * تسجيل مستخدم جديد
 */
export const registerUser = async (data: RegisterFormData): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/UserRegistration/register-customer`,
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneCode: data.phoneCode,
        phoneNumber: data.phoneNumber,
        confirmPassword: data.confirmPassword,
        agreeToTerms: data.agreeToTerms,
      }
    );

    return handleAuthSuccess(response.data);
  } catch (error) {
    console.error("Registration failed:", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "فشل إنشاء الحساب"
      : "فشل إنشاء الحساب";
    throw new Error(errorMessage);
  }
};

/**
 * تسجيل خروج المستخدم
 */
export const logoutUser = async (): Promise<void> => {
  removeUserFromCookie();

  // تحديث الـ store إذا كان متاح (client-side فقط)
  if (typeof window !== "undefined") {
    import("../store/userStore").then(({ useUserStore }) => {
      useUserStore.getState().logout();
    });
  }
};

/* -------------------------------------------------------------------------- */
/**
 * تسجيل دخول البائع
 */
export const loginVendor = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/login-vendor`,
      { email, password }
    );

    return handleAuthSuccess(response.data);
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "فشل تسجيل الدخول"
      : "فشل تسجيل الدخول";

    if (typeof window !== "undefined") {
      toast.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
};
