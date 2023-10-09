import { Schema, models, model } from "mongoose";


const ProfileSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required!"],
    index: true,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required!"],
    index: true,
  },
  email: {
    type: String,
    unique: [true, "Email address already in use!"],
    required: [true, "Email address is required!"],
  },
  phone: {
    type: String,
    required: false,
  },
  employment_status: {
    type: String,
    required: [true, "Employment status is required!"],
  },
  course: {
    type: String,
    required: [true, "Course is required!"],
  },
  experience_level: {
    type: Number,
    required: [true, "Experience level is required!"],
  },
  computer_access: {
    type: Boolean,
    required: [true, "Access to computer is required!"],
  },
  internet_access: {
    type: Boolean,
    required: [true, "Access to internet is required!"],
  },
  use_workspace: {
    type: Boolean,
    required: [true, "Workspace use is required!"],
  },
  payment_approach: {
    type: String,
    required: [true, "The method of payment is required!"]
  },
});

ProfileSchema.methods.full_name = function full_name() {
  return this.first_name + " " + this.last_name;
}

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;
