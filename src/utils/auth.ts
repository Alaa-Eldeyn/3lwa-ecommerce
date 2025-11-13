import axios from "axios";
import { LoginFormData, RegisterFormData } from "../types/types";

const handleAuthSuccess = (data: any) => {
  console.log("Authentication successful:", data);
};

export const loginUser = async (data: LoginFormData) => {
  console.log("Login data:", data);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/login`,
    {
      email: data.email,
      password: data.password,
    }
  );
  if (response.status === 200) {
    handleAuthSuccess(response.data);
  } else {
    console.error("Login failed:", response);
  }
};

export const registerUser = async (data: RegisterFormData) => {
  console.log("Register data:", data);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/register`,
    {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      confirmPassword: data.confirmPassword,
      agreeToTerms: data.agreeToTerms,
    }
  );
  if (response.status === 200) {
    handleAuthSuccess(response.data);
  } else {
    console.error("Login failed:", response);
  }
};
