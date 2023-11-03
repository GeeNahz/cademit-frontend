import { ErrorType } from "@/app/types";

type ApproveProspectPayload = {
  id: string | number | undefined;
  is_approved: boolean;
};

export async function approveProspect(data: ApproveProspectPayload) {
  try {
    const response = await fetch("/api/v1/prospects/approve", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
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
