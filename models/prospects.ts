import { Schema, models, model } from "mongoose";

import type { ProspectRecord } from "@/app/types";

const ProspectSchema = new Schema<ProspectRecord>({
  first_name: {
    type: String,
    required: [true, "First name is required!"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required and should be unique"],
  },
  gender: {
    type: String,
    required: [true, "Gender field is required!"],
  },
  course: {
    type: String,
    required: [true, "Course is required!"],
  },
  purpose: {
    type: String,
    required: [true, "Purpose field is required!"],
  },
  phone: {
    type: String,
  },
  employment_status: {
    type: String,
    required: [true, "Employment status is required!"],
  },
  computer_access: {
    type: Boolean,
    default: false,
  },
  experience_level: {
    type: Number,
    required: [true, "Experience level is required!"]
  },
  internet_access: {
    type: Boolean,
    required: [true, "Access to internet is required!"],
  },
  use_workspace: {
    type: Boolean,
    required: [true, "Use of workspace is required!"],
  },
});

const Prospect = models.Prospect || model("Prospect", ProspectSchema);

export default Prospect;
