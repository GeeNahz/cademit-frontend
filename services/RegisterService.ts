import BaseService from "./BaseService";
import { User } from "@/app/types";

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
