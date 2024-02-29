import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
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
  forgotPasswordTokenExpirey: Date,
  verifyToken: String,
  verifyTokenExpirey: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;