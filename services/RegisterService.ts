import { ErrorType, User } from "@/app/types";

export async function registerUser (data: User) {
  try {
    const response = await fetch("/api/auth/register/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error: ErrorType = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        errorMessage: await response.text(),
      };
      
      throw error;
    }
  } catch (error) {    
    throw error;
  }
}