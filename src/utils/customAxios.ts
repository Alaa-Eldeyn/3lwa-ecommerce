import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const isValidValue = (value: any): boolean => {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    value !== "null" &&
    value !== "undefined"
  );
};

const redirectToLogin = () => {
  deleteCookie("basitUser");
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
  }
};

const updateAccessTokenOnly = (newAccessToken: string) => {
  const storedUser = getCookie("basitUser");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser as string);
      user.token = newAccessToken;
      setCookie("basitUser", JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 7 أيام
      });
    } catch (error) {
      console.error("Error parsing user from cookie:", error);
    }
  }
};

const updateAccessAndRefreshTokens = (
  newAccessToken: string,
  newRefreshToken: string
) => {
  const storedUser = getCookie("basitUser");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser as string);
      user.token = newAccessToken;
      user.refreshToken = newRefreshToken;
      setCookie("basitUser", JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7,
      });
    } catch (error) {
      console.error("Error parsing user from cookie:", error);
    }
  }
};

// دالة للحصول على accessToken جديد فقط
export const getNewAccessToken = async (
  refreshToken: string,
  email: string
): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Token/generate-access-token`,
      { refreshToken, email }
    );

    console.log("getNewAccessToken data:", data);
    const accessToken = data.data;

    if (isValidValue(accessToken)) {
      updateAccessTokenOnly(accessToken);
      return accessToken;
    } else {
      throw new Error("Invalid access token received");
    }
  } catch (error) {
    console.error("Error getting new access token:", error);
    throw error;
  }
};

// دالة لإعادة توليد access + refresh tokens
export const regenerateTokens = async (
  refreshToken: string,
  email: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Token/regenerate-refresh-token`,
      { refreshToken, email }
    );

    console.log("regenerateTokens data:", data);

    const accessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;

    if (isValidValue(accessToken) && isValidValue(newRefreshToken)) {
      updateAccessAndRefreshTokens(accessToken, newRefreshToken);
      return { accessToken, refreshToken: newRefreshToken };
    } else {
      throw new Error("Invalid tokens received");
    }
  } catch (error) {
    console.error("Error regenerating tokens:", error);
    throw error;
  }
};

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Platform": "website"
  },
});

// Request interceptor - لإضافة الـ token للـ headers
customAxios.interceptors.request.use(
  (config) => {
    const userStr = getCookie("basitUser");
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr as string);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Error parsing user from cookie:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - للتعامل مع 401 errors
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // تجنب loop لا نهائي
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const userStr = getCookie("basitUser");
    if (!userStr) {
      redirectToLogin();
      return Promise.reject("No user data found");
    }

    let user;
    try {
      user = JSON.parse(userStr as string);
    } catch (parseError) {
      console.error("Error parsing user data:", parseError);
      redirectToLogin();
      return Promise.reject("Invalid user data");
    }

    const { refreshToken, email } = user;

    if (!isValidValue(refreshToken) || !isValidValue(email)) {
      redirectToLogin();
      return Promise.reject("Invalid or missing refresh token/email");
    }

    try {
      // الخطوة 1: محاولة الحصول على access token جديد
      const newAccessToken = await getNewAccessToken(refreshToken, email);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return customAxios(originalRequest);
    } catch (accessTokenError) {
      console.log(
        "Failed to get new access token, trying to regenerate refresh token..."
      );

      try {
        // الخطوة 2: إذا فشل، حاول regenerate للـ refresh token
        const tokens = await regenerateTokens(refreshToken, email);
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return customAxios(originalRequest);
      } catch (regenerateError) {
        console.error("All token refresh attempts failed:", regenerateError);
        redirectToLogin();
        return Promise.reject("Token refresh failed completely");
      }
    }
  }
);
