import BaseService from "./BaseService";

type ApproveProspectPayload = {
  id: string | number | undefined;
  is_approved: boolean;
};

export async function approveProspect(data: ApproveProspectPayload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  };
  return BaseService("/api/v1/prospects/approve", options);
}

export async function prospects(skip?: number, limit?: number) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
  return await BaseService("/api/v1/prospects", options)
}
