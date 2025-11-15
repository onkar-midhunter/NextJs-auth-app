import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "please Provide a username"],
    unique: [true, "username is not available"],
  },
  email: {
    type: String,
    required: [true, "please Provide a Email"],
    unique: [true, "email is not available"],
  },
  password: {
    type: String,
    required: [true, "please Provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || 
mongoose.model("users", userSchema);
export default User;
