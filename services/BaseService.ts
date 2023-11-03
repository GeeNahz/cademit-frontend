import { ErrorType } from "@/app/types";

export default async function BaseService(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);

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