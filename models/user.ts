import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
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
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9]+(?<![_.])$/, "Username invalid. It should contain 8-20 alphanumeric letters and be unique!"],
  },
  gender: {
    type: String,
    required: [true, "Gender field is required!"],
  },
  image: {
    type: String,
  },
  hashed_password: {
    type: String,
    required: [true, "Password hash is required!"],
  },
  is_admin: {
    type: Boolean,
  }
});


// Check to ensure the User model does not exist already
const User = models.User || model("User", UserSchema);

export default User;

/** For regular express.js backend...
 const User = model("User", UserSchema);
 export default User;
 */
