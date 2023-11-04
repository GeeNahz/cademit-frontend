import BaseService from "./BaseService";
import { User } from "@/app/types";
import { status } from "@/utils/status";

export async function registerUser(data: User) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await BaseService("/api/auth/register/user", options);
}

type PasswordResetType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export async function resetPassword(data: PasswordResetType) {
  if (data.password !== data.confirmPassword) {    
    throw {
      status: status.HTTP_400_BAD_REQUEST,
      statusText: "Bad Request",
      headers: {},
      errorMessage: "Passwords do not match",
    };
  }

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  };

  return await BaseService("/api/auth/password-reset", options);
}
