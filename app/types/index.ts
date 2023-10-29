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

export const INPUT_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  EMAIL: "email",
  TEL: "tel",
  PASSWORD: "password",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  SELECT: "select",
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

export type StudentRecord = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  employment_status: string;
  course: string;
  purpose: string;
  experience_level: number;
  computer_access: boolean;
  internet_access: boolean;
  use_workspace: boolean;
};

export type Gender = "Male" | "Female";

export type ProspectsRecord = {
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  phone?: string;
  employment_status: string;
  course: string;
  purpose: string;
  experience_level: number;
  computer_access: boolean;
  internet_access: boolean;
  use_workspace: boolean;
};

export type User = {
  email: string;
  username: string;
  gender: Gender;
  image: string;
  is_admin: boolean;
  first_name?: string;
  last_name?: string;
  password?: string;
}

export type FormSelectOptions = {
  id?: string | number;
  name?: string;
  title: string;
  value: string | number | boolean;
};

export type FormFieldProps = {
  placeholder?: string;
  id?: string;
  classes?: string;
  required?: boolean;
};

export type FormField = {
  type: string;
  label: string;
  value: string | number | boolean;
  fieldName: string;
  fieldProps?: FormFieldProps;
  selectOptions?: FormSelectOptions[];
  // selectOptions?: {[key: string]: any}[];
};
