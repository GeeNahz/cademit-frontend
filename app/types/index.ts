export interface Offer {
  id: number;
  title: string;
  description: string;
}

export interface CourseCategory {
  id: number;
  name: string;
  availableCourses: number;
  logoUrl: string;
}

export interface IconObj {
  id: number;
  icon: React.ReactNode;
}

export const PAYMENT_APPROACH = {
  FULL_PAYMENT: "Full payment",
  PER_MODULE: "Pay per module",
};

export const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export type PaymentApproach = "Full payment" | "Pay per module" | "";

export type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  employment_status: string;
  course: string;
  experience_level: number;
  computer_access: boolean;
  internet_access: boolean;
  use_workspace: boolean;
  payment_approach: PaymentApproach;
  module: string;
  paid: boolean;
  reference?: string;
}

export type StatusType = "info" | "success" | "error" | "idle";
